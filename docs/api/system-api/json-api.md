
# JSON API

JSON file operations in the Novadesk JavaScript API.

::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc) if they need system data.
:::

## system.readJson(path)

Reads and parses a JSON file.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Path to the JSON file. Can be absolute or relative to the widget script.

### Return Value

- **Type**: `Object | null`
- **Description**: Returns the parsed JavaScript object if successful. Returns `null` if the file could not be read or parsed.

## Example

:::tabs
== index.js
```javascript
var config = system.readJson("config.json");

if (config) {
    console.log("Loaded configuration");
    console.log("Debug:", config.settings.debug);
    console.log("Background:", config.background);
    console.log("Opacity:", config.opacity);
} else {
    console.log("Failed to load configuration");
}
```
== config.json
```json
{
    "settings": {
        "debug": true
    },
    "background": "dark_blue",
    "opacity": 0.8
}
```
:::

**Output**
```text
[TimeStamp] [Novadesk] [LOG] Loaded configuration
[TimeStamp] [Novadesk] [LOG] Debug: true
[TimeStamp] [Novadesk] [LOG] Background: dark_blue
[TimeStamp] [Novadesk] [LOG] Opacity: 0.8
```

## system.writeJson(path, data)

Writes a JavaScript object to a JSON file.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Path to the JSON file. Can be absolute or relative.

- **`data`**
  - **Type**: `Object`
  - **Description**: The JavaScript object to serialize and write to the file.

### Return Value

- **Type**: `boolean`
- **Description**: Returns `true` if the file was written successfully. Returns `false` if the operation fails.

## Examples

### 1. Writing a New File

```javascript
// index.js
var settings = {
    theme: "dark",
    volume: 80,
    lastRun: new Date().toString()
};

if (system.writeJson("settings.json", settings)) {
    console.log("Settings saved successfully");
} else {
    console.log("Failed to save settings");
}
```

### 2. Updating a Single Value

```javascript
// index.js
// 1. Read existing config
var config = system.readJson("config.json");

if (config) {
    // 2. Modify the value
    config.opacity = 0.8;

    // 3. Write it back
    if (system.writeJson("config.json", config)) {
        console.log("Config updated successfully");
    }
}
```

