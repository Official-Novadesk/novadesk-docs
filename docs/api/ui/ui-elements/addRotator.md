---
title: addRotator
---

# ui.addRotator()

Renders a bitmap image rotated to an angle derived from a numeric value. The primary use case is a gauge needle — the image is the needle graphic and `value` drives its angle. The pivot point is set by `offsetX`/`offsetY` so any point on the image can act as the center of rotation.

```javascript
ui.addRotator(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) and [General Image Options](/api/ui/ui-elements/general-options/general-image-options) (`imageAlpha`, `grayscale`, `imageTint`, `imageFlip`, `colorMatrix`, `fallbackPath`).

`imageCrop` is accepted but silently ignored by the rotator element.
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
// Gauge needle — classic 270° sweep
ui.addRotator({
  id: "needle",
  x: 60, y: 60,
  width: 120, height: 120,
  rotatorImageName: "./assets/needle.png",
  value: 0,
  minValue: 0, maxValue: 100,
  offsetX: 60, offsetY: 100,    // pivot near the bottom-center of a 120×120 image
  startAngle: -2.356,            // -135° in radians — 7:30 o'clock
  rotationAngle: 4.712           // 270° sweep
});
```

## Image

<PropertyBox name="rotatorImageName" type="string">

Path to the image to render and rotate. Relative paths are resolved against the widget's script directory. HTTP/HTTPS URLs are supported and loaded asynchronously.

When no explicit `width` and `height` are set, the element auto-sizes to the image's natural dimensions.

```javascript
rotatorImageName: "./assets/needle.png"
rotatorImageName: "https://example.com/needle.png"
```

</PropertyBox>

## How Rotation Works

The rotation is calculated using this transform sequence, applied every frame:

1. Translate the image by `(-offsetX, -offsetY)` — this moves the pivot point to the origin.
2. Rotate by the computed angle (in degrees, derived from radians).
3. Translate to the element's center point (accounting for padding).

The image is always drawn at its natural size in the rotated coordinate space. `width` and `height` affect where the rotation center is placed on screen, not how the image is scaled.

**Angle formula (standard mode):**

```
normalizedValue = clamp((value - minValue) / (maxValue - minValue), 0, 1)
finalAngle = startAngle + rotationAngle * normalizedValue
```

All angles are in **radians**. Direct2D measures `0` at the 3 o'clock position with positive values going clockwise.

**Radians quick reference:**

| Degrees | Radians | Clock position |
|---|---|---|
| 0° | `0` | 3 o'clock (right) |
| 90° | `Math.PI / 2` ≈ `1.5708` | 6 o'clock (bottom) |
| -90° | `-Math.PI / 2` ≈ `-1.5708` | 12 o'clock (top) |
| 180° | `Math.PI` ≈ `3.1416` | 9 o'clock (left) |
| -135° | `-3 * Math.PI / 4` ≈ `-2.3562` | 7:30 o'clock |
| 270° | `3 * Math.PI / 2` ≈ `4.7124` | 270° sweep |
| 360° | `2 * Math.PI` ≈ `6.2832` | Full circle |

## Value and Range

<PropertyBox name="value" type="number" defaultValue="0">

The current value that determines the rotation angle. Normalized against `minValue` and `maxValue` (standard mode) or against `valueRemainder` (modulo mode).

```javascript
ui.setElementProperties("needle", { value: payload.cpu });
```

</PropertyBox>

<PropertyBox name="minValue" type="number" defaultValue="0">

The value that maps to `startAngle`. Values at or below `minValue` are clamped to the start position.

Must be less than `maxValue`. If they are equal, `maxValue` is automatically corrected to `minValue + 0.001`.

</PropertyBox>

<PropertyBox name="maxValue" type="number" defaultValue="1">

The value that maps to `startAngle + rotationAngle`. Values at or above `maxValue` are clamped to the end position.

```javascript
minValue: 0, maxValue: 100    // percentage
minValue: 0, maxValue: 8000   // RPM
```

</PropertyBox>

<PropertyBox name="valueRemainder" type="number" defaultValue="0">

Enables modulo (cyclic) mode when set to a value greater than `0`. In this mode `minValue` and `maxValue` are ignored. The rotation is calculated from the integer remainder of `value` divided by `valueRemainder`.

Negative values are clamped to `0` (disabling modulo mode).

```
normalizedValue = floor(value) % valueRemainder / valueRemainder
finalAngle = startAngle + rotationAngle * normalizedValue
```

::: tip Clock hands
Use modulo mode for values that naturally cycle: clock seconds (60), minutes (3600), compass headings (360), etc.
:::

```javascript
// Seconds hand — wraps every 60 seconds, full circle
valueRemainder: 60,
rotationAngle: 2 * Math.PI

// Minute hand — wraps every 60 minutes (3600 seconds)
valueRemainder: 3600,
rotationAngle: 2 * Math.PI
```

</PropertyBox>

## Rotation Configuration

<PropertyBox name="startAngle" type="number" defaultValue="0">

The angle in radians at which the image sits when `value` equals `minValue`. `0` points right (3 o'clock). Positive values go clockwise.

**Common gauge starting positions:**

| Gauge style | startAngle | rotationAngle |
|---|---|---|
| Full circle (clock) | `0` | `2 * Math.PI` |
| 270° classic gauge | `-3 * Math.PI / 4` ≈ `-2.356` | `3 * Math.PI / 2` ≈ `4.712` |
| 180° half-arc (top) | `-Math.PI / 2` ≈ `-1.571` | `Math.PI` ≈ `3.142` |
| 90° quarter turn | `-Math.PI / 4` ≈ `-0.785` | `Math.PI / 2` ≈ `1.571` |

```javascript
// Convert degrees to radians: degrees * Math.PI / 180
startAngle: -135 * Math.PI / 180   // -135°
```

</PropertyBox>

<PropertyBox name="rotationAngle" type="number" defaultValue="6.2832 (2π)">

Total angular sweep in radians from `minValue` to `maxValue`. Positive values rotate clockwise, negative values rotate counter-clockwise.

```javascript
rotationAngle: 2 * Math.PI         // 360° full circle
rotationAngle: 3 * Math.PI / 2     // 270° classic gauge
rotationAngle: Math.PI             // 180° half arc
```

</PropertyBox>

## Pivot Point

The pivot point is the pixel in the image that stays stationary as the image rotates. It is controlled by `offsetX` and `offsetY`.

<PropertyBox name="offsetX" type="number" defaultValue="0">

Horizontal distance in pixels from the left edge of the image to the rotation pivot point.

To pivot at the image center of a 200×200 image: `offsetX: 100`

</PropertyBox>

<PropertyBox name="offsetY" type="number" defaultValue="0">

Vertical distance in pixels from the top edge of the image to the rotation pivot point.

```javascript
// 120×200 needle image — pivot near the bottom-center
offsetX: 60,    // horizontal center of 120px wide image
offsetY: 180    // 20px from the bottom of 200px tall image
```

The pivot is placed at the element's center on screen. Setting `offsetX`/`offsetY` to the image center produces rotation around the image center. Setting them closer to one end makes that end the fixed point while the other end sweeps an arc.

</PropertyBox>

## Practical Examples

**CPU gauge needle**

```javascript
// ui.js
ui.addRotator({
  id: "cpu-needle",
  x: 50, y: 50,
  width: 200, height: 200,
  rotatorImageName: "./assets/needle.png",
  value: 0,
  minValue: 0, maxValue: 100,
  offsetX: 100, offsetY: 160,
  startAngle: -2.356,   // -135°
  rotationAngle: 4.712  // 270°
});

ipcRenderer.on("stats", (event, payload) => {
  ui.setElementProperties("cpu-needle", { value: payload.cpu });
});
```

**Clock seconds hand**

```javascript
ui.addRotator({
  id: "seconds-hand",
  x: 100, y: 100,
  width: 200, height: 200,
  rotatorImageName: "./assets/seconds-hand.png",
  value: 0,
  valueRemainder: 60,
  offsetX: 100, offsetY: 140,    // pivot near the base of the hand
  startAngle: -Math.PI / 2,       // start at 12 o'clock
  rotationAngle: 2 * Math.PI      // full circle
});

// Update every second from the Main script
ipcRenderer.on("tick", (event, payload) => {
  ui.setElementProperties("seconds-hand", { value: payload.seconds });
});
```

**Clock with three hands**

```javascript
const CENTER_X = 100, CENTER_Y = 100, SIZE = 200;
const CENTER_PIVOT_X = 100, CENTER_PIVOT_Y = 100;

const handBase = {
  x: CENTER_X, y: CENTER_Y,
  width: SIZE, height: SIZE,
  startAngle: -Math.PI / 2,    // 12 o'clock
  rotationAngle: 2 * Math.PI,
  offsetX: CENTER_PIVOT_X,
  offsetY: CENTER_PIVOT_Y
};

ui.addRotator({ ...handBase, id: "hour-hand",   rotatorImageName: "./assets/hour.png",   value: 0, valueRemainder: 43200 });
ui.addRotator({ ...handBase, id: "minute-hand", rotatorImageName: "./assets/minute.png", value: 0, valueRemainder: 3600  });
ui.addRotator({ ...handBase, id: "second-hand", rotatorImageName: "./assets/second.png", value: 0, valueRemainder: 60   });

ipcRenderer.on("time", (event, payload) => {
  const totalSeconds = payload.hours * 3600 + payload.minutes * 60 + payload.seconds;
  ui.beginUpdate();
  ui.setElementProperties("hour-hand",   { value: totalSeconds });
  ui.setElementProperties("minute-hand", { value: totalSeconds });
  ui.setElementProperties("second-hand", { value: payload.seconds });
  ui.endUpdate();
});
```

**Compass needle with full-circle sweep**

```javascript
ui.addRotator({
  id: "compass",
  x: 20, y: 20,
  width: 160, height: 160,
  rotatorImageName: "./assets/compass-needle.png",
  value: 0,
  valueRemainder: 360,    // degrees 0–359
  offsetX: 80, offsetY: 80,
  startAngle: -Math.PI / 2,   // north = up
  rotationAngle: 2 * Math.PI
});
```
