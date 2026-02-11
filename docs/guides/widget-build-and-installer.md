# Widget Build And Installer

This guide explains how `nwm build` packages a widget and how the installer is created using `installer_stub.exe`.

## Build Overview

Run from your widget directory:

```bash
nwm build
```

`nwm build` performs these steps:
1. Validates `meta.json` fields (`name`, `version`, `author`, `description`, `icon`, and required `setup.*` values).
2. Creates a `dist/` folder.
3. Copies `Novadesk.exe` into `dist/` and renames it to your widget name.
4. Copies your widget files into `dist/Widgets/` (everything except `dist/`).
5. Applies metadata (name, author, description, version) to the executable.
6. Builds a self-contained installer using `installer_stub.exe`.

## Output Structure

<LiteTree>
- dist/
    YourWidgetName.exe
    Widgets/
        index.js
        ui/
            ui.js
        assets/
            icon.ico
</LiteTree>

## Installer Output

`nwm build` also produces a self-contained installer executable inside `dist/`. The installer file name is based on `setup.setupName` from `meta.json`.

Example:

<LiteTree>
- dist/
    setup.exe
</LiteTree>

More examples:

```json
// meta.json
setup: { setupName: "MyWidgetSetup" }
```

### Output
<LiteTree>
// output
- dist/
    MyWidgetSetup.exe
</LiteTree>

---

```json
// meta.json
setup: { setupName: "AcmePlayer" }
```

### Output
<LiteTree>
// output
- dist/
    AcmePlayer.exe
</LiteTree>

## Installer Stub Role

`installer_stub.exe` is a small installer executable built in the Novadesk core project. During `nwm build`, it is used as the base to create a self-contained installer for your widget.

If `installer_stub.exe` is not found next to `nwm.exe`, `nwm` falls back to `nwm.exe` so the build can still complete.

## Meta.json

`meta.json` defines your widget identity and installer behavior. `nwm build` reads this file and validates required fields before packaging.

Required fields:
- name
- version
- author
- description
- icon
- setup.installDir
- setup.startMenuFolder
- setup.setupName
- setup.setupIcon

### name

- **Type**: `string`
- **Description**: Display name for the widget. Used to name the built executable.

### version

- **Type**: `string`
- **Description**: Widget version (e.g., `1.0.0.0`). Written into the executable metadata.

### author

- **Type**: `string`
- **Description**: Author or publisher name. Written into the executable metadata.

### description

- **Type**: `string`
- **Description**: Short description of the widget. Written into the executable metadata.

### icon

- **Type**: `string`
- **Description**: Path to an `.ico` file within your widget project. Used for the built executable icon.

### setup.installDir

- **Type**: `string`
- **Description**: Default installation directory for the widget installer (e.g., `%ProgramFiles%\\YourWidget`).

### setup.startMenuFolder

- **Type**: `string`
- **Description**: Start Menu folder name created by the installer.

### setup.setupName

- **Type**: `string`
- **Description**: Base name used by the installer output.

### setup.setupIcon

- **Type**: `string`
- **Description**: Path to an `.ico` file used by the installer UI.

## Setup Options In `meta.json`

Installer behavior is driven by the `setup` object in `meta.json`.

```json
{
  "setup": {
    "createDesktopShortcut": true,
    "createStartupShortcut": false,
    "runOnStartup": false,
    "installDir": "%ProgramFiles%\\YourWidget",
    "startMenuFolder": "YourWidget",
    "setupName": "setup",
    "setupIcon": "assets/icon.ico",
    "enableUninstall": true,
    "launchAfterInstall": false
  }
}
```
