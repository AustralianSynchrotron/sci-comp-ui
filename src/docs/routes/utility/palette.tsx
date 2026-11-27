import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/layout/card";
import { DemoContainer } from "@/docs/components/demo-container";

export const Route = createFileRoute("/utility/palette")({
  component: PalettePage,
});

/* DEMO_START */
function PaletteAnstoDemo() {
  return (
    <div className="flex flex-row flex-wrap">
      <p className="m-2 bg-ansto-grey p-3 text-white">ANSTO Grey #58595b</p>
      <p className="m-2 bg-ansto-flag p-3 text-white">ANSTO Flag #1a3869</p>
      <p className="m-2 bg-ansto-blue p-3 text-white">ANSTO Blue #0076c0</p>
      <p className="m-2 bg-ansto-seafoam p-3 text-white">
        ANSTO Seafoam #41c0c0
      </p>
      <p className="m-2 bg-ansto-yellow p-3 text-white">ANSTO Yellow #fcb13e</p>
      <p className="m-2 bg-ansto-purple p-3 text-white">ANSTO Purple #6c4780</p>
      <p className="m-2 bg-ansto-green p-3 text-white">ANSTO Green #007a3d</p>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const paletteAnstoSource = __SOURCE__;

/* DEMO_START */
function PaletteSupportDemo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row flex-wrap">
        <p className="m-2 bg-white p-3 text-text">White #ffffff</p>
        <p className="m-2 bg-black p-3 text-white">Black #1a1a1a</p>
        <p className="m-2 bg-grey p-3 text-white">Grey (ANSTO Grey)</p>
        <p className="m-2 bg-grey/1 p-3 text-text">Background (Grey 1%)</p>
        <p className="m-2 bg-text p-3 text-white">Text #212121</p>
        <p className="m-2 bg-dev p-3 text-white">Dev #ff3366</p>
      </div>

      <div className="flex flex-row flex-wrap">
        <p className="m-2 bg-success-light p-3 text-white">
          Success Light (Green 15%)
        </p>
        <p className="m-2 bg-success p-3 text-white">Success (Green)</p>
        <p className="m-2 bg-success-dark p-3 text-white">
          Success Dark #005c21
        </p>
      </div>

      <div className="flex flex-row flex-wrap">
        <p className="m-2 bg-warning/15 p-3 text-text">
          Warning Light (Yellow 15%)
        </p>
        <p className="m-2 bg-warning p-3 text-white">Warning (Yellow)</p>
        <p className="m-2 bg-warning-dark p-3 text-white">
          Warning Dark #e88e04
        </p>
      </div>

      <div className="flex flex-row flex-wrap">
        <p className="m-2 bg-alert/15 p-3 text-text">Alert Light (Alert 15%)</p>
        <p className="m-2 bg-alert p-3 text-white">Alert #e53935</p>
        <p className="m-2 bg-alert-dark p-3 text-white">Alert Dark #b71c1c</p>
      </div>

      <div className="flex flex-row flex-wrap">
        <p className="m-2 bg-disabled-light p-3 text-text">
          Disabled Light (Grey 30%)
        </p>
        <p className="m-2 bg-disabled-medium p-3 text-white">
          Disabled (Grey 70%)
        </p>
        <p className="m-2 bg-disabled-dark p-3 text-white">
          Disabled Dark (Grey)
        </p>
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const paletteSupportSource = __SOURCE__;

/* DEMO_START */
function PaletteThemesDemo() {
  return (
    <div className="space-y-4">
      <h3 className="heading-4">User Theme</h3>

      <div className="flex flex-row flex-wrap">
        <p className="m-2 bg-user-light p-3 text-white">
          Gradient-light (Seafoam)
        </p>
        <p className="m-2 bg-user-medium p-3 text-white">
          Gradient-medium (Blue)
        </p>
        <p className="m-2 bg-user-dark p-3 text-white">Gradient-dark (Flag)</p>
      </div>

      <h3 className="heading-4">Admin Theme</h3>

      <div className="flex flex-row flex-wrap">
        <p className="m-2 bg-admin-light p-3 text-white">
          Gradient-light Jacarta #3a2a56
        </p>
        <p className="m-2 bg-admin-medium p-3 text-white">
          Gradient-medium (Purple)
        </p>
        <p className="m-2 bg-admin-dark p-3 text-white">
          Gradient-dark Akebi #9536a5
        </p>
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const paletteThemesSource = __SOURCE__;

function PalettePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Utility", href: "/utility" },
          { title: "Palette" },
        ]}
        pageHeading="Palette"
        pageSubheading="In addition to the existing TailwindCSS palette. This library's theme also adds the ANSTO official palette, and a complimentary palette that supports the currently missing web palette from the official playbook. These additional palettes can be used together with TailwindCSS utility classes."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Official ANSTO Palette</CardTitle>
              <CardDescription>
                ANSTO official playbook palette.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<PaletteAnstoDemo />}
                source={paletteAnstoSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Palette</CardTitle>
              <CardDescription>
                Web support palette (we can replace this if the official ANSTO
                playbook is updated with a web palette). For now, we re-use and
                derive from the ANSTO palette where possible, so it will
                compliment the official ANSTO branding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<PaletteSupportDemo />}
                source={paletteSupportSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Palettes</CardTitle>
              <CardDescription>
                To make it immediately visually apparent what level of access or
                target user group a UI is for, we use a <code>gradient</code>{" "}
                CSS variable that can be overwritten/set by the consumer UI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<PaletteThemesDemo />}
                source={paletteThemesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
