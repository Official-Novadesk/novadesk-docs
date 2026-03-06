---
title: Extract file icons to ICO files with the fileIcon module.
---

# fileIcon Module
Extract a file's icon and save it as an `.ico` file in Novadesk.

The `fileIcon` module is exported from the `system` module.

```javascript
import { fileIcon } from "system";
```

#### Table of Contents
[[toc]]

## `fileIcon.extractIcon(filePath, outIcoPath, [size])`

Extracts an icon from a file and writes it to an `.ico` file.

### Parameters

- **`filePath`**
  - **Type**: `string`
  - **Description**: Source file path (for example, an `.exe`, `.dll`, or other file with an associated icon).

- **`outIcoPath`**
  - **Type**: `string`
  - **Description**: Output `.ico` file path.

- **`size`**
  - **Type**: `number`
  - **Required**: No
  - **Default**: `48`
  - **Description**: Preferred icon size in pixels.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if icon extraction succeeded; otherwise `false`.

## `fileIcon.extractFileIcon(filePath, outIcoPath, [size])`

Alias of `fileIcon.extractIcon(filePath, outIcoPath, [size])`.

### Return Value

- **Type**: `boolean`
- **Description**: Same as `extractIcon()`.

## Example

```javascript
import { fileIcon } from "system";

const ok = fileIcon.extractIcon(
    "C:\\Windows\\System32\\notepad.exe",
    "C:\\Temp\\notepad.ico",
    48
);

console.log("Icon extracted:", ok);
```
