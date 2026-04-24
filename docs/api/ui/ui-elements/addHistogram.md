---
title: Histogram element options and example usage.
---

# Histogram Element
The Histogram element draws compact bar-by-bar graphs from one or two data arrays.

Create one with `ui.addHistogram()` and the shared [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options), [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip), and [Mouse Events Callback](/api/ui/ui-elements/general-options/general-mouse-options).

```js
ui.addHistogram(options);
```

#### Table of Contents
[[toc]]

## Histogram Options

### `data`

- **Type**: `number[]`
- **Default**: `[]`
- **Description**: Primary series values.

### `data2`

- **Type**: `number[]`
- **Default**: `[]`
- **Description**: Optional secondary series values.

::: info
When `data2` is provided, overlap is drawn with `bothColor`, and non-overlap parts use `primaryColor` or `secondaryColor`.
:::

### `autoRange`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Uses min/max from data automatically.

::: info
When `autoRange` is `false`, Histogram uses a fixed `0..100` range.
:::

### `graphStart`

- **Type**: `string`
- **Default**: `"right"`
- **Description**: Start side for sample progression.

#### Valid values

- `"left"`
- `"right"`

### `graphOrientation`

- **Type**: `string`
- **Default**: `"vertical"`
- **Description**: Direction of graph sampling.

#### Valid values

- `"vertical"`
- `"horizontal"`

### `flip`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Flips drawing direction for the active orientation.

### `primaryColor`

- **Type**: `string`
- **Default**: `"rgba(0, 128, 0, 1)"`
- **Description**: Color for primary (`data`) bars.

### `secondaryColor`

- **Type**: `string`
- **Default**: `"rgba(255, 0, 0, 1)"`
- **Description**: Color for secondary (`data2`) bars.

### `bothColor`

- **Type**: `string`
- **Default**: `"rgba(255, 255, 0, 1)"`
- **Description**: Color used where primary and secondary overlap.

## Runtime Notes

- `ui.addHistogram()` requires an options object.
- If `id` already exists, the previous element is replaced.
- Data is sampled from newest values first.
- In vertical mode, one sample is drawn per pixel column.
- In horizontal mode, one sample is drawn per pixel row.
- Histogram supports improved shape-aware hit testing. Enable `pixelHitTest: true` to use pixel-aware checks instead of only bounds.

## Example

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

new widgetWindow({
    id: "histogramExample",
    width: 980,
    height: 680,
    backgroundColor: "rgba(20, 24, 31, 0.96)",
    script: "ui/script.ui.js"
});
```
== ui/script.ui.js
```javascript
ui.addHistogram({
    id: "hist-main",
    x: 20,
    y: 80,
    width: 920,
    height: 260,
    data: [],
    data2: [],
    autoRange: false,
    graphStart: "right",
    graphOrientation: "vertical",
    flip: false,
    primaryColor: "rgba(46,184,255,0.95)",
    secondaryColor: "rgba(255,110,110,0.90)",
    bothColor: "rgba(255,232,120,0.95)",
    backgroundColor: "rgba(255,255,255,0.04)",
    backgroundColorRadius: 8
});
```
:::

