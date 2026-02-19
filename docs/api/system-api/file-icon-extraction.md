# File Icon Extraction

Extract and export file icons to `.ico` format using the system API.

::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc) if they need system access.
:::

## system.extractFileIcon(sourcePath, [outPath], [size])

Extracts the icon for a file/application and saves it as an `.ico` file.

### Parameters

- **`sourcePath`**
  - **Type**: `string`
  - **Required**: Yes
  - **Description**: Path to the source file (for example `.exe`, `.lnk`, or other file types with shell icons). Relative paths are resolved from the current script directory.

- **`outPath`**
  - **Type**: `string`
  - **Required**: No
  - **Description**: Output `.ico` file path. If omitted, Novadesk auto-generates a cached file under `%TEMP%\\Novadesk\\FileIcons\\`.

- **`size`**
  - **Type**: `number`
  - **Required**: No
  - **Default**: `48`
  - **Description**: Preferred icon size in pixels. Values above `256` are clamped to `256`.

### Return Value

- **Type**: `string | null`
- **Description**: Absolute path to the exported `.ico` file on success; `null` on failure.

## Notes

- If `outPath` is omitted, the output filename is deterministic (hashed from source path and size), so repeated calls reuse the same cache location.
- If `outPath` is relative, it is resolved against the current script directory.

## Examples

### Auto Cached Output
```javascript
var icoPath = system.extractFileIcon("C:\\Windows\\System32\\notepad.exe");
console.log("Extracted icon:", icoPath);
```

### Custom Output Path and Size
```javascript
var out = system.extractFileIcon(
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "./assets/chrome-icon.ico",
  64
);

if (out) {
  console.log("ICO exported to:", out);
}
```
