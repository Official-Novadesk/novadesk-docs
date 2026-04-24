---
title: Widget Build And Installer
---

# Widget Build And Installer
How `nwm build` currently packages your widget into installer and `.ndpkg` artifacts.

#### Table of Contents
[[toc]]

## Build Command

Run from your widget project folder:

```bash
nwm build
```

## What `nwm build` Does (Latest)

`nwm build` performs these steps:

1. Validates required `meta.json` fields.
2. Recreates `dist/` from scratch.
3. Creates temporary staging folders for installer and `.ndpkg` packaging.
4. Copies `Novadesk.exe` into staging and renames it to `<WidgetName>.exe`.
5. Copies requested addons into staging:
   - Installer staging gets all requested addons from `meta.json`.
   - `.ndpkg` staging excludes default built-in addons and keeps only non-default requested addons.
6. Copies widget files (excluding `dist/`) into staging.
7. Applies version/company/description/icon metadata to `<WidgetName>.exe`.
8. Builds a self-extracting setup executable using `installer_stub.exe`.
9. Creates a distributable ZIP package.
10. Creates a `.ndpkg` package with metadata and an NDPKG footer.

## Output Structure

Typical output:

<LiteTree>
- dist/
    YourWidgetName_v1.0.0.0.zip
    setup.exe
    YourWidgetName_v1.0.0.0.ndpkg
</LiteTree>

Notes:
- ZIP name is generated as `<SanitizedWidgetName>_v<SanitizedVersion>.zip`.
- `.ndpkg` name is generated as `<SanitizedWidgetName>_v<SanitizedVersion>.ndpkg`.
- Setup EXE name depends on `setup.setupName` in `meta.json`.

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

## `excludeItems` (Packaging Exclude List)

Use optional `excludeItems` in `meta.json` to skip files/folders from both installer and `.ndpkg` widget payload copies.

```json
{
  "excludeItems": [
    "node_modules",
    ".git",
    "dist",
    "scripts/dev-only.js",
    "assets/raw"
  ]
}
```

Rules:
- `excludeItems` must be an array of strings.
- Entries are relative paths/pattern-like path prefixes from widget root.
- `dist` is excluded by default during packaging.
- Invalid `excludeItems` types cause `nwm build` validation failure.

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

## Addons (Detailed)

Addons are controlled by the optional `addons` array in your widget `meta.json`.

Example:

```json
{
  "addons": ["InputBox", "NowPlaying", "CustomAddon.dll"]
}
```

### Addon Name Rules in `meta.json`

- Each `addons` entry must be a string.
- You can provide either:
  - DLL file name (for example `NowPlaying.dll`)
  - or stem name without extension (for example `NowPlaying`)
- Matching is case-insensitive.
- Duplicate references to the same DLL are deduplicated during packaging.
- If any requested addon cannot be found, `nwm build` fails.

### Where `nwm build` Reads Addons From

`nwm build` resolves addon source path from the Novadesk installation mode:

- Portable install: `<NovadeskExeDirectory>/Addons`
- Standard install: `%USERPROFILE%\\Documents\\Novadesk\\Addons`

If no `addons` are requested, addon copying is skipped.

### Setup EXE / ZIP Addon Inclusion

For setup/ZIP packaging, all requested addons are copied into staging `Addons/` and bundled into installer payload files.

That means the setup installer installs requested addons together with the widget package files.

### `.ndpkg` Addon Inclusion

For `.ndpkg` packaging, `nwm build` filters out default built-in addons and includes only non-default requested addons.

Default addon names treated as built-in include:
- `AppVolume` / `AppVolume.dll`
- `AudioLevel` / `AudioLevel.dll`
- `Brightness` / `Brightness.dll`
- `Hotkey` / `Hotkey.dll`
- `NowPlaying` / `NowPlaying.dll`

The included addon file names are written to `ndpkg.json`:

```json
{
  "addons": ["CustomAddon.dll"]
}
```

If no non-default addons remain after filtering, `.ndpkg` can still be valid with no addon files.

### Addons in `ndpkg_installer.exe`

When opening a package, `ndpkg_installer.exe`:

- Reads addon candidates from extracted `Addons/` files.
- Uses `ndpkg.json.addons` as a preferred order/filter signal.
- Shows addon rows with status:
  - `Add` (not currently installed)
  - `Replace` (installed and package version is same/older/unknown comparison result)
  - `Newer Version Found` (installed addon version is newer than package addon)
- Allows checkbox selection per addon before install.
- Copies only checked addons into target `Addons` directory using overwrite behavior.

### Addon Install Targets

Addon destination follows resolved install mode:
- Portable Novadesk: `<NovadeskFolder>/Addons`
- Standard Novadesk: `%USERPROFILE%\\Documents\\Novadesk\\Addons`

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

## `.ndpkg` Package Format

`nwm build` now also creates a widget package with `.ndpkg` extension.

Internally, `.ndpkg` is:
1. A ZIP payload containing widget package files.
2. A 16-byte footer appended at the end:
   - magic: `NDPKG1`
   - format version: `1`

The installer validates this footer before extraction.

### `.ndpkg` Contents

Typical package structure:

<LiteTree>
- YourWidgetName_v1.0.0.0.ndpkg
    (ZIP payload)
    ndpkg.json
    preview.png (optional, extension depends on source)
    Widgets/
        YourWidgetName/
            index.js
            meta.json
            ui/
            assets/
    Addons/ (optional)
        SomeAddon.dll
</LiteTree>

`ndpkg.json` is generated by `nwm build` and includes:
- `name` (string)
- `version` (string)
- `author` (string)
- `addons` (array of addon DLL names included in the package)

### `.ndpkg` Installer Behavior

`ndpkg_installer.exe`:
- Accepts `.ndpkg` path argument or opens a file picker.
- Validates the NDPKG footer and extracts payload.
- Requires `ndpkg.json` and `Widgets/` to exist in the package.
- Installs to:
  - Portable Novadesk: `<NovadeskFolder>/Widgets` and `<NovadeskFolder>/Addons`
  - Standard Novadesk: `%USERPROFILE%\\Documents\\Novadesk\\Widgets` and `...\\Addons`
- Shows included addons and allows checkbox-based addon install selection.
- Marks addon rows as Add/Replace/Newer Version Found based on installed DLL version info.

## Notes

- `icon` is used for the built app executable (`YourWidgetName.exe`).
- `setup.setupIcon` is used for the installer executable.
- Unknown extra keys in `setup` are ignored.
- `createStartupShortcut` and `runOnStartup` currently result in the same behavior (Startup shortcut creation).
- `launchAfterInstall` is carried in installer metadata but is not currently acted on by the installer runtime.
