---
title: Read and set display brightness with the Brightness addon.
---

# Brightness Addon

Read and set display brightness on supported systems. Use it for brightness sliders, hotkeys, or ambient-light widgets.

```javascript
import { addon } from "novadesk";
const brightness = addon.load("path/to/Brightness.dll");
```

#### Table of Contents
[[toc]]

---

<MethodBox
  name="brightness.getValue([options])"
  badge="Brightness"
  badgeType="core"
  returns="object"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Optional config object. Accepts display (number, default 0) for the display index.' }
  ]"
>
<template #returns>An object describing the current brightness state of the target display.</template>

Returns brightness information for a display. Check `supported` before using other fields — if `false`, brightness control is not available on this system.

The returned object has these properties:

| Property | Type | Description |
|---|---|---|
| `supported` | `boolean` | Whether brightness control is available on this device. |
| `current` | `number` | Current raw brightness value. |
| `min` | `number` | Minimum raw brightness value. |
| `max` | `number` | Maximum raw brightness value. |
| `percent` | `number` | Current brightness as a percentage (`0–100`). |

<template #example>

```javascript
import { addon } from "novadesk";
const brightness = addon.load("path/to/Brightness.dll");

const info = brightness.getValue({ display: 0 });

if (!info.supported) {
  console.warn("Brightness control not available");
} else {
  console.log("Brightness:", info.percent + "%");
  console.log("Raw range:", info.min, "–", info.max);
}
```

</template>
</MethodBox>

---

<MethodBox
  name="brightness.setValue(options)"
  badge="Brightness"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'options', type: 'object', description: 'Object with percent (number, required, 0–100) and optionally display (number, default 0).' }
  ]"
>
<template #returns><code>true</code> if the brightness was set successfully, <code>false</code> otherwise.</template>

Sets display brightness to the given percentage. Values are clamped to `0–100`.

<template #example>

```javascript
import { addon } from "novadesk";
const brightness = addon.load("path/to/Brightness.dll");

// Set primary display to 60%
const ok = brightness.setValue({ percent: 60 });
console.log("Set:", ok);

// Set a specific display
brightness.setValue({ percent: 80, display: 1 });
```

</template>
</MethodBox>
