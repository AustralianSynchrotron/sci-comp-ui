import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './docs/routeTree.gen'


const basepath =
  import.meta.env.MODE === 'github-pages' ? '/sci-comp-ui' : ''


const router = createRouter({ routeTree, basepath })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

import './styles/globals.css'

export default function DocsApp() {
  return <RouterProvider router={router} />
}
