---
title: Read power and battery status with the power module.
---

# power Module
Read system power status details in Novadesk.

The `power` module is exported from the `system` module.

```javascript
import { power } from "system";
```

#### Table of Contents
[[toc]]

## `power.getStatus()`

Returns current power/battery status.

### Return Value

- **Type**: `object | null`
- **Description**:
  - Returns `null` if power status cannot be read.
  - Otherwise returns:
    - **`acline`** (`number`): `1` when connected to AC power, otherwise `0`.
    - **`status`** (`number`): Battery status code.
    - **`status2`** (`number`): Additional battery status code.
    - **`lifetime`** (`number`): Remaining battery lifetime in seconds (when available).
    - **`percent`** (`number`): Battery percentage (`0-100`).
    - **`mhz`** (`number`): Current CPU frequency in MHz.
    - **`hz`** (`number`): Current CPU frequency in Hz.

## Example

```javascript
import { power } from "system";

const status = power.getStatus();
if (status) {
    console.log("AC:", status.acline);
    console.log("Battery %:", status.percent);
    console.log("CPU MHz:", status.mhz);
}
```
