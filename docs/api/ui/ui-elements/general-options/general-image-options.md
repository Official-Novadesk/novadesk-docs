---
title: General Image Options
---

# General Image Options

Options shared by all image-based elements: `ui.addImage()`, `ui.addButton()`, `ui.addBitmap()`, and `ui.addRotator()`.

Use these alongside [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) which covers position, visibility, tooltip, mouse events, and more.

#### Table of Contents
[[toc]]

## Opacity and Visibility

<PropertyBox name="imageAlpha" type="number" defaultValue="255">

Image opacity in the range `0–255`. `255` is fully opaque, `0` is fully transparent. Values are clamped to this range.

```javascript
ui.addImage({
  id: "logo",
  path: "./assets/logo.png",
  x: 16, y: 16,
  width: 64, height: 64,
  imageAlpha: 180
});
```

</PropertyBox>

## Fallback

<PropertyBox name="fallbackPath" type="string" defaultValue='""'>

Path to an alternative image file shown when the primary image cannot be loaded. Supports local file paths and HTTP/HTTPS URLs. Relative paths are resolved against the widget's script directory.

```javascript
ui.addImage({
  id: "avatar",
  path: "./assets/user.png",
  fallbackPath: "./assets/default-avatar.png",
  x: 16, y: 16,
  width: 48, height: 48
});
```

</PropertyBox>

## Color Adjustments

<PropertyBox name="grayscale" type="boolean" defaultValue="false">

`true` renders the image without color — all pixels are converted to shades of gray. Useful for representing disabled or inactive states.

```javascript
ui.addImage({
  id: "icon",
  path: "./assets/icon.png",
  grayscale: true
});
```

</PropertyBox>

<PropertyBox name="imageTint" type="string" defaultValue='""'>

A color overlaid on the image. Accepts `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`. Only applied when the string is non-empty and parses as a valid color.

```javascript
ui.addImage({
  id: "icon",
  path: "./assets/icon.png",
  imageTint: "rgba(0,180,255,0.5)"   // blue tint at 50% opacity
});
```

</PropertyBox>

<PropertyBox name="colorMatrix" type="number[]" defaultValue="[]">

A Direct2D 5x4 color transformation matrix applied to the image. Enables advanced effects: hue rotation, saturation, brightness, contrast, channel swaps, and inversion.

Provide exactly **20 numbers** in row-major order. Fewer than 20 values are silently ignored and no matrix is applied.

The matrix layout is:
```
[ R→R, G→R, B→R, A→R, bias_R,
  R→G, G→G, B→G, A→G, bias_G,
  R→B, G→B, B→B, A→B, bias_B,
  R→A, G→A, B→A, A→A, bias_A ]
```

The identity matrix (no change):
```javascript
colorMatrix: [
  1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0
]
```

Invert all colors:
```javascript
ui.addImage({
  id: "inverted",
  path: "./photo.png",
  colorMatrix: [
    -1,  0,  0, 0, 1,
     0, -1,  0, 0, 1,
     0,  0, -1, 0, 1,
     0,  0,  0, 1, 0
  ]
});
```

Desaturate (grayscale via matrix):
```javascript
colorMatrix: [
  0.33, 0.33, 0.33, 0, 0,
  0.33, 0.33, 0.33, 0, 0,
  0.33, 0.33, 0.33, 0, 0,
  0,    0,    0,    1, 0
]
```

::: tip
The `grayscale` property is a simpler alternative to a desaturate matrix when you only need black-and-white rendering.
:::

</PropertyBox>

## Flip

<PropertyBox name="imageFlip" type="string" defaultValue='"none"'>

Mirrors the image before rendering. Matching is case-insensitive.

| Value | Effect |
|---|---|
| `"none"` | No flip (default) |
| `"horizontal"` | Mirror left to right |
| `"vertical"` | Mirror top to bottom |
| `"both"` | Mirror both horizontally and vertically |

```javascript
ui.addImage({
  id: "arrow-right",
  path: "./assets/arrow-left.png",
  imageFlip: "horizontal"   // reuse the left arrow as a right arrow
});
```

</PropertyBox>

## Crop

<PropertyBox name="imageCrop" type="number[]" defaultValue="[]">

Crops the source image to a rectangular region before rendering. Coordinates are in source image pixels.

**Accepted forms:**
- `[x, y, width, height]` — crop from the given origin (default: top-left)
- `[x, y, width, height, origin]` — crop with an explicit reference corner

The optional fifth element sets the reference corner for the `x`/`y` coordinates:

| Value | Reference corner |
|---|---|
| `0` | Top-left (default) |
| `1` | Top-right |
| `2` | Bottom-right |
| `3` | Bottom-left |
| `4` | Center |

Values outside the `0–4` range are clamped. An empty or missing array disables cropping.

::: warning Not supported on addBitmap or addRotator
`imageCrop` is accepted but **ignored** by `ui.addBitmap()` and `ui.addRotator()`. It only applies to `ui.addImage()` and `ui.addButton()`.
:::

```javascript
// Show only the top-left 64x64 region
ui.addImage({
  id: "sprite",
  path: "./assets/spritesheet.png",
  imageCrop: [0, 0, 64, 64]
});

// Crop 32x32 from the center of the source image
ui.addImage({
  id: "center-crop",
  path: "./assets/photo.png",
  imageCrop: [0, 0, 32, 32, 4]   // origin = center
});
```

</PropertyBox>

## Orientation

<PropertyBox name="useExifOrientation" type="boolean" defaultValue="false">

`true` applies the rotation/flip specified in the EXIF metadata embedded in the image file. Useful for photos taken on mobile devices that store their orientation in EXIF data rather than in the pixel arrangement.

```javascript
ui.addImage({
  id: "photo",
  path: "./assets/photo.jpg",
  useExifOrientation: true
});
```

</PropertyBox>

## Practical Examples

**Grayscale inactive icon that highlights on hover**

```javascript
ui.addImage({
  id: "settings-icon",
  path: "./assets/settings.png",
  x: 16, y: 16,
  width: 24, height: 24,
  grayscale: true,
  onMouseOver: () => {
    ui.setElementProperties("settings-icon", { grayscale: false });
  },
  onMouseLeave: () => {
    ui.setElementProperties("settings-icon", { grayscale: true });
  }
});
```

**Tinted status indicator updated from IPC**

```javascript
ui.addImage({
  id: "status-dot",
  path: "./assets/circle.png",
  x: 8, y: 8,
  width: 12, height: 12,
  imageTint: "rgba(100,100,100,1)"
});

ipcRenderer.on("status-update", (event, payload) => {
  const tint = payload.online
    ? "rgba(0,200,100,1)"
    : "rgba(200,60,60,1)";
  ui.setElementProperties("status-dot", { imageTint: tint });
});
```

**Sprite sheet crop for different states**

```javascript
// Single sprite sheet with frames at x=0, 64, 128
function setButtonState(state) {
  const frameX = state === "normal" ? 0 : state === "hover" ? 64 : 128;
  ui.setElementProperties("btn-img", {
    imageCrop: [frameX, 0, 64, 32]
  });
}

ui.addImage({
  id: "btn-img",
  path: "./assets/button-states.png",
  x: 16, y: 60,
  width: 64, height: 32,
  imageCrop: [0, 0, 64, 32],
  onMouseOver: () => setButtonState("hover"),
  onMouseLeave: () => setButtonState("normal"),
  onLeftMouseDown: () => setButtonState("pressed"),
  onLeftMouseUp: () => setButtonState("hover")
});
```

**Fallback for user-provided images**

```javascript
ui.addImage({
  id: "wallpaper",
  path: path.join(__mainScriptDirPath, "config", "wallpaper.jpg"),
  fallbackPath: "./assets/default-wallpaper.jpg",
  x: 0, y: 0,
  width: 400, height: 300,
  preserveAspectRatio: "crop"
});
```
