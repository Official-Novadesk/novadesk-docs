---
title: addAreaGraph
---

# ui.addAreaGraph()

Draws a scrolling filled area graph from an array of numeric data points. The newest point always anchors to one edge and older points scroll toward the other edge as new data arrives.

```javascript
ui.addAreaGraph(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) (position, size, visibility, tooltip, mouse events, etc.).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addAreaGraph({
  id: "cpu-graph",
  x: 16, y: 40,
  width: 260, height: 60,
  lineColor: "rgb(0,180,255)",
  fillColor: "rgba(0,180,255,0.15)",
  lineWidth: 1.5,
  minValue: 0, maxValue: 100,
  gridX: 40, gridY: 20,
  maxPoints: 60
});
```

## Data

<PropertyBox name="data" type="number[]" defaultValue="[]">

Array of numeric values to plot. Each value corresponds to one point on the graph, plotted sequentially from the newest edge to the oldest. Values are stored as floats.

When `maxPoints` is set and the array exceeds that limit, only the most recent `maxPoints` values are kept.

```javascript
// Provide initial data
ui.addAreaGraph({
  id: "graph",
  data: [10, 25, 40, 30, 60, 55, 70],
  minValue: 0, maxValue: 100
});

// Append a new reading via setElementProperties
ipcRenderer.on("update", (event, payload) => {
  const current = ui.getElementProperty("graph", "data") ?? [];
  current.push(payload.value);
  ui.setElementProperties("graph", { data: current });
});
```

</PropertyBox>

<PropertyBox name="minValue" type="number" defaultValue="0">

The lower bound of the Y-axis scale. Values at or below `minValue` are clamped to the bottom of the graph. Used when `autoRange` is `false`.

</PropertyBox>

<PropertyBox name="maxValue" type="number" defaultValue="1">

The upper bound of the Y-axis scale. Values at or above `maxValue` are clamped to the top of the graph. Used when `autoRange` is `false`.

</PropertyBox>

<PropertyBox name="autoRange" type="boolean" defaultValue="false">

When `true`, the Y-axis scale is automatically calculated from the minimum and maximum values in the current `data` array. `minValue` and `maxValue` are ignored.

When all data points are identical, the range expands by ±0.5 to avoid a zero-range division.

::: tip
Use `autoRange: true` when you do not know the value range in advance. Use a fixed `minValue`/`maxValue` when the range is known (e.g. CPU percentage is always 0–100) for a stable, non-jumping graph.
:::

</PropertyBox>

<PropertyBox name="maxPoints" type="number" defaultValue="0">

Maximum number of data points stored and rendered at one time. When the data array exceeds this size, the oldest values are discarded.

`0` means no limit. Negative values are treated as `0`.

Spacing between points is calculated from `maxPoints` when set, so the graph always fills the full width even while the data array is still filling up.

</PropertyBox>

## Line and Fill

<PropertyBox name="lineColor" type="string" defaultValue='"rgb(0,180,255)"'>

Color or gradient of the line drawn along the top edge of the filled area. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`.

The line is always rendered at full opacity regardless of any alpha component in the color string.

</PropertyBox>

<PropertyBox name="lineWidth" type="number" defaultValue="1">

Thickness of the top edge line in pixels. Values below `0.1` are clamped to `0.1`.

A thicker line also increases the hit-test tolerance when `pixelHitTest` is enabled.

</PropertyBox>

<PropertyBox name="fillColor" type="string" defaultValue='"rgba(0,180,255,0.2)"'>

Color or gradient of the filled area beneath the line. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`.

The alpha component of the color string controls fill transparency. Set it to `0` or use a fully transparent color to draw only the line with no fill.

```javascript
fillColor: "rgba(0,180,255,0.15)"    // subtle fill
fillColor: "rgba(0,180,255,0)"       // no fill — line only
```

</PropertyBox>

## Grid

<PropertyBox name="gridVisible" type="boolean" defaultValue="true">

Master toggle for grid line rendering. When `false`, no grid lines are drawn regardless of `gridX`, `gridY`, or `gridColor` settings.

</PropertyBox>

<PropertyBox name="gridColor" type="string" defaultValue='"rgba(100,100,100,0.4)"'>

Color or gradient applied to all grid lines. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`.

If the resolved alpha of the color is `0`, grid lines are not rendered even when `gridVisible` is `true`.

</PropertyBox>

<PropertyBox name="gridX" type="number" defaultValue="20">

Pixel spacing between vertical grid lines. `0` or negative disables vertical grid lines.

</PropertyBox>

<PropertyBox name="gridY" type="number" defaultValue="20">

Pixel spacing between horizontal grid lines. `0` or negative disables horizontal grid lines.

</PropertyBox>

## Layout and Orientation

<PropertyBox name="graphStartLeft" type="boolean" defaultValue="false">

Controls which edge the newest data point anchors to.

- `false` — newest point on the right, older points scroll left (default)
- `true` — newest point on the left, older points scroll right

</PropertyBox>

<PropertyBox name="flip" type="boolean" defaultValue="false">

Inverts the vertical axis. When `false`, high values appear at the top. When `true`, high values appear at the bottom.

</PropertyBox>

## Practical Examples

**Live CPU usage graph updated from IPC**

```javascript
// ui.js
const CPU_HISTORY = 60;

ui.addAreaGraph({
  id: "cpu",
  x: 16, y: 40,
  width: 260, height: 60,
  lineColor: "rgb(0,180,255)",
  fillColor: "rgba(0,180,255,0.12)",
  lineWidth: 1.5,
  minValue: 0, maxValue: 100,
  maxPoints: CPU_HISTORY,
  gridX: 0, gridY: 25
});

ipcRenderer.on("cpu-update", (event, payload) => {
  const data = ui.getElementProperty("cpu", "data") ?? [];
  data.push(payload.usage);
  ui.setElementProperties("cpu", { data });
});
```

**Network graph with auto-scaling range**

```javascript
ui.addAreaGraph({
  id: "net",
  x: 16, y: 120,
  width: 260, height: 50,
  lineColor: "rgb(100,220,100)",
  fillColor: "rgba(100,220,100,0.1)",
  autoRange: true,
  maxPoints: 60,
  gridVisible: false
});
```

**Line-only graph (no fill)**

```javascript
ui.addAreaGraph({
  id: "temp",
  x: 16, y: 80,
  width: 260, height: 40,
  lineColor: "rgb(255,140,0)",
  fillColor: "rgba(0,0,0,0)",
  lineWidth: 2,
  minValue: 0, maxValue: 100,
  gridX: 0, gridY: 0
});
```

**Multiple graphs stacked in a layout**

```javascript
ui.beginUpdate();

const graphProps = {
  width: 260, height: 48,
  lineWidth: 1.5,
  minValue: 0, maxValue: 100,
  maxPoints: 60,
  gridX: 0, gridY: 25
};

ui.addAreaGraph({ ...graphProps, id: "cpu-graph", x: 16, y: 20,  lineColor: "rgb(0,180,255)",  fillColor: "rgba(0,180,255,0.12)"  });
ui.addAreaGraph({ ...graphProps, id: "mem-graph", x: 16, y: 80,  lineColor: "rgb(100,220,100)", fillColor: "rgba(100,220,100,0.12)" });
ui.addAreaGraph({ ...graphProps, id: "gpu-graph", x: 16, y: 140, lineColor: "rgb(255,140,0)",   fillColor: "rgba(255,140,0,0.12)"   });

ui.endUpdate();
```
