---
title: addHistogram
---

# ui.addHistogram()

Draws a bar-by-bar histogram from one or two data arrays. Each data point maps to one pixel-wide column (vertical) or one pixel-tall row (horizontal). Supports single-channel and dual-channel (overlay comparison) modes.

```javascript
ui.addHistogram(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) (position, size, visibility, tooltip, mouse events, etc.).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
// Single-channel — CPU history
ui.addHistogram({
  id: "cpu-hist",
  x: 16, y: 40,
  width: 260, height: 60,
  primaryColor: "rgb(0,180,255)",
  autoRange: false
});

// Dual-channel — CPU vs RAM comparison
ui.addHistogram({
  id: "dual",
  x: 16, y: 120,
  width: 260, height: 60,
  primaryColor: "rgb(0,180,255)",
  secondaryColor: "rgb(100,220,100)",
  bothColor: "rgb(255,200,50)"
});
```

## Data

Each bar corresponds to one sample. Bars are exactly **1 pixel wide** in vertical orientation (default), so the element width directly determines how many samples are visible. In horizontal orientation each bar is **1 pixel tall**, so the element height sets the visible sample count.

The newest sample is always `data[data.length - 1]` and anchors to the edge set by `graphStart`. Older samples scroll toward the opposite edge.

<PropertyBox name="data" type="number[]" defaultValue="[]">

Primary data series. Each value produces one bar. Values are scaled against the range defined by `autoRange`/the fixed 0–100 default.

```javascript
ui.setElementProperties("cpu-hist", { data: cpuHistory });
```

</PropertyBox>

<PropertyBox name="data2" type="number[]" defaultValue="[]">

Secondary data series for dual-channel mode. When provided, each column shows the relationship between `data[i]` and `data2[i]` using three color regions.

When `data2` is empty, the element operates in single-channel mode and only `primaryColor` is used.

```javascript
ui.setElementProperties("dual", { data: cpuHistory, data2: memHistory });
```

</PropertyBox>

## Colors

### Single-channel mode

When only `data` is provided, the full bar height is drawn using `primaryColor`.

### Dual-channel mode

When both `data` and `data2` are provided, each column is split into up to three regions drawn from the base upward:

| Region | Color | Condition |
|---|---|---|
| Overlap | `bothColor` | `min(data[i], data2[i])` — present in both |
| Primary excess | `primaryColor` | The portion where `data[i]` exceeds `data2[i]` |
| Secondary excess | `secondaryColor` | The portion where `data2[i]` exceeds `data[i]` |

<PropertyBox name="primaryColor" type="string" defaultValue='"rgb(0,128,0)"'>

Color or gradient for the primary data channel. In single-channel mode this colors the entire bar. In dual-channel mode this colors only the portion where `data` exceeds `data2`. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`.

Gradients span the full element bounds, not individual bars.

</PropertyBox>

<PropertyBox name="secondaryColor" type="string" defaultValue='"rgb(255,0,0)"'>

Color or gradient for the secondary data excess (where `data2` exceeds `data`). Only used in dual-channel mode when `data2` is non-empty.

</PropertyBox>

<PropertyBox name="bothColor" type="string" defaultValue='"rgb(255,255,0)"'>

Color or gradient for the overlap region — the portion of the bar height shared by both channels. Drawn at the base of each column, below the primary or secondary excess.

</PropertyBox>

## Scale and Range

<PropertyBox name="autoRange" type="boolean" defaultValue="false">

When `false`, values are scaled against a fixed 0–100 range. Values below 0 are clamped to empty, values above 100 fill the full bar height.

When `true`, the engine scans both `data` and `data2` to find the actual minimum and maximum, then uses that range for scaling. Useful when the data range is not known in advance.

::: tip
When the full data range collapses to a single value, `autoRange` expands the range by ±0.5 to avoid a zero-range division.
:::

</PropertyBox>

## Layout and Orientation

<PropertyBox name="graphStart" type="string" defaultValue='"right"'>

Which edge the newest data point anchors to. Case-insensitive.

| Value | Newest sample position |
|---|---|
| `"right"` | Right edge — older data scrolls left (default) |
| `"left"` | Left edge — older data scrolls right |

</PropertyBox>

<PropertyBox name="graphOrientation" type="string" defaultValue='"vertical"'>

The axis along which bars grow. Case-insensitive.

| Value | Bar direction | Samples per pixel |
|---|---|---|
| `"vertical"` | Bottom to top (default) | One column per pixel of width |
| `"horizontal"` | Left to right | One row per pixel of height |

</PropertyBox>

<PropertyBox name="flip" type="boolean" defaultValue="false">

Inverts the fill direction.

- Vertical mode: `false` fills from bottom up, `true` fills from top down
- Horizontal mode: `false` fills from the `graphStart` edge, `true` inverts that direction

</PropertyBox>

## Practical Examples

**CPU history histogram updated from IPC**

```javascript
// ui.js
ui.addHistogram({
  id: "cpu",
  x: 16, y: 40,
  width: 260, height: 50,
  primaryColor: "rgb(0,180,255)",
  autoRange: false
});

ipcRenderer.on("stats", (event, payload) => {
  const current = ui.getElementProperty("cpu", "data") ?? [];
  current.push(payload.cpu);
  ui.setElementProperties("cpu", { data: current });
});
```

**Dual-channel CPU vs GPU comparison**

```javascript
ui.addHistogram({
  id: "compare",
  x: 16, y: 110,
  width: 260, height: 50,
  primaryColor: "rgb(0,180,255)",
  secondaryColor: "rgb(255,140,0)",
  bothColor: "rgb(180,80,200)",
  autoRange: false
});

ipcRenderer.on("stats", (event, payload) => {
  const cpuData = ui.getElementProperty("compare", "data") ?? [];
  const gpuData = ui.getElementProperty("compare", "data2") ?? [];
  cpuData.push(payload.cpu);
  gpuData.push(payload.gpu);
  ui.setElementProperties("compare", { data: cpuData, data2: gpuData });
});
```

**Audio spectrum — peaks hang from the top**

```javascript
ui.addHistogram({
  id: "spectrum",
  x: 16, y: 180,
  width: 260, height: 60,
  primaryColor: "rgb(100,220,100)",
  flip: true,
  autoRange: true
});
```

**Horizontal network bandwidth bars**

```javascript
ui.addHistogram({
  id: "net",
  x: 16, y: 250,
  width: 260, height: 40,
  graphOrientation: "horizontal",
  graphStart: "right",
  primaryColor: "rgb(100,180,255)",
  autoRange: true
});
```
