
# Image Element

Image UI element in Novadesk with all options and methods.

## Adding an Image Element

Use the `addImage()` method on the `win` object within a [UI Script](/guides/script-types/#ui-script-the-face):

```js
win.addImage(options);
```

## General Element Options

See general element options [here](/api/ui-elements-api/general-elements-options/).

---

## Image Element Options

### `path`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to the image file.

---

### `preserveAspectRatio`

- **Type**: `string`
- **Default**: `"stretch"`
- **Description**: Controls how the image maintains its aspect ratio.

- **Valid values**:
  - `"stretch"`: Stretch image to fill the specified dimensions
  - `"preserve"`: Fit image within dimensions while maintaining aspect ratio
  - `"crop"`: Crop image to fill dimensions while maintaining aspect ratio

---

### `imageAlpha`

- **Type**: `number`
- **Default**: `255`
- **Description**: Image opacity value in the range `0–255`.

---

### `grayscale`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Applies a grayscale filter to the image when enabled. When combined with `imageTint` or `colorMatrix`, the grayscale effect is applied first.

---

### `tile`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Repeats (tiles) the image to fill the element area. Hardware-accelerated effects (Greyscale, Tint) are fully supported on tiled images.

---

### `imageTint`

- **Type**: `string`
- **Default**: `""`
- **Description**: [Color](/guides/colors/) applied to the image.

---

### `colorMatrix`

- **Type**: `array` (25 numbers)
- **Default**: `[]`
- **Description**: A 5x5 color transformation matrix used for advanced color effects (e.g., brightness, contrast, alpha, color shifting). For a comprehensive guide and more examples, see the [Color Matrix Guide](/guides/color-matrix-guide/). The array can contain either **20 numbers** (5x4 Direct2D format) or **25 numbers** (5x5 Rainmeter format). Elements can use `grayscale` and `colorMatrix` simultaneously; effects are chained sequentially.

If 25 numbers are used, the 5th value of each row (the translation/W column) is automatically handled for compatibility with Direct2D.

- **Example**:
```javascript
// Grayscale matrix
colorMatrix: [
   0.33, 0.33, 0.33, 0, 0,
   0.59, 0.59, 0.59, 0, 0,
   0.11, 0.11, 0.11, 0, 0,
   0,    0,    0,    1, 0,
   0,    0,    0,    0, 1
]
```

---

## Supported Image Formats

Novadesk supports the following image formats:

- PNG
- JPEG
- BMP
- GIF
- TIFF
- ICO
