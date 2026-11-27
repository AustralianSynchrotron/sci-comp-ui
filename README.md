# Scientific Computing UI Component Library

## Usage

Import the components you want with:

```js
import { StepColumns, Button } from "@australiansynchrotron/sci-comp-ui";
```

See `src/ui/index.ts` for the full list of available components.

> #### Shadcn/ui Components
>
> So we don't have to style/create every component, and for use as convenient placeholders before customisation, we also export components from shadcn/ui.
>
> These can be imported from `@australiansynchrotron/sci-comp-ui/shadcn` subpath; see `src/shadcn.ts` for the full list of available components.
>
> ```js
> import { Button, Card, cn } from "@australiansynchrotron/sci-comp-ui/shadcn";
> ```
>
> Most are unaltered copies, so use the [shadcn/ui docs](https://ui.shadcn.com/docs/components). As we copied them at particular version though, official docs may show newer props or variants that ours don't have yet. Any component we've customised/extended have their own page on our docs site.

The class utility function `cn` is available from both.

### Styles

If you only need the export components, you can import the compiled stylesheet included with this package into your consumer UI's main `index.css` (or equivalent) file using:

```js
import "@australiansynchrotron/sci-comp-ui/styles";
```

This file includes all TailwindCSS classes and theme variables used by all components in this library.

However, it won't include any classes or variables that aren't already used by any exported components.

> For example, although `src/styles/theme.css` defines `--color-dev`, and [TailwindCSS has the utility class](https://tailwindcss.com/docs/theme#theme-variable-namespaces) `bg-<colour>`, if the specific class `bg-dev` has not been used by any exported components, it will not be available for use in your consumer UI.
>
> This is because TailwindCSS will tree shake upon build,generating and compiling only used classes and variables.

#### Accessing Full Theme

To have access to all style variables and TailwindCSS utility classes, you must reimport the theme and utility files into your consumer UI's main `index.css` (or equivalent) file.

You can use this template:

```css
/* Tailwind Base */

/* TODO: The following 4 lines is a workaround fix for this current tailwindcss v4 import issue: https://github.com/tailwindlabs/tailwindcss/discussions/18406

We have to manually import utilities, because the current default "@import 'tailwindcss'" allows "preflight.css" to take precedence over component layer styles.

This causes the styles precedence to become:
Other base layer -> Components layer -> Preflight base layer -> Utilities layer
When it should be:
All base layer -> Components layer -> Utilities layer

Keep an eye on that ticket, and we can hopefully replace the following 4 lines with "@import 'tailwindcss'" again when it's fixed. */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

/* Custom Font Faces Here */
/* @import '@path/to/your/custom-font-file.css; */

/* Sci Comp UI Base Themes Here */
@import "@australiansynchrotron/sci-comp-ui/styles";
@import "@australiansynchrotron/sci-comp-ui/theme/theme.css" layer(base);

/* Select User or Admin Theme Here */
@import "@australiansynchrotron/sci-comp-ui/theme/user.css" layer(base);
/* @import '@australiansynchrotron/sci-comp-ui/theme/admin.css' layer(base); */

/* Custom Themes Here */
/* @import '@path/to/your/theme.css' layer(base); */

/* Sci Comp UI Base Utilities Here */
@import "@australiansynchrotron/sci-comp-ui/theme/headings.css";
@import "@australiansynchrotron/sci-comp-ui/theme/type.css";
@import "@australiansynchrotron/sci-comp-ui/theme/layout.css";
@import "@australiansynchrotron/sci-comp-ui/theme/inputs.css";
@import "@australiansynchrotron/sci-comp-ui/theme/mixins.css";

/* Custom Utilities Here */
/* @import '@path/to/your/utilities.css'; */

/* Source to Consumer UI Files */
@source "./src/**/*.{js,ts,jsx,tsx}";
@source "../../../packages/monorepo-ui-library/lib/**/*.{js,ts,jsx,tsx}";

/* Additional Custom Global Styles Here */
@layer components {
  #root {
    display: flex;
    position: relative;
    flex-direction: column;
    min-height: 100vh;
  }
}
```

#### Overwriting Theme Variables

If you want to overwrite certain theme variables (not just extending), you can refer to `src/styles/admin.css` as a template for your custom `'@path/to/your/theme.css'`.

<!-- Either add the shadui/ui required CSS variables into your consumer UI's main `index.css` file, or  -->

## Development

To run the component demo/docs page (spins up page at `main.tsx`), install the dev dependencies, and run dev:

```bash
npm i
npm run dev:docs
```

#### Code Formatting

Formatting is handled by [Prettier](https://prettier.io/) and is enforced in two places.

Running `npm i` installs a `pre-commit` hook (via husky). On every commit, staged files are formatted automatically and re-staged, so you normally never have to think about it.

To format or check the whole repo manually:

```bash
npm run format        # format everything in place
npm run format:check  # report unformatted files without changing them
```

The `CI` workflow runs `npm run format:check` on every pull request and on pushes to `main`. If you bypass the hook with `git commit --no-verify`, CI will still catch it.

#### Local Package Publishing/Installation with `yalc`

Install `yalc` globally to your node package management, e.g.:

```bash
npm i yalc -g
```

Build the ui component package with `npm` generating the `./dist` folder:

```bash
npm run build
```

Use yalc for local deployment to a consumer frontend project (yalc simulates publish to package repository but does it locally with symlinks):

```bash
yalc publish
```

In your consumer frontend repo, use yalc to add the yalc package (this will point your `package.json` to the local yalc published package instead of the NPM published package):

```bash
yalc add @australiansynchrotron/sci-comp-ui
```

Update your node modules with your project package manager (`npm`, `pnpm`, `yarn`):

```bash
npm i
```

When you're done with local dev, remember to remove the local yalc package and use the publicly published package again in your consumer project:

```bash
npm remove @australiansynchrotron/sci-comp-ui
yalc remove @australiansynchrotron/sci-comp-ui
npm i @australiansynchrotron/sci-comp-ui
```

You can always verify which version of the package (local or deployed) in the consumer project with:

```bash
npm list -g --depth=0
```

#### Using with local docker compose

For your local yalc package to be built with docker compose, update your dev Dockerfile to copy across the yalc packages with:

```bash
# Make a .yalc directory wherever your dockerfile will run the package install command
RUN mkdir .yalc
COPY services/${PACKAGE_NAME}/.yalc .yalc

# RUN npm i (or your respective package install command should happen afterwards)
```

#### Clearing `node_module` Cache

As with most package managers, if you're iterating on a library locally, you can run into confusion when the consumer caches to aggressively.
To clear your cache:

In your consumer project, e.g. .../mex-web-ui:

```bash
cd /path/to/project/mex-web-ui
```

Remove the old yalc package

```bash
yalc remove @australiansynchrotron/sci-comp-ui
```

Clean any caches

```bash
rm -rf node_modules/.cache
rm -rf .yalc/@australiansynchrotronsci-comp-ui
```

Add the updated package

```bash
yalc add ../sci-comp-ui

# or
yalc add @australiansynchrotronsci-comp-ui
```

Reinstall dependencies to refresh everything

```bash
npm i
```

##### [A document for yalc and a consumer project with pnpm](./docs/yalc-with-pnpm-guide.md)

## Using Vite Plugins for Source Embedding

To make sure that docs are consistent and can embed derived information like source code references and version numbers, we use vite plugins that are effectively macro expansions.

### Justification

- **Build-time replacement** - Version is injected during build, not runtime
- **Type-safe** - Full TypeScript support with proper type definitions

## Implementation Details

- **File**: `src/vite-plugins/package-version-plugin.ts`
- **File**: `src/vite-plugins/embed-source-plugin.ts`
- **Types**: `src/types/global.d.ts`
- **Config**: `vite.config.ts`

### Version Embedding Usage

Use the `__PACKAGE_VERSION__` macro anywhere in your TypeScript/JavaScript files:

```tsx
import { Badge } from "./ui/badge";

export function AppVersion() {
  return <Badge>{__PACKAGE_VERSION__}</Badge>;
}
```

### Source Embedding Usage

Use the `__SOURCE__` macro to embed source code at build time. This is particularly useful for documentation components:

```tsx
import { Button } from "./ui/elements/button";
import { DemoContainer } from "./components/demo-container";

/* DEMO_START */
function ButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const buttonExampleSource = __SOURCE__;

export function ButtonDemo() {
  return (
    <DemoContainer demo={<ButtonExample />} source={buttonExampleSource} />
  );
}
```

The `__SOURCE__` macro will automatically extract the source code between `/* DEMO_START */` and `/* DEMO_END */` comments and replace the macro with the actual code string at build time.

### Configuration

The plugin is already configured in `vite.config.ts`. You can customise it with these options:

```typescript
packageVersionPlugin({
  macro: "__PACKAGE_VERSION__", // Custom macro name
  packageJsonPath: "./package.json", // Path to package.json
  includeVPrefix: true, // Whether to prefix with 'v'
});
```

## Known Issues

### `maplibre-gl` override

`plotly.js@4` depends on `maplibre-gl ^5.24.0`, and every 5.x release is vulnerable to [GHSA-jrc7-96c5-q579](https://github.com/advisories/GHSA-jrc7-96c5-q579) (critical, CVSS 10.0) — the fix landed in 6.4.1 and was never backported. `package.json` therefore overrides `maplibre-gl` to `^6.4.1`.

Remove the override once plotly.js depends on a patched version — check with `npm view plotly.js dependencies.maplibre-gl`; tracked upstream at [plotly/plotly.js#8031](https://github.com/plotly/plotly.js/issues/8031). Then reinstall and confirm `npm ls maplibre-gl` reports `>= 6.4.1` without the `overridden` marker.

Note the override applies to this repo only — npm honours `overrides` from the root project, so consumers are not covered by it.

## TODOs

- Add vitest for components (for custom ones, not necessary for shadui/ui ones)
