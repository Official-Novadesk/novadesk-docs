---
title: Shared UI element options.
---

# General Elements Options
Options that apply to every UI element added via the global `win` object inside a UI script.

Use these settings with methods such as `ui.addText()`, `ui.addImage()`, `ui.addButton()`, `ui.addBitmap()`, `ui.addRotator()`, `ui.addShape()`, `ui.addBar()`, `ui.addLine()`, `ui.addAreaGraph()`, `ui.addHistogram()`, and `ui.addRoundLine()` to control positioning, visibility, interactivity, and tooltips.

For shared image-processing fields (`imageAlpha`, `imageTint`, `imageFlip`, `colorMatrix`, etc.), see [General Image Options](/api/ui/ui-elements/general-options/general-image-options). For tooltip settings, see [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip). For mouse callback and cursor settings, see [General Mouse Options](/api/ui/ui-elements/general-options/general-mouse-options).

```js
ui.addText({
    id: "example",
    x: 10,
    y: 10,
    width: 200,
    height: 40
});
```

#### Table of Contents
[[toc]]

## Element Options

### `id`

- **Type**: `string`
- **Required**: `true`
- **Description**: Unique identifier for the element. Creating an element with an existing `id` replaces the previous element.

### `x`, `y`

- **Type**: `number`
- **Default**: `0`
- **Description**: Horizontal and vertical coordinates relative to the top-left of the widget window.

### `width`, `height`

- **Type**: `number`
- **Default**: `auto calculate`
- **Description**: Element dimensions in pixels.

### `container`

- **Type**: `string`
- **Default**: `""`
- **Description**: ID of a container element that clips and groups its children for rendering and hit testing.

::: info
- The container must already exist.
- Containers cannot nest.
- An element cannot be its own container, and cycles are not allowed.
:::

### `group`

- **Type**: `string`
- **Default**: `""`
- **Description**: Logical group name for batch updates/removals.

::: info
`group` operates independently from `container`; `container` affects rendering while `group` is purely organizational.
:::

### `backgroundColor`

- **Type**: `string`
- **Default**: `""`
- **Description**: Background color or gradient for the element.

### `backgroundColorRadius`

- **Type**: `number`
- **Default**: `0`
- **Description**: Corner radius for the background.

### `rotate`

- **Type**: `number`
- **Default**: `0`
- **Description**: Rotation angle in degrees.

### `antiAlias`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enables antialiasing for smoother rendering.

### `pixelHitTest`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Selects hit-testing mode.

#### Behavior

- `false`: uses bounds/geometry hit testing (faster, broader).
- `true`: uses pixel/shape-aware hit testing where supported by the element.

### `show`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls element visibility without removing it.

### `bevelType`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Draws a bezel around the element.

#### Valid values

- `"none"`
- `"raised"`
- `"sunken"`
- `"emboss"`
- `"pillow"`

### `bevelWidth`

- **Type**: `number`
- **Default**: `1`
- **Description**: Bevel thickness.

### `bevelColor`, `bevelColor2`

- **Type**: `color string`
- **Default**: `bevelColor`: `"255,255,255,200"`; `bevelColor2`: `"0,0,0,150"`
- **Description**: Colors for highlights and shadows when a bevel is drawn.

### `padding`

- **Type**: `number | array`
- **Default**: `0`
- **Description**: Padding around the element content.

#### Syntax

- `padding: 10`
- `padding: [horizontal, vertical]`
- `padding: [left, top, right, bottom]`

#### Example

```js
padding: [5, 10, 5, 10]
```

### `transformMatrix`

- **Type**: `array` (6 numbers)
- **Default**: `[]`
- **Description**: Affine transformation matrix `[m11, m12, m21, m22, dx, dy]` for translation, scaling, rotation, and shearing.

#### Example

```js
transformMatrix: [1, 0.5, 0, 1, 0, 0]
```
