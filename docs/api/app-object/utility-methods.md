
# Utility Methods

General utility methods available on the app object.

::: warning
Utility methods are **available only in the Main script**.
:::

## app.exit()

**Description**: Exits the Novadesk application.

### Example
```javascript
// Exit the application
app.exit();
```

## app.refresh()

**Description**: Reloads all active widget scripts. This is useful for programmatically applying changes that require a full reload of the script environment.

### Example
```javascript
// Programmatically trigger a full refresh of all widgets
app.refresh();
```

## app.getProductVersion()

**Description**: Returns the product version of Novadesk (defined as `ProductVersion` in the executable metadata).

::: info
For standalone widget applications created with the `nwm` build tool, this value represents the version defined in the widget's `meta.json`.
:::

### Example
```javascript
// Get the current product version
const version = app.getProductVersion();
console.log("Product Version: " + version);
```

## app.getFileVersion()

**Description**: Returns the core file version of the executable (defined as `FileVersion` in the executable metadata).

::: info
For standalone widget applications created with the `nwm` build tool, this value represents the version defined in the widget's `meta.json`.
:::

### Example
```javascript
// Get the current file version
const fileVersion = app.getFileVersion();
console.log("File Version: " + fileVersion);
```

## app.getNovadeskVersion()

**Description**: Returns the original, hardcoded version of the Novadesk application. Unlike the metadata-based methods, this value is **never changed** by the `nwm` build tool.

### Example
```javascript
// Get the original Novadesk version
const novadeskVersion = app.getNovadeskVersion();
console.log("Original Novadesk Version: " + novadeskVersion);
```

## app.getAppDataPath()

**Description**: Returns the absolute path to the Novadesk AppData directory (`%APPDATA%\Novadesk\`). This directory is used for storing persistent settings, logs, and configuration.

### Example
```javascript
// Get the path to Novadesk AppData
const appData = app.getAppDataPath();
console.log("AppData Path: " + appData);
```

## app.getSettingsFilePath()

**Description**: Returns the absolute path to the `settings.json` file.

### Example
```javascript
// Get the settings file path
const settingsPath = app.getSettingsFilePath();
console.log("Settings Path: " + settingsPath);
```

## app.getLogPath()

**Description**: Returns the absolute path to the current log file (`logs.log`).

### Example
```javascript
// Get the log file path
const logPath = app.getLogPath();
console.log("Log Path: " + logPath);
```


