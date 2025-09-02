import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './docs/routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

import './styles/globals.css'

export default function DocsApp() {
  return <RouterProvider router={router} />
}
