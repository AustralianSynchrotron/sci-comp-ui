import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../../components/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/layout/card'
import { CodeBlock } from '../../../ui/components/code-block'
import { Badge } from '../../../ui/elements/badge'

const COMPONENT_STRUCTURE = `
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        // other variants...
      },
      size: {
        default: "default-size",
        // other sizes...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Component = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"element"> & VariantProps<typeof componentVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <element
      className={cn(componentVariants({ variant, size, className }))} // cn is a utility function that combines class names
      ref={ref}
      {...props}
    />
  )
})
Component.displayName = "Component"

export { Component, componentVariants }`

export const Route = createFileRoute('/docs/component-creation')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Docs", href: "/docs" }, { title: "Creating Components" }]}
        pageHeading="Creating Components"
        pageSubheading="Learn how to create and contribute components to the library."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Library Structure</CardTitle>
              <CardDescription>Understanding component organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="space-y-4">
                  <li className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      Elements <Badge variant="outline">src/ui/elements/</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Basic building blocks: buttons, inputs, labels, etc. These are atomic components with minimal dependencies.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      Components <Badge variant="outline">src/ui/components/</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complex components built from elements: forms, charts, tables, etc. These combine multiple elements and logic.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      Experimental <Badge variant="outline">src/ui/experimental/</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Early development components that need additional testing for utility and bug identification.
                    </p>
                  </li>
                </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component Philosophy</CardTitle>
              <CardDescription>Core principles for component design</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Utility-First Styling</h4>
                  <p className="text-sm text-muted-foreground">
                    Use Tailwind CSS utility classes for consistent, maintainable styling. Avoid custom CSS when possible.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Composable Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Build components from smaller, reusable pieces. Use variants and composition over inheritance.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Type Safety</h4>
                  <p className="text-sm text-muted-foreground">
                    Use TypeScript for all components. Leverage variant props and proper typing for better developer experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component Structure</CardTitle>
              <CardDescription>Standard pattern for component implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Basic Structure</h4>
                    <CodeBlock language="tsx" code={COMPONENT_STRUCTURE} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creating Documentation</CardTitle>
              <CardDescription>How to document your component</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">File Location</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Create documentation in <code className="bg-muted px-1 rounded">src/routes/</code> following the component's location:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Elements: <code className="bg-muted px-1 rounded">src/routes/elements/</code></li>
                  <li>• Components: <code className="bg-muted px-1 rounded">src/routes/components/</code></li>
                  <li>• Experimental: <code className="bg-muted px-1 rounded">src/routes/experimental/</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Steps to create your first component</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Create component file in appropriate <code className="bg-muted px-1 rounded">src/ui/</code> subdirectory</li>
                <li>Implement component following the structure pattern above</li>
                <li>Create documentation file in corresponding <code className="bg-muted px-1 rounded">src/routes/</code> directory</li>
                <li>Add route to <code className="bg-muted px-1 rounded">src/docs/components/app-sidebar.tsx</code></li>
                <li>Create demos with proper markers for source embedding</li>
                <li>Test component functionality and accessibility</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Reference</CardTitle>
              <CardDescription>Study existing components for patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Review <code className="bg-muted px-1 rounded">src/ui/elements/button.tsx</code> for a complete implementation example.
                </p>
                <p className="text-muted-foreground">
                  See <code className="bg-muted px-1 rounded">src/routes/elements/button.tsx</code> for documentation structure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
