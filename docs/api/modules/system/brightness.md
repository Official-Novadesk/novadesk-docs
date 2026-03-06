---
title: Read brightness capability status with the brightness module.
---

# brightness Module
Access display brightness capability status in Novadesk.

The `brightness` module is exported from the `system` module.

```javascript
import { brightness } from "system";
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

## `brightness.setValue(options)`

Attempts to set brightness.

### Parameters

- **`options`**
  - **Type**: `object`
  - **Description**: Reserved for future brightness options.

### Return Value

- **Type**: `boolean`
- **Description**: Current implementation always returns `false`.

## Example

```javascript
import { brightness } from "system";

const info = brightness.getValue();
console.log("Brightness supported:", info.supported);
console.log("Range:", info.min, "-", info.max, "Current:", info.current);

const ok = brightness.setValue({ percent: 60 });
console.log("Set brightness:", ok);
```
