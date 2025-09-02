import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { packageVersionPlugin } from './src/vite-plugins/package-version-plugin'
import { embedSourcePlugin } from './src/vite-plugins/embed-source-plugin'

export default defineConfig(({ command, mode }) => {
  const isGitHubPages = mode === 'github-pages'
  const isDocs = mode === 'docs'
  const isLibraryBuild = !isGitHubPages && !isDocs
  
  console.log('isGitHubPages', isGitHubPages)
  console.log('isDocs', isDocs)
  console.log('isLibraryBuild', isLibraryBuild)
  console.log('command', command)
  console.log('mode', mode)
  
  const plugins = [
    packageVersionPlugin(), // Add our custom plugin first
    embedSourcePlugin(), // Add source embedding plugin
  ]
  
  // Only include TanStack Router for docs or GitHub Pages builds
  // IMPORTANT: TanStack Router must come BEFORE React plugin
  if (isDocs || isGitHubPages) {
    plugins.push(tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/docs/routes',
      generatedRouteTree: './src/docs/routeTree.gen.ts'
    }))
  }
  
  // React plugin must come after TanStack Router
  plugins.push(react())
  plugins.push(tailwindcss())
  
  // Only include DTS plugin for library builds
  if (isLibraryBuild) {
    plugins.push(dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.*', 'src/**/*.test.*', 'src/docs/**/*'],
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.lib.json'
    }))
  }
  
  return {
    base: isGitHubPages ? '/sci-comp-ui/' : '/',
    plugins,
    
    build: isGitHubPages || isDocs ? {
      // Standard web app build for GitHub Pages and docs
      outDir: isDocs ? 'docs-dist' : 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    } : {
      // Library build (existing configuration)
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'SciCompComponentLibrary',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: [
          'react', 
          'react-dom', 
          'react-hook-form',
          'react/jsx-runtime',
          'lucide-react',
          'sonner'
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      },
      cssCodeSplit: false,
    },
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
})