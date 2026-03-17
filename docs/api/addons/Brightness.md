---
title: Read brightness capability status with the brightness addon.
---

# Brightness Addon
Access display brightness capability status in Novadesk via the Brightness addon.

The `brightness` API is provided by the Brightness addon (not the `system` module).

```javascript
import { addon } from "novadesk";
const brightnessAddon = addon.load("path/to/Brightness.dll");
const { brightness } = brightnessAddon;
```

#### Table of Contents
[[toc]]

## `brightness.getValue()`

Returns brightness information.

### Return Value

- **Type**: `object`
- **Description**: Returns:
  - **`supported`** (`boolean`): Whether brightness control is available. Current implementation returns `false`.
  - **`current`** (`number`): Current raw brightness value. Current implementation returns `0`.
  - **`min`** (`number`): Minimum raw brightness value. Current implementation returns `0`.
  - **`max`** (`number`): Maximum raw brightness value. Current implementation returns `100`.
  - **`percent`** (`number`): Current brightness as a percentage.

## `brightness.setValue(options)`

Attempts to set brightness.

### Parameters

- **`options`**
  - **Type**: `object`
- **Description**: Options object supporting:
  - **`percent`** (`number`): Target brightness percentage.
  - **`display`** (`number`, optional): Display index.

### Return Value

- **Type**: `boolean`
- **Description**: Returns `true` on success.

## Example

```javascript
import { addon } from "novadesk";
const brightnessAddon = addon.load("path/to/Brightness.dll");
const { brightness } = brightnessAddon;

const info = brightness.getValue();
console.log("Brightness supported:", info.supported);
console.log("Range:", info.min, "-", info.max, "Current:", info.current);

const ok = brightness.setValue({ percent: 60 });
console.log("Set brightness:", ok);
```
