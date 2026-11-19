import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/layout/card";
import { DemoContainer } from "@/docs/components/demo-container";

import { cn } from "@/lib/utils";

import { LoadingIcon } from "@/ui/elements/LoadingIcon";

import { SvgAbort } from "@/ui/svgs/Abort";
import { SvgAlert } from "@/ui/svgs/Alert";
import { SvgArrow } from "@/ui/svgs/Arrow";
import { SvgAssistWalker } from "@/ui/svgs/AssistWalker";
import { SvgAutoSetting } from "@/ui/svgs/AutoSetting";
import { SvgCake } from "@/ui/svgs/Cake";
import { SvgCapture } from "@/ui/svgs/Capture";
import { SvgCheck } from "@/ui/svgs/Check";
import { SvgCircleFilled } from "@/ui/svgs/CircleFilled";
import { SvgClose } from "@/ui/svgs/Close";
import { SvgCode } from "@/ui/svgs/Code";
import { SvgCurtainClose } from "@/ui/svgs/CurtainClose";
import { SvgCurtainOpen } from "@/ui/svgs/CurtainOpen";
import { SvgDelete } from "@/ui/svgs/Delete";
import { SvgDetector } from "@/ui/svgs/Detector";
import { SvgEdit } from "@/ui/svgs/Edit";
import { SvgExclaimation } from "@/ui/svgs/Exclaimation";
import { SvgFocus } from "@/ui/svgs/Focus";
import { SvgHamburger } from "@/ui/svgs/Hamburger";
import { SvgHamburgerClose } from "@/ui/svgs/HamburgerClose";
import { SvgHiking } from "@/ui/svgs/Hiking";
import { SvgKayak } from "@/ui/svgs/Kayak";
import { SvgLightDarkMode } from "@/ui/svgs/LightDarkMode";
import { SvgLock } from "@/ui/svgs/Lock";
import { SvgLogo } from "@/ui/svgs/Logo";
import { SvgMathFunction } from "@/ui/svgs/MathFunction";
import { SvgMinus } from "@/ui/svgs/Minus";
import { SvgMobius } from "@/ui/svgs/Mobius";
import { SvgNextLoop } from "@/ui/svgs/NextLoop";
import { SvgOpacity } from "@/ui/svgs/Opacity";
import { SvgPause } from "@/ui/svgs/Pause";
import { SvgPlay } from "@/ui/svgs/Play";
import { SvgPlus } from "@/ui/svgs/Plus";
import { SvgPointer } from "@/ui/svgs/Pointer";
import { SvgQuestion } from "@/ui/svgs/Question";
import { SvgRedo } from "@/ui/svgs/Redo";
import { SvgRefresh } from "@/ui/svgs/Refresh";
import { SvgReorder } from "@/ui/svgs/Reorder";
import { SvgRestore } from "@/ui/svgs/Restore";
import { SvgRotateMinus90 } from "@/ui/svgs/RotateMinus90";
import { SvgRotatePlus90 } from "@/ui/svgs/RotatePlus90";
import { SvgRunning } from "@/ui/svgs/Running";
import { SvgSave } from "@/ui/svgs/Save";
import { SvgSitting } from "@/ui/svgs/Sitting";
import { SvgStar } from "@/ui/svgs/Star";
import { SvgStop } from "@/ui/svgs/Stop";
import { SvgSubLoop } from "@/ui/svgs/SubLoop";
import { SvgSwimming } from "@/ui/svgs/Swimming";
import { SvgTired } from "@/ui/svgs/Tired";
import { SvgUndo } from "@/ui/svgs/Undo";
import { SvgUnlock } from "@/ui/svgs/Unlock";
import { SvgUpload } from "@/ui/svgs/Upload";
import { SvgVisibilityOff } from "@/ui/svgs/VisibilityOff";
import { SvgVisibilityOn } from "@/ui/svgs/VisibilityOn";
import { SvgWedge } from "@/ui/svgs/Wedge";
import { SvgWheelchair } from "@/ui/svgs/Wheelchair";
import { SvgZen } from "@/ui/svgs/Zen";
import { SvgZoomIn } from "@/ui/svgs/ZoomIn";
import { SvgZoomOut } from "@/ui/svgs/ZoomOut";

const SVG_LIST = [
  SvgAbort,
  SvgAlert,
  SvgArrow,
  SvgAssistWalker,
  SvgAutoSetting,
  SvgCake,
  SvgCapture,
  SvgCheck,
  SvgCircleFilled,
  SvgClose,
  SvgCode,
  SvgCurtainClose,
  SvgCurtainOpen,
  SvgDelete,
  SvgDetector,
  SvgEdit,
  SvgExclaimation,
  SvgFocus,
  SvgHamburger,
  SvgHamburgerClose,
  SvgHiking,
  SvgKayak,
  SvgLightDarkMode,
  SvgLock,
  SvgLogo,
  SvgMathFunction,
  SvgMinus,
  SvgMobius,
  SvgNextLoop,
  SvgOpacity,
  SvgPause,
  SvgPlay,
  SvgPlus,
  SvgPointer,
  SvgQuestion,
  SvgRedo,
  SvgRefresh,
  SvgReorder,
  SvgRestore,
  SvgRotateMinus90,
  SvgRotatePlus90,
  SvgRunning,
  SvgSave,
  SvgSitting,
  SvgStar,
  SvgStop,
  SvgSubLoop,
  SvgSwimming,
  SvgTired,
  SvgUndo,
  SvgUnlock,
  SvgUpload,
  SvgVisibilityOff,
  SvgVisibilityOn,
  SvgWedge,
  SvgWheelchair,
  SvgZen,
  SvgZoomIn,
  SvgZoomOut,
];

export const Route = createFileRoute("/elements/svgs")({
  component: SvgsPage,
});

/* DEMO_START */
function SvgsDefaultDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {SVG_LIST.map((svg) => (
          <div>
            {/* TODO: Add a tooltip or something here so people can easily find out the actual SVG component name */}
            {svg({
              className: "w-6 fill-dev",
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const svgsDefaultSource = __SOURCE__;

/* DEMO_START */
function SvgsLoadingDemo() {
  return (
    <div className="flex items-center gap-4">
      <LoadingIcon className="w-10" />
    </div>
  );
}
/* DEMO_END */

const svgsLoadingSource = __SOURCE__;

/* DEMO_START */
function SvgsSpecialCasesDemo() {
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);

  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-4">
      <div
        className={cn(
          burgerOpen ? "bg-primary" : "bg-background",
          "p-4 transition-colors"
        )}
      >
        <button
          type="button"
          className={cn(
            "h-8 min-h-8 w-8 min-w-8 text-white sm:h-6 sm:min-h-6 sm:w-6 sm:min-w-6",
            // The below classes are the same for both SVG toggles as they use the same class names for the same gradient transition
            "hover:[&_.transition--mid]:opacity-100 hover:[&_.transition--mid]:transition-[opacity] hover:[&_.transition--mid]:duration-(--duration-short) hover:[&_.transition--mid]:ease-in-out",
            "hover:[&_.transition--full]:opacity-100 hover:[&_.transition--full]:duration-(--duration-long) hover:[&_.transition--full]:ease-in-out",
            "hover:[&_.transition--mid]:opacity-0 hover:[&_.transition--mid]:duration-(--duration-long) hover:[&_.transition--mid]:ease-in-out",
            "hover:[&_.transition--full]:opacity-0 hover:[&_.transition--full]:duration-(--duration-short) hover:[&_.transition--full]:ease-in-out",
            "focus-visible:[&_.transition--mid]:opacity-100 focus-visible:[&_.transition--mid]:transition-[opacity] focus-visible:[&_.transition--mid]:duration-(--duration-short) focus-visible:[&_.transition--mid]:ease-in-out",
            "focus-visible:[&_.transition--full]:opacity-100 focus-visible:[&_.transition--full]:duration-(--duration-long) focus-visible:[&_.transition--full]:ease-in-out",
            "focus-visible:[&_.transition--mid]:opacity-0 focus-visible:[&_.transition--mid]:duration-(--duration-long) focus-visible:[&_.transition--mid]:ease-in-out",
            "focus-visible:[&_.transition--full]:opacity-0 focus-visible:[&_.transition--full]:duration-(--duration-short) focus-visible:[&_.transition--full]:ease-in-out"
          )}
          onClick={() => setBurgerOpen(!burgerOpen)}
          title="Toggle Main Menu"
          aria-expanded={burgerOpen}
        >
          {!burgerOpen && <SvgHamburger />}
          {burgerOpen && <SvgHamburgerClose />}
        </button>
      </div>

      <div className={cn("bg-primary p-4")}>
        <button
          type="button"
          className={cn(
            "h-8 min-h-8 w-8 min-w-8 text-white sm:h-6 sm:min-h-6 sm:w-6 sm:min-w-6",
            // The below classes are the same for both SVG toggles as they use the same class names for the same gradient transition
            "hover:[&_.transition--mid]:opacity-100 hover:[&_.transition--mid]:transition-[opacity] hover:[&_.transition--mid]:duration-(--duration-short) hover:[&_.transition--mid]:ease-in-out",
            "hover:[&_.transition--full]:opacity-100 hover:[&_.transition--full]:duration-(--duration-long) hover:[&_.transition--full]:ease-in-out",
            "hover:[&_.transition--mid]:opacity-0 hover:[&_.transition--mid]:duration-(--duration-long) hover:[&_.transition--mid]:ease-in-out",
            "hover:[&_.transition--full]:opacity-0 hover:[&_.transition--full]:duration-(--duration-short) hover:[&_.transition--full]:ease-in-out",
            "focus-visible:[&_.transition--mid]:opacity-100 focus-visible:[&_.transition--mid]:transition-[opacity] focus-visible:[&_.transition--mid]:duration-(--duration-short) focus-visible:[&_.transition--mid]:ease-in-out",
            "focus-visible:[&_.transition--full]:opacity-100 focus-visible:[&_.transition--full]:duration-(--duration-long) focus-visible:[&_.transition--full]:ease-in-out",
            "focus-visible:[&_.transition--mid]:opacity-0 focus-visible:[&_.transition--mid]:duration-(--duration-long) focus-visible:[&_.transition--mid]:ease-in-out",
            "focus-visible:[&_.transition--full]:opacity-0 focus-visible:[&_.transition--full]:duration-(--duration-short) focus-visible:[&_.transition--full]:ease-in-out"
          )}
          onClick={() => setDarkMode(!darkMode)}
          title={`Switch to ${darkMode ? "Light" : "Dark"} Mode`}
          aria-selected={darkMode}
        >
          <SvgLightDarkMode />
        </button>
      </div>
    </div>
  );
}
/* DEMO_END */

const svgsSpecialCasesSource = __SOURCE__;

function SvgsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Elements", href: "/elements" },
          { title: "SVG Icons" },
        ]}
        pageHeading="SVG Icons"
        pageSubheading="Properly configured SVG React components."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <div className="richtext">
            <p>All current SVGs available in the library.</p>
            <p>
              A mixture of{" "}
              <a
                href="https://mui.com/material-ui/material-icons/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MUI icons
              </a>{" "}
              (usually in <code>sharp</code> style), public use, and custom
              SVGs.
            </p>
            <p>
              Although we prefer to use MUI or public use icons where possible
              for consistency and convenience, all SVGs added here are always:
            </p>
            <ul>
              <li>
                Resized to properly fill the view box (either the height and/or
                width will actually fit to fill the view box)
              </li>
              <li>
                Have hardcoded <code>fill</code>, <code>height</code>,{" "}
                <code>width</code> removed (unless it's a special use case SVG
                icon, i.e. <code>SvgHamburger</code> or <code>SvgLogo</code>)
              </li>
              <li>Minified</li>
            </ul>
            <p>
              This makes it easier to use as a library component, and styled
              with tailwindcss classes.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>SVG Icons</CardTitle>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SvgsDefaultDemo />}
                source={svgsDefaultSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading Icon</CardTitle>
              <CardDescription>
                SVG loading icon using the ANSTO loading, animated purely with
                CSS keyframes. A motion-sickness friendly alternative to the
                usual spinners.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SvgsLoadingDemo />}
                source={svgsLoadingSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Case Icons</CardTitle>
              <CardDescription>
                <p>
                  In addition to the <code>LoadingIcon</code>, there are a few
                  SVGs that have been crafted for specific use cases, and
                  therefore have hardcoded <code>id</code>,{" "}
                  <code>class names</code> and/or <code>styles</code> within
                  component.
                </p>
                <p>
                  Click the <code>SvgHamburger</code> icon to see the{" "}
                  <code>SvgHamburgerClose</code> icon (which looks the same as
                  the <code>SvgClose</code> icon, the only difference is the
                  hamburger one has been altered to support the special gradient
                  transition).
                </p>
                <p>
                  The <code>SvgLightDarkMode</code> icon example doesn't change,
                  it just has a hover/focus transition.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SvgsSpecialCasesDemo />}
                source={svgsSpecialCasesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
