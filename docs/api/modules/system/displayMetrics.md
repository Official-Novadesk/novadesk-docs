---
title: Read monitor and virtual desktop metrics with the displayMetrics module.
---

# displayMetrics Module
Get virtual desktop bounds and connected monitor information in Novadesk.

The `displayMetrics` module is exported from the `system` module.

```javascript
import { displayMetrics } from "system";
```

#### Table of Contents
[[toc]]

## `displayMetrics.getMetrics()`

Returns display and monitor metrics.

### Return Value

- **Type**: `object`
- **Description**: Contains:
  - **`virtualLeft`** (`number`): Virtual desktop left coordinate.
  - **`virtualTop`** (`number`): Virtual desktop top coordinate.
  - **`virtualWidth`** (`number`): Virtual desktop width.
  - **`virtualHeight`** (`number`): Virtual desktop height.
  - **`primaryIndex`** (`number`): Index of the primary monitor in `monitors`.
  - **`count`** (`number`): Number of monitors.
  - **`monitors`** (`object[]`): Monitor entries:
    - **`active`** (`boolean`): Whether the monitor is active.
    - **`deviceName`** (`string`): System device name.
    - **`monitorName`** (`string`): Human-readable monitor name.
    - **`screen`** (`object`): Monitor bounds with `left`, `top`, `right`, `bottom`.

## `displayMetrics.get()`

Alias of `displayMetrics.getMetrics()`.

### Return Value

- **Type**: `object`
- **Description**: Same as `getMetrics()`.

## Example

```javascript
import { displayMetrics } from "system";

const metrics = displayMetrics.getMetrics();

console.log("Virtual bounds:", metrics.virtualLeft, metrics.virtualTop, metrics.virtualWidth, metrics.virtualHeight);
console.log("Primary monitor index:", metrics.primaryIndex);
console.log("Monitor count:", metrics.count);

for (const monitor of metrics.monitors) {
    console.log("Monitor:", monitor.monitorName, monitor.deviceName, monitor.screen);
}
```
