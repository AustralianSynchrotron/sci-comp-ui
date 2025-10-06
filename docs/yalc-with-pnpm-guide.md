# Local Testing with Yalc

This guide explains how to test the `@australiansynchrotron/sci-comp-ui` package locally using [yalc](https://github.com/wclr/yalc) without publishing to the npm registry.

## Prerequisites

- yalc installed globally: `npm install -g yalc`
- Both projects cloned locally:
  - Package source: `/home/user/apps/sci-comp-ui`
  - Consumer project: `/home/user/apps/xas-web-ui`
   - (in this example, xas-web-ui uses pnpm)

## Step-by-Step Guide

### Step 1: Prepare the Package (sci-comp-ui)

Navigate to the package source directory and build it:

```bash
cd /home/user/apps/sci-comp-ui
npm run build
```

Publish the package to your local yalc store:

```bash
yalc publish
```

This creates a local version of the package that can be linked to other projects.

### Step 2: Link Package in Consumer Project (xas-web-ui)

Navigate to the consumer project:

```bash
cd /home/user/apps/xas-web-ui
```

Add the package from yalc:

```bash
yalc add @australiansynchrotron/sci-comp-ui
```

This will:
- Create a `.yalc` folder in your project
- Update `package.json` to point to the local version
- Update `yalc.lock` file

Install dependencies to ensure everything is linked properly:

```bash
pnpm install
```

### Step 3: Development Workflow

When making changes to the sci-comp-ui package:

1. **In the package directory** (`/home/user/apps/sci-comp-ui`):
   ```bash
   npm run build
   yalc push
   ```

2. **In the consumer project** (`/home/user/apps/xas-web-ui`):
   - Changes are automatically reflected after `yalc push`
   - You may need to restart your dev server if hot reload doesn't pick up the changes

### Step 4: Advanced Options

#### Watch Mode

For automatic updates when files change in sci-comp-ui:

```bash
# Install nodemon if not already installed
npm install -g nodemon

# Watch and rebuild automatically
nodemon --watch src --ext ts,tsx,css,json --exec "npm run build && yalc push"
```

#### Force Update

If changes aren't reflecting:
```bash
# In consumer project
yalc update
pnpm install
```

### Step 5: Cleanup

When you're done testing and want to restore the npm registry version:

1. Remove the yalc link:
   ```bash
   cd /home/user/apps/xas-web-ui
   yalc remove @australiansynchrotron/sci-comp-ui
   ```

2. Restore the original package:
   ```bash
   pnpm install
   ```

This will restore the package.json to use the npm registry version.

## Troubleshooting

### Changes not reflecting

1. Ensure the package is built: `npm run build` in sci-comp-ui
2. Push changes: `yalc push` in sci-comp-ui
3. Update in consumer: `yalc update` in xas-web-ui
4. Reinstall npm packages: `pnpm install` (or remove all packages and reinstall them `rm -rf node_modules`)
5. Restart dev server if needed

### Version conflicts

If you encounter version conflicts:
```bash
yalc remove --all
yalc add @australiansynchrotron/sci-comp-ui --pure
```

### Clean yalc cache

To completely clean yalc installations:
```bash
# Remove from project
yalc remove --all

# Clean global yalc store (use with caution)
yalc installations clean
```

## Current Status

As of the last check:
- yalc is already linked (see `yalc.lock` and `package.json`)
- The package.json shows: `"@australiansynchrotron/sci-comp-ui": "file:.yalc/@australiansynchrotron/sci-comp-ui"`
- This indicates the local version is currently being used

## Benefits of Using Yalc

1. **No npm publishing required**: Test changes without polluting the npm registry
2. **Immediate feedback**: See changes instantly in your consumer project
3. **Version preservation**: Original package.json version is remembered
4. **Multiple projects**: Can link the same package to multiple projects
5. **Clean removal**: Easy to revert to npm registry version

## Common Commands Reference

| Command | Description |
|---------|-------------|
| `yalc publish` | Publish package to local yalc store |
| `yalc push` | Update package in all linked projects |
| `yalc add <package>` | Add package to current project |
| `yalc remove <package>` | Remove package from current project |
| `yalc update` | Update linked packages to latest |
| `yalc installations show` | Show all yalc installations |