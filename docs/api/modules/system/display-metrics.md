---
title: Read monitor and virtual desktop metrics with the displayMetrics module.
description: Read monitor bounds and virtual desktop metrics.
---

# displayMetrics Module

Get virtual desktop bounds and connected monitor information.

```javascript
import { displayMetrics } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

---

<MethodBox
  name="displayMetrics.getMetrics()"
  badge="displayMetrics"
  badgeType="core"
  returns="object"
>
<template #returns>An object with virtual desktop bounds, primary monitor data, and a <code>monitors</code> array.</template>

Returns the full display configuration — virtual desktop bounds and an entry for each connected monitor.

The returned object has these properties:

| Property | Type | Description |
|---|---|---|
| `virtualScreen` | `object` | Virtual desktop bounds with `x`, `y`, `width`, `height` properties. |
| `primary` | `object` | Primary monitor data with `workArea` and `screenArea` objects. |
| `monitors` | `object[]` | Array of monitor entries (see below). |

Each entry in `monitors`:

| Property | Type | Description |
|---|---|---|
| `id` | `number` | Monitor identifier. |
| `workArea` | `object` | Work area bounds (excludes taskbar) with `x`, `y`, `width`, `height` properties. |
| `screenArea` | `object` | Full screen bounds with `x`, `y`, `width`, `height` properties. |

Each area object (`workArea`, `screenArea`) contains:

| Property | Type | Description |
|---|---|---|
| `x` | `number` | Left coordinate of the area. |
| `y` | `number` | Top coordinate of the area. |
| `width` | `number` | Width of the area in pixels. |
| `height` | `number` | Height of the area in pixels. |

<template #example>

```javascript
import { displayMetrics } from "system";

const m = displayMetrics.getMetrics();

console.log("Virtual desktop:", m.virtualScreen.width, "x", m.virtualScreen.height);
console.log("Primary work area:", m.primary.workArea);

for (const monitor of m.monitors) {
  console.log("Monitor", monitor.id, "screen:", monitor.screenArea);
  console.log("Monitor", monitor.id, "work area:", monitor.workArea);
}
```

</template>
</MethodBox>

---

<MethodBox
  name="displayMetrics.get()"
  badge="displayMetrics"
  badgeType="core"
  returns="object"
>
<template #returns>Same as <code>displayMetrics.getMetrics()</code>.</template>

Alias of `displayMetrics.getMetrics()`.

<template #example>

```javascript
import { displayMetrics } from "system";

const m = displayMetrics.get();
console.log("Virtual screen:", m.virtualScreen);
console.log("Monitors:", m.monitors.length);
```

</template>
</MethodBox>
