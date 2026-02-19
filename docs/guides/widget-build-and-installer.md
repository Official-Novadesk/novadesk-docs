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
- `name`
- `version`
- `author`
- `description`
- `icon`
- `setup.installDir`
- `setup.startMenuFolder`
- `setup.setupName`
- `setup.setupIcon`

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

### setup.createDesktopShortcut

- **Type**: `boolean`
- **Default**: `true`
- **Required**: No
- **Description**: Creates a Desktop shortcut for the installed widget executable.

### setup.createStartupShortcut

- **Type**: `boolean`
- **Default**: `false`
- **Required**: No
- **Description**: Creates a shortcut in the user Startup folder.

### setup.runOnStartup

- **Type**: `boolean`
- **Default**: `false`
- **Required**: No
- **Description**: Also creates a Startup shortcut (same effective behavior as `createStartupShortcut`).

### setup.installDir

- **Type**: `string`
- **Default**: `"%ProgramFiles%\\Novadesk"`
- **Required**: Yes
- **Description**: Installation directory. Environment variables are expanded by installer stub.

### setup.startMenuFolder

- **Type**: `string`
- **Default**: `"Novadesk"`
- **Required**: Yes
- **Description**: Start Menu folder used for the shortcut.

### setup.setupName

- **Type**: `string`
- **Default**: `"setup"`
- **Required**: Yes
- **Description**: Installer output file name in `dist/`. `.exe` is appended if missing.

### setup.setupIcon

- **Type**: `string`
- **Default**: `""`
- **Required**: Yes
- **Description**: Path to installer icon (`.ico`) relative to widget root.

### setup.enableUninstall

- **Type**: `boolean`
- **Default**: `true`
- **Required**: No
- **Description**: Registers app in Windows uninstall registry and creates `Uninstall.exe`.

### setup.launchAfterInstall

- **Type**: `boolean`
- **Default**: `false`
- **Required**: No
- **Description**: Launches installed executable after successful installation.

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

### Complete `setup` Properties

All installer-related properties currently supported by `nwm`/`installer_stub`:



## Notes

- Unknown fields inside `setup` are ignored by current `nwm` and `installer_stub` code.
- `createStartupShortcut` and `runOnStartup` currently produce the same installer behavior (both create a Startup shortcut).
- `setupName` controls installer output name only; app display/install identity still comes from top-level `name`, `author`, `version`, and `description`.
