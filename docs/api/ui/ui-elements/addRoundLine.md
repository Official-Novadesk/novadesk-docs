---
title: RoundLine element options and example usage.
---

# RoundLine Element
Rounded arc elements (RoundLine) visualize progress with configurable angles and stroke styles.

Create one with `ui.addRoundLine()` and the shared [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options), [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip), and [Mouse Events Callback](/api/ui/ui-elements/general-options/general-mouse-options).

```js
ui.addRoundLine(options);
```

#### Table of Contents
[[toc]]

## RoundLine Options

### `value`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: Fill level (`0.0` empty, `1.0` full).

### `radius`

- **Type**: `number`
- **Default**: `0`
- **Description**: Arc radius; derived from width/height when `0`.

### `thickness`

- **Type**: `number`
- **Default**: `2`
- **Description**: Stroke thickness.

### `endThickness`

- **Type**: `number`
- **Default**: `-1`
- **Description**: Overwrites the end thickness when positive; `-1` matches `thickness`.

### `startAngle`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: Start angle in degrees (`0` = 12 o’clock).

### `totalAngle`

- **Type**: `number`
- **Default**: `360.0`
- **Description**: Sweep angle in degrees.

### `clockwise`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Sweep direction.

### `capType`

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Sets both start and end caps.

#### Valid values

- `"flat"`
- `"round"`

### `startCap`

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Overrides `capType` for the start cap.

### `endCap`

- **Type**: `string`
- **Default**: `"flat"`
- **Description**: Overrides `capType` for the end cap.

### `dashArray`

- **Type**: `string`
- **Default**: `""`
- **Description**: Comma-separated dash pattern (e.g., `"10, 5"`).

### `ticks`

- **Type**: `number`
- **Default**: `0`
- **Description**: Adds tick marks along the arc.

### `lineColor`

- **Type**: `string`
- **Default**: `"rgb(0, 255, 0)"`
- **Description**: Foreground arc color or gradient.

### `lineColorBg`

- **Type**: `string`
- **Default**: `"rgb(50, 50, 50)"`
- **Description**: Background arc color or gradient.

## Effective Dimensions

The RoundLine element uses effective dimensions (from `width`/`height` or auto-calculated values) for positioning and drawing calculations.

### Auto-Sizing

When `radius` is `0` or not specified, the element automatically calculates its size:

- **Auto width/height**: `radius * 2 + padding` (where padding accounts for thickness)
- The center point is calculated as `(x + effectiveWidth / 2, y + effectiveHeight / 2)`
- Hit testing and rendering both use effective dimensions for accurate positioning

### Positioning

- The center of the arc is positioned at `(x + width/2, y + height/2)` using effective dimensions
- This ensures accurate hit testing and rendering regardless of whether explicit or auto dimensions are used

## Example

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

var exampleRoundLineWindow = new widgetWindow({
    id: "exampleRoundLine",
    width: 300,
    height: 200,
    backgroundColor: "rgba(20, 20, 20, 1)",
    script: "ui/script.ui.js"
});
```
== ui/script.ui.js
```javascript
ui.addRoundLine({
    id: "cpu-ring",
    x: 40,
    y: 20,
    width: 140,
    height: 140,
    radius: 60,
    thickness: 10,
    value: 0.75,
    lineColor: "linearGradient(90, #00f, #0ff)",
    lineColorBg: "rgba(255, 255, 255, 0.1)",
    capType: "round"
});
```
:::

