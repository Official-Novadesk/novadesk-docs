---
title: addImage
---

# ui.addImage()

Renders a bitmap image inside the widget. Supports local files, HTTP/HTTPS URLs, aspect ratio modes, tiling, and 9-slice scaling.

```javascript
ui.addImage(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) and [General Image Options](/api/ui/ui-elements/general-options/general-image-options) (`imageAlpha`, `grayscale`, `imageTint`, `imageFlip`, `imageCrop`, `colorMatrix`, `fallbackPath`).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addImage({
  id: "logo",
  path: "./assets/logo.png",
  x: 16, y: 16,
  width: 120, height: 40,
  preserveAspectRatio: "preserve"
});
```

## Image Source

<PropertyBox name="path" type="string">

Path to the image file to display. Relative paths are resolved against the widget's script directory. HTTP/HTTPS URLs are supported and loaded asynchronously — the element is empty while loading and updates automatically once the image is ready.

Changing `path` via `setElementProperties` swaps the image at runtime.

```javascript
path: "./assets/logo.png"
path: "./assets/icons/cpu.svg"
path: "https://example.com/banner.jpg"

// Runtime swap
ui.setElementProperties("banner", { path: "./assets/banner-dark.png" });
```

</PropertyBox>

## Aspect Ratio

<PropertyBox name="preserveAspectRatio" type="string" defaultValue='"stretch"'>

How the image is scaled to fill the element bounds.

| Value | Behavior |
|---|---|
| `"stretch"` | Fills the bounds exactly, ignoring the original aspect ratio (default) |
| `"preserve"` | Scales uniformly to fit entirely within the bounds, centered, with empty space around it |
| `"crop"` | Scales uniformly to fully fill the bounds, cropping the excess from the center |

```javascript
// Fill and distort if needed (default)
preserveAspectRatio: "stretch"

// Fit inside bounds, centered, no crop
preserveAspectRatio: "preserve"

// Fill bounds, crop center
preserveAspectRatio: "crop"
```

::: tip
Use `"preserve"` for logos or icons where distortion would be visible. Use `"crop"` for background images where filling the space matters more than showing the full image.
:::

</PropertyBox>

## Tiling

<PropertyBox name="tile" type="boolean" defaultValue="false">

When `true`, the image repeats to fill the element bounds using wrap mode. The tile pattern starts from the top-left of the content area.

When `imageCrop` is set alongside `tile`, the cropped region is the repeating unit.

::: warning Tiling requires stretch mode
`tile` only works when `preserveAspectRatio` is `"stretch"`. Setting `tile: true` with `"preserve"` or `"crop"` has no effect.
:::

```javascript
ui.addImage({
  id: "bg-pattern",
  x: 0, y: 0,
  width: 400, height: 300,
  path: "./assets/noise.png",
  tile: true,
  imageAlpha: 30
});
```

</PropertyBox>

## 9-Slice Scaling

<PropertyBox name="scaleMargins" type="number[]">

Enables 9-slice scaling (also called border-image or scale-9). Provide exactly **4 values** in `[left, top, right, bottom]` order, specifying the pixel margins of the fixed border zones in the source image.

The image is divided into a 3×3 grid. The four corner patches render at their original size. The four edge patches stretch along one axis. The center patch stretches freely in both directions.

Negative margin values are clamped to `0`. If the combined left and right margins exceed the image width, they are proportionally reduced to fit.

::: warning Requirements for 9-slice
`scaleMargins` is only applied when all three conditions are met:
1. `preserveAspectRatio` is `"stretch"` (the default)
2. `tile` is `false`
3. No color-processing effects are active (`colorMatrix`, `imageTint`, `grayscale` disable 9-slice and fall back to normal stretch)

If any of these conditions is not met, the image is rendered with normal stretch scaling instead.
:::

```javascript
// Button background that stretches its center while keeping fixed rounded corners
ui.addImage({
  id: "btn-bg",
  path: "./assets/button-9slice.png",
  x: 16, y: 60,
  width: 200, height: 40,
  scaleMargins: [12, 12, 12, 12]
});
```

For a button image that is 40×40 with 12px borders:
- Corners: 12×12 each, drawn at original size
- Top and bottom edges: 12px tall, stretched horizontally
- Left and right edges: 12px wide, stretched vertically
- Center: stretches in both directions

</PropertyBox>

## Hit Testing

By default, image hit testing uses the bounding box. When `pixelHitTest: true` is set, clicks on fully transparent pixels (alpha = 0) are ignored. This allows irregular shapes, circular icons, and PNG images with transparency to respond only to their visible area.

```javascript
ui.addImage({
  id: "round-icon",
  path: "./assets/circle-icon.png",
  x: 16, y: 16,
  width: 48, height: 48,
  pixelHitTest: true,   // transparent corners are not clickable
  onLeftMouseUp: () => ipcRenderer.send("icon-clicked")
});
```

## Practical Examples

**Logo with preserved aspect ratio**

```javascript
ui.addImage({
  id: "logo",
  x: 16, y: 12,
  width: 120, height: 32,
  path: "./assets/logo.png",
  preserveAspectRatio: "preserve"
});
```

**Background that fills and crops to center**

```javascript
ui.addImage({
  id: "wallpaper",
  x: 0, y: 0,
  width: 400, height: 300,
  path: "./assets/bg.jpg",
  preserveAspectRatio: "crop"
});
```

**Tiled texture overlay**

```javascript
ui.addImage({
  id: "grain",
  x: 0, y: 0,
  width: 400, height: 300,
  path: "./assets/grain.png",
  tile: true,
  imageAlpha: 20
});
```

**9-slice scalable panel background**

```javascript
ui.addImage({
  id: "panel",
  path: "./assets/panel.png",
  x: 16, y: 40,
  width: 300, height: 180,
  scaleMargins: [16, 16, 16, 16]
});
```

**Dynamic image updated from IPC**

```javascript
// ui.js
ui.addImage({
  id: "weather-icon",
  x: 16, y: 20,
  width: 48, height: 48,
  path: "./assets/icons/clear.png",
  preserveAspectRatio: "preserve"
});

ipcRenderer.on("weather-update", (event, payload) => {
  ui.setElementProperties("weather-icon", {
    path: "./assets/icons/" + payload.condition + ".png"
  });
});
```

**Grayscale icon that highlights on hover**

```javascript
ui.addImage({
  id: "settings",
  x: 360, y: 8,
  width: 24, height: 24,
  path: "./assets/settings.png",
  grayscale: true,
  pixelHitTest: true,
  onMouseOver: () => ui.setElementProperties("settings", { grayscale: false }),
  onMouseLeave: () => ui.setElementProperties("settings", { grayscale: true }),
  onLeftMouseUp: () => ipcRenderer.send("open-settings")
});
```
