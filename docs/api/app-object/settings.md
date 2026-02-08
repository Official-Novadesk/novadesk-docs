
# Configuration Methods

Programmatically control Novadesk configuration via the app object.

Novadesk provides several methods to control global application behavior programmatically via the `app` object. These methods can be called at any time and their values are persisted to `settings.json` located in the application's AppData directory.

::: warning
Configuration methods are **only available in the Main script**. UI scripts cannot modify global application settings.
:::

## app.saveLogToFile(bool)

Enables or disables logging to a file (`logs.log`) in the application's AppData directory.

### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to enable file logging, `false` to disable.

### Example
```javascript
// Enable logging to file
app.saveLogToFile(true);
```

## app.enableDebugging(bool)

Sets the global log level. When enabled, debug-level messages will be visible in the console and log file.

### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to enable debug logging, `false` to use standard informational logging.

### Example
```javascript
app.enableDebugging(true);
console.debug("Detailed diagnostic information");
```

## app.disableLogging(bool)

Completely disables or enables all logging output (both console and file).

### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to silence all logs, `false` to resume logging based on other settings.

### Example
```javascript
// Silence all output for production
app.disableLogging(true);
```

## app.hideTrayIcon(bool)

Dynamically shows or hides the Novadesk icon in the system tray.

### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to hide the icon, `false` to show it.

### Example
```javascript
// Run in "stealth" mode
app.hideTrayIcon(true);
```

## app.useHardwareAcceleration(bool)

Enables or disables Direct2D hardware acceleration.

### Parameters

- **`bool`**
  - **Type**: `boolean`
  - **Description**: `true` to use hardware-accelerated rendering (Default), `false` to use software rendering.

::: info
Changing this setting requires an **application restart** to take effect.
:::

### Example
```javascript
// Enable hardware acceleration
app.useHardwareAcceleration(true);
```
