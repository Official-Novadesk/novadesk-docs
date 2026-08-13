---
title: addBitmap
---

# ui.addBitmap()

Renders a single frame from a sprite sheet image, selected by a numeric `value`. Supports two modes: **standard mode** maps a value range to frames for progress indicators and gauges, and **extend mode** decomposes an integer into individual digit frames for odometer-style displays.

```javascript
ui.addBitmap(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) and [General Image Options](/api/ui/ui-elements/general-options/general-image-options) (`imageAlpha`, `grayscale`, `imageTint`, `imageFlip`, `colorMatrix`, `fallbackPath`).

`imageCrop` is accepted but **ignored** by the bitmap element.
:::

::: warning Width and height are ignored
`width` and `height` have no effect on this element. Size is always determined by the frame dimensions from the sprite sheet image. Setting them in `add*` or `setElementProperties` calls is silently ignored.
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
// Standard mode — 10-frame progress indicator
ui.addBitmap({
  id: "progress",
  x: 16, y: 40,
  bitmapImageName: "./assets/progress-frames.png",
  bitmapFrames: 10,
  minValue: 0, maxValue: 100,
  value: 72
});

// Extend mode — odometer digit display
ui.addBitmap({
  id: "counter",
  x: 16, y: 80,
  bitmapImageName: "./assets/digits.png",
  bitmapFrames: 10,
  bitmapExtend: true,
  bitmapDigits: 4,
  value: 0
});
```

## Sprite Sheet

<PropertyBox name="bitmapImageName" type="string">

Path to the sprite sheet image containing all frames. Relative paths are resolved against the widget's script directory. HTTP/HTTPS URLs are also supported and loaded asynchronously.

The image is divided into `bitmapFrames` equally sized frames, either horizontally or vertically based on `bitmapOrientation`.

```javascript
bitmapImageName: "./assets/digits.png"
bitmapImageName: "./assets/progress-bar.png"
bitmapImageName: "https://example.com/sprite.png"
```

</PropertyBox>

<PropertyBox name="bitmapFrames" type="number" defaultValue="1">

Total number of frames in the sprite sheet. The image is divided into this many equal slices. Values of `0` or less are clamped to `1`.

```javascript
bitmapFrames: 10    // decimal digits 0–9
bitmapFrames: 60    // clock seconds (0–59)
bitmapFrames: 100   // 100-step progress indicator
```

</PropertyBox>

<PropertyBox name="bitmapOrientation" type="string" defaultValue='"auto"'>

Controls how frames are arranged in the sprite sheet.

| Value | Behavior |
|---|---|
| `"auto"` | Tall images use vertical frames, wide images use horizontal frames |
| `"horizontal"` | Frames are arranged side by side left to right |
| `"vertical"` | Frames are stacked top to bottom |

In `"auto"` mode, the taller dimension determines the layout. A 100×1000 image is treated as 10 vertical frames of 100×100 each; a 1000×100 image is treated as 10 horizontal frames.

</PropertyBox>

## Standard Mode

Standard mode (the default when `bitmapExtend` is `false`) maps a numeric value within a range to a single frame index.

<PropertyBox name="value" type="number" defaultValue="0">

The current value used to select which frame is displayed. Normalized against `minValue` and `maxValue` to pick a frame index.

```javascript
// Show frame 7 of 10 (value 72 out of 0–100)
value: 72, minValue: 0, maxValue: 100, bitmapFrames: 10
```

</PropertyBox>

<PropertyBox name="minValue" type="number" defaultValue="0">

The value that maps to frame `0` (or frame `1` when `bitmapZeroFrame` is `true`). Used only in standard mode.

</PropertyBox>

<PropertyBox name="maxValue" type="number" defaultValue="1">

The value that maps to the last frame. Must be greater than `minValue`. If `maxValue` is less than or equal to `minValue`, it is corrected to `minValue + 0.001` automatically.

</PropertyBox>

<PropertyBox name="bitmapZeroFrame" type="boolean" defaultValue="false">

When `true`, frame `0` is reserved as a dedicated empty/zero state shown only when the normalized value is exactly `0`. The remaining `bitmapFrames - 1` frames cover the rest of the range.

When `false`, all frames are distributed evenly across the full value range.

```javascript
// Volume meter with a muted state at frame 0
ui.addBitmap({
  id: "volume",
  bitmapImageName: "./assets/volume-levels.png",
  bitmapFrames: 5,
  bitmapZeroFrame: true,
  minValue: 0, maxValue: 100,
  value: 0   // shows frame 0 (muted icon)
});
```

</PropertyBox>

## Extend Mode

Extend mode (`bitmapExtend: true`) treats `value` as a non-negative integer and renders each digit as a separate frame, creating an odometer or number display.

The numeric base is determined by `bitmapFrames`. `bitmapFrames: 10` produces decimal digits, `bitmapFrames: 16` produces hexadecimal, `bitmapFrames: 2` produces binary. When `bitmapFrames` is `1`, base 2 is used.

Negative values are treated as `0`.

<PropertyBox name="bitmapExtend" type="boolean" defaultValue="false">

`true` enables extend (odometer digit) mode. `false` uses standard single-frame mode.

```javascript
ui.addBitmap({
  id: "score",
  x: 16, y: 40,
  bitmapImageName: "./assets/digits.png",
  bitmapFrames: 10,
  bitmapExtend: true,
  value: 1337
  // renders: [1][3][3][7]
});
```

</PropertyBox>

<PropertyBox name="bitmapDigits" type="number" defaultValue="0">

Number of digit frames to render in extend mode. `0` calculates the minimum digits needed for the current value automatically. Values greater than `0` always render exactly that many digits, padding with leading zero frames as needed. Negative values are clamped to `0`.

```javascript
// Always show 6 digits: 000042
bitmapExtend: true,
bitmapDigits: 6,
value: 42
```

</PropertyBox>

<PropertyBox name="bitmapAlign" type="string" defaultValue='"left"'>

Horizontal alignment of the digit group in extend mode. The position `x` (plus any padding) is the anchor point.

| Value | Behavior |
|---|---|
| `"left"` | Digit group starts at `x` and extends right (default) |
| `"center"` | Digit group is centered on `x` |
| `"right"` | Digit group ends at `x` and extends left |

Only applies when `bitmapExtend` is `true`.

</PropertyBox>

<PropertyBox name="bitmapSeparation" type="number" defaultValue="0">

Pixel gap between adjacent digit frames in extend mode. Only applies when `bitmapExtend` is `true`.

```javascript
bitmapExtend: true,
bitmapSeparation: 2   // 2px gap between each digit
```

</PropertyBox>

## Sizing

The bitmap element does not use `width` or `height` from the options. Size is calculated automatically from the frame dimensions:

- **Frame width** = image width (horizontal layout) or image width (vertical layout, unchanged)
- **Frame height** = image height ÷ `bitmapFrames` (vertical) or image height (horizontal, unchanged)

In extend mode, the total rendered width is `frameWidth × digitCount + bitmapSeparation × (digitCount - 1)`.

## Practical Examples

**Progress indicator updated from IPC**

```javascript
// ui.js
ui.addBitmap({
  id: "progress",
  x: 16, y: 40,
  bitmapImageName: "./assets/progress-10.png",
  bitmapFrames: 10,
  minValue: 0, maxValue: 100,
  value: 0
});

ipcRenderer.on("stats", (event, payload) => {
  ui.setElementProperties("progress", { value: payload.cpu });
});
```

**Clock seconds display**

```javascript
ui.addBitmap({
  id: "seconds",
  x: 80, y: 20,
  bitmapImageName: "./assets/digits-60.png",
  bitmapFrames: 60,
  minValue: 0, maxValue: 59,
  value: 0
});

ipcRenderer.on("time", (event, payload) => {
  ui.setElementProperties("seconds", { value: payload.seconds });
});
```

**Score counter with leading zeros**

```javascript
ui.addBitmap({
  id: "score",
  x: 200, y: 16,
  bitmapImageName: "./assets/digits.png",
  bitmapFrames: 10,
  bitmapExtend: true,
  bitmapDigits: 8,
  bitmapAlign: "right",
  bitmapSeparation: 1,
  value: 0
});

ipcRenderer.on("score-update", (event, payload) => {
  ui.setElementProperties("score", { value: payload.score });
});
```

**Volume icon with muted state at frame 0**

```javascript
ui.addBitmap({
  id: "vol-icon",
  x: 16, y: 16,
  bitmapImageName: "./assets/volume-5.png",
  bitmapFrames: 5,
  bitmapZeroFrame: true,
  minValue: 0, maxValue: 100,
  value: 0
});

ipcRenderer.on("volume-change", (event, payload) => {
  ui.setElementProperties("vol-icon", { value: payload.volume });
});
```
