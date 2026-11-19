import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../components/page-header";
import { Button } from "@/ui/elements/button";
import { SvgCheck } from "@/ui/svgs/Check";
import { SvgCode } from "@/ui/svgs/Code";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/layout/card";
import { DemoContainer } from "@/docs/components/demo-container";

export const Route = createFileRoute("/elements/button")({
  component: ButtonPage,
});

/* DEMO_START */
function ButtonVariantsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <h5>Active State</h5>
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="alert">Alert</Button>
        <Button variant="success">Success</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Disabled State</h5>
        <Button variant="default" disabled>
          Default
        </Button>
        <Button variant="outline" disabled>
          Outline
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
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Read-only State</h5>
        <Button variant="default" readOnly>
          Default
        </Button>
        <Button variant="outline" readOnly>
          Outline
        </Button>
        <Button variant="warning" readOnly>
          Warning
        </Button>
        <Button variant="alert" readOnly>
          Alert
        </Button>
        <Button variant="success" readOnly>
          Success
        </Button>
        <Button variant="ghost" readOnly>
          Ghost
        </Button>
        <Button variant="link" readOnly>
          Link
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Loading State</h5>
        <Button variant="default" loading>
          Default
        </Button>
        <Button variant="outline" loading>
          Outline
        </Button>
        <Button variant="warning" loading>
          Warning
        </Button>
        <Button variant="alert" loading>
          Alert
        </Button>
        <Button variant="success" loading>
          Success
        </Button>
        <Button variant="ghost" loading>
          Ghost
        </Button>
        <Button variant="link" loading>
          Link
        </Button>
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const buttonVariantsSource = __SOURCE__;

/* DEMO_START */
function ButtonTextLinkVariantDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <h5>Active State</h5>
        <Button variant="link">
          <span>Link</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Disabled State</h5>
        <Button variant="link" disabled>
          Default
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Read-only State</h5>
        <Button variant="link" readOnly>
          Default
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Loading State</h5>
        <Button variant="link" loading>
          Default
        </Button>
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const buttonTextLinkVariantSource = __SOURCE__;

/* DEMO_START */
function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
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
    <div className="flex flex-wrap items-center gap-4">
      <Button rounded="xs">Extra-Small Rounded</Button>
      <Button rounded="default">Default Rounded</Button>
      <Button rounded="md">Medium Rounded</Button>
    </div>
  );
}
/* DEMO_END */

const buttonRoundedSource = __SOURCE__;

/* DEMO_START */
function ButtonIconDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <h5>Start Position</h5>
        {/* You can explicitly set iconPosition="start", but it also defaults to start when not set */}
        <div>
          <Button icon={<SvgCheck />} size="sm" iconPosition="start">
            Start Position
          </Button>
        </div>
        <div>
          <Button icon={<SvgCheck />}>Start Position</Button>
        </div>
        <div>
          <Button icon={<SvgCheck />} size="lg">
            Start Position
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <h5>End Position</h5>
        <div>
          <Button icon={<SvgCheck />} size="sm" iconPosition="end">
            End Position
          </Button>
        </div>
        <div>
          <Button icon={<SvgCheck />} iconPosition="end">
            End Position
          </Button>
        </div>
        <div>
          <Button icon={<SvgCheck />} size="lg" iconPosition="end">
            End Position
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Loading icon will replace custom icon when set</h5>
        <div>
          <Button icon={<SvgCheck />} size="sm" iconPosition="start" loading>
            Start Loading
          </Button>
        </div>
        <div>
          <Button icon={<SvgCheck />} size="sm" iconPosition="start" loading>
            End Position
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Disabled State</h5>
        <div>
          <Button icon={<SvgCheck />} size="sm" iconPosition="start" disabled>
            Start Loading
          </Button>
        </div>
        <div>
          <Button icon={<SvgCheck />} size="sm" iconPosition="start" disabled>
            End Position
          </Button>
        </div>
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const buttonIconSource = __SOURCE__;

/* DEMO_START */
function ButtonIconOnlyDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <h5>Sizes</h5>
        <Button
          iconOnly={true}
          title="Small size icon only button"
          icon={<SvgCode />}
          size="sm"
        />
        <Button
          iconOnly={true}
          title="Default size style icon only button"
          icon={<SvgCode />}
          size="default"
        />
        <Button
          iconOnly={true}
          title="Large size icon only button"
          icon={<SvgCode />}
          size="lg"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Active State</h5>
        <Button
          iconOnly={true}
          title="Default style icon only button"
          icon={<SvgCode />}
        />
        <Button
          iconOnly={true}
          title="Warning style icon only button"
          icon={<SvgCode />}
          variant="warning"
        />
        <Button
          iconOnly={true}
          title="Alert style icon only button"
          icon={<SvgCode />}
          variant="alert"
        />
        <Button
          iconOnly={true}
          title="Success style icon only button"
          icon={<SvgCode />}
          variant="success"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Disabled State</h5>
        <Button
          iconOnly={true}
          title="Disabled default style icon only button"
          icon={<SvgCode />}
          disabled
        />
        <Button
          iconOnly={true}
          title="Disabled warning style icon only button"
          icon={<SvgCode />}
          variant="warning"
          disabled
        />
        <Button
          iconOnly={true}
          title="Disabled alert style icon only button"
          icon={<SvgCode />}
          variant="alert"
          disabled
        />
        <Button
          iconOnly={true}
          title="Disabled success style icon only button"
          icon={<SvgCode />}
          variant="success"
          disabled
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Read-only State</h5>
        <Button
          iconOnly={true}
          title="Read-only default style icon only button"
          icon={<SvgCode />}
          readOnly
        />
        <Button
          iconOnly={true}
          title="Read-only warning style icon only button"
          icon={<SvgCode />}
          variant="warning"
          readOnly
        />
        <Button
          iconOnly={true}
          title="Read-only alert style icon only button"
          icon={<SvgCode />}
          variant="alert"
          readOnly
        />
        <Button
          iconOnly={true}
          title="Read-only success style icon only button"
          icon={<SvgCode />}
          variant="success"
          readOnly
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <h5>Loading State</h5>
        <Button
          iconOnly={true}
          title="Loading default style icon only button"
          icon={<SvgCode />}
          loading
        />
        <Button
          iconOnly={true}
          title="Loading warning style icon only button"
          icon={<SvgCode />}
          variant="warning"
          loading
        />
        <Button
          iconOnly={true}
          title="Loading alert style icon only button"
          icon={<SvgCode />}
          variant="alert"
          loading
        />
        <Button
          iconOnly={true}
          title="Loading success style icon only button"
          icon={<SvgCode />}
          variant="success"
          loading
        />
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const buttonIconOnlySource = __SOURCE__;

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
              <CardTitle>Text Link Variant</CardTitle>
              <CardDescription>
                When you semantically need a button, but want to style it like a
                text link.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonTextLinkVariantDemo />}
                source={buttonTextLinkVariantSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>
                Button sizes, do note that these sizes also change sizes
                depending on the browser breakpoint, which you can also see in
                action here if you change your current browser width.
              </CardDescription>
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
              <CardTitle>Corner Radius</CardTitle>
              <CardDescription>Button corner rounding radius.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonRoundedDemo />}
                source={buttonRoundedSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icons</CardTitle>
              <CardDescription>Button labels with icons.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonIconDemo />}
                source={buttonIconSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icon Only</CardTitle>
              <CardDescription>
                <p>Button that is only using an SVG icon with no text label.</p>
                <p>
                  When using buttons without a label, always remember to set the{" "}
                  <code>title</code> parameter so the label still appears on
                  mouse-over and screenreaders.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonIconOnlyDemo />}
                source={buttonIconOnlySource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
