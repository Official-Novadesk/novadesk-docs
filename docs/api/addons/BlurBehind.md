---
title: Apply blur/acrylic and rounded corners with the BlurBehind addon.
---

# BlurBehind Addon

The BlurBehind addon applies Windows blur/acrylic effects and optional corner style to a target window handle (`HWND`).

#### Table of Contents
[[toc]]

## Quick Start

```javascript
import { addon, widgetWindow } from "novadesk";

const blurBehind = addon.load("./Addons/BlurBehind.dll");
const hwnd = widgetWindow.getHwnd();

const ok = blurBehind.apply(hwnd, "blurbehind", "round");
console.log("Blur applied:", ok);
```

## `apply(hwnd, type?, corner?)`

Applies blur/acrylic effect to a window and optionally sets corner preference.

### Parameters

- `hwnd` (`number | string`)
  - Target window handle.
  - Supports numeric handle, decimal string, or hex string (`0x...` or zero-padded hex).
- `type` (`string`, optional, default `"blurbehind"`)
  - Supported values:
    - `"blurbehind"`
    - `"acrylic"`
    - `"none"` or `"disabled"` (removes effect)
- `corner` (`string`, optional, default `"default"`)
  - Supported values:
    - `"default"`
    - `"round"`
    - `"roundsmall"`
    - `"none"` (disable rounded corners)

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the effect call succeeded; otherwise `false`.

### Errors

- Throws an error if `hwnd` is invalid.
- Throws an error when passing an object as the first argument (object config is not supported by current host API).

## `disable(hwnd)`

Removes blur/acrylic effect from a window.

### Parameters

- `hwnd` (`number | string`)

### Return Value

- **Type**: `boolean`
- **Description**: `true` if disable succeeded; otherwise `false`.

### Errors

- Throws an error if `hwnd` is invalid.

## `setCorner(hwnd, corner)`

Sets only the corner preference without changing blur/acrylic state.

### Parameters

- `hwnd` (`number | string`)
- `corner` (`string`)
  - `"default"`, `"round"`, `"roundsmall"`, `"none"`

### Return Value

- **Type**: `boolean`
- **Description**: `true` on success; otherwise `false`.

### Errors

- Throws an error if `hwnd` is invalid.

## Notes

- Corner styles depend on Windows version/compositor support.
- If the window handle is not valid or no longer exists, calls fail.

## Examples

### Acrylic + Small Rounded Corners

```javascript
import { addon, widgetWindow } from "novadesk";

const blurBehind = addon.load("./Addons/BlurBehind.dll");
const hwnd = widgetWindow.getHwnd();

blurBehind.apply(hwnd, "acrylic", "roundsmall");
```

### Disable Effect

```javascript
import { addon, widgetWindow } from "novadesk";

const blurBehind = addon.load("./Addons/BlurBehind.dll");
const hwnd = widgetWindow.getHwnd();

blurBehind.disable(hwnd);
```

