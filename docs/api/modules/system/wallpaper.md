---
title: Set and read desktop wallpaper with the wallpaper module.
---

# wallpaper Module
Set the desktop wallpaper and read the current wallpaper path.

The `wallpaper` module is exported from the `system` module.

```javascript
import { wallpaper } from "system";
```

#### Table of Contents
[[toc]]

## `wallpaper.set(path, [style])`

Sets desktop wallpaper.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Image file path.

- **`style`**
  - **Type**: `string`
  - **Required**: No
  - **Default**: `"fill"`
  - **Description**: Wallpaper style. Supported values include:
    - `"fill"`
    - `"fit"`
    - `"stretch"`
    - `"tile"`
    - `"center"`
    - `"span"`

### Return Value

- **Type**: `boolean`
- **Description**: `true` if wallpaper was updated; otherwise `false`.

## `wallpaper.getCurrentPath()`

Gets the current wallpaper image path.

### Return Value

- **Type**: `string`
- **Description**: Current wallpaper path, or empty string (`""`) if unavailable.

## Example

```javascript
import { wallpaper } from "system";

const setOk = wallpaper.set("C:\\Wallpapers\\my-wallpaper.jpg", "fill");
console.log("set:", setOk);

const current = wallpaper.getCurrentPath();
console.log("current wallpaper:", current);
```
