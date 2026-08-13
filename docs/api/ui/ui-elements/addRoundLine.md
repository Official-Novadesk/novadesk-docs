---
title: addRoundLine
---

# ui.addRoundLine()

Draws a circular arc stroke that fills proportionally from a `value`. Typically used for circular progress indicators, ring gauges, and donut charts. Supports a background arc track, tapered stroke, custom dash patterns, and radial tick marks.

```javascript
ui.addRoundLine(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) (position, size, visibility, tooltip, mouse events, etc.).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
// Classic circular progress ring
ui.addRoundLine({
  id: "cpu-ring",
  x: 60, y: 60,
  width: 120, height: 120,
  value: 0.72,
  lineColor: "rgb(0,180,255)",
  lineColorBg: "rgba(255,255,255,0.08)",
  thickness: 8,
  startAngle: -135,
  totalAngle: 270,
  capType: "round"
});
```

## Angle System

`startAngle` and `totalAngle` are both in **degrees**. The coordinate system is clock-style:

| Angle | Position |
|---|---|
| `0` | 12 o'clock (top) |
| `90` | 3 o'clock (right) |
| `180` | 6 o'clock (bottom) |
| `-90` | 9 o'clock (left) |
| `-135` | 7:30 o'clock — classic gauge start |

Positive `totalAngle` sweeps clockwise when `clockwise: true` (the default).

## Value

<PropertyBox name="value" type="number" defaultValue="0">

Normalized fill level from `0.0` (empty) to `1.0` (full). The foreground arc spans `value × totalAngle` degrees. Values are clamped to `0.0–1.0`.

The background arc always spans the full `totalAngle` regardless of `value`.

```javascript
ui.setElementProperties("cpu-ring", { value: payload.cpu / 100 });
```

</PropertyBox>

## Geometry

<PropertyBox name="radius" type="number" defaultValue="0">

Radius of the arc's centerline in pixels. When `0` or omitted, the radius is automatically calculated to fill the element: `(min(width, height) - thickness) / 2`.

Set an explicit radius to control arc size independently of the element's bounding box.

</PropertyBox>

<PropertyBox name="startAngle" type="number" defaultValue="0">

The angle in degrees where the arc begins. `0` is 12 o'clock. Positive values go clockwise.

| Style | startAngle | totalAngle |
|---|---|---|
| Full circle | `0` | `360` |
| Classic 270° gauge | `-135` | `270` |
| 180° semicircle (bottom) | `-90` | `180` |
| 180° semicircle (top) | `90` | `180` |

</PropertyBox>

<PropertyBox name="totalAngle" type="number" defaultValue="360">

Total angular sweep of the arc track in degrees. The background arc always spans this full amount. The foreground arc spans `value × totalAngle`.

```javascript
totalAngle: 360    // full circle
totalAngle: 270    // classic gauge sweep
totalAngle: 180    // semicircle
```

</PropertyBox>

<PropertyBox name="clockwise" type="boolean" defaultValue="true">

`true` sweeps both arcs clockwise. `false` sweeps counter-clockwise.

</PropertyBox>

## Stroke

<PropertyBox name="thickness" type="number" defaultValue="2">

Stroke width in pixels for both the foreground and background arcs. The stroke is centered on the radius line, extending equally inward and outward. Accepts integer values.

</PropertyBox>

<PropertyBox name="endThickness" type="number" defaultValue="-1">

Stroke width at the end of the foreground arc, creating a tapered effect. `-1` disables tapering and uses a uniform `thickness` throughout.

The taper is approximated as the average of `thickness` and `endThickness`. The background arc is never tapered — it always uses the full `thickness`.

```javascript
// Taper from thick to thin
thickness: 12, endThickness: 2

// Taper from thin to thick
thickness: 2, endThickness: 12
```

</PropertyBox>

<PropertyBox name="capType" type="string" defaultValue='"flat"'>

Shorthand for setting both `startCap` and `endCap` to the same value. Individual `startCap`/`endCap` properties override this when set.

| Value | Effect |
|---|---|
| `"flat"` | Blunt ends (default) |
| `"round"` | Rounded ends, extending slightly past the arc geometry |

</PropertyBox>

<PropertyBox name="startCap" type="string" defaultValue='"flat"'>

Cap style at the beginning of the foreground arc. Overrides `capType` for the start end. Accepts `"flat"` or `"round"`.

</PropertyBox>

<PropertyBox name="endCap" type="string" defaultValue='"flat"'>

Cap style at the end of the foreground arc. Overrides `capType` for the end. Accepts `"flat"` or `"round"`.

```javascript
// Round only the leading edge
startCap: "flat",
endCap: "round"
```

</PropertyBox>

<PropertyBox name="dashArray" type="number[]" defaultValue="[]">

Dash pattern for the foreground arc stroke, alternating between dash lengths and gap lengths in pixels. An empty array renders a solid line (default).

`dashArray` only affects the foreground arc. The background arc is always solid.

```javascript
dashArray: [4, 4]          // 4px dash, 4px gap
dashArray: [8, 4]          // 8px dash, 4px gap
dashArray: [2, 2, 8, 2]    // short-short-long pattern
```

</PropertyBox>

## Colors

<PropertyBox name="lineColor" type="string" defaultValue='"rgb(0,255,0)"'>

Color or gradient of the foreground arc. When not provided, no foreground arc is drawn. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`. Gradients span the full element bounds.

```javascript
lineColor: "rgb(0,180,255)"
lineColor: "linearGradient(90, rgb(0,120,255), rgb(0,220,180))"
```

</PropertyBox>

<PropertyBox name="lineColorBg" type="string">

Color or gradient of the background arc track. When not provided, no background arc is drawn. Supports the same color formats as `lineColor`. The background arc is never tapered and always uses the full `thickness`.

```javascript
lineColorBg: "rgba(255,255,255,0.08)"    // subtle track
lineColorBg: "rgba(0,180,255,0.15)"      // tinted track
```

</PropertyBox>

## Tick Marks

<PropertyBox name="ticks" type="number" defaultValue="0">

Number of evenly spaced radial tick marks drawn around the arc. `0` disables tick marks.

Setting `ticks: N` draws `N + 1` marks at evenly distributed positions across the full `totalAngle` (including both endpoints). Tick marks always use `lineColor` as a solid color (gradients are not applied to ticks), are 2px wide, and extend `thickness × 1.5` pixels centered on the radius.

Tick marks are rendered on top of both arcs.

```javascript
ticks: 0     // no marks (default)
ticks: 4     // 5 marks at 0%, 25%, 50%, 75%, 100%
ticks: 10    // 11 marks at 10% intervals
```

</PropertyBox>

## Practical Examples

**CPU ring gauge updated from IPC**

```javascript
// ui.js
ui.addRoundLine({
  id: "cpu-ring",
  x: 60, y: 60,
  width: 120, height: 120,
  value: 0,
  lineColor: "rgb(0,180,255)",
  lineColorBg: "rgba(255,255,255,0.07)",
  thickness: 8,
  startAngle: -135,
  totalAngle: 270,
  capType: "round"
});

ipcRenderer.on("stats", (event, payload) => {
  ui.setElementProperties("cpu-ring", { value: payload.cpu / 100 });
});
```

**Three stacked progress rings**

```javascript
ui.beginUpdate();

const rings = [
  { id: "ring-cpu", color: "rgb(0,180,255)",  yOffset: 0 },
  { id: "ring-ram", color: "rgb(100,220,100)", yOffset: 160 },
  { id: "ring-gpu", color: "rgb(255,140,0)",   yOffset: 320 }
];

rings.forEach(({ id, color, yOffset }) => {
  ui.addRoundLine({
    id,
    x: 60, y: 60 + yOffset,
    width: 120, height: 120,
    value: 0,
    lineColor: color,
    lineColorBg: "rgba(255,255,255,0.06)",
    thickness: 8,
    startAngle: -135,
    totalAngle: 270,
    capType: "round"
  });
});

ui.endUpdate();

ipcRenderer.on("stats", (event, payload) => {
  ui.beginUpdate();
  ui.setElementProperties("ring-cpu", { value: payload.cpu / 100 });
  ui.setElementProperties("ring-ram", { value: payload.ram / 100 });
  ui.setElementProperties("ring-gpu", { value: payload.gpu / 100 });
  ui.endUpdate();
});
```

**Full circle with tick marks (clock-style)**

```javascript
ui.addRoundLine({
  id: "clock-ring",
  x: 20, y: 20,
  width: 200, height: 200,
  value: 0,
  lineColor: "rgba(255,255,255,0.6)",
  lineColorBg: "rgba(255,255,255,0.1)",
  thickness: 3,
  startAngle: 0,
  totalAngle: 360,
  ticks: 12,
  capType: "flat"
});
```

**Dashed ring**

```javascript
ui.addRoundLine({
  id: "dashed",
  x: 40, y: 40,
  width: 160, height: 160,
  value: 0.8,
  lineColor: "rgb(180,100,255)",
  lineColorBg: "rgba(255,255,255,0.05)",
  thickness: 6,
  startAngle: -90,
  totalAngle: 360,
  dashArray: [6, 4]
});
```

**Tapered sweep**

```javascript
ui.addRoundLine({
  id: "tapered",
  x: 40, y: 40,
  width: 160, height: 160,
  value: 0.65,
  lineColor: "rgb(0,220,180)",
  lineColorBg: "rgba(255,255,255,0.06)",
  thickness: 14,
  endThickness: 2,
  startAngle: -135,
  totalAngle: 270,
  capType: "round"
});
```
