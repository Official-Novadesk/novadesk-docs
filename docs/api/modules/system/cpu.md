---
title: cpu
---

# cpu

Read current CPU usage and system uptime.

```javascript
import { cpu } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="cpu.usage()"
  badge="cpu"
  badgeType="core"
  returns="number"
>
<template #returns>CPU usage as a floating-point percentage in the range <code>0.0–100.0</code>. Returns <code>0.0</code> if stats are unavailable or on the very first call.</template>

Returns the current total CPU usage across all cores as a percentage. Calculated from the delta between consecutive calls using `GetSystemTimes`.

::: warning First call always returns 0
The usage calculation requires two measurements to compute a delta. The very first call to `cpu.usage()` always returns `0.0` because no baseline has been established yet. Subsequent calls return the actual usage measured since the previous call.
:::

<template #example>

```javascript
import { cpu } from "system";

// First call establishes the baseline — returns 0
cpu.usage();

// Poll every second for real readings
setInterval(() => {
  const usage = cpu.usage();
  ipcMain.send("cpu-update", { cpu: Math.round(usage) });
}, 1000);
```

</template>
</MethodBox>

<MethodBox
  name="cpu.getUpTime([format])"
  badge="cpu"
  badgeType="core"
  returns="number | string | null"
  :parameters="[
    { name: 'format', type: 'string', optional: true, description: 'Format string using the tokens listed below. If omitted, returns total uptime in seconds as a float.' }
  ]"
>
<template #returns>Total uptime in seconds as a <code>number</code> when no format is given, a formatted <code>string</code> when a format is provided, or <code>null</code> if uptime cannot be read.</template>

Returns system uptime since the last boot. Without a format string the raw value is a floating-point number of seconds. With a format string the tokens are replaced with the corresponding time components.

**Format tokens:**

| Token | Description | Example |
|---|---|---|
| `%d` | Days (not zero-padded) | `3` |
| `%h` | Hours within the day (not zero-padded) | `4` |
| `%m` | Minutes within the hour (not zero-padded) | `9` |
| `%s` | Seconds within the minute (not zero-padded) | `7` |
| `%H` | Hours, zero-padded to 2 digits | `04` |
| `%M` | Minutes, zero-padded to 2 digits | `09` |
| `%S` | Seconds, zero-padded to 2 digits | `07` |

::: tip Default format
When `getUpTime` is called with an empty string `""`, the default format `"%d days, %h hours, %m minutes"` is used.
:::

<template #example>

```javascript
import { cpu } from "system";

// Raw seconds (floating point)
const seconds = cpu.getUpTime();
console.log("Uptime seconds:", seconds); // e.g. 259331.234

// Formatted string
const uptime = cpu.getUpTime("%d days, %H:%M:%S");
console.log("Uptime:", uptime); // e.g. "3 days, 04:02:11"

// Using unpadded tokens
const brief = cpu.getUpTime("%d d %h h %m m");
console.log(brief); // e.g. "3 d 4 h 2 m"

// Default format (pass empty string)
const def = cpu.getUpTime("");
console.log(def); // e.g. "3 days, 4 hours, 2 minutes"
```

</template>
</MethodBox>

## Practical Examples

**Live CPU bar updated every second**

```javascript
import { cpu } from "system";

// Warm up the baseline on startup
cpu.usage();

setInterval(() => {
  const usage = cpu.usage();
  ipcMain.send("stats", { cpu: Math.round(usage) });
}, 1000);
```

**Display uptime in the widget**

```javascript
import { cpu } from "system";

setInterval(() => {
  const uptime = cpu.getUpTime("%d days, %H:%M:%S");
  ipcMain.send("uptime-update", { text: uptime });
}, 1000);
```

**CPU usage with history graph**

```javascript
import { cpu } from "system";

const history = [];
const MAX_POINTS = 60;

// Establish baseline
cpu.usage();

setInterval(() => {
  const usage = cpu.usage();
  history.push(Math.round(usage));
  if (history.length > MAX_POINTS) history.shift();

  ipcMain.send("cpu-history", { usage, history });
}, 1000);
```
