import { type Plugin } from 'vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface PackageVersionPluginOptions {
  /**
   * The macro string to replace with the package version
   * @default '__PACKAGE_VERSION__'
   */
  macro?: string
  /**
   * Path to package.json file
   * @default './package.json'
   */
  packageJsonPath?: string
  /**
   * Whether to include the 'v' prefix
   * @default true
   */
  includeVPrefix?: boolean
}

export function packageVersionPlugin(options: PackageVersionPluginOptions = {}): Plugin {
  const {
    macro = '__PACKAGE_VERSION__',
    packageJsonPath = './package.json',
    includeVPrefix = true
  } = options

  let packageVersion: string

  return {
    name: 'package-version-plugin',
    configResolved(config) {
      try {
        const packageJsonFullPath = resolve(config.root, packageJsonPath)
        const packageJson = JSON.parse(readFileSync(packageJsonFullPath, 'utf-8'))
        packageVersion = includeVPrefix ? `v${packageJson.version}` : packageJson.version
      } catch (error) {
        console.warn(`Failed to read package.json from ${packageJsonPath}:`, error)
        packageVersion = includeVPrefix ? 'v0.0.0' : '0.0.0'
      }
    },
    transform(code, id) {
      // Only transform TypeScript and JavaScript files
      if (!id.includes('node_modules') && (id.endsWith('.ts') || id.endsWith('.tsx') || id.endsWith('.js') || id.endsWith('.jsx'))) {
        if (code.includes(macro)) {
          // Replace the macro with a string literal
          const transformedCode = code.replace(
            new RegExp(macro, 'g'), 
            `"${packageVersion}"`
          )
          return {
            code: transformedCode,
            map: null // We could generate a source map here if needed
          }
        }
      }
      return null
    }
  }
}
