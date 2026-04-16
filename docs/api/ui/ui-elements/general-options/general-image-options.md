---
title: Shared image options for UI image-based elements.
---

# General Image Options
Options shared by image-based UI elements such as `ui.addImage()`, `ui.addButton()`, `ui.addBitmap()`, and `ui.addRotator()`.

Use these together with [General Element Options](/api/ui/ui-elements/general-options/general-elements-options).

#### Table of Contents
[[toc]]

## Image Processing Options

### `imageAlpha`

- **Type**: `number`
- **Default**: `255`
- **Description**: Image opacity in the range `0-255`.

### `grayscale`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enables grayscale rendering.

### `useExifOrientation`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Applies EXIF orientation metadata if available.

### `imageTint`

- **Type**: `string`
- **Default**: `""`
- **Description**: Tint color or gradient applied to the image.

### `imageFlip`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Flips image output.

#### Valid values

- `"none"`
- `"horizontal"`
- `"vertical"`
- `"both"`

### `colorMatrix`

- **Type**: `array` (20 numbers)
- **Default**: `[]`
- **Description**: Direct2D 5x4 color matrix for advanced color effects.

## Crop Options

### `imageCrop`

- **Type**: `number[]`
- **Default**: `[]`
- **Description**: Crops the source image region.

#### Syntax

- `[x, y, width, height]`
- `[x, y, width, height, origin]`

::: info
`origin` is optional and clamped to valid internal origin values.
:::

## Compatibility Notes

- `imageCrop` works with `ui.addImage()` and `ui.addButton()`.
- `imageCrop` is ignored by `ui.addBitmap()` and `ui.addRotator()`.
