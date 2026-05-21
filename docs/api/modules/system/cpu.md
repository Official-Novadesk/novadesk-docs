---
title: Read CPU usage with the cpu module.
---

# cpu Module
Read current system CPU usage in Novadesk.

The `cpu` module is exported from the `system` module.

```javascript
import { cpu } from "system";
```

#### Table of Contents
[[toc]]

## `cpu.usage()`

Returns current total CPU usage percentage.

### Return Value

- **Type**: `number`
- **Description**: CPU usage percentage in the range `0-100`. Returns `0` if stats are unavailable.

## `cpu.getUpTime([format])`

Returns the total system uptime since boot.

### Parameters

- **`format`** (Optional)
    - **Type**: `string`
    - **Description**: A format string to return a human-readable duration. If omitted, returns total seconds as a number.
    - **Supported Tokens**:
        - `%d`: Days
        - `%h`: Hours (total hours within the day)
        - `%m`: Minutes (total minutes within the hour)
        - `%s`: Seconds (total seconds within the minute)
        - `%H`: Padded hours (e.g., `05`)
        - `%M`: Padded minutes (e.g., `09`)
        - `%S`: Padded seconds (e.g., `01`)

### Return Value

- **Type**: `number | string`
- **Description**: Total seconds as a `number` if no format is provided, otherwise a formatted `string`.

## Example

```javascript
import { cpu } from "system";

// Get raw seconds
const seconds = cpu.getUpTime();
console.log(`System has been up for ${seconds} seconds.`);

// Get formatted string
const uptime = cpu.getUpTime("%d days, %H:%M:%S");
console.log("Uptime:", uptime);

const value = cpu.usage();
console.log("CPU usage:", value + "%");
```
