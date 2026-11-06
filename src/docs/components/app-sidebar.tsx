import type * as React from "react";
import { ExternalLink, GalleryVerticalEnd } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Badge } from "../../ui/elements/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../ui/layout/sidebar";

type NavItem = {
  title: string;
  url: string;
  newTab?: boolean;
  items?: NavItem[];
};

// Components exported from src/shadcn.ts that we haven't changed are documented upstream.
const SHADCN_DOCS = "https://ui.shadcn.com/docs/components/radix";

const data: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Links",
      url: "/links",
      items: [
        {
          title: "GitHub",
          url: "https://github.com/AustralianSynchrotron/sci-comp-ui",
          newTab: true,
        },
        {
          title: "npm",
          url: "https://www.npmjs.com/package/@australiansynchrotron/sci-comp-ui",
          newTab: true,
        },
      ],
    },
    {
      title: "Docs",
      url: "/docs",
      items: [
        {
          title: "Getting Started",
          url: "/docs/getting-started",
        },
        {
          title: "Creating Components",
          url: "/docs/component-creation",
        },
        {
          title: "Tips for MUI Migration",
          url: "/docs/mui-migration",
        },
        {
          title: "Zod & Pydantic Analogy",
          url: "/docs/zod-pydantic-analogy",
        },
      ],
    },
    {
      title: "Elements",
      url: "/elements",
      items: [
        {
          title: "Badge",
          url: "/elements/badge",
        },
        {
          title: "Breadcrumb",
          url: "/elements/breadcrumb",
        },
        {
          title: "Button",
          url: "/elements/button",
        },
        {
          title: "Checkbox",
          url: `${SHADCN_DOCS}/checkbox`,
          newTab: true,
        },
        {
          title: "Input",
          url: `${SHADCN_DOCS}/input`,
          newTab: true,
        },
        {
          title: "Label",
          url: `${SHADCN_DOCS}/label`,
          newTab: true,
        },
        {
          title: "Popover",
          url: `${SHADCN_DOCS}/popover`,
          newTab: true,
        },
        {
          title: "Progress",
          url: `${SHADCN_DOCS}/progress`,
          newTab: true,
        },
        {
          title: "Select",
          url: `${SHADCN_DOCS}/select`,
          newTab: true,
        },
        {
          title: "Separator",
          url: `${SHADCN_DOCS}/separator`,
          newTab: true,
        },
        {
          title: "Slider",
          url: "/elements/slider",
        },
        {
          title: "Spark Line",
          url: "/elements/spark-line",
        },
        {
          title: "Switch",
          url: `${SHADCN_DOCS}/switch`,
          newTab: true,
        },
        {
          title: "Toaster",
          url: `${SHADCN_DOCS}/sonner`,
          newTab: true,
        },
        {
          title: "Tooltip",
          url: `${SHADCN_DOCS}/tooltip`,
          newTab: true,
        },
        {
          title: "Typography",
          url: "/elements/typography",
        },
      ],
    },
    {
      title: "Components",
      url: "/components",
      items: [
        {
          title: "Alert",
          url: `${SHADCN_DOCS}/alert`,
          newTab: true,
        },
        {
          title: "Alert Dialog",
          url: `${SHADCN_DOCS}/alert-dialog`,
          newTab: true,
        },
        {
          title: "Dialog",
          url: `${SHADCN_DOCS}/dialog`,
          newTab: true,
        },
        {
          title: "Form",
          url: "/components/form",
        },
        {
          title: "Calendar",
          url: "/components/calendar",
        },
        {
          title: "Chart: Bar",
          url: "/components/chart-bar",
        },
        {
          title: "Chart: Histogram",
          url: "/components/chart-histogram",
        },
        {
          title: "Chart: XY",
          url: "/components/chart-xy",
        },
        {
          title: "Code Block",
          url: "/components/code-block",
        },
        {
          title: "Ophyd Monitor",
          url: "/components/ophyd-monitor",
        },
        {
          title: "Periodic Table",
          url: "/components/periodic-table",
        },
        {
          title: "Radio Group",
          url: `${SHADCN_DOCS}/radio-group`,
          newTab: true,
        },
      ],
    },
    {
      title: "Layout",
      url: "/layout",
      items: [
        {
          title: "Accordion",
          url: `${SHADCN_DOCS}/accordion`,
          newTab: true,
        },
        {
          title: "Box",
          url: "/layout/box",
        },
        {
          title: "Card",
          url: `${SHADCN_DOCS}/card`,
          newTab: true,
        },
        {
          title: "Collapsible",
          url: `${SHADCN_DOCS}/collapsible`,
          newTab: true,
        },
        {
          title: "Grid",
          url: "/layout/grid",
        },
        {
          title: "Resizable",
          url: "/layout/resizable",
        },
        {
          title: "Sheet",
          url: "/layout/sheet",
        },
        {
          title: "Sidebar",
          url: `${SHADCN_DOCS}/sidebar`,
          newTab: true,
        },
        {
          title: "Stack",
          url: "/layout/stack",
        },
      ],
    },
    {
      title: "Experimental",
      url: "/experimental",
      items: [
        {
          title: "Beam Blockers Control",
          url: "/experimental/beam-blockers-control",
        },
        {
          title: "File Browser",
          url: "/experimental/file-browser",
        },
        {
          title: "Ophyd Control",
          url: "/experimental/ophyd-control",
        },
        {
          title: "Prefect Flow Table",
          url: "/experimental/prefect-flow-table",
        },
        {
          title: "Text Log",
          url: "/experimental/text-log",
        },
        {
          title: "Units Field",
          url: "/experimental/units-field",
        },
        {
          title: "Step Columns",
          url: "/experimental/step-columns",
        },
        {
          title: "Camera Control H264",
          url: "/experimental/camera-control-h264",
        },
        {
          title: "Camera Control Video",
          url: "/experimental/camera-control-video",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex items-center gap-2 leading-none">
                  <span className="font-medium">sci-comp-ui Docs</span>
                  <Badge className="text-xs">{__PACKAGE_VERSION__}</Badge>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild disabled>
                  <Link to={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === subItem.url}
                        >
                          <Link
                            to={subItem.url}
                            target={subItem.newTab ? "_blank" : undefined}
                            rel={
                              subItem.newTab ? "noopener noreferrer" : undefined
                            }
                          >
                            {subItem.title}
                            {subItem.newTab && (
                              <ExternalLink className="size-3" />
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
