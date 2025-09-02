import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { CodeBlock } from "../../../ui/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/components/code-block')({
  component: CodeBlockPage,
})

/* DEMO_START */
function BasicCodeBlockDemo() {
  return (
    <div className="space-y-4">
      <CodeBlock 
        code={`function greet(name: string) {
  return \`Hello, \${name}!\`
}

console.log(greet("World"))`}
        language="typescript"
      />
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicCodeBlockSource = __SOURCE__

/* DEMO_START */
function MultipleLanguagesDemo() {
  return (
    <div className="space-y-4">
      <CodeBlock 
        code={`import numpy as np

def calculate_beam_energy(mass, velocity):
    gamma = 1 / np.sqrt(1 - (velocity**2 / 299792458**2))
    return mass * 299792458**2 * (gamma - 1)

# Calculate energy for 6.5 GeV beam
beam_energy = calculate_beam_energy(9.1093837015e-31, 0.9999999)
print(f"Beam Energy: {beam_energy / 1e9:.1f} GeV")`}
        language="python"
      />
      
      <CodeBlock 
        code={`#!/bin/bash

# Check beam status
if systemctl is-active --quiet beamline; then
    echo "Beamline is running"
    systemctl status beamline --no-pager
else
    echo "Beamline is stopped"
    systemctl start beamline
fi`}
        language="bash"
      />
    </div>
  )
}
/* DEMO_END */

const multipleLanguagesSource = __SOURCE__

/* DEMO_START */
function LineNumbersDemo() {
  return (
    <div className="space-y-4">
      <CodeBlock 
        code={`import React from 'react'
import { Button } from './ui/button'

interface ControlPanelProps {
  isActive: boolean
  onToggle: () => void
  energy: number
}

export function ControlPanel({ isActive, onToggle, energy }: ControlPanelProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Beam Control</h3>
      <div className="space-y-2">
        <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
        <p>Energy: {energy} GeV</p>
        <Button onClick={onToggle}>
          {isActive ? 'Stop Beam' : 'Start Beam'}
        </Button>
      </div>
    </div>
  )
}`}
        language="tsx"
        showLineNumbers
      />
    </div>
  )
}
/* DEMO_END */

const lineNumbersSource = __SOURCE__

/* DEMO_START */
function NoLanguageDemo() {
  return (
    <div className="space-y-4">
      <CodeBlock 
        code={`This is a plain text code block without syntax highlighting.
It's useful for displaying:
- Configuration files
- Log outputs
- Plain text data
- Any content that doesn't need syntax highlighting

The copy button is positioned in the top-right corner
when no language is specified.`}
      />
    </div>
  )
}
/* DEMO_END */

const noLanguageSource = __SOURCE__

function CodeBlockPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Code Block" }]}
        pageHeading="Code Block"
        pageSubheading="A versatile component for displaying code with syntax highlighting, line numbers, and copy functionality."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Simple code block with TypeScript syntax highlighting</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicCodeBlockDemo />}
                source={basicCodeBlockSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multiple Languages</CardTitle>
              <CardDescription>Code blocks supporting different programming languages</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<MultipleLanguagesDemo />}
                source={multipleLanguagesSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Numbers</CardTitle>
              <CardDescription>Code blocks with line numbers for better readability</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<LineNumbersDemo />}
                source={lineNumbersSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plain Text</CardTitle>
              <CardDescription>Code blocks without syntax highlighting for plain text content</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<NoLanguageDemo />}
                source={noLanguageSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
