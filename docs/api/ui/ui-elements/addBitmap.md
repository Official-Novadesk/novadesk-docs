---
title: Bitmap element options and example usage.
---

# Bitmap Element
The Bitmap element renders frame-based image strips for meters, digits, and sprite-like indicators.

Create one with `ui.addBitmap()` and the shared [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options).

```js
ui.addBitmap(options);
```

#### Table of Contents
[[toc]]

## Bitmap Options

### `value`

- **Type**: `number`
- **Default**: `0.0`
- **Description**: Current value used to select frame(s).

### `bitmapImageName`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to the bitmap strip image.

### `bitmapFrames`

- **Type**: `number`
- **Default**: `1`
- **Description**: Number of frames in the strip.

::: info
Values less than or equal to `0` are clamped to `1`.
:::

### `bitmapZeroFrame`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Controls whether frame `0` is reserved for zero when using normalized (non-extend) mode.

### `bitmapExtend`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enables multi-digit rendering mode using repeated frames.

### `minValue`, `maxValue`

- **Type**: `number`
- **Defaults**: `0.0` and `1.0`
- **Description**: Range used to normalize `value` when `bitmapExtend` is `false`.

::: info
If `maxValue <= minValue`, max is internally adjusted to avoid zero-width range.
:::

### `bitmapOrientation`

- **Type**: `string`
- **Default**: `"auto"`
- **Description**: Frame strip orientation.

#### Valid values

- `"auto"`
- `"horizontal"`
- `"vertical"`

### `bitmapDigits`

- **Type**: `number`
- **Default**: `0`
- **Description**: Fixed digit count in `bitmapExtend` mode. `0` means auto digits.

### `bitmapAlign`

- **Type**: `string`
- **Default**: `"left"`
- **Description**: Horizontal alignment for extended digit rendering.

#### Valid values

- `"left"`
- `"center"`
- `"right"`

### `bitmapSeparation`

- **Type**: `number`
- **Default**: `0`
- **Description**: Pixel spacing between digits in `bitmapExtend` mode.

## Shared Image Options

Bitmap supports:
- `imageAlpha`
- `grayscale`
- `useExifOrientation`
- `imageTint`
- `imageFlip`
- `colorMatrix`

::: warning
`imageCrop` is ignored for Bitmap element semantics.
:::

## Runtime Notes

- `ui.addBitmap()` requires an options object.
- If `id` already exists, the previous element is replaced.
- Bitmap is frame-driven: parser forces `width` and `height` to auto mode for this element.

## Example

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

new widgetWindow({
    id: "bitmapExample",
    width: 520,
    height: 260,
    backgroundColor: "rgba(20, 24, 31, 0.96)",
    script: "ui/script.ui.js"
});
```
== ui/script.ui.js
```javascript
ui.addBitmap({
    id: "cpu-bitmap",
    x: 28,
    y: 95,
    value: 0,
    bitmapImageName: "./assets/digits-0-9.png",
    bitmapFrames: 10,
    bitmapZeroFrame: false,
    bitmapExtend: true,
    maxValue: 100,
    bitmapOrientation: "horizontal",
    bitmapDigits: 3,
    bitmapAlign: "left",
    bitmapSeparation: -8,
    imageTint: "rgba(230,245,255,1)",
    imageAlpha: 255
});
```
:::

