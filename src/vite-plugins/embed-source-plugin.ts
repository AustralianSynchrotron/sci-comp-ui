import fs from 'fs'
import type { Plugin } from 'vite'

export function embedSourcePlugin(): Plugin {
  return {
    name: 'embed-source',
    transform(code, id) {
      // Only process files that use the source embedding
      if (!code.includes('__SOURCE__')) return null
      
      // Remove query parameters from the file path
      const filePath = id.split('?')[0]
      
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.warn(`[embed-source] File not found: ${filePath}`)
        return null
      }
      
      // Read the current file's content
      const sourceCode = fs.readFileSync(filePath, 'utf-8')
      
      // Extract all demo sections
      const demoSections = extractAllDemoSections(sourceCode, filePath)
      
      // Replace each __SOURCE__ placeholder with the corresponding demo code
      let transformedCode = code
      let sourceIndex = 0
      
      transformedCode = transformedCode.replace(/__SOURCE__/g, () => {
        const demoCode = demoSections[sourceIndex] || '// No demo code found'
        sourceIndex++
        return JSON.stringify(demoCode)
      })
      
      return {
        code: transformedCode,
        map: null // We're not generating source maps for this transformation
      }
    }
  }
}

function extractAllDemoSections(source: string, filePath: string): string[] {
  const demoSections: string[] = []
  
  // Find all DEMO_START/DEMO_END pairs
  const regex = /\/\* DEMO_START \*\/([\s\S]*?)\/\* DEMO_END \*\//g
  let match
  
  while ((match = regex.exec(source)) !== null) {
    demoSections.push(match[1].trim())
  }
  
  if (demoSections.length === 0) {
    console.warn(`No demo sections found in ${filePath}. Use /* DEMO_START */ and /* DEMO_END */ markers.`)
    return ['// No demo code found. Use /* DEMO_START */ and /* DEMO_END */ markers.']
  }
  
  return demoSections
}