import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../components/page-header";
import { MuiTypography } from "@/ui/elements/typography-mui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/layout/card";
import { DemoContainer } from "@/docs/components/demo-container";

export const Route = createFileRoute("/utility/typography")({
  component: TypographyPage,
});

const PARAGRAPH = (
  <p>
    Paragraph. Ut <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin{" "}
    <a href="#">content link</a> fermentum, quam libero hendrerit ipsum, ut{" "}
    <a href="#">Visited link</a> blandit <code>est tellus</code> sit amet
    turpis.
  </p>
);

const UNORDERED_LIST = (
  <ul>
    <li>
      In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
      <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
      mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
      aliquet. In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
      <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
      mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
      aliquet.
    </li>
    <li>
      Morbi eu <a href="#">content link</a> nulla lobortis, lobortis{" "}
      <a href="#">Visited link</a> est in, fringilla felis.
    </li>
    <li>
      Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.
      <ul>
        <li>
          In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
          <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
          mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
          aliquet. In fermentum leo eu lectus mollis, quis <b>venenatis</b>,
          nisl <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu
          lectus mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i>{" "}
          sollicitudin mi aliquet.
        </li>
        <li>
          Morbi eu <a href="#">content link</a> nulla lobortis, lobortis{" "}
          <a href="#">Visited link</a> est in, fringilla felis.
        </li>
      </ul>
      <ol>
        <li>
          In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
          <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
          mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
          aliquet. In fermentum leo eu lectus mollis, quis <b>venenatis</b>,
          nisl <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu
          lectus mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i>{" "}
          sollicitudin mi aliquet.
        </li>
        <li>
          Morbi eu <a href="#">content link</a> nulla lobortis, lobortis{" "}
          <a href="#">Visited link</a> est in, fringilla felis.
        </li>
      </ol>
    </li>
    <li>Ut non enim metus.</li>
  </ul>
);

const ORDERED_LIST = (
  <ol>
    <li>
      In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
      <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
      mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
      aliquet. In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
      <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
      mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
      aliquet.
    </li>
    <li>
      Morbi eu <a href="#">content link</a> nulla lobortis, lobortis{" "}
      <a href="#">Visited link</a> est in, fringilla felis.
    </li>
    <li>
      Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.
      <ul>
        <li>
          In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
          <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
          mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
          aliquet. In fermentum leo eu lectus mollis, quis <b>venenatis</b>,
          nisl <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu
          lectus mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i>{" "}
          sollicitudin mi aliquet.
        </li>
        <li>
          Morbi eu <a href="#">content link</a> nulla lobortis, lobortis{" "}
          <a href="#">Visited link</a> est in, fringilla felis.
        </li>
      </ul>
      <ol>
        <li>
          In fermentum leo eu lectus mollis, quis <b>venenatis</b>, nisl{" "}
          <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu lectus
          mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i> sollicitudin mi
          aliquet. In fermentum leo eu lectus mollis, quis <b>venenatis</b>,
          nisl <i>scelerisque</i> sollicitudin mi aliquet. In fermentum leo eu
          lectus mollis, quis <b>venenatis</b>, nisl <i>scelerisque</i>{" "}
          sollicitudin mi aliquet.
        </li>
        <li>
          Morbi eu <a href="#">content link</a> nulla lobortis, lobortis{" "}
          <a href="#">Visited link</a> est in, fringilla felis.
        </li>
      </ol>
    </li>
    <li>Ut non enim metus.</li>
  </ol>
);

/* DEMO_START */
function FontsDemo() {
  return (
    <div className="space-y-4">
      {/* FIRA SANS */}
      <div>
        <h3 className="heading-4 text-dev">Fira Sans</h3>

        <div className="flex flex-row">
          <div>
            <p className="m-2 p-3 font-light">Fira Sans Light</p>
            <p className="m-2 p-3 font-normal">Fira Sans Regular</p>
            <p className="m-2 p-3 font-medium">Fira Sans Medium</p>
            <p className="m-2 p-3 font-bold">Fira Sans Bold</p>
          </div>

          <div>
            <p className="m-2 p-3 font-light">
              <i>Fira Sans Light - Italic</i>
            </p>
            <p className="m-2 p-3 font-normal">
              <i>Fira Sans Regular - Italic</i>
            </p>
            <p className="m-2 p-3 font-medium">
              <i>Fira Sans Medium - Italic</i>
            </p>
            <p className="m-2 p-3 font-bold">
              <i>Fira Sans Bold - Italic</i>
            </p>
          </div>
        </div>
      </div>

      {/* POPPINS */}
      <div>
        <h3 className="heading-4 text-dev">Poppins</h3>

        <div className="flex flex-row">
          <div>
            <p className="m-2 p-3 font-poppins font-normal">Poppins Regular</p>
            <p className="m-2 p-3 font-poppins font-bold">Poppins Bold</p>
            <p className="m-2 p-3 font-poppins font-extrabold">
              Poppins Extra Bold
            </p>
          </div>

          <div>
            <p className="m-2 p-3 font-poppins font-normal">
              <i>Poppins Regular - Italic</i>
            </p>
            <p className="m-2 p-3 font-poppins font-bold">
              <i>Poppins Bold - Italic</i>
            </p>
            <p className="m-2 p-3 font-poppins font-extrabold">
              <i>Poppins Extra Bold - Italic</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const fontsSource = __SOURCE__;

/* DEMO_START */
function HeadingsDemo() {
  return (
    <div className="space-y-4">
      <h1 className="heading-1">Heading 1</h1>
      <h1 className="heading-gradient heading-1">
        Heading 1 with text gradient
      </h1>
      <h2 className="heading-2">Heading 2</h2>
      <h3 className="heading-3">Heading 3</h3>
      <h4 className="heading-4">Heading 4</h4>
      <h5 className="heading-5">Heading 5</h5>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const headingsSource = __SOURCE__;

/* DEMO_START */
function TextVariantsDemo() {
  return (
    <div className="space-y-4">
      <p className="type-large">Type Size Large</p>
      <p className="type-regular">Type Size Regular</p>
      <p className="type-meta">Type Size Meta</p>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const textVariantsSource = __SOURCE__;

/* DEMO_START */
function RichtextDemo() {
  return (
    <div>
      <h3 className="mb-4 heading-5 text-dev">Large size</h3>

      <div className="mb-8 rounded-sm border border-disabled-light p-4">
        {/* RICHTEXT - Large */}
        <div className="richtext type-large">
          {/* Text */}
          Large Body Text. Ut <b>venenatis</b>, nisl <i>scelerisque</i>{" "}
          sollicitudin <a href="#">content link</a> fermentum, quam libero
          hendrerit ipsum, ut <a href="#">Visited link</a> blandit est{" "}
          <code>tellus sit</code> amet turpis.
          {/* Paragraph */}
          {PARAGRAPH}
          {/* Unordered List */}
          {UNORDERED_LIST}
          {/* Ordered List */}
          {ORDERED_LIST}
        </div>
      </div>

      <h3 className="mb-4 heading-5 text-dev">Regular size</h3>

      <div className="mb-8 rounded-sm border border-disabled-light p-4">
        {/* RICHTEXT - Regular */}
        <div className="richtext type-regular">
          {/* Text */}
          Regular Body Text. Ut <b>venenatis</b>, nisl <i>scelerisque</i>{" "}
          sollicitudin <a href="#">content link</a> fermentum, quam libero
          hendrerit ipsum, ut <a href="#">Visited link</a> blandit est{" "}
          <code>tellus sit</code> amet turpis.
          {/* Paragraph */}
          {PARAGRAPH}
          {/* Unordered List */}
          {UNORDERED_LIST}
          {/* Ordered List */}
          {ORDERED_LIST}
        </div>
      </div>

      <h3 className="mb-4 heading-5 text-dev">Meta size</h3>
      <div className="mb-8 rounded-sm border border-disabled-light p-4">
        {/* RICHTEXT - Meta */}
        <div className="richtext type-meta">
          {/* Text */}
          Meta Body Text. Ut <b>venenatis</b>, nisl <i>scelerisque</i>{" "}
          sollicitudin <a href="#">content link</a> fermentum, quam libero
          hendrerit ipsum, ut <a href="#">Visited link</a> blandit est{" "}
          <code>tellus sit</code> amet turpis.
          {/* Paragraph */}
          {PARAGRAPH}
          {/* Unordered List */}
          {UNORDERED_LIST}
          {/* Ordered List */}
          {ORDERED_LIST}
        </div>
      </div>
    </div>
  );
}
/* DEMO_END */

const richtextSource = __SOURCE__;

/* DEMO_START */
function MuiSupportDemo() {
  return (
    <div className="space-y-2 border-l-2 border-muted pl-4">
      <MuiTypography variant="h1">Main Title (variant="h1")</MuiTypography>
      <MuiTypography variant="h2">Section Title (variant="h2")</MuiTypography>
      <MuiTypography variant="h3">H3 Title (variant="h3")</MuiTypography>
      <MuiTypography variant="h4">H4 Title (variant="h4")</MuiTypography>
      <MuiTypography variant="h5">H5 Title (variant="h5")</MuiTypography>
      <MuiTypography variant="h6">H6 Title (variant="h6")</MuiTypography>
      <MuiTypography variant="lead">
        Lead paragraph (variant="lead")
      </MuiTypography>
      <MuiTypography variant="large">
        Large paragraph (variant="large")
      </MuiTypography>
      <MuiTypography variant="body1">
        Regular paragraph (variant="body1")
      </MuiTypography>
      <MuiTypography variant="body2">
        Regular paragraph (variant="body2")
      </MuiTypography>
      <MuiTypography variant="p">Regular paragraph (variant="p")</MuiTypography>
      <MuiTypography variant="small">
        Small text (variant="small")
      </MuiTypography>
      <MuiTypography variant="muted">
        Muted text (variant="muted")
      </MuiTypography>
    </div>
  );
}
/* DEMO_END */

const muiSupportSource = __SOURCE__;

function TypographyPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Utility", href: "/utility" },
          { title: "Typography" },
        ]}
        pageHeading="Typography"
        pageSubheading="Typography utility classes for consistent text styling. Do remember, this styles do change according to breakpoints. So do note what breakpoint your browser is currently when viewing before deciding which to use."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fonts</CardTitle>
              <CardDescription>ANSTO official playbook fonts.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer demo={<FontsDemo />} source={fontsSource} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Headings</CardTitle>
              <CardDescription>Heading utility classes.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer demo={<HeadingsDemo />} source={headingsSource} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Variants</CardTitle>
              <CardDescription>
                Body text styles utility classes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<TextVariantsDemo />}
                source={textVariantsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Richtext Variants</CardTitle>
              <CardDescription>Richtext utility class.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer demo={<RichtextDemo />} source={richtextSource} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MUI-Support Components</CardTitle>
              <CardDescription>
                This component is purely for MUI support, as they tightly
                coupled html semantic tag with the styling. If you're not
                migrating from an old MUI UI, you shouldn't use this component,
                and should instead use the above utility classes as per
                Tailwindcss standards, which decouples styling from the semantic
                html tag.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<MuiSupportDemo />}
                source={muiSupportSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
