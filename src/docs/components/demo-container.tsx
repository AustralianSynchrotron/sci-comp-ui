import { AppWindowIcon, CodeIcon } from "lucide-react"
import type { ReactNode } from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../ui/layout/tabs"
import { CodeBlock } from "../../ui/components/code-block"

interface DemoContainerProps {
  demo: ReactNode
  source: string
  heading?: string
  subheading?: string
  className?: string
}

export function DemoContainer({ demo, source, heading, subheading, className }: DemoContainerProps) {
  return (
    <div className={`w-full ${className || ""}`}>
      {(heading || subheading) && (
        <div className="mb-6">
          {heading && (
            <h1 className="text-3xl font-bold">{heading}</h1>
          )}
          {subheading && (
            <p className="text-muted-foreground mt-2">{subheading}</p>
          )}
        </div>
      )}
      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="demo" className="flex items-center gap-2">
            <AppWindowIcon className="h-4 w-4" />
            View Demo
          </TabsTrigger>
          <TabsTrigger value="source" className="flex items-center gap-2">
            <CodeIcon className="h-4 w-4" />
            View Source
          </TabsTrigger>
        </TabsList>
        <TabsContent value="demo" className="mt-4">
          <div className="rounded-lg border bg-background p-6">
            {demo}
          </div>
        </TabsContent>
        <TabsContent value="source" className="mt-4">
          <CodeBlock code={source} language="tsx" />
        </TabsContent>
      </Tabs>
    </div>
  )
}