---
title: Settings File
---

# Settings File

Novadesk stores persistent configuration in a single JSON file called `settings.json`. This guide explains where the file lives, its structure, and how to edit it safely.

#### Table of Contents
[[toc]]

## Location

The location depends on the runtime mode:

- **Standard mode**: %APPDATA%\Novadesk\settings.json
- **Portable mode**: next to Novadesk.exe in the same folder

::: tip
You can retrieve the exact path at runtime via `app.getSettingsFilePath()`.
:::
## Creation And First Run

On first launch, Novadesk creates `settings.json` with minimal defaults. If the file is missing or empty, Novadesk treats the run as first-launch, initializes defaults, and saves the file after settings change.

## Global Settings

Global keys live at the root of the JSON object. Current built-in keys:

<PropertyBox name="enableDebugging" type="boolean" defaultValue="false">
  Sets log level to Debug when <code>true</code>, Info when <code>false</code>.
</PropertyBox>

<PropertyBox name="disableLogging" type="boolean" defaultValue="false">
  When <code>true</code>, disables all logging outputs.
</PropertyBox>

<PropertyBox name="saveLogToFile" type="boolean" defaultValue="false">
  When <code>true</code>, writes <code>logs.log</code> alongside the settings file.
</PropertyBox>

<PropertyBox name="useHardwareAcceleration" type="boolean" defaultValue="true">
  Toggles Direct2D hardware acceleration. Requires restart to fully apply.
</PropertyBox>

### Example

```json
{
  enableDebugging: false,
  disableLogging: false,
  saveLogToFile: true,
  useHardwareAcceleration: true,
  widgets: {}
}
```

## Widget Entries

Widgets are stored under the `widgets` object keyed by widget ID. Each entry saves placement and behavior:

<PropertyBox name="x, y" type="number">
  Screen position in pixels.
</PropertyBox>

<PropertyBox name="windowopacity" type="number">
  Opacity from 0-255.
</PropertyBox>

<PropertyBox name="zpos" type="string">
  One of <code>normal</code>, <code>ondesktop</code>, <code>ontop</code>, <code>onbottom</code>, <code>ontopmost</code>.
</PropertyBox>

<PropertyBox name="draggable" type="boolean">
  Determines if the widget is draggable.
</PropertyBox>

<PropertyBox name="clickthrough" type="boolean">
  Determines if mouse clicks pass through the widget.
</PropertyBox>

<PropertyBox name="keeponscreen" type="boolean">
  Determines if the widget should be kept within screen boundaries.
</PropertyBox>

<PropertyBox name="snapedges" type="boolean">
  Determines if the widget snaps to screen edges.
</PropertyBox>

Example widget block:

```json
widgets: {
  clock: {
    x: 120,
    y: 80,
    windowopacity: 255,
    zpos: ontop,
    draggable: true,
    clickthrough: false,
    keeponscreen: true,
    snapedges: true
  }
}
```

## How Novadesk Applies Settings

- Settings are loaded on startup. If parsing fails, Novadesk resets to defaults and rewrites the file when changes occur.
- Logging settings are applied immediately (console and optional file logging).
- Hardware acceleration changes are stored but require an application restart.

## Editing Safely

1. Close Novadesk or ensure it won?t overwrite changes while you edit.
2. Keep valid JSON (no trailing commas). If Novadesk cannot parse the file, it falls back to defaults.
3. Prefer modifying values via scripts using the `app` module (e.g., `app.saveLogToFile(true)`) to avoid syntax mistakes.

## Related APIs

- `app.getSettingsFilePath()` ? returns the absolute path to `settings.json`.
- `app.isFirstRun()` ? true when settings are missing or empty on launch.
- `app.enableDebugging(bool)` ? toggles debug log level.
- `app.disableLogging(bool)` ? silences or resumes logging.
- `app.saveLogToFile(bool)` ? enables file logging.
- `app.useHardwareAcceleration(bool)` ? stores hardware acceleration preference.
