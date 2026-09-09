---
title: addBar
description: Add a progress bar element with configurable value and styling.
---

# ui.addBar()

Draws a progress bar that fills proportionally based on a normalized `0.0–1.0` value. Supports horizontal and vertical orientation, gradient colors, and rounded corners.

```javascript
ui.addBar(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options) (position, size, visibility, tooltip, mouse events, etc.).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addBar({
  id: "cpu-bar",
  x: 16, y: 60,
  width: 260, height: 8,
  value: 0.72,
  barColor: "rgb(0,180,255)",
  backgroundColor: "rgba(255,255,255,0.08)",
  barCornerRadius: 4,
  backgroundColorRadius: 4
});
```

## Options

<PropertyBox name="value" type="number" defaultValue="0">

Normalized fill level in the range `0.0` to `1.0`. `0.0` is empty, `1.0` is full. Values outside this range are clamped to `0.0` or `1.0` before rendering.

| Value | Meaning |
|---|---|
| `0.0` | Empty |
| `0.25` | 25% filled |
| `0.5` | Half filled |
| `1.0` | Completely full |

```javascript
// Update the bar value
ui.setElementProperties("cpu-bar", { value: payload.cpu / 100 });
```

</PropertyBox>

<PropertyBox name="barColor" type="string" defaultValue='"rgb(0,255,0)"'>

Color or gradient of the filled portion. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`.

::: warning No fill without barColor
If `barColor` is not set when creating the element, **no fill is drawn at all** — not even the default green. The bar track (background) may still be visible if `backgroundColor` is set. Always provide `barColor` explicitly.
:::

```javascript
barColor: "rgb(0,180,255)"              // solid blue
barColor: "rgba(0,180,255,0.8)"         // semi-transparent
barColor: "linearGradient(90, rgb(0,120,255), rgb(0,220,180))"  // gradient
```

</PropertyBox>

<PropertyBox name="orientation" type="string" defaultValue='"horizontal"'>

The axis the bar fills along.

| Value | Behavior |
|---|---|
| `"horizontal"` | Fills from left to right (default) |
| `"vertical"` | Fills from bottom to top |

```javascript
// Vertical level meter
ui.addBar({
  id: "level",
  x: 10, y: 10,
  width: 12, height: 80,
  orientation: "vertical",
  value: 0.6,
  barColor: "rgb(0,220,120)"
});
```

</PropertyBox>

<PropertyBox name="barCornerRadius" type="number" defaultValue="0">

Corner radius in pixels applied to the filled bar only. `0` produces sharp square corners.

This is independent of `backgroundColorRadius`, which rounds the background track. Set both to the same value for a fully rounded pill appearance.

```javascript
ui.addBar({
  id: "bar",
  x: 16, y: 20,
  width: 200, height: 10,
  value: 0.5,
  barColor: "rgb(0,180,255)",
  barCornerRadius: 5,
  backgroundColor: "rgba(255,255,255,0.1)",
  backgroundColorRadius: 5   // match for a pill shape
});
```

</PropertyBox>

## Practical Examples

**CPU usage bar updated from IPC**

```javascript
// ui.js
ui.addBar({
  id: "cpu",
  x: 16, y: 50,
  width: 260, height: 6,
  value: 0,
  barColor: "rgb(0,180,255)",
  backgroundColor: "rgba(255,255,255,0.08)",
  barCornerRadius: 3,
  backgroundColorRadius: 3
});

ipcRenderer.on("stats", (event, payload) => {
  ui.setElementProperties("cpu", { value: payload.cpu / 100 });
});
```

**Multi-bar system monitor**

```javascript
ui.beginUpdate();

const track = { height: 6, backgroundColor: "rgba(255,255,255,0.08)", barCornerRadius: 3, backgroundColorRadius: 3 };

ui.addBar({ ...track, id: "cpu", x: 60, y: 30, width: 200, value: 0, barColor: "rgb(0,180,255)" });
ui.addBar({ ...track, id: "ram", x: 60, y: 50, width: 200, value: 0, barColor: "rgb(100,220,100)" });
ui.addBar({ ...track, id: "gpu", x: 60, y: 70, width: 200, value: 0, barColor: "rgb(255,140,0)" });

ui.endUpdate();

ipcRenderer.on("stats", (event, payload) => {
  ui.beginUpdate();
  ui.setElementProperties("cpu", { value: payload.cpu / 100 });
  ui.setElementProperties("ram", { value: payload.ram / 100 });
  ui.setElementProperties("gpu", { value: payload.gpu / 100 });
  ui.endUpdate();
});
```

**Gradient bar**

```javascript
ui.addBar({
  id: "health",
  x: 16, y: 40,
  width: 240, height: 12,
  value: 0.8,
  barColor: "linearGradient(90, rgb(80,200,80), rgb(200,220,80))",
  barCornerRadius: 6,
  backgroundColor: "rgba(0,0,0,0.3)",
  backgroundColorRadius: 6
});
```

**Vertical volume meter**

```javascript
ui.addBar({
  id: "volume",
  x: 140, y: 20,
  width: 14, height: 100,
  orientation: "vertical",
  value: 0.65,
  barColor: "rgb(0,220,120)",
  backgroundColor: "rgba(255,255,255,0.08)",
  barCornerRadius: 3,
  backgroundColorRadius: 3
});
```
