
# Registry API

Access Windows Registry values in Novadesk.

::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc) if they need system data.
:::

The Registry API provides methods to read and write Windows Registry keys.

## system.readRegistry(path, valueName)

Reads a value from the Windows Registry.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Full path to the registry key. Must start with a root key: `HKCU`, `HKLM`, `HKCR`, or `HKU`.
    - Example: `HKCU\Software\Novadesk`

- **`valueName`**
  - **Type**: `string`
  - **Description**: The name of the value to read. Use an empty string for the (Default) value.

### Return Value

- **Type**: `string | number | null`
- **Description**: Returns the value data if successful. Supports `REG_SZ`, `REG_EXPAND_SZ`, and `REG_DWORD`. Returns `null` if the key or value does not exist.

## system.writeRegistry(path, valueName, data)

Writes a value to the Windows Registry. Creates the key if it doesn't exist.

### Parameters

- **`path`**, **`valueName`**
  - Same as `readRegistry`.

- **`data`**
  - **Type**: `string | number`
  - **Description**: Data to write. Strings are written as `REG_SZ`, numbers as `REG_DWORD`.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if successful.

## Examples

```javascript
// Read a value
var theme = system.readRegistry("HKCU\Software\Novadesk", "Theme");
if (theme) {
    console.log("Current Theme: " + theme);
}

// Write a value
system.writeRegistry("HKCU\Software\Novadesk", "LastRun", new Date().toString());
```

