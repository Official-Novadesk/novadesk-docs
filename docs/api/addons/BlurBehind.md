---
title: Apply blur/acrylic and rounded corners with the BlurBehind addon.
description: Apply Windows blur, acrylic, and rounded corner effects to windows.
---

# BlurBehind Addon

Apply Windows blur/acrylic background effects and rounded corner styles to a [widget window](/api/modules/novadesk/widgetWindow) handle.

## What is BlurBehind?

The **BlurBehind** addon lets you make your NovaDesk widget windows look modern by adding:

- **Blur Behind** — a standard translucent blur effect behind the window
- **Acrylic** — a frosted-glass effect similar to Windows 11 settings panels
- **Rounded Corners** — make window edges round, small-round, or sharp
- **Stroke** — add a visible border around the window (Win11+)
- **Toggle** — easily toggle effects on/off

These effects only work on Windows 10 (build 17763+) and Windows 11.

## Getting Started

First, load the addon in your script:

```javascript
import { addon } from "novadesk";

// Load the BlurBehind addon DLL
const blurBehind = addon.load("path/to/BlurBehind.dll");
```

::: tip
Replace `"path/to/BlurBehind.dll"` with the actual path to the `BlurBehind.dll` file on your system.
:::

#### Table of Contents
[[toc]]

## Quick Example

Here is a minimal example that applies an acrylic effect to a widget window:

```javascript
import { addon, widgetWindow } from "novadesk";
const blurBehind = addon.load("path/to/BlurBehind.dll");

// Create a widget window
const win = new widgetWindow({ id: "demo", width: 400, height: 300, script: "ui.js" });

// Get the window handle (HWND) and apply the effect
const hwnd = win.getHandle();
blurBehind.apply(hwnd, "acrylic", "roundsmall");
```

## How Window Handles (HWND) Work

Every window on Windows has a unique number called a **handle** (HWND). You need this handle to tell the addon which window to apply effects to.

You can get a window handle from:
- `widgetWindow.getHandle()` — returns the HWND of your NovaDesk widget
- A number — e.g. `12345`
- A hex string — e.g. `"0x1A2B3C"` or `"0000000000290386"`

<MethodBox
  name="blurBehind.apply(hwnd [, type, corner])"
  badge="BlurBehind"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'hwnd', type: 'number | string', description: 'Target window handle. Supports numeric HWND, decimal string, or hex string (0x... format).' },
    { name: 'type', type: 'string', optional: true, description: 'Effect type: blurbehind (default), acrylic, none, or disabled.' },
    { name: 'corner', type: 'string', optional: true, description: 'Corner style: default (default), round, roundsmall, or none.' }
  ]"
>
<template #returns><code>true</code> if the effect was applied successfully, <code>false</code> otherwise.</template>

Applies a blur or acrylic background effect to the target window and optionally sets its corner style. Throws if the window handle is invalid.

::: info
The function first clears any existing effect, then applies the new one. This ensures a clean state.
:::

**Effect types:**

| Value | Description |
|---|---|
| `blurbehind` | Standard blur-behind effect (default). Semi-transparent blur behind the window. |
| `acrylic` | Acrylic/frosted-glass effect. More opaque and modern-looking. |
| `none` / `disabled` | Removes any active effect. |

**Corner styles:**

| Value | Description |
|---|---|
| `default` | System default rounded corners. |
| `round` | Rounded corners. |
| `roundsmall` | Small rounded corners. |
| `none` | Sharp corners (no rounding). |

::: info
Corner styles depend on Windows version and compositor support. They require Windows 11 or later.
:::

<template #example>

```javascript
import { addon, widgetWindow } from "novadesk";
const blurBehind = addon.load("path/to/BlurBehind.dll");

const win = new widgetWindow({ id: "demo", width: 400, height: 300, script: "ui.js" });
const hwnd = win.getHandle();

// Acrylic + small rounded corners
blurBehind.apply(hwnd, "acrylic", "roundsmall");

// Standard blur, default corners
blurBehind.apply(hwnd, "blurbehind");

// Acrylic only (no corner change)
blurBehind.apply(hwnd, "acrylic");
```

</template>
</MethodBox>

<MethodBox
  name="blurBehind.disable(hwnd)"
  badge="BlurBehind"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'hwnd', type: 'number | string', description: 'Target window handle.' }
  ]"
>
<template #returns><code>true</code> if the effect was removed, <code>false</code> otherwise.</template>

Removes any active blur or acrylic effect from the window. Equivalent to calling `apply(hwnd, "none")`.

<template #example>

```javascript
blurBehind.disable(hwnd);
```

</template>
</MethodBox>

<MethodBox
  name="blurBehind.setCorner(hwnd, corner)"
  badge="BlurBehind"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'hwnd', type: 'number | string', description: 'Target window handle.' },
    { name: 'corner', type: 'string', description: 'Corner style: default, round, roundsmall, or none.' }
  ]"
>
<template #returns><code>true</code> on success, <code>false</code> otherwise.</template>

Sets only the corner style of a window without changing the blur/acrylic state. This is useful when you want to adjust corners independently of the background effect.

<template #example>

```javascript
// Change corners without touching the blur effect
blurBehind.setCorner(hwnd, "round");
```

</template>
</MethodBox>

<MethodBox
  name="blurBehind.setEffect(hwnd, effect)"
  badge="BlurBehind"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'hwnd', type: 'number | string', description: 'Target window handle.' },
    { name: 'effect', type: 'string', description: 'Effect type: default, none, or disabled.' }
  ]"
>
<template #returns><code>true</code> on success, <code>false</code> otherwise.</template>

Sets the visual effect of a window without changing the accent type. This allows you to control the effect independently.

<template #example>

```javascript
// Change the effect style
blurBehind.setEffect(hwnd, "none");
```

</template>
</MethodBox>

<MethodBox
  name="blurBehind.setStroke(hwnd, color)"
  badge="BlurBehind"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'hwnd', type: 'number | string', description: 'Target window handle.' },
    { name: 'color', type: 'string', description: 'Stroke style: visible, hidden, or a color string.' }
  ]"
>
<template #returns><code>true</code> on success, <code>false</code> otherwise.</template>

Sets the stroke/border style of a window. Requires Windows 11 or later.

<template #example>

```javascript
// Show a visible border
blurBehind.setStroke(hwnd, "visible");

// Hide the border
blurBehind.setStroke(hwnd, "hidden");
```

</template>
</MethodBox>

<MethodBox
  name="blurBehind.toggle(hwnd)"
  badge="BlurBehind"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'hwnd', type: 'number | string', description: 'Target window handle.' }
  ]"
>
<template #returns><code>true</code> if blur is now ON, <code>false</code> if it was turned OFF.</template>

Toggles blur on/off for a window. Stores and restores the previous configuration per HWND.

<template #example>

```javascript
// Toggle blur effect
const isOn = blurBehind.toggle(hwnd);
console.log("Blur is now", isOn ? "ON" : "OFF");
```

</template>
</MethodBox>

<MethodBox
  name="blurBehind.isSupported(feature)"
  badge="BlurBehind"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'feature', type: 'string', description: 'Feature to check: blur, blurbehind, acrylic, corner, stroke, or border.' }
  ]"
>
<template #returns><code>true</code> if the feature is supported on this system, <code>false</code> otherwise.</template>

Checks if a specific feature is supported on the current Windows version.

<template #example>

```javascript
if (blurBehind.isSupported("acrylic")) {
  console.log("Acrylic effects are available");
}
```

</template>
</MethodBox>

The addon also exposes a `supports` object with boolean properties for each feature:

| Property | Type | Description |
|---|---|---|
| `blur` | `boolean` | `true` on Windows 10+ |
| `acrylic` | `boolean` | `true` on Windows 11+ |
| `corner` | `boolean` | `true` on Windows 11+ |
| `stroke` | `boolean` | `true` on Windows 11+ |

```javascript
const blurBehind = addon.load("path/to/BlurBehind.dll");
console.log("Acrylic supported:", blurBehind.supports.acrylic);
console.log("Stroke supported:", blurBehind.supports.stroke);
```

## Full Example

Here is a complete example that creates a widget, applies effects, and demonstrates toggling:

```javascript
import { addon, widgetWindow } from "novadesk";
const blurBehind = addon.load("path/to/BlurBehind.dll");

const win = new widgetWindow({ id: "blur-demo", width: 400, height: 300, script: "ui.js" });
const hwnd = win.getHandle();

// Apply acrylic with small rounded corners
blurBehind.apply(hwnd, "acrylic", "roundsmall");

// Later, switch to just blur effect
blurBehind.apply(hwnd, "blurbehind", "round");

// Change corners only
blurBehind.setCorner(hwnd, "roundsmall");

// Remove all effects
blurBehind.disable(hwnd);
```
