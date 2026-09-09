---
title: Read and set display brightness with the Brightness addon.
description: Read and set display brightness on supported systems. Combine with [Hotkey](/api/addons/Hotkey) for keyboard brightness control.
---

# Brightness Addon

Read and set display brightness on supported systems. Combine with [Hotkey](/api/addons/Hotkey) for keyboard brightness control. Use it for brightness sliders, hotkeys, or ambient-light widgets.

## What is Brightness?

The **Brightness** addon lets you control your screen's brightness from a NovaDesk widget. You can:

- **Read** the current brightness level as a percentage
- **Set** the brightness to any percentage from 0% to 100%

::: warning
Brightness control only works on devices with compatible hardware — primarily laptops with built-in displays. Desktop monitors typically do not support software brightness control.
:::

## Getting Started

First, load the addon in your script:

```javascript
import { addon } from "novadesk";

// Load the Brightness addon DLL
const brightness = addon.load("path/to/Brightness.dll");
```

::: tip
Replace `"path/to/Brightness.dll"` with the actual path to the `Brightness.dll` file on your system.
:::

#### Table of Contents
[[toc]]

## Quick Example

Here is a minimal example that reads the current brightness and prints it:

```javascript
import { addon } from "novadesk";
const brightness = addon.load("path/to/Brightness.dll");

const info = brightness.getValue({ display: 0 });

if (info.supported) {
  console.log("Brightness:", info.percent + "%");
} else {
  console.warn("Brightness control not available on this device");
}
```

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

Returns brightness information for a display. Always check the `supported` property first — if it is `false`, brightness control is not available on this system and the other fields should be ignored.

The returned object has these properties:

| Property | Type | Description |
|---|---|---|
| `supported` | `boolean` | Whether brightness control is available on this device. Check this first! |
| `current` | `number` | Current raw brightness value (hardware-specific). |
| `min` | `number` | Minimum raw brightness value the hardware supports. |
| `max` | `number` | Maximum raw brightness value the hardware supports. |
| `percent` | `number` | Current brightness as a percentage from `0` to `100`. This is the easiest value to use. |

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

Sets display brightness to the given percentage. Values are automatically clamped to `0–100`.

::: tip
You can also pass a plain number instead of an object: `brightness.setValue(50)` sets brightness to 50%.
:::

<template #example>

```javascript
import { addon } from "novadesk";
const brightness = addon.load("path/to/Brightness.dll");

// Set primary display to 60%
const ok = brightness.setValue({ percent: 60 });
console.log("Set:", ok);

// Set a specific display
brightness.setValue({ percent: 80, display: 1 });

// You can also pass a number directly
brightness.setValue(50); // Sets to 50%
```

</template>
</MethodBox>

## Full Example

Here is a complete example that creates a simple brightness widget with read and set:

```javascript
import { addon } from "novadesk";
const brightness = addon.load("path/to/Brightness.dll");

// Read current brightness
const info = brightness.getValue({ display: 0 });

if (info.supported) {
  console.log("Current brightness:", info.percent + "%");

  // Set brightness to 75%
  const ok = brightness.setValue({ percent: 75 });
  console.log("Set brightness to 75%:", ok ? "success" : "failed");

  // Read again to confirm
  const updated = brightness.getValue({ display: 0 });
  console.log("New brightness:", updated.percent + "%");
} else {
  console.log("This device does not support brightness control");
}
```
