---
title: Image element options and supported formats.
---

# Image Element
The Image element renders bitmap content inside a UI script via the shared element options.

Use `ui.addImage()` in your UI script (`win` is the UI script's global object).

```js
ui.addImage(options);
```

#### Table of Contents
[[toc]]

## General Element Options
Refer to [General Elements Options](/api/ui/ui-elements-api/general-elements-options) for layout, visibility, and interactivity controls.

## Image Element Options

### `path`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to the image file.

### `preserveAspectRatio`

- **Type**: `string`
- **Default**: `"stretch"`
- **Description**: Controls how the image maintains its aspect ratio.

#### Valid values

- `"stretch"`
- `"preserve"`
- `"crop"`

### `imageAlpha`

- **Type**: `number`
- **Default**: `255`
- **Description**: Opacity in the range `0-255`.

### `grayscale`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Applies a grayscale filter; works with `imageTint` and `colorMatrix`.

### `tile`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Tiles the image to fill the element area.

### `imageTint`

- **Type**: `string`
- **Default**: `""`
- **Description**: Color or gradient applied to the image.

### `colorMatrix`

- **Type**: `array` (20 or 25 numbers)
- **Default**: `[]`
- **Description**: Color transformation matrix for brightness, contrast, and color shifts.

#### Details

- 5x4 Direct2D or 5x5 Rainmeter formats are accepted.
- When 25 numbers are provided, Rainmeter handles the translation column automatically.

#### Example

```javascript
colorMatrix: [
   0.33, 0.33, 0.33, 0, 0,
   0.59, 0.59, 0.59, 0, 0,
   0.11, 0.11, 0.11, 0, 0,
   0,    0,    0,    1, 0,
   0,    0,    0,    0, 1
]
```

## Supported Image Formats

- PNG
- JPEG
- BMP
- GIF
- TIFF
- ICO
