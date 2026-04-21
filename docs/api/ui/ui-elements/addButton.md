---
title: Button element options and example usage.
---

# Button Element
The Button element draws an image-based button and triggers actions on click.

Create one with `ui.addButton()` and the shared [General Elements Options](/api/ui/ui-elements/general-options/general-elements-options), [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip), and [Mouse Events Callback](/api/ui/ui-elements/general-options/mouse-events).

```js
ui.addButton(options);
```

#### Table of Contents
[[toc]]

## Button Options

### `buttonImageName`

- **Type**: `string`
- **Default**: `""`
- **Description**: Path to the button strip image.

::: info
Use a 3-frame strip for best results:
- frame 1: normal
- frame 2: pressed
- frame 3: hovered

The strip can be horizontal (`3 x 1`) or vertical (`1 x 3`).
:::

### `buttonAction`

- **Type**: `function`
- **Default**: `undefined`
- **Description**: Callback invoked on left mouse up (click release).

::: info
`buttonAction` maps to `onLeftMouseUp` for this element.
:::

## Shared Image Options

Button supports these image-processing options:

### `imageAlpha`

- **Type**: `number`
- **Default**: `255`
- **Description**: Opacity from `0` to `255`.

### `grayscale`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enables grayscale rendering.

### `useExifOrientation`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Uses EXIF orientation metadata while rendering.

### `imageTint`

- **Type**: `string`
- **Default**: `""`
- **Description**: Tint color applied to the button image.

### `imageFlip`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Flips the image output.

#### Valid values

- `"none"`
- `"horizontal"`
- `"vertical"`
- `"both"`

### `imageCrop`

- **Type**: `number[]`
- **Default**: `[]`
- **Description**: Crops the source image region.

#### Syntax

- `[x, y, width, height]`
- `[x, y, width, height, origin]`

::: info
`origin` is clamped to valid internal values. If omitted, top-left origin is used.
:::

### `colorMatrix`

- **Type**: `array` (20 numbers)
- **Default**: `[]`
- **Description**: Applies a Direct2D color matrix transformation.

## Runtime Notes

- `ui.addButton()` requires an options object.
- If `id` already exists, the previous element is replaced.
- Button hit testing ignores transparent pixels, so only visible pixels are clickable.

## Example

:::tabs
== index.js
```javascript
import { widgetWindow } from "novadesk";

new widgetWindow({
    id: "buttonExample",
    width: 420,
    height: 240,
    backgroundColor: "rgba(20, 24, 31, 0.96)",
    script: "ui/script.ui.js"
});
```
== ui/script.ui.js
```javascript
ui.addText({
    id: "button-status",
    text: "Button idle",
    x: 110,
    y: 112,
    fontSize: 16,
    fontColor: "rgb(255,255,255)"
});

ui.addButton({
    id: "play-button",
    x: 28,
    y: 96,
    buttonImageName: "./assets/button-strip.png",
    buttonAction: function () {
        ui.setElementProperties("button-status", {
            text: "Clicked at " + new Date().toLocaleTimeString()
        });
    },
    onMouseOver: function () {
        ui.setElementProperties("button-status", { text: "Hovering button" });
    },
    onMouseLeave: function () {
        ui.setElementProperties("button-status", { text: "Button idle" });
    },
    imageTint: "rgba(255,255,255,1)",
    imageAlpha: 255
});
```
:::

