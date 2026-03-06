---
title: Control the Novadesk application via the app object
---

# app

The `app` object provides methods to control the Novadesk application: reloading scripts, exiting, managing the system tray, and querying version info.

`app` is exported from the `novadesk` module.

```javascript
import { app } from 'novadesk';
```
::: info Note
Available only in the [Main script](/guides/script-types.html#main-script-the-brain).
:::

#### Table of Contents
[[toc]]

## Lifecycle

### `app.reload()/app.refresh()`

Reloads all active widget scripts.

#### Example

```javascript
app.reload();
app.refresh();
```

### `app.exit()`

Exits the Novadesk application.

#### Example

```javascript
app.exit();
```

### `app.isFirstRun()`

**Description**: Returns `true` on the first launch when the settings file is missing or empty. Returns `false` on normal subsequent launches.

#### Example
```javascript
// Check whether this is the first run
const isFirstRun = app.isFirstRun();
console.log("Is First Run: " + isFirstRun);
```

## Tray

### `app.setTrayMenu(items)`

Sets the context menu for the system tray icon. Replaces any previously set menu.

#### Parameters

- **`items`** (`Array<object>`): Menu item definitions. Each object can include:
  - **`text`** (`string`): Label shown in the menu.
  - **`action`** (`function`): Callback invoked when the item is clicked.
  - **`type`** (`string`): Set to `"separator"` to insert a divider.
  - **`checked`** (`boolean`): Whether the item appears checked.
  - **`items`** (`Array<object>`): Nested sub-menu items.

#### Example

```javascript
app.setTrayMenu([
  { text: "Reload", action: () => app.reload() },
  { type: "separator" },
  {
    text: "Tools",
    items: [
      { text: "Debug Mode", checked: false, action: () => console.log("toggle") }
    ]
  },
  { type: "separator" },
  { text: "Exit", action: () => app.exit() }
]);
```

### `app.clearTrayMenu()`

Removes all custom tray menu items.

### `app.showDefaultTrayItems(show)`

Controls visibility of the built-in default tray entries (e.g. "Exit").

#### Parameters

- **`show`** (`boolean`): `true` to show default items, `false` to hide them.

#### Example

```javascript
app.showDefaultTrayItems(true);
```

### `app.hideTrayIcon(hide)`

Shows or hides the Novadesk system tray icon. The setting is persisted.

#### Parameters

- **`hide`** (`boolean`): `true` to hide the icon, `false` to show it.

#### Example

```javascript
app.hideTrayIcon(false);
```

## Settings

### `app.saveLogToFile(bool)`

Enables or disables logging to a file (`logs.log`) in the application's AppData directory.

#### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to enable file logging, `false` to disable.

#### Example
```javascript
// Enable logging to file
app.saveLogToFile(true);
```

### `app.enableDebugging(bool)`

Sets the global log level. When enabled, debug-level messages will be visible in the console and log file.

#### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to enable debug logging, `false` to use standard informational logging.

#### Example
```javascript
app.enableDebugging(true);
console.debug("Detailed diagnostic information");
```

### `app.disableLogging(bool)`

Completely disables or enables all logging output (both console and file).

#### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to silence all logs, `false` to resume logging based on other settings.

#### Example
```javascript
// Silence all output for production
app.disableLogging(true);
```

### `app.hideTrayIcon(bool)`

Dynamically shows or hides the Novadesk icon in the system tray.

#### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to hide the icon, `false` to show it.

#### Example
```javascript
// Run in "stealth" mode
app.hideTrayIcon(true);
```

### `app.useHardwareAcceleration(bool)`

Enables or disables Direct2D hardware acceleration.

#### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to use hardware-accelerated rendering (Default), `false` to use software rendering.

::: info Note
Changing this setting requires an **application restart** to take effect.
:::

#### Example
```javascript
// Enable hardware acceleration
app.useHardwareAcceleration(true);
```

## Utils

### `app.isPortable()`

**Description**: Returns `true` when Novadesk is running in portable mode, otherwise `false`.

::: info Note
Portable mode is detected at runtime based on the executable location and whether Novadesk can write in that directory.
:::

#### Example
```javascript
// Check whether Novadesk is running in portable mode
const isPortable = app.isPortable();
console.log("Is Portable: " + isPortable);
```

### `app.getProductVersion()`

Returns the product version from the executable metadata.

#### Return Value

- **Type**: `string`

::: info Note
Standalone widget applications built with `nwm` report the version from `meta.json`.
:::

#### Example

```javascript
console.log("Product version:", app.getProductVersion());
```

### `app.getFileVersion()`

Returns the file version from the executable metadata.

#### Return Value

- **Type**: `string`

::: info Note
Standalone widget applications built with `nwm` report the value from `meta.json`.
:::

#### Example

```javascript
console.log("File version:", app.getFileVersion());
```

### `app.getNovadeskVersion()`

Returns the hardcoded Novadesk engine version. This value is constant regardless of `nwm` packaging.

#### Return Value

- **Type**: `string`

#### Example

```javascript
console.log("Novadesk version:", app.getNovadeskVersion());
```
### `app.getAppDataPath()`

**Description**: Returns the absolute path to the Novadesk AppData directory (`%APPDATA%\Novadesk\`). This directory is used for storing persistent settings, logs, and configuration.

#### Example
```javascript
// Get the path to Novadesk AppData
const appData = app.getAppDataPath();
console.log("AppData Path: " + appData);
```

### `app.getSettingsFilePath()`

**Description**: Returns the absolute path to the `settings.json` file.

#### Example
```javascript
// Get the settings file path
const settingsPath = app.getSettingsFilePath();
console.log("Settings Path: " + settingsPath);
```

### `app.getLogPath()`

**Description**: Returns the absolute path to the current log file (`logs.log`).

#### Example
```javascript
// Get the log file path
const logPath = app.getLogPath();
console.log("Log Path: " + logPath);
```