import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../../components/page-header'
import { Button } from '../../../ui/elements/button'
import { CodeBlock } from '../../../ui/components/code-block'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/layout/card'

export const Route = createFileRoute('/docs/getting-started')({
  component: GettingStartedPage,
})

function GettingStartedPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Docs", href: "/docs" }, { title: "Getting Started" }]}
        pageHeading="Getting Started"
        pageSubheading="Learn how to set up and use the sci-comp-ui library component library"
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Relevant External Resources</CardTitle>
              <CardDescription>These links provide additional context about the technologies used in this project:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Core Technologies</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        shadcn/ui
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        The component library approach that this repo is founded from, providing a collection of reusable, accessible components built on top of Radix UI primitives.
                      </p>
                    </li>
                    <li>
                      <a href="https://www.radix-ui.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Radix UI
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        The core UI primitives that this component library depends on, offering unstyled, accessible components for building high-quality design systems.
                      </p>
                    </li>
                    <li>
                      <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Tailwind CSS v4
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Used for styling, providing utility-first CSS framework with a design system and responsive design utilities.
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Development Tools</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://cva.style" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Class Variance Authority (CVA)
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Used for creating type-safe component variants and managing conditional CSS classes in a maintainable way.
                      </p>
                    </li>
                    <li>
                      <a href="https://zod.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Zod
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Used for data schemas and form validation, providing runtime type checking and validation for TypeScript applications.
                      </p>
                    </li>
                    <li>
                      <a href="https://react-hook-form.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        React Hook Form
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Used for building performant forms with minimal re-renders, providing a and extensible form library for React.
                      </p>
                    </li>
                    <li>
                      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Vite & Vite Plugins
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Used to build the project and embed derived values from source code, providing fast development and optimised production builds.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Installation to Your Project</CardTitle>
              <CardDescription>Get started by installing the package and it's dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                language="bash"
                code={`npm install sci-comp-ui`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Here's a simple example to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Import and use components in your React application:</p>
              <CodeBlock 
                language="tsx"
                code={`import { Button } from "sci-comp-ui"`}
              />
              <Button>Example Button</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
