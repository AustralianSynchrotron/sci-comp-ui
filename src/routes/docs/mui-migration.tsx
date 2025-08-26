import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../docs/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { Alert, AlertDescription } from "../../ui/components/alert"
import { CodeBlock } from "../../ui/components/code-block"
import { InfoIcon, AlertTriangle } from "lucide-react"

export const Route = createFileRoute('/docs/mui-migration')({
  component: MuiMigrationPage,
})

function MuiMigrationPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Docs", href: "/docs" }, { title: "MUI Migration Guide" }]}
        pageHeading="MUI Migration Guide"
        pageSubheading="Two migration strategies for moving from Material-UI to modern Tailwind-based components."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <strong>TL;DR:</strong> Similarly to MUI, Typography components are bundled for compatibility and consistency,
              but you can also run Tailwind in your consuming project with prefixes alongside existing MUI/emotion code for
              gradual migration in your own components.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Layout Migration Patterns</CardTitle>
              <CardDescription>Common MUI layout components and their replacements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Box → Div with Tailwind</h4>
                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                  <p className="text-sm font-medium mb-2">Before (MUI)</p>
                  <CodeBlock code={`<Box display="flex" alignItems="center" gap={2}>
  <Avatar />
  <Typography>John</Typography>
</Box>`} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">After (Tailwind)</p>
                  <CodeBlock code={`<div className="flex items-center gap-2">
  <Avatar />
  <Typography>John</Typography>
</div>`} />
                </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Stack → Flex with Gap</h4>
                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                  <p className="text-sm font-medium mb-2">Before (MUI)</p>
                  <CodeBlock code={`<Stack spacing={2} direction="row">
  <Button>Save</Button>
  <Button>Cancel</Button>
</Stack>`} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">After (Tailwind)</p>
                  <CodeBlock code={`<div className="flex gap-2">
  <Button>Save</Button>
  <Button>Cancel</Button>
</div>`} />
                </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Grid → CSS Grid</h4>
                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                  <p className="text-sm font-medium mb-2">Before (MUI)</p>
                  <CodeBlock code={`<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Card>Content 1</Card>
  </Grid>
  <Grid item xs={12} md={6}>
    <Card>Content 2</Card>
  </Grid>
</Grid>`} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">After (Tailwind)</p>
                  <CodeBlock code={`<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
  <Card>Content 1</Card>
  <Card>Content 2</Card>
</div>`} />
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coexistence Setup</CardTitle>
              <CardDescription>Running Tailwind alongside MUI/emotion during migration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Tailwind Configuration</h4>
                <CodeBlock code={`// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  prefix: 'tw-', // Avoid MUI conflicts
  corePlugins: {
    preflight: false, // Don't override MUI base styles
  },
  theme: {
    extend: {
      spacing: {
        1: '8px',   // Match MUI spacing(1)
        2: '16px',  // Match MUI spacing(2)
        3: '24px',  // Match MUI spacing(3)
      }
    }
  }
}`} />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Usage Example</h4>
                <CodeBlock code={`// Mix MUI and Tailwind safely
<Card sx={{ p: 2 }}>
  <Typography variant="h6">Profile</Typography>
  <div className="tw-flex tw-gap-2 tw-mt-2">
    <Button variant="contained">Edit</Button>
    <span className="tw-px-2 tw-py-1 tw-bg-green-100 tw-text-green-800 tw-rounded tw-text-xs">
      Active
    </span>
  </div>
</Card>`} />
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  The `tw-` prefix ensures Tailwind classes don't conflict with MUI's emotion-generated styles during the migration period.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
