---
title: Line element options and example usage.
---

# Line Element
The Line element draws one or more graph lines using `ui.addLine()` inside a UI script.

Use it for sparkline-style charts, trends, or compact mini graphs.

Create one with `ui.addLine()` and the shared [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options).

```js
ui.addLine(options);
```

#### Table of Contents
[[toc]]

## Line Options

### `lineCount`

- **Type**: `number`
- **Default**: `1`
- **Description**: Number of lines to draw.

::: info
Minimum is `1`. Values lower than `1` are clamped to `1`.
:::

### `lineWidth`

- **Type**: `number`
- **Default**: `1.0`
- **Description**: Stroke width for all lines.

::: info
Minimum is `1.0`.
:::

### `maxPoints`

- **Type**: `number`
- **Default**: `0`
- **Description**: Fixed graph capacity for spacing and history trimming.

::: info
- `0` disables capacity limiting.
- Negative values are clamped to `0`.
- When set above `0`, older points are trimmed to keep only the latest `maxPoints` values.
:::

### `horizontalLines`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Draws horizontal guide lines.

::: info
When enabled, the renderer draws 4 evenly-spaced guide lines.
:::

### `horizontalLineColor`

- **Type**: `string`
- **Default**: `"rgba(0, 0, 0, 1)"`
- **Description**: Color/alpha for guide lines.

### `graphStart`

- **Type**: `string`
- **Default**: `"right"`
- **Description**: Starting side for point progression.

#### Valid values

- `"left"`
- `"right"`

### `graphOrientation`

- **Type**: `string`
- **Default**: `"vertical"`
- **Description**: Axis orientation of graph progression.

#### Valid values

- `"vertical"`: points advance across X, values map to Y
- `"horizontal"`: points advance across Y, values map to X

### `flip`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Flips value direction for the active orientation.

### `transformStroke`

- **Type**: `string`
- **Default**: `"normal"`
- **Description**: Stroke transform behavior.

#### Valid values

- `"normal"`
- `"fixed"`

### `autoRange`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Automatically picks a min and max based on your data.

### `rangeMin`, `rangeMax`

- **Type**: `number`
- **Defaults**: `0` and `100`
- **Description**: Manual value range used when `autoRange` is `false`.

::: info
- If `rangeMax < rangeMin`, values are swapped.
- If both are equal, range is auto-adjusted to avoid zero-width scale.
:::

## Multiple Lines

If you want only one line, use:
- `lineCount: 1`
- `data`
- `lineColor`
- `lineScale` (optional)

If you want two lines, use:
- `lineCount: 2`
- first line: `data`, `lineColor`, `lineScale`
- second line: `data2`, `lineColor2`, `lineScale2`

For more lines, continue the same pattern:
- third line: `data3`, `lineColor3`, `lineScale3`
- fourth line: `data4`, `lineColor4`, `lineScale4`

### `data*`

- **Type**: `number[]`
- **Description**: The points for one line.

::: info
Each `data*` array accepts one or more values, but at least 2 points are needed to render a visible segment.
:::

### `lineColor*`

- **Type**: `string`
- **Default**: `"rgba(255, 255, 255, 1)"`
- **Description**: Color of that line.

### `lineScale*`

- **Type**: `number`
- **Default**: `1.0`
- **Description**: Multiplies values for that line (for example `2` makes it twice as large).

::: info
Invalid non-finite scale values fallback to `1.0`.
:::

## Runtime Notes

- `ui.addLine()` requires an options object.
- If `id` already exists, the previous element is replaced.
- A line with fewer than 2 points is not drawn.
- `lineCount` controls how many `data*`, `lineColor*`, and `lineScale*` slots are active.
- If you skip `data2`/`data3` etc., those extra lines stay empty.

## Beginner Tips

- Start with one line (`lineCount: 1`) and add more later.
- Use `autoRange: true` first so values fit automatically.
- Turn on `horizontalLines: true` to make charts easier to read.
- Use `ui.setElementProperty(...)` to update only the data while keeping style the same.

## Examples

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

var lineExampleWindow = new widgetWindow({
    id: "lineExample",
    width: 420,
    height: 220,
    backgroundColor: "rgba(16, 18, 24, 1)",
    script: "ui/script.ui.js"
});
```
== ui/script.ui.js
```javascript
ui.addLine({
    id: "cpu-line",
    x: 20,
    y: 20,
    width: 380,
    height: 160,

    lineCount: 1,
    lineWidth: 2,
    lineColor: "rgba(0, 255, 170, 1)",
    data: [22, 35, 30, 45, 41, 55, 48, 62, 59, 52],

    horizontalLines: true,
    horizontalLineColor: "rgba(255, 255, 255, 0.18)",
    graphStart: "right",
    graphOrientation: "vertical",
    autoRange: true
});
```
:::

### Multi-Line Example

```javascript
ui.addLine({
    id: "net-lines",
    x: 20,
    y: 20,
    width: 380,
    height: 160,
    lineCount: 2,
    lineWidth: 2,

    data:  [10, 20, 15, 30, 25, 40, 35],
    data2: [4,  8,  12, 18, 16, 22, 20],

    lineColor:  "rgba(0, 180, 255, 1)",
    lineColor2: "rgba(255, 170, 0, 1)",

    lineScale: 1,
    lineScale2: 2,

    autoRange: true,
    horizontalLines: true
});
```

### Runtime Update Example

```javascript
const values = [28, 29, 31, 30, 33, 34, 36, 35];

ui.setElementProperty("cpu-line", {
    data: values,
    autoRange: true
});
```

