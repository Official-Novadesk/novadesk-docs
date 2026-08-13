---
title: Apply blur/acrylic and rounded corners with the BlurBehind addon.
---

# BlurBehind Addon

Apply Windows blur/acrylic background effects and rounded corner styles to a widget window handle.

```javascript
import { addon } from "novadesk";
const blurBehind = addon.load("path/to/BlurBehind.dll");
```

#### Table of Contents
[[toc]]

---

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

**Effect types:**

| Value | Description |
|---|---|
| `blurbehind` | Standard blur-behind effect (default). |
| `acrylic` | Acrylic/frosted glass effect. |
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
```

</template>
</MethodBox>

---

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

---

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

Sets only the corner style of a window without changing the blur/acrylic state.

<template #example>

```javascript
blurBehind.setCorner(hwnd, "round");
```

</template>
</MethodBox>
