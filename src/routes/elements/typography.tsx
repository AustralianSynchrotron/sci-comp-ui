import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { 
  Typography,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyInlineCode
} from "../../ui/elements/typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/typography')({
  component: TypographyPage,
})

/* DEMO_START */
function HeadingsDemo() {
  return (
    <div className="space-y-4">
      <TypographyH1>X-ray Crystallography Analysis</TypographyH1>
      <TypographyH2>Beamline Configuration</TypographyH2>
      <TypographyH3>Detector Settings</TypographyH3>
      <TypographyH4>Data Collection Parameters</TypographyH4>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const headingsSource = __SOURCE__

/* DEMO_START */
function TextVariantsDemo() {
  return (
    <div className="space-y-4">
      <TypographyLead>
        Welcome to the Advanced Photon Source beamline 24-ID-C. This facility provides 
        high-brightness X-rays for macromolecular crystallography studies.
      </TypographyLead>
      
      <TypographyP>
        The beamline operates at energies ranging from 6.5 to 24 keV, with a flux 
        of up to 10¹² photons/second. Our Pilatus 6M detector provides rapid 
        data collection with minimal readout time.
      </TypographyP>
      
      <TypographyLarge>
        Current experiment: Protein crystal structure determination
      </TypographyLarge>
      
      <TypographySmall>
        Sample temperature: 100K | Wavelength: 0.9792 Å | Detector distance: 400mm
      </TypographySmall>
      
      <TypographyMuted>
        Last calibration: 2024-01-15 14:30 UTC | Operator: Dr. Smith
      </TypographyMuted>
    </div>
  )
}
/* DEMO_END */

const textVariantsSource = __SOURCE__

/* DEMO_START */
function CustomStylingDemo() {
  return (
    <div className="space-y-4">
      <TypographyH2 align="center" color="primary">
        Experimental Results
      </TypographyH2>
      
      <TypographyP align="justify" gutterBottom>
        The diffraction data collected from the lysozyme crystal shows excellent 
        resolution extending to 1.8 Å. The Rmerge value of 0.089 indicates 
        high-quality data suitable for structure refinement.
      </TypographyP>
      
      <TypographyBlockquote>
        "The high-resolution data obtained from this beamline significantly 
        improved our understanding of the protein's active site geometry."
        <TypographySmall color="muted" className="block mt-2">
          — Dr. Johnson, Principal Investigator
        </TypographySmall>
      </TypographyBlockquote>
      
      <TypographyP>
        Key parameters: <TypographyInlineCode>exposure_time = 0.5s</TypographyInlineCode>, 
        <TypographyInlineCode>oscillation = 0.1°</TypographyInlineCode>, 
        <TypographyInlineCode>total_frames = 1800</TypographyInlineCode>
      </TypographyP>
      
      <TypographyH3 color="success" align="center">
        Data Collection Complete ✓
      </TypographyH3>
    </div>
  )
}
/* DEMO_END */

const customStylingSource = __SOURCE__

/* DEMO_START */
function VariantVsShortcutDemo() {
  return (
    <div className="space-y-6">
      <div>
        <TypographyH3 color="primary" className="mb-3">Using Variant Prop</TypographyH3>
        <div className="space-y-2 pl-4 border-l-2 border-muted">
          <Typography variant="h1">Main Title (variant="h1")</Typography>
          <Typography variant="h2">Section Title (variant="h2")</Typography>
          <Typography variant="lead">Lead paragraph (variant="lead")</Typography>
          <Typography variant="p">Regular paragraph (variant="p")</Typography>
          <Typography variant="small">Small text (variant="small")</Typography>
          <Typography variant="muted">Muted text (variant="muted")</Typography>
        </div>
      </div>
      
      <div>
        <TypographyH3 color="primary" className="mb-3">Using Class Name Shortcuts</TypographyH3>
        <div className="space-y-2 pl-4 border-l-2 border-muted">
          <TypographyH1>Main Title (TypographyH1)</TypographyH1>
          <TypographyH2>Section Title (TypographyH2)</TypographyH2>
          <TypographyLead>Lead paragraph (TypographyLead)</TypographyLead>
          <TypographyP>Regular paragraph (TypographyP)</TypographyP>
          <TypographySmall>Small text (TypographySmall)</TypographySmall>
          <TypographyMuted>Muted text (TypographyMuted)</TypographyMuted>
        </div>
      </div>
      
      <div>
        <TypographyH3 color="primary" className="mb-3">Mixed Approach Example</TypographyH3>
        <Typography variant="h3" color="success">Experiment Status (variant="h3")</Typography>
        <TypographyP>
          Data collection progress: <TypographyInlineCode>75% complete</TypographyInlineCode>
        </TypographyP>
        <Typography variant="blockquote" color="warning">
          "Sample temperature stability is critical for high-resolution data collection."
        </Typography>
        <TypographySmall color="muted">
          Current conditions: 100K ± 0.5K | Humidity: 45% | Pressure: 1 atm
        </TypographySmall>
      </div>
    </div>
  )
}
/* DEMO_END */

const variantVsShortcutSource = __SOURCE__

function TypographyPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Typography" }]}
        pageHeading="Typography"
        pageSubheading="A collection of typography components for consistent text styling across your application."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Headings</CardTitle>
              <CardDescription>Hierarchical heading components for document structure</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<HeadingsDemo />}
                source={headingsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Variants</CardTitle>
              <CardDescription>Different text styles for various content types</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<TextVariantsDemo />}
                source={textVariantsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Styling</CardTitle>
              <CardDescription>Typography with custom alignment, colors, and spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CustomStylingDemo />}
                source={customStylingSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variant vs Shortcut Components</CardTitle>
              <CardDescription>Compare using the variant prop versus dedicated component shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<VariantVsShortcutDemo />}
                source={variantVsShortcutSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
