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

- `enableDebugging` (`boolean`, default `false`): sets log level to Debug when `true`, Info when `false`.
- `disableLogging` (`boolean`, default `false`): when `true`, disables all logging outputs.
- `saveLogToFile` (`boolean`, default `false`): when `true`, writes `logs.log` alongside the settings file.
- `hideTrayIcon` (`boolean`, default `false`): hides the system tray icon when `true`.
- `useHardwareAcceleration` (`boolean`, default `true`): toggles Direct2D hardware acceleration. Requires restart to fully apply.

### Example

```json
{
  enableDebugging: false,
  disableLogging: false,
  saveLogToFile: true,
  hideTrayIcon: false,
  useHardwareAcceleration: true,
  widgets: {}
}
```

## Widget Entries

Widgets are stored under the `widgets` object keyed by widget ID. Each entry saves placement and behavior:

- `x`, `y` (`number`): screen position in pixels.
- `windowopacity` (`number`): opacity from 0?255.
- `zpos` (`string`): one of `normal`, `ondesktop`, `ontop`, `onbottom`, `ontopmost`.
- `draggable` (`boolean`)
- `clickthrough` (`boolean`)
- `keeponscreen` (`boolean`)
- `snapedges` (`boolean`)

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
- Tray visibility updates immediately when `hideTrayIcon` changes.
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
- `app.hideTrayIcon(bool)` ? toggles tray icon visibility.
- `app.useHardwareAcceleration(bool)` ? stores hardware acceleration preference.
