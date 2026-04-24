---
title: Access Windows Recycle Bin APIs from the system module.
---

# recycleBin

`recycleBin` is exported by the `system` module and provides Recycle Bin actions and stats.

```javascript
import { recycleBin } from "system";
```

#### Table of Contents
[[toc]]

## `recycleBin.openBin()`

Opens Windows Recycle Bin in Explorer.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the request was accepted, otherwise `false`.

## `recycleBin.emptyBin()`

Empties Recycle Bin using normal shell behavior.

### Return Value

- **Type**: `boolean`
- **Description**: `true` on success, otherwise `false`.

## `recycleBin.emptyBinSilent()`

Empties Recycle Bin in silent mode (no confirmation/progress UI).

### Return Value

- **Type**: `boolean`
- **Description**: `true` on success, otherwise `false`.

## `recycleBin.getStats()`

Reads current Recycle Bin stats.

### Return Value

- **Type**: `{ itemCount: number, totalSizeBytes: number } | null`
- **Description**: Returns an object on success, otherwise `null`.

## Example

```javascript
import { recycleBin } from "system";

const stats = recycleBin.getStats();
if (stats) {
  console.log("Items:", stats.itemCount);
  console.log("Bytes:", stats.totalSizeBytes);
}
```
