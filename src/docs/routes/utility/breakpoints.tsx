import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../components/page-header";
import { Card, CardContent } from "../../../ui/layout/card";

export const Route = createFileRoute("/utility/breakpoints")({
  component: BreakpointsPage,
});

function BreakpointsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Utility", href: "/utility" },
          { title: "Breakpoints" },
        ]}
        pageHeading="Breakpoints"
        pageSubheading="Our custom breakpoints to support from mobile, to tablets, to 40-inch monitors used acrossed the facility. These override the default TailwindCSS breakpoints, and can be used the same as usual TailwindCSS breakpoint utility classes."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardContent>
            <div className="flex flex-col">
              <p className="m-2 p-1 text-dev">sm ( ≥ 600px )</p>
              <p className="m-2 p-1 text-dev">md ( ≥ 760px )</p>
              <p className="m-2 p-1 text-dev">lg ( ≥ 960px )</p>
              <p className="m-2 p-1 text-dev">xl ( ≥ 1280px )</p>
              <p className="m-2 p-1 text-dev">2xl ( ≥ 1440px )</p>
              <p className="m-2 p-1 text-dev">3xl ( ≥ 1920px )</p>
              <p className="m-2 p-1 text-dev">4xl ( ≥ 2560px )</p>
              <p className="m-2 p-1 text-dev">5xl ( ≥ 3200px )</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
