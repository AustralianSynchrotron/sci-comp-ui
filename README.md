# Scientific Computing UI Component Library

To run the component demo/docs page (spins up page at `main.tsx`), install the dev dependencies, and run dev:

```bash
npm i
npm run dev:docs
```

## Usage

Either add the Radix-UI required CSS variables into your consumer UI's main `index.css` file, or import the ones included with this package with:

```js
import '@australiansynchrotron/sci-comp-ui/styles';
```

Import the components you want:

```js
import { StepColumns } from '@australiansynchrotron/sci-comp-ui';
```

## Development

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
COPY services/acquisition-ui/.yalc .yalc

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
import { Badge } from './ui/badge';

export function AppVersion() {
    return <Badge>{__PACKAGE_VERSION__}</Badge>;
}
```

### Source Embedding Usage

Use the `__SOURCE__` macro to embed source code at build time. This is particularly useful for documentation components:

```tsx
import { Button } from './ui/elements/button';
import { DemoContainer } from './components/demo-container';

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
    return <DemoContainer demo={<ButtonExample />} source={buttonExampleSource} />;
}
```

The `__SOURCE__` macro will automatically extract the source code between `/* DEMO_START */` and `/* DEMO_END */` comments and replace the macro with the actual code string at build time.

### Configuration

The plugin is already configured in `vite.config.ts`. You can customise it with these options:

```typescript
packageVersionPlugin({
    macro: '__PACKAGE_VERSION__', // Custom macro name
    packageJsonPath: './package.json', // Path to package.json
    includeVPrefix: true, // Whether to prefix with 'v'
});
```
