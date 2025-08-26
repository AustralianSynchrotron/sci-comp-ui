import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AppSidebar } from '../docs/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '../ui/layout/sidebar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
