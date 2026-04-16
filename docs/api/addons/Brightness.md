---
title: Read and set display brightness with the Brightness addon.
---

# Brightness Addon

The Brightness addon reads and sets display brightness on supported systems. Use it for sliders, hotkeys, or automatic brightness widgets.


#### Table of Contents
[[toc]]

## Quick Start

Load the addon DLL and call `getValue()` / `setValue()` directly.

```javascript
import { addon } from "novadesk";

const brightness = addon.load("D:/Novadesk-Project/Brightness/dist/x64/Debug/Brightness.dll");

const info = brightness.getValue();
console.log(info);

brightness.setValue({ percent: 60 });
```

## `getValue(options)`

Returns brightness information for a display.

### Options

All fields are optional.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `display` | `number` | `0` | Display index. Use `0` for primary display. |

### Return Value

- **Type**: `object`
- **Description**: Returns:
  - `supported` (`boolean`): Whether brightness control is available on this device.
  - `current` (`number`): Current raw brightness value.
  - `min` (`number`): Minimum raw brightness value.
  - `max` (`number`): Maximum raw brightness value.
  - `percent` (`number`): Current brightness as a percentage (0–100).

## `setValue(options)`

Sets brightness for a display.

### Parameters

- **`options`** (`object`)
  - `percent` (`number`, required): Target brightness percentage (0–100).
  - `display` (`number`, optional): Display index (default `0`).

### Return Value

- **Type**: `boolean`
- **Description**: Returns `true` if the request succeeded.

## Beginner Tips

- If `supported` is `false`, your system does not expose brightness control through this method.
- Always clamp `percent` between `0` and `100`.
- Use a short interval (e.g., 500–1000ms) if you want a live readout.

## Example

```javascript
import { addon } from "novadesk";

const brightness = addon.load("D:/Novadesk-Project/Brightness/dist/x64/Debug/Brightness.dll");

const info = brightness.getValue({ display: 0 });
console.log("Brightness supported:", info.supported);
console.log("Range:", info.min, "-", info.max, "Current:", info.current);

const ok = brightness.setValue({ percent: 60, display: 0 });
console.log("Set brightness:", ok);
```
