---
title: addLine
---

# ui.addLine()

Draws one or more scrolling line graphs from numeric data arrays. Supports multiple overlapping lines on a single element, per-line colors and scale multipliers, horizontal reference lines, and both vertical and horizontal orientations.

```javascript
ui.addLine(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) (position, size, visibility, tooltip, mouse events, etc.).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
// Single CPU history line
ui.addLine({
  id: "cpu-line",
  x: 16, y: 40,
  width: 260, height: 60,
  data: [],
  lineColor: "rgb(0,180,255)",
  lineWidth: 1.5,
  rangeMin: 0, rangeMax: 100,
  maxPoints: 60,
  graphStart: "right"
});

// Two overlapping lines — CPU and RAM
ui.addLine({
  id: "dual",
  x: 16, y: 120,
  width: 260, height: 60,
  lineCount: 2,
  lineColor:  "rgb(0,180,255)",
  lineColor2: "rgb(100,220,100)",
  rangeMin: 0, rangeMax: 100,
  maxPoints: 60
});
```

## Multi-Line Properties

The line element supports up to N simultaneous lines on one element. The number of lines is set by `lineCount`. Each line gets its own `data`, `lineColor`, and `lineScale` property, named with a numeric suffix.

| Line index | Data key | Color key | Scale key |
|---|---|---|---|
| 1 (first) | `data` | `lineColor` | `lineScale` |
| 2 | `data2` | `lineColor2` | `lineScale2` |
| 3 | `data3` | `lineColor3` | `lineScale3` |
| N | `dataN` | `lineColorN` | `lineScaleN` |

<PropertyBox name="lineCount" type="number" defaultValue="1">

Number of lines drawn simultaneously. Each line has its own `data`, `lineColor`, and `lineScale` property. All lines share `lineWidth`, `rangeMin`, `rangeMax`, `maxPoints`, `graphStart`, `graphOrientation`, and `flip`.

Values less than `1` are clamped to `1`.

```javascript
lineCount: 2
```

</PropertyBox>

## Data

<PropertyBox name="data, data2, data3..." type="number[]" defaultValue="[]">

Data points for each line. Use `data` for the first line, `data2` for the second, etc.

The newest sample is always at the end of the array (`data[data.length - 1]`) and anchors to the `graphStart` edge. Older samples scroll toward the opposite edge.

```javascript
// Three lines on one element
ui.addLine({
  id: "triple",
  lineCount: 3,
  data:  cpuHistory,
  data2: ramHistory,
  data3: gpuHistory
});
```

</PropertyBox>

## Scale and Range

<PropertyBox name="rangeMin" type="number" defaultValue="0">

Lower bound of the Y-axis. A data value equal to `rangeMin` appears at the bottom of the graph (or left edge in horizontal orientation).

If `rangeMax` is less than `rangeMin` after parsing, the two values are automatically swapped. If both are equal, `rangeMax` is set to `rangeMin + 1` to avoid a zero-range division.

</PropertyBox>

<PropertyBox name="rangeMax" type="number" defaultValue="100">

Upper bound of the Y-axis. A data value equal to `rangeMax` appears at the top of the graph (or right edge in horizontal orientation).

```javascript
rangeMin: 0, rangeMax: 100    // percentage
rangeMin: 0, rangeMax: 8000   // RPM
rangeMin: -50, rangeMax: 50   // symmetric around zero
```

</PropertyBox>

<PropertyBox name="autoRange" type="boolean" defaultValue="false">

When `true`, `rangeMin` and `rangeMax` are ignored. The Y-axis bounds are calculated automatically from the actual min and max values across all lines, after applying each line's `lineScale` multiplier.

When all data is flat (all values identical), the range is padded by ±0.5 to avoid a zero-range division.

::: tip
Use `autoRange: true` when the value range is unknown or highly variable. Use a fixed `rangeMin`/`rangeMax` for stable visualizations like CPU percentage (always 0–100).
:::

</PropertyBox>

<PropertyBox name="lineScale, lineScale2, lineScale3..." type="number" defaultValue="1">

Per-line multiplier applied to each data value before Y-axis scaling. Useful for overlaying data in different units on the same graph. Non-finite values (NaN, Infinity) are silently clamped to `1.0`.

```javascript
// Mix bytes/sec and kilobytes/sec on one 0–1000 KB graph
lineCount: 2,
rangeMin: 0, rangeMax: 1000,
lineScale:  0.001,   // bytes → KB (÷ 1000)
lineScale2: 1.0      // already in KB
```

</PropertyBox>

<PropertyBox name="maxPoints" type="number" defaultValue="0">

Maximum number of data points stored per line. When exceeded, the oldest values are discarded. Also determines the point spacing so the graph fills the full width even while the data array is still filling up.

`0` means no limit and spacing shrinks as data is added. Values less than `0` are clamped to `0`.

```javascript
maxPoints: 60   // rolling 60-sample window at 1 sample/sec
```

</PropertyBox>

## Appearance

<PropertyBox name="lineColor, lineColor2, lineColor3..." type="string" defaultValue='"rgb(255,255,255)"'>

Stroke color or gradient for each line. Default is white. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`. Gradients span the full element bounds, not the line path.

```javascript
lineColor:  "rgb(0,180,255)"
lineColor2: "rgb(100,220,100)"
lineColor3: "rgba(255,140,0,0.8)"
```

</PropertyBox>

<PropertyBox name="lineWidth" type="number" defaultValue="1">

Stroke thickness in pixels, shared by all lines. Values less than `1.0` are clamped to `1.0`.

</PropertyBox>

<PropertyBox name="horizontalLines" type="boolean" defaultValue="false">

When `true`, draws four evenly spaced horizontal reference lines across the element, rendered behind all data lines. Lines are positioned at 20%, 40%, 60%, and 80% of the element height.

::: tip Aligning grid lines with values
The reference lines are positioned by pixel percentage, not by data value. To align a line at a specific value, calculate its pixel position manually using `rangeMin`, `rangeMax`, and the element height.
:::

</PropertyBox>

<PropertyBox name="horizontalLineColor" type="string" defaultValue='"rgb(0,0,0)"'>

Color or gradient for the four horizontal reference lines. Only used when `horizontalLines` is `true`. Reference lines are always 1px thick regardless of `lineWidth`.

```javascript
horizontalLineColor: "rgba(255,255,255,0.12)"
```

</PropertyBox>

## Layout and Orientation

<PropertyBox name="graphStart" type="string" defaultValue='"right"'>

Which edge the newest data point anchors to. Case-insensitive.

| Value | Newest sample position |
|---|---|
| `"right"` | Right edge, older data scrolls left (default) |
| `"left"` | Left edge, older data scrolls right |

</PropertyBox>

<PropertyBox name="graphOrientation" type="string" defaultValue='"vertical"'>

The axis along which data values are plotted. Case-insensitive.

| Value | Data maps to | Scroll direction |
|---|---|---|
| `"vertical"` | Y axis (height) | Data scrolls horizontally (default) |
| `"horizontal"` | X axis (width) | Data scrolls vertically |

</PropertyBox>

<PropertyBox name="flip" type="boolean" defaultValue="false">

Inverts the value axis.

- Vertical: `false` = high values at top. `true` = high values at bottom.
- Horizontal: `false` = high values at right. `true` = high values at left.

</PropertyBox>

<PropertyBox name="transformStroke" type="string" defaultValue='"normal"'>

How stroke width behaves when the element has a `transformMatrix` applied.

| Value | Behavior |
|---|---|
| `"normal"` | Stroke width scales with the transform (default) |
| `"fixed"` | Stroke width stays at its exact pixel value regardless of transform |

```javascript
// 2× scale transform — with "fixed", line stays 1px; with "normal" it becomes 2px
lineWidth: 1,
transformStroke: "fixed",
transformMatrix: [2, 0, 0, 2, 0, 0]
```

</PropertyBox>

## Practical Examples

**Single CPU line updated from IPC**

```javascript
// ui.js
ui.addLine({
  id: "cpu",
  x: 16, y: 40,
  width: 260, height: 60,
  lineColor: "rgb(0,180,255)",
  lineWidth: 1.5,
  rangeMin: 0, rangeMax: 100,
  maxPoints: 60
});

ipcRenderer.on("stats", (event, payload) => {
  const data = ui.getElementProperty("cpu", "data") ?? [];
  data.push(payload.cpu);
  ui.setElementProperties("cpu", { data });
});
```

**Two overlapping lines with reference grid**

```javascript
ui.addLine({
  id: "dual",
  x: 16, y: 110,
  width: 260, height: 60,
  lineCount: 2,
  lineColor:  "rgb(0,180,255)",
  lineColor2: "rgb(100,220,100)",
  rangeMin: 0, rangeMax: 100,
  maxPoints: 60,
  horizontalLines: true,
  horizontalLineColor: "rgba(255,255,255,0.08)"
});

ipcRenderer.on("stats", (event, payload) => {
  const cpuData = ui.getElementProperty("dual", "data")  ?? [];
  const ramData = ui.getElementProperty("dual", "data2") ?? [];
  cpuData.push(payload.cpu);
  ramData.push(payload.ram);
  ui.setElementProperties("dual", { data: cpuData, data2: ramData });
});
```

**Auto-scaling network graph**

```javascript
ui.addLine({
  id: "net",
  x: 16, y: 180,
  width: 260, height: 50,
  lineColor: "rgb(255,180,50)",
  autoRange: true,
  maxPoints: 60
});
```

**Horizontal orientation for a vertical meter**

```javascript
ui.addLine({
  id: "vert-meter",
  x: 16, y: 20,
  width: 30, height: 200,
  graphOrientation: "horizontal",
  graphStart: "right",
  lineColor: "rgb(0,220,120)",
  lineWidth: 2,
  rangeMin: 0, rangeMax: 100
});
```

**Mixed-unit overlay with lineScale**

```javascript
// Show CPU (0–100) and temperature (0–100 mapped from 30–90°C) on the same graph
ui.addLine({
  id: "mix",
  x: 16, y: 240,
  width: 260, height: 60,
  lineCount: 2,
  lineColor:  "rgb(0,180,255)",   // CPU %
  lineColor2: "rgb(255,80,80)",   // Temperature normalized to 0–100
  rangeMin: 0, rangeMax: 100,
  lineScale2: 100 / (90 - 30),   // map 30–90°C to 0–100 range
  maxPoints: 60
});
```
