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

## Shared Options
Refer to:
- [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) for layout and interaction.
- [General Image Options](/api/ui/ui-elements/general-options/general-image-options) for shared image processing fields.
- [General Tooltip Options](/api/ui/ui-elements/general-options/tooltip) for tooltip appearance and behavior.
- [Mouse Events Callback](/api/ui/ui-elements/general-options/mouse-events) for mouse interaction and cursor settings.

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

### `scaleMargins`

- **Type**: `number[]`
- **Default**: `[]`
- **Description**: 9-slice style margins for scalable image regions.

#### Syntax

- `[left, top, right, bottom]`

### `tile`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Tiles the image to fill the element area.

## Example

```javascript
ui.addImage({
    id: "logo",
    x: 20,
    y: 20,
    width: 180,
    height: 180,
    path: "./assets/logo.png",
    preserveAspectRatio: "preserve",
    imageAlpha: 230,
    imageTint: "rgba(255,255,255,0.95)",
    imageFlip: "none"
});
```

## Supported Image Formats

- PNG
- JPEG
- BMP
- GIF
- TIFF
- ICO

