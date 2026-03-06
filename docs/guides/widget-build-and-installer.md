---
title: Widget Build And Installer
---

# Widget Build And Installer
How `nwm build` packages your widget and creates a self-contained installer.

#### Table of Contents
[[toc]]

## Build Command

Run from your widget project folder:

```bash
nwm build
```

## What `nwm build` Does

`nwm build` performs these steps:

1. Validates required `meta.json` fields.
2. Recreates `dist/` from scratch.
3. Copies `Novadesk.exe` into `dist/` and renames it to `<name>.exe`.
4. Copies your widget project into `dist/Widgets/` (excluding `dist/`).
5. Applies metadata and icon to `<name>.exe`.
6. Generates an installer executable in `dist/` using `installer_stub.exe`.

## Output Structure

Typical output:

<LiteTree>
- dist/
    YourWidgetName.exe
    setup.exe
    Widgets/
        index.js
        ui/
            script.ui.js
        assets/
            icon.ico
        meta.json
</LiteTree>

`setup.exe` name depends on `setup.setupName` in `meta.json`.

## Required `meta.json` Fields

`nwm build` fails if any of these are missing or empty:

Top-level:
- `name`
- `version`
- `author`
- `description`
- `icon`

`setup` object:
- `setup.installDir`
- `setup.startMenuFolder`
- `setup.setupName`
- `setup.setupIcon`

## `setup` Options

Supported installer options:

- `setup.createDesktopShortcut` (`boolean`, default `true`)
- `setup.createStartupShortcut` (`boolean`, default `false`)
- `setup.runOnStartup` (`boolean`, default `false`)
- `setup.installDir` (`string`, required)
- `setup.startMenuFolder` (`string`, required)
- `setup.setupName` (`string`, required)
- `setup.setupIcon` (`string`, required)
- `setup.enableUninstall` (`boolean`, default `true`)
- `setup.launchAfterInstall` (`boolean`, default `false`)

Example:

```json
{
  "setup": {
    "createDesktopShortcut": true,
    "createStartupShortcut": false,
    "runOnStartup": false,
    "installDir": "%ProgramFiles%\\MyWidget",
    "startMenuFolder": "MyWidget",
    "setupName": "MyWidgetSetup",
    "setupIcon": "assets/icon.ico",
    "enableUninstall": true,
    "launchAfterInstall": false
  }
}
```

## Installer Name Rules

- Installer output name comes from `setup.setupName`.
- If `.exe` is missing, `nwm` appends it automatically.

Examples:

- `setupName: "setup"` -> `dist/setup.exe`
- `setupName: "MyWidgetSetup"` -> `dist/MyWidgetSetup.exe`
- `setupName: "MyWidgetSetup.exe"` -> `dist/MyWidgetSetup.exe`

## Installer Stub Behavior

`nwm` uses `installer_stub.exe` as the base executable for the installer.

Lookup order:
1. Next to `nwm.exe`
2. Parent directory fallback
3. Fallback to `nwm.exe` (with warning) if stub is not found

## Install-Time Behavior

When the generated installer runs:

- Installs files to `setup.installDir` (environment variables are expanded).
- Creates Start Menu shortcut in `setup.startMenuFolder`.
- Optionally creates Desktop shortcut.
- Optionally creates Startup shortcut (`createStartupShortcut` or `runOnStartup`).
- Optionally creates `Uninstall.exe` and uninstall registry entry.

## Notes

- `icon` is used for the built app executable (`YourWidgetName.exe`).
- `setup.setupIcon` is used for the installer executable.
- Unknown extra keys in `setup` are ignored.
- `createStartupShortcut` and `runOnStartup` currently result in the same behavior (Startup shortcut creation).
- `launchAfterInstall` is carried in installer metadata but is not currently acted on by the installer runtime.
