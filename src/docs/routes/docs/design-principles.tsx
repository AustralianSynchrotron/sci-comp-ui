import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/layout/card";

export const Route = createFileRoute("/docs/design-principles")({
  component: DesignPrinciplesPage,
});

function DesignPrinciplesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Design Principles" },
        ]}
        pageHeading="Design Principles"
        pageSubheading="Maintaining visual consistency and accessible quality in sci-comp-ui library"
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guiding Design Principles</CardTitle>
              <CardDescription>
                The reason for having <code>sci-comp-ui</code> is to ensure we
                have consistency across our interfaces, and quality reusable
                components fit for our use cases. Here are some guiding
                principles to help when designing new components or updating
                existing components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="richtext">
                <h3 className="heading-4 text-gradient-medium">
                  ANSTO Branding
                </h3>
                <p>
                  The ANSTO brand playbook doesn't currently provide much
                  support for web, so when we make decisions to add new theme
                  variables, these should try to compliment atop the official
                  ANSTO brand playbook when possible.
                </p>
                <p>
                  For this purpose, we use the ANSTO{" "}
                  <a href="/utility/typography">fonts</a> and{" "}
                  <a href="/utility/palette">colour palette</a>.
                </p>

                <h3 className="heading-4 text-gradient-medium">
                  Sychrotron Theme Keywords
                </h3>
                <p>
                  Sometimes it can still be hard to maintain consistency,
                  especially when creating a growing library over extended
                  periods of time, between many developers.
                </p>
                <p>
                  This is where having <b>theme keywords</b> can provide help.
                  This is particularly helpful for web interface interactions,
                  as they will easily help visual consistency in movement and
                  behaviour (i.e. hover/focus styles, animation duration and
                  speeds).
                </p>
                <p>
                  For <code>sci-comp-ui</code>, these following 3 keywords are a
                  northern star:
                </p>
                <ul>
                  <li>
                    (Light) Beam (i.e. an extending horizontal line, fast
                    movement speed)
                  </li>
                  <li>
                    (Light) Spectrum (i.e. colour gradients, fading animation)
                  </li>
                  <li>(ANSTO Logo) Angle (i.e. diagonal slopes)</li>
                </ul>

                <h3 className="heading-4 text-gradient-medium">
                  Important Use Case Considerations
                </h3>
                <p>
                  Having consistency in visual design not only helps users more
                  instantly recognise they are looking at an Australian
                  Synchrotron interface, it's also helps our users and staff
                  (might need to look at our interfaces for long periods of
                  time):
                </p>
                <ol>
                  <li>
                    <b>Decision fatigue</b> Most of our external users are
                    likely to be new users, consistent patterns significantly
                    help to decrease the learning curve and time figuring out
                    how to operate interfaces, and help users spend more of
                    their valuable alloted beam time on their experiment
                  </li>
                  <li>
                    <b>Visual fatigue</b> Users and staff are likely to be
                    looking at our interfaces for hours, amongst a sea of bright
                    monitors, with multiple browser windows open, including
                    other necessary applications/GUIs. Assess whether the
                    component will exaserpate eye strain (i.e. via too low
                    contrast or too high contrast, constant movement).
                  </li>
                  <li>
                    <b>Visual urgency</b> Be mindful of the real level of
                    attention required for a component or variant style. If
                    everything is eye-catching, nothing is eye-catching. Or
                    worse, something that does not require a visually flashing
                    level of urgency could distract users from something else
                    that is immediately urgent.
                  </li>
                  <li>
                    <b>Mental/physical fatigue</b> Similar to descision fatigue,
                    only this is post/mid-fatigue, where human errors are more
                    likely to occur. Help reduce mental load by making labels
                    and group related controls (and their error messages)
                    obviously, and make it hard to accidentally do
                    wrong/irreversible actions.
                  </li>
                  <li>
                    <b>Experienced users</b> Although most of our external users
                    may be new, some of them may become expert users, this also
                    includes staff. Where possible and safe to do so, provide
                    opportunities and options for these groups of users to
                    perform common actions quickly.
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Production Quality</CardTitle>
              <CardDescription>
                Ensure components are production quality. This means in addition
                to working without uncaught errors, they should be accessible,
                and adher to latest best web standards, such as W3C Web Content
                Accessibility Guidelines. (If a component is not ready or has
                not been checked to follow these yet, they can still be placed
                and exported under our "Experimental" components section.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="richtext">
                <h3 className="heading-4 text-gradient-medium">
                  Accessibility Checklist
                </h3>
                <ul>
                  <li>
                    Responsive breakpoints (at least from small portrait tablets
                    to 40" hutch monitors)
                  </li>
                  <li>Supports browser zooming</li>
                  <li>Keyboard-only and mouse-only control</li>
                  <li>Screen readers</li>
                  <li>Colour blindness contrasts</li>
                  <li>
                    Mobile dexterity (make things easy to trigger, but not easy
                    to accidentally trigger, and provide adequate spacing
                    between multiple triggerable components)
                  </li>
                  <li>
                    Language (avoid reliance on colloquialisms and if choosing
                    to use a symbol, ensure it has the same recognisable meaning
                    even for different cultures)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
