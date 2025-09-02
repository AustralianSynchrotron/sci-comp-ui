import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../../docs/components/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/layout/card'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <PageHeader
        pageHeading="Welcome to 'sci-comp-ui'"
        pageSubheading="A component library for scientific computing user interfaces"
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Choose a section from the sidebar to explore the components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This library provides a collection of reusable UI components built for React UIs. 
            Use the navigation sidebar to explore different categories:
          </p>
          <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Documentation</span>
              <span className="text-sm text-muted-foreground">- Guides and tutorials</span>
          </div> 
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Elements</span>
              <span className="text-sm text-muted-foreground">- Basic UI building blocks</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Components</span>
              <span className="text-sm text-muted-foreground">- More complicated, composite interfaces</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Layout</span>
              <span className="text-sm text-muted-foreground">- Structural organisation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Experimental</span>
              <span className="text-sm text-muted-foreground">- Early development components</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
