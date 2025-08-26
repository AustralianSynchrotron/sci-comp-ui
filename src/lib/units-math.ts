import { create, all, type MathJsInstance } from "mathjs"

// Create a mathjs instance with all functionality
const math = create(all) as MathJsInstance

// Define synchrotron-specific units in dependency order
// Base units first (no dependencies)
const baseUnits = {
  // Energy units (beyond standard eV)
  keV: "1000 eV",
  MeV: "1000000 eV",
  GeV: "1000000000 eV",
  TeV: "1000000000000 eV",

  // X-ray wavelength units
  angstrom: "1e-10 m",
  pm: "1e-12 m", // picometer
  micrometer: "1e-6 m", // μm

  // Magnetic field units (T already exists in mathjs)
  mT: "0.001 T",
  G: "0.0001 T", // Gauss
  kG: "0.1 T", // kiloGauss

  // Vacuum pressure units
  Torr: "133.322 Pa",
  mTorr: "0.133322 Pa",
  mbar: "100 Pa",
  microbar: "0.1 Pa", // ASCII equivalent of μbar

  // Beam current units (A already exists)
  mA: "0.001 A",
  microA: "0.000001 A", // ASCII equivalent of μA
  nA: "0.000000001 A",
  pA: "0.000000000001 A",

  // Frequency units for RF systems
  MHz: "1000000 Hz",
  GHz: "1000000000 Hz",
  THz: "1000000000000 Hz",

  // Time units for beam physics
  ns: "1e-9 s",
  ps: "1e-12 s",
  fs: "1e-15 s",
  microsecond: "1e-6 s", // μs

  // Particle flux units
  pps: "1/s", // particles per second
  kpps: "1000/s",
  Mpps: "1000000/s",

  // Cross-section units
  barn: "1e-28 m^2",
  mbarn: "1e-31 m^2",
  microbarn: "1e-34 m^2", // ASCII equivalent of μbarn
  nbarn: "1e-37 m^2",
  pbarn: "1e-40 m^2",
}

// Derived units that depend on base units
const derivedUnits: Record<string, string> = {
  // No derived units currently needed
}

// Helper function to create units safely
function createUnitSafely(name: string, definition: string) {
  try {
    // Check if unit already exists by trying to create a test unit
    math.unit(1, name)
    // If we get here, unit already exists, skip silently
  } catch (error) {
    // Unit doesn't exist, try to create it
    try {
      math.createUnit(name, definition)
    } catch (createError) {
      console.warn(`Failed to create unit ${name}: ${createError}`)
    }
  }
}

// Create base units first
Object.entries(baseUnits).forEach(([name, definition]) => {
  createUnitSafely(name, definition)
})

// Then create derived units
Object.entries(derivedUnits).forEach(([name, definition]) => {
  createUnitSafely(name, definition)
})

export interface SynchrotronValue {
  value: number
  unit: string
  nativeValue: number
  nativeUnit: string
}

export class SynchrotronMath {
  private math: MathJsInstance

  constructor() {
    this.math = math
  }

  // Create a value with native storage
  createValue(value: number, unit: string): SynchrotronValue {
    return {
      value,
      unit,
      nativeValue: value,
      nativeUnit: unit,
    }
  }

  // Convert to different unit for display (doesn't mutate native)
  convertForDisplay(synchValue: SynchrotronValue, targetUnit: string): SynchrotronValue {
    try {
      const mathUnit = this.math.unit(synchValue.nativeValue, synchValue.nativeUnit)
      const converted = mathUnit.to(targetUnit)

      return {
        value: converted.toNumber(),
        unit: targetUnit,
        nativeValue: synchValue.nativeValue,
        nativeUnit: synchValue.nativeUnit,
      }
    } catch (error) {
      console.error("Conversion error:", error)
      return synchValue
    }
  }

  // Get all compatible units for a given unit
  getCompatibleUnits(unit: string): string[] {
    try {
      // Return common units based on dimension
      const unitGroups: Record<string, string[]> = {
        // Energy
        ENERGY: ["eV", "keV", "MeV", "GeV", "TeV", "J", "kJ"],
        // Length
        LENGTH: ["m", "mm", "micrometer", "nm", "pm", "angstrom", "cm", "km"],
        // Magnetic field
        MAGNETIC_FIELD_STRENGTH: ["T", "mT", "G", "kG"],
        // Pressure
        PRESSURE: ["Pa", "kPa", "MPa", "Torr", "mTorr", "mbar", "microbar", "atm"],
        // Current
        CURRENT: ["A", "mA", "microA", "nA", "pA"],
        // Frequency
        FREQUENCY: ["Hz", "kHz", "MHz", "GHz", "THz"],
        // Time
        TIME: ["s", "ms", "microsecond", "ns", "ps", "fs", "min", "h"],

        // Area
        AREA: ["m^2", "cm^2", "mm^2", "barn", "mbarn", "microbarn", "nbarn", "pbarn"],
      }

      // Find matching dimension
      for (const [_, units] of Object.entries(unitGroups)) {
        if (units.includes(unit)) {
          return units
        }
      }

      return [unit] // fallback to original unit
    } catch (error) {
      return [unit]
    }
  }

  // Utility methods
  add(a: SynchrotronValue, b: SynchrotronValue): SynchrotronValue {
    const unitA = this.math.unit(a.nativeValue, a.nativeUnit)
    const unitB = this.math.unit(b.nativeValue, b.nativeUnit)
    const result = this.math.add(unitA, unitB)

    return {
      value: result.toNumber(),
      unit: result.formatUnits(),
      nativeValue: result.toNumber(),
      nativeUnit: result.formatUnits(),
    }
  }

  multiply(a: SynchrotronValue, scalar: number): SynchrotronValue {
    return {
      value: a.value * scalar,
      unit: a.unit,
      nativeValue: a.nativeValue * scalar,
      nativeUnit: a.nativeUnit,
    }
  }

  // Energy-wavelength conversion (E = hc/λ)
  energyToWavelength(energy: SynchrotronValue): SynchrotronValue {
    const h = 4.135667696e-15 // Planck constant in eV⋅s
    const c = 299792458 // speed of light in m/s

    const energyInEv = this.convertForDisplay(energy, "eV")
    const wavelengthInM = (h * c) / energyInEv.value

    return this.createValue(wavelengthInM, "m")
  }

  wavelengthToEnergy(wavelength: SynchrotronValue): SynchrotronValue {
    const h = 4.135667696e-15 // Planck constant in eV⋅s
    const c = 299792458 // speed of light in m/s

    const wavelengthInM = this.convertForDisplay(wavelength, "m")
    const energyInEv = (h * c) / wavelengthInM.value

    return this.createValue(energyInEv, "eV")
  }
}

export const synchrotronMath = new SynchrotronMath()
