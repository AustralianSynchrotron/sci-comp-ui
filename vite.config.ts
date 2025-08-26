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
  console.log('isGitHubPages', isGitHubPages)
  console.log('command', command)
  console.log('mode', mode)
  
  return {
    base: isGitHubPages ? '/sci-comp-ui/' : '/',
    
    plugins: [
      packageVersionPlugin(), // Add our custom plugin first
      embedSourcePlugin(), // Add source embedding plugin
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      // Only include DTS plugin for library builds, not GitHub Pages
      ...(isGitHubPages ? [] : [dts({
        include: ['src/**/*'],
        exclude: ['src/**/*.stories.*', 'src/**/*.test.*'],
        insertTypesEntry: true,
        tsconfigPath: './tsconfig.lib.json'
      })])
    ],
    
    build: isGitHubPages ? {
      // Standard web app build for GitHub Pages
      outDir: 'dist',
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