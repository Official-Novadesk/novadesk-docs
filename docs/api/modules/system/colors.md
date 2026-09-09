---
title: colors
description: Read system colors, dark mode state, and accent color.
---

# colors

Read Windows system colors, detect dark mode, and access the accent color. Ideal for building widgets that adapt to the user's system theme.

```javascript
import { colors } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="colors.get()"
  badge="colors"
  badgeType="core"
  returns="object"
>

Returns all system colors as an object with color properties. Each color property contains `hex`, `r`, `g`, `b`, and `a` values.

**Return value properties:**

| Property | Type | Description |
|---|---|---|
| `isDarkMode` | `boolean` | Whether the system is in dark mode |
| `accent` | `object` | System accent color |
| `window` | `object` | Window background color |
| `windowText` | `object` | Window text color |
| `highlight` | `object` | Highlight color (e.g., selected text background) |
| `highlightText` | `object` | Highlight text color |
| `hotTracking` | `object` | Hot tracking color (e.g., hover effects) |
| `buttonFace` | `object` | Button face color |
| `buttonText` | `object` | Button text color |
| `grayText` | `object` | Grayed-out text color |
| `background` | `object` | Desktop background color |
| `activeBorder` | `object` | Active window border color |
| `inactiveBorder` | `object` | Inactive window border color |
| `menu` | `object` | Menu background color |
| `menuText` | `object` | Menu text color |

**Color object format:**

| Property | Type | Description |
|---|---|---|
| `hex` | `string` | Hex color string (e.g., `"#FF00FF"`) |
| `r` | `number` | Red component (0–255) |
| `g` | `number` | Green component (0–255) |
| `b` | `number` | Blue component (0–255) |
| `a` | `number` | Alpha component (0–255, always 255 for system colors) |

<template #example>

```javascript
import { colors } from "system";

const sysColors = colors.get();
console.log("Dark mode:", sysColors.isDarkMode);
console.log("Accent:", sysColors.accent.hex);
console.log("Window:", sysColors.window.hex);
```

</template>
</MethodBox>

<MethodBox
  name="colors.isDarkMode()"
  badge="colors"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the system is using a dark theme, <code>false</code> otherwise.</template>

Returns whether the system is currently using a dark color scheme.

<template #example>

```javascript
import { colors } from "system";

if (colors.isDarkMode()) {
  console.log("System is in dark mode");
} else {
  console.log("System is in light mode");
}
```

</template>
</MethodBox>

<MethodBox
  name="colors.getAccent()"
  badge="colors"
  badgeType="core"
  returns="object"
>
<template #returns>Color object with hex, r, g, b, a properties.</template>

Returns the system accent color. This is the color Windows uses for highlights, selected items, and other UI accents.

<template #example>

```javascript
import { colors } from "system";

const accent = colors.getAccent();
console.log("Accent color:", accent.hex);
console.log("RGB:", accent.r, accent.g, accent.b);
```

</template>
</MethodBox>

<MethodBox
  name="colors.getColor(name)"
  badge="colors"
  badgeType="core"
  returns="object | undefined"
  :parameters="[
    { name: 'name', type: 'string', description: 'Color name (case-insensitive). See supported names below.' }
  ]"
>
<template #returns>Color object with hex, r, g, b, a properties, or <code>undefined</code> if the name is not recognized.</template>

Returns a specific system color by name. The name comparison is case-insensitive.

**Supported color names:**

| Name | Aliases | Description |
|---|---|---|
| `accent` | — | System accent color |
| `window` | — | Window background color |
| `windowText` | — | Window text color |
| `highlight` | — | Highlight color |
| `highlightText` | — | Highlight text color |
| `hotTracking` | `hotlight` | Hot tracking color |
| `buttonFace` | `face`, `3dface` | Button face color |
| `buttonText` | `btntext` | Button text color |
| `grayText` | — | Grayed-out text color |
| `background` | `desktop` | Desktop background color |
| `activeBorder` | — | Active window border color |
| `inactiveBorder` | — | Inactive window border color |
| `menu` | — | Menu background color |
| `menuText` | — | Menu text color |

<template #example>

```javascript
import { colors } from "system";

// Get accent color
const accent = colors.getColor("accent");
console.log("Accent:", accent.hex);

// Get window background
const window = colors.getColor("window");
console.log("Window bg:", window.hex);

// Case-insensitive
const btn = colors.getColor("ButtonFace");
console.log("Button face:", btn.hex);
```

</template>
</MethodBox>

## Practical Examples

**Adapt widget colors to system theme**

```javascript
import { colors } from "system";

const isDark = colors.isDarkMode();
const bgColor = isDark ? "rgb(30,30,30)" : "rgb(240,240,240)";
const textColor = isDark ? "rgb(230,230,230)" : "rgb(30,30,30)";

console.log("Background:", bgColor);
console.log("Text:", textColor);
```

**Use system accent color in UI**

```javascript
import { colors } from "system";

const accent = colors.getAccent();
const accentRgb = `rgb(${accent.r},${accent.g},${accent.b})`;

console.log("Use accent for highlights:", accentRgb);
```

**Get all system colors for theming**

```javascript
import { colors } from "system";

const sysColors = colors.get();
console.log("Is dark mode:", sysColors.isDarkMode);
console.log("Accent:", sysColors.accent.hex);
console.log("Window:", sysColors.window.hex);
console.log("WindowText:", sysColors.windowText.hex);
console.log("Highlight:", sysColors.highlight.hex);
console.log("Button face:", sysColors.buttonFace.hex);
```

## Related Pages

- [Wallpaper](/api/modules/system/wallpaper) — Get/set desktop wallpaper
- [Display Metrics](/api/modules/system/display-metrics) — Read monitor and desktop bounds
