---
title: Rotator element options and example usage.
---

# Rotator Element
The Rotator element rotates an image based on a value range or remainder cycle.

Create one with `ui.addRotator()` and the shared [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options), [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip), and [Mouse Events Callback](/api/ui/ui-elements/general-options/general-mouse-options).

```js
ui.addRotator(options);
```

#### Table of Contents
[[toc]]

## Rotator Options

### `value`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: Current value that controls rotation.

### `rotatorImageName`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to the image to rotate.

### `minValue`, `maxValue`

- **Type**: `number`
- **Defaults**: `0.0` and `1.0`
- **Description**: Value range used for normalization when `valueRemainder` is `0`.

::: info
If `maxValue <= minValue`, max is internally adjusted to avoid zero-width range.
:::

### `offsetX`, `offsetY`

- **Type**: `number`
- **Defaults**: `0.0` and `0.0`
- **Description**: Rotation pivot offset inside the image.

### `startAngle`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: Base start angle in radians.

### `rotationAngle`

- **Type**: `number`
- **Default**: `6.283185307179586` (2 * PI)
- **Description**: Total sweep in radians for normalized value range.

### `valueRemainder`

- **Type**: `number`
- **Default**: `0`
- **Description**: Enables modulo-based rotation mode when greater than `0`.

::: info
When `valueRemainder > 0`, normalized value is computed as `(value % valueRemainder) / valueRemainder`.
:::

## Shared Image Options

Rotator supports:
- `imageAlpha`
- `grayscale`
- `useExifOrientation`
- `imageTint`
- `imageFlip`
- `colorMatrix`

::: warning
`imageCrop` is ignored for Rotator element semantics.
:::

## Runtime Notes

- `ui.addRotator()` requires an options object.
- If `id` already exists, the previous element is replaced.
- Rotation is rendered in degrees internally, but input angles are in radians.
- Rotator supports improved shape-aware hit testing. Enable `pixelHitTest: true` to use pixel-aware checks instead of only bounds.

## Example

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

new widgetWindow({
    id: "rotatorExample",
    width: 520,
    height: 360,
    backgroundColor: "rgba(20, 24, 31, 0.96)",
    script: "ui/script.ui.js"
});
```
== ui/script.ui.js
```javascript
ui.addRotator({
    id: "cpu-needle",
    x: 150,
    y: 86,
    width: 220,
    height: 220,
    value: 0,
    rotatorImageName: "./assets/needle.png",
    offsetX: 110,
    offsetY: 110,
    startAngle: -2.35619449,
    rotationAngle: 4.71238898,
    maxValue: 100,
    imageAlpha: 255
});
```
:::

