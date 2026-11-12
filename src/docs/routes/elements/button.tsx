import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../components/page-header";
import { Button } from "../../../ui/elements/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/layout/card";
import { DemoContainer } from "@/docs/components/demo-container";

export const Route = createFileRoute("/elements/button")({
  component: ButtonPage,
});

/* DEMO_START */
function ButtonVariantsDemo() {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Default</Button>
        <Button variant="white">White</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="alert">Alert</Button>
        <Button variant="success">Success</Button>
        <Button variant="iconOnly">S</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="default" disabled>
          Default
        </Button>
        <Button variant="white" disabled>
          White
        </Button>
        <Button variant="warning" disabled>
          Warning
        </Button>
        <Button variant="alert" disabled>
          Alert
        </Button>
        <Button variant="success" disabled>
          Success
        </Button>
        <Button variant="iconOnly" disabled>
          S
        </Button>
      </div>
    </>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const buttonVariantsSource = __SOURCE__;

/* DEMO_START */
function ButtonSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
/* DEMO_END */

const buttonSizesSource = __SOURCE__;

/* DEMO_START */
function ButtonRoundedDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button rounded="default">Default Rounded</Button>
      <Button rounded="md">Medium Rounded</Button>
    </div>
  );
}
/* DEMO_END */

const buttonRoundedSource = __SOURCE__;

function ButtonPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Elements", href: "/elements" },
          { title: "Button" },
        ]}
        pageHeading="Button"
        pageSubheading="Displays a button or a component that looks like a button."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Based on the shadcn/ui{" "}
            <a
              href="https://ui.shadcn.com/docs/components/radix/button"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Button
            </a>
            ; see upstream for general usage. This page covers our additions:
            the <code>success</code> and <code>warning</code> variants and the{" "}
            <code>loading</code> prop. Upstream sizes such as{" "}
            <code>icon-sm</code> are not in our copy.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>
                Button style variants and their appearance in{" "}
                <code>disabled</code> state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonVariantsDemo />}
                source={buttonVariantsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Button sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonSizesDemo />}
                source={buttonSizesSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Corner Rounding</CardTitle>
              <CardDescription>Button corner rounding radius.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonRoundedDemo />}
                source={buttonRoundedSource}
              />
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Loading</CardTitle>
              <CardDescription>Button loading states</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonStatesDemo />}
                source={buttonStatesSource}
              />
            </CardContent>
          </Card> */}
        </div>
      </div>
    </>
  );
}
