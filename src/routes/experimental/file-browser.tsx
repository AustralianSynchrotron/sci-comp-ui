import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../../docs/components/page-header'
import { FileBrowser, type FileTreeItem } from '../../ui/experimental/file-browser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/layout/card'
import { DemoContainer } from '@/docs/components/demo-container'
import { Badge } from '../../ui/elements/badge'
import { Button } from '../../ui/elements/button'
import { useState } from 'react'

export const Route = createFileRoute('/experimental/file-browser')({
  component: FileBrowserPage,
})

// Sample file tree data for demos
const sampleFileTree: FileTreeItem[] = [
  {
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      {
        name: 'components',
        type: 'folder',
        path: '/src/components',
        children: [
          { name: 'Button.tsx', type: 'file', path: '/src/components/Button.tsx' },
          { name: 'Input.tsx', type: 'file', path: '/src/components/Input.tsx' },
          { name: 'Card.tsx', type: 'file', path: '/src/components/Card.tsx' }
        ]
      },
      {
        name: 'utils',
        type: 'folder',
        path: '/src/utils',
        children: [
          { name: 'helpers.ts', type: 'file', path: '/src/utils/helpers.ts' },
          { name: 'constants.ts', type: 'file', path: '/src/utils/constants.ts' }
        ]
      },
      { name: 'index.ts', type: 'file', path: '/src/index.ts' },
      { name: 'App.tsx', type: 'file', path: '/src/App.tsx' }
    ]
  },
  {
    name: 'public',
    type: 'folder',
    path: '/public',
    children: [
      { name: 'favicon.ico', type: 'file', path: '/public/favicon.ico' },
      { name: 'index.html', type: 'file', path: '/public/index.html' }
    ]
  },
  { name: 'package.json', type: 'file', path: '/package.json' },
  { name: 'README.md', type: 'file', path: '/README.md' }
]

/* DEMO_START */
function BasicFileBrowserDemo() {
  const [selectedFile, setSelectedFile] = useState<string>('')

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Selected file:</span>
        {selectedFile ? (
          <Badge variant="outline" className="font-mono text-xs">
            {selectedFile}
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground">None</span>
        )}
      </div>
      <div className="border rounded-md p-4 bg-background">
        <FileBrowser
          data={sampleFileTree}
          onFileSelect={setSelectedFile}
        />
      </div>
    </div>
  )
}
/* DEMO_END */

const basicFileBrowserSource = __SOURCE__

/* DEMO_START */
function CollapsibleOptionsDemo() {
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [collapsible, setCollapsible] = useState(true)
  const [defaultExpanded, setDefaultExpanded] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button
          variant={collapsible ? "default" : "outline"}
          size="sm"
          onClick={() => setCollapsible(!collapsible)}
        >
          {collapsible ? "Collapsible" : "Fixed"}
        </Button>
        <Button
          variant={defaultExpanded ? "default" : "outline"}
          size="sm"
          onClick={() => setDefaultExpanded(!defaultExpanded)}
        >
          {defaultExpanded ? "Default Expanded" : "Default Collapsed"}
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Selected file:</span>
        {selectedFile ? (
          <Badge variant="outline" className="font-mono text-xs">
            {selectedFile}
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground">None</span>
        )}
      </div>
      
      <div className="border rounded-md p-4 bg-background">
        <FileBrowser
          data={sampleFileTree}
          collapsible={collapsible}
          defaultExpanded={defaultExpanded}
          onFileSelect={setSelectedFile}
        />
      </div>
    </div>
  )
}
/* DEMO_END */

const collapsibleOptionsSource = __SOURCE__

/* DEMO_START */
function PrefixDemo() {
  const [selectedFile, setSelectedFile] = useState<string>('')

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Selected file:</span>
        {selectedFile ? (
          <Badge variant="outline" className="font-mono text-xs">
            {selectedFile}
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground">None</span>
        )}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">No Prefix</h4>
          <div className="border rounded-md p-4 bg-background">
            <FileBrowser
              data={sampleFileTree}
              onFileSelect={setSelectedFile}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">With Prefix: "📁 "</h4>
          <div className="border rounded-md p-4 bg-background">
            <FileBrowser
              data={sampleFileTree}
              prefix="📁 "
              onFileSelect={setSelectedFile}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const prefixDemoSource = __SOURCE__

function FileBrowserPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[
          { title: "Experimental", href: "/experimental" }, 
          { title: "File Browser" }
        ]}
        pageHeading="File Browser"
        pageSubheading="A hierarchical file tree browser component for displaying and navigating file structures."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          {/* Basic Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>
                Simple file browser with file selection callback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicFileBrowserDemo />}
                source={basicFileBrowserSource}
              />
            </CardContent>
          </Card>

          {/* Collapsible Options */}
          <Card>
            <CardHeader>
              <CardTitle>Collapsible Options</CardTitle>
              <CardDescription>
                Control whether folders can be collapsed and their default state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CollapsibleOptionsDemo />}
                source={collapsibleOptionsSource}
              />
            </CardContent>
          </Card>

          {/* Prefix Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Name Prefixes</CardTitle>
              <CardDescription>
                Add custom prefixes to file and folder names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<PrefixDemo />}
                source={prefixDemoSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
