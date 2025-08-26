import React from "react"
import { SidebarTrigger } from "../../ui/layout/sidebar"
import { Separator } from "../../ui/elements/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/elements/breadcrumb"

interface PageHeaderProps {
  breadcrumbs?: Array<{
    title: string
    href?: string
  }>
  pageHeading?: string
  pageSubheading?: string
}

export function PageHeader({ breadcrumbs, pageHeading, pageSubheading }: PageHeaderProps) {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        {breadcrumbs && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.title}>
                  <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </header>
      {(pageHeading || pageSubheading) && (
        <div className="px-4 pb-4">
          {pageHeading && <h1 className="text-3xl font-bold">{pageHeading}</h1>}
          {pageSubheading && <p className="text-muted-foreground mt-2">{pageSubheading}</p>}
        </div>
      )}
    </div>
  )
}
