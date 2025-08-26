/**
 * Converts an OKLCH color string to an RGB string
 * 
 * @param {string} oklchString - OKLCH color string (e.g., "oklch(0.646 0.222 41.116)")
 * @returns {string} - RGB color string (e.g., "rgb(255, 0, 0)")
 */
export function oklchStringToRgb(oklchString: string): string {
  // Extract OKLCH components from the string
  // Match numbers with decimal points, handling both space and comma separators
  const regex = /oklch\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i;
  const match = regex.exec(oklchString);
  // Empty check
  if (!oklchString) {
    return 'rgb(0, 0, 0)'
  }
  
  if (!match) {
    throw new Error(`Invalid OKLCH string format: ${oklchString}. Expected format: oklch(l c h)`);
  }
  
  // Extract lightness, chroma, and hue values
  const l = parseFloat(match[1]);
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);
  
  // Step 1: Convert OKLCH to OKLab (this part is correct)
  const hRad = h * Math.PI / 180;
  const a_comp = c * Math.cos(hRad);
  const b_comp = c * Math.sin(hRad);
  
  // Step 2: Convert OKLab to XYZ-D65
  // First convert to LMS
  const l_ = l + 0.3963377774 * a_comp + 0.2158037573 * b_comp;
  const m_ = l - 0.1055613458 * a_comp - 0.0638541728 * b_comp;
  const s_ = l - 0.0894841775 * a_comp - 1.2914855480 * b_comp;

  // Non-linear transformation
  const l_nonlinear = l_ * l_ * l_;
  const m_nonlinear = m_ * m_ * m_;
  const s_nonlinear = s_ * s_ * s_;
  
  // LMS to XYZ
  const x = +1.2268798733 * l_nonlinear - 0.5578149965 * m_nonlinear + 0.2813910585 * s_nonlinear;
  const y = -0.0405964182 * l_nonlinear + 1.1122568696 * m_nonlinear - 0.0716604514 * s_nonlinear;
  const z = -0.0763812845 * l_nonlinear - 0.4214819784 * m_nonlinear + 1.5861632204 * s_nonlinear;

  // Step 3: Convert XYZ to linear RGB
  const r_linear = +3.2409699419 * x - 1.5373831776 * y - 0.4986107603 * z;
  const g_linear = -0.9692436363 * x + 1.8759675015 * y + 0.0415550574 * z;
  const b_linear = +0.0556300797 * x - 0.2039769589 * y + 1.0569715142 * z;
  
  
  // Step 3: Convert linear RGB to sRGB
  // Apply gamma correction
  const toSRGB = (x: number): number => {
    if (x <= 0.0031308) {
      return 12.92 * x;
    } else {
      return 1.055 * Math.pow(x, 1/2.4) - 0.055;
    }
  };
  
  const r = toSRGB(r_linear);
  const g = toSRGB(g_linear);
  const b = toSRGB(b_linear);
  
  // Step 4: Convert sRGB to RGB values in 0-255 range
  // Clamp values to 0-1 range
  const clamp = (x: number): number => Math.min(Math.max(x, 0), 1);
  
  // Convert to 0-255 range
  const toRGB = (x: number): number => Math.round(clamp(x) * 255);
  
  // Format as rgb(r, g, b) string
  return `rgb(${toRGB(r)}, ${toRGB(g)}, ${toRGB(b)})`;
}
