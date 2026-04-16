---
title: Area Graph element options and example usage.
---

# Area Graph Element
The Area Graph element draws a filled line graph from numeric data points.

Create one with `ui.addAreaGraph()` and the shared [General Element Options](/api/ui/ui-elements/general-options/general-elements-options).

```js
ui.addAreaGraph(options);
```

#### Table of Contents
[[toc]]

## Area Graph Options

### `data`

- **Type**: `number[]`
- **Default**: `[]`
- **Description**: Data points to plot.

### `minValue`, `maxValue`

- **Type**: `number`
- **Defaults**: `0` and `1`
- **Description**: Manual range used when `autoRange` is `false`.

### `autoRange`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Uses min/max from `data` automatically.

### `lineColor`

- **Type**: `string`
- **Default**: `"rgb(0, 180, 255)"`
- **Description**: Stroke color or gradient for the top line.

### `lineWidth`

- **Type**: `number`
- **Default**: `1.0`
- **Description**: Top line thickness.

### `fillColor`

- **Type**: `string`
- **Default**: `"rgba(0, 180, 255, 0.2)"` (approx.)
- **Description**: Fill color or gradient for the area below the line.

### `maxPoints`

- **Type**: `number`
- **Default**: `0`
- **Description**: Trims stored data to the latest N points when greater than `0`.

### `gridVisible`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Shows or hides graph grid lines.

::: info
When `gridVisible` is `false`, no grid lines are drawn even if `gridColor`, `gridX`, and `gridY` are set.
:::

### `gridColor`

- **Type**: `string`
- **Default**: `"rgba(100, 100, 100, 0.39)"` (approx.)
- **Description**: Grid line color or gradient.

### `gridX`, `gridY`

- **Type**: `number`
- **Defaults**: `20` and `20`
- **Description**: Horizontal and vertical grid spacing in pixels.

::: info
Values less than or equal to `0` disable that axis grid direction.
:::

### `graphStart`

- **Type**: `string`
- **Default**: `"right"`
- **Description**: Side where newest samples appear.

#### Valid values

- `"left"`
- `"right"`

### `flip`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Flips graph vertically.

## Example

```javascript
ui.addAreaGraph({
    id: "cpu-graph",
    x: 20,
    y: 60,
    width: 560,
    height: 200,
    data: [],
    minValue: 0,
    maxValue: 100,
    autoRange: false,
    lineColor: "#00b4ff",
    lineWidth: 2,
    fillColor: "rgba(0, 179, 255, 0.28)",
    gridVisible: true,
    gridColor: "rgba(255,255,255,0.16)",
    gridX: 30,
    gridY: 20,
    maxPoints: 120,
    graphStart: "right"
});
```
