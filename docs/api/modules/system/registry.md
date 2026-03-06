---
title: Read and write Windows Registry values with the registry module.
---

# registry Module
Read and write registry values in Novadesk.

The `registry` module is exported from the `system` module.

```javascript
import { registry } from "system";
```

#### Table of Contents
[[toc]]

## `registry.readData(path, valueName)`

Reads a registry value.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Full key path including hive (for example, `"HKEY_CURRENT_USER\\Software\\MyApp"`).

- **`valueName`**
  - **Type**: `string`
  - **Description**: Registry value name.

### Return Value

- **Type**: `string | number | null`
- **Description**:
  - Returns a `string` for string values.
  - Returns a `number` for numeric values.
  - Returns `null` if the value cannot be read or is unsupported.

## `registry.writeData(path, valueName, value)`

Writes a registry value.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Full key path including hive.

- **`valueName`**
  - **Type**: `string`
  - **Description**: Registry value name.

- **`value`**
  - **Type**: `string | number`
  - **Description**: Value to write. Strings are written as string data; numbers are written as numeric data.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if write succeeded; otherwise `false`.

## Example

```javascript
import { registry } from "system";

const ok = registry.writeData("HKEY_CURRENT_USER\\Software\\NovadeskDemo", "Opacity", 0.85);
console.log("write:", ok);

const value = registry.readData("HKEY_CURRENT_USER\\Software\\NovadeskDemo", "Opacity");
console.log("read:", value);
```
