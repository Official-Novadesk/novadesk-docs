---
title: ui.animate()
description: Animate UI element properties with keyframes and tweens.
---

# ui.animate()

Animates one or more properties of an existing element using either a simple A-to-B tween or a multi-stop keyframe timeline.

::: info Availability
Available in [UI scripts](/guides/script-types.html#ui-script-the-face) only. The `ui` object must be in scope.
:::

#### Table of Contents
[[toc]]

## Overview

```javascript
ui.animate({
  id: "box",
  duration: 400,
  easing: "easeOutCubic",
  to: { x: 200, y: 100 }
});
```

Every call is **fire-and-forget** — there is no callback or promise when the animation completes. The animation runs at approximately 60fps using a 16ms timer. Calling `ui.animate()` on an element that is already animating immediately replaces the running animation, starting the new one from the element's current mid-flight position.

## Options

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `id` | `string` | Yes | | ID of the element to animate. |
| `duration` | `number` | No | `250` | Total duration in milliseconds. Values of 0 or less are treated as 250. |
| `easing` | `string` | No | `"linear"` | Easing function for the animation. Unknown names silently fall back to `linear`. |
| `iterationCount` | `number \| "infinite"` | No | `1` | How many times to play. Must be an integer ≥ 1 or the string `"infinite"`. |
| `to` | `object` | Tween mode only | | Target property values. Required when `keyframes` is not set. |
| `from` | `object` | No | Current element state | Starting property values for tween mode. Omit to start from the element's current state. |
| `keyframes` | `array \| object` | Keyframe mode only | | Multi-stop timeline. Cannot be combined with `to` or `from`. |

## Tween Mode

Tween mode uses `to` and optionally `from` to transition between two states. It is the simplest way to move, resize, or rotate an element.

**Animatable properties in tween mode:**

| Property | Type | Description |
|---|---|---|
| `x` | `number` | Horizontal position in pixels. |
| `y` | `number` | Vertical position in pixels. |
| `width` | `number` | Element width in pixels. |
| `height` | `number` | Element height in pixels. |
| `rotate` | `number` | Rotation in degrees. |

::: warning Text properties are not supported in tween mode
Passing `fontSize`, `fontWeight`, `letterSpacing`, or `fontColor` inside `to` or `from` throws a `TypeError`. Use keyframe mode for text property animation.
:::

**`from` behavior.** When `from` is provided, the element is immediately snapped to those values before the animation begins. You can provide `from` partially — only the channels you include are snapped; the rest start from the element's current state. When `from` is omitted entirely, the element animates from wherever it currently is.

```javascript
// Move from off-screen to position 20
ui.animate({
  id: "panel",
  duration: 500,
  easing: "easeOutCubic",
  from: { x: -300 },
  to: { x: 20 }
});

// Resize and rotate simultaneously
ui.animate({
  id: "card",
  duration: 400,
  easing: "easeInOutQuad",
  to: { width: 200, height: 120, rotate: 5 }
});

// Loop a pulsing effect
ui.animate({
  id: "dot",
  duration: 600,
  iterationCount: "infinite",
  from: { width: 12, height: 12 },
  to: { width: 20, height: 20 }
});
```

## Keyframe Mode

Keyframe mode animates across multiple stops using either an array or an object. It also supports `fontSize`, `fontWeight`, `letterSpacing`, and `fontColor` on text elements.

`keyframes` and `to`/`from` are mutually exclusive. Using both throws a `TypeError`.

### Array syntax

Each entry is a plain object with an `offset` (or `at`) property and at least one animatable property. Entries do not need to be in order — they are sorted by offset automatically.

```javascript
ui.animate({
  id: "box",
  duration: 800,
  keyframes: [
    { offset: 0,    x: 10 },
    { offset: 0.5,  x: 200, easing: "easeOutBack" },
    { offset: 1,    x: 10 }
  ]
});
```

The **`offset`** value can be:
- A number from `0` to `1` (e.g. `0.5`)
- A percentage string (e.g. `"50%"`)
- The property key `at` is accepted as an alias for `offset`

### Object syntax

Keys are percentage strings. Values are plain objects with animatable properties.

```javascript
ui.animate({
  id: "spinner",
  duration: 1000,
  iterationCount: "infinite",
  keyframes: {
    "0%":   { rotate: 0 },
    "100%": { rotate: 360 }
  }
});
```

### Keyframe requirements

- At least **2 stops** are required.
- After sorting, offsets must be **strictly increasing** (no two stops at the same position).
- Each stop must include at least one animatable property.

### Text properties in keyframes

`fontSize`, `fontWeight`, `letterSpacing`, and `fontColor` can only be animated on text elements (`addText`). Using them on any other element type throws a `TypeError`.

```javascript
ui.animate({
  id: "heading",
  duration: 1000,
  easing: "linear",
  iterationCount: "infinite",
  keyframes: {
    "0%":   { fontColor: "rgba(255,80,80,1)",   fontSize: 16 },
    "50%":  { fontColor: "rgba(80,180,255,1)",  fontSize: 24 },
    "100%": { fontColor: "rgba(255,80,80,1)",   fontSize: 16 }
  }
});
```

### Per-segment easing in keyframes

Each keyframe stop can include its own `easing` string. That easing governs the **segment leading into that stop** — i.e. the transition from the previous stop to this one. Stops without an `easing` use the top-level `easing` value as their fallback.

```javascript
ui.animate({
  id: "box",
  duration: 1000,
  easing: "linear",       // default for segments without a per-stop easing
  keyframes: [
    { offset: 0,   x: 0 },
    { offset: 0.4, x: 300, easing: "easeOutBack" },    // segment 0→0.4 uses easeOutBack
    { offset: 1,   x: 100, easing: "easeInOutQuad" }   // segment 0.4→1 uses easeInOutQuad
  ]
});
```

### Carry-forward fill

In keyframe mode, properties not mentioned in early stops carry forward from the element's current state. For example, if only `x` is animated and the element's `y` is not mentioned in any keyframe, `y` stays at its current value throughout.

## Replacing a Running Animation

Calling `ui.animate()` on an element that is currently animating **immediately replaces** the running animation. The new animation starts from the element's current mid-flight state (unless `from` is specified). This makes it straightforward to redirect an animation in response to user input.

```javascript
// Start sliding right
ui.animate({ id: "panel", to: { x: 400 }, duration: 600 });

// Reverse direction mid-flight when the user clicks
ipcRenderer.on("reverse", () => {
  ui.animate({ id: "panel", to: { x: 0 }, duration: 400, easing: "easeOutCubic" });
});
```

## Easing Reference

The global `easing` and per-keyframe `easing` accept any of the names below. Matching is case-insensitive. An unrecognized name silently falls back to `linear`.

| Family | Names |
|---|---|
| Linear | `linear` |
| Quadratic | `easeInQuad`, `easeOutQuad`, `easeInOutQuad` |
| Cubic | `easeInCubic`, `easeOutCubic`, `easeInOutCubic` |
| Quartic | `easeInQuart`, `easeOutQuart`, `easeInOutQuart` |
| Quintic | `easeInQuint`, `easeOutQuint`, `easeInOutQuint` |
| Sine | `easeInSine`, `easeOutSine`, `easeInOutSine` |
| Exponential | `easeInExpo`, `easeOutExpo`, `easeInOutExpo` |
| Circular | `easeInCirc`, `easeOutCirc`, `easeInOutCirc` |
| Back | `easeInBack`, `easeOutBack`, `easeInOutBack` |
| Elastic | `easeInElastic`, `easeOutElastic`, `easeInOutElastic` |
| Bounce | `easeInBounce`, `easeOutBounce`, `easeInOutBounce` |

## Errors

All errors are thrown as `TypeError`. The element is not modified when an error is thrown.

| Condition | Error message |
|---|---|
| No options object passed | `animate: expected options object` |
| `id` missing or empty | `animate: id is required` |
| `to` has no supported properties / keyframes have no properties | `animate: to must include at least one supported property` |
| Element with that `id` does not exist | `animate: element not found` |
| Text properties in keyframes on a non-text element | `animate: fontSize, fontWeight, letterSpacing, and fontColor in keyframes require a text element` |
| `iterationCount` is 0, negative, or an invalid string | `animate: iterationCount must be at least 1 or 'infinite'` |
| Both `keyframes` and `to`/`from` provided | `animate: use either keyframes or from/to, not both` |
| Fewer than 2 keyframe stops | `animate: keyframes requires at least 2 stops` |
| Keyframe offsets are not strictly increasing | `animate: keyframes offsets must be strictly increasing` |
| Text properties in tween `to` or `from` | `animate: from/to support only x, y, width, height, and rotate; use keyframes for text properties` |
| `keyframes` is not an array or object | `animate: keyframes must be an array or object with percent keys` |

## Limitations

These features are not implemented in the current version:

- No completion callback or promise
- No `delay` parameter — animations always start immediately
- No `fill` mode (the element stays at its final state when the animation ends, and returns to its `from` state at the start of each iteration)
- No `direction` (reverse/alternate)
- No `playbackRate`

## Practical Examples

**Slide a panel in on load**

```javascript
ui.beginUpdate();
ui.addShape({
  id: "panel",
  shapeType: "rectangle",
  x: -300, y: 0, width: 280, height: 160,
  fillColor: "rgba(30,30,40,0.95)"
});
ui.endUpdate();

ui.animate({
  id: "panel",
  duration: 500,
  easing: "easeOutCubic",
  to: { x: 16 }
});
```

**Fade a notification in and then out using two sequential animations via IPC**

```javascript
// ui.js
ipcRenderer.on("show-notification", () => {
  ui.setElementProperties("toast", { show: true });
  ui.animate({ id: "toast", from: { y: 80 }, to: { y: 20 }, duration: 300, easing: "easeOutBack" });
});

ipcRenderer.on("hide-notification", () => {
  ui.animate({ id: "toast", to: { y: 80 }, duration: 250, easing: "easeInCubic" });
});
```

```javascript
// index.js
ipcMain.send("show-notification");
setTimeout(() => ipcMain.send("hide-notification"), 3000);
```

**Animate a progress bar width based on a value**

```javascript
function setProgress(value) {
  const targetWidth = Math.round(value * 260);
  ui.animate({
    id: "progress-fill",
    duration: 300,
    easing: "easeOutQuad",
    to: { width: targetWidth }
  });
}
```

**RGB color cycle on a text element**

```javascript
ui.animate({
  id: "label",
  duration: 3000,
  iterationCount: "infinite",
  easing: "linear",
  keyframes: {
    "0%":   { fontColor: "rgba(255,80,80,1)" },
    "33%":  { fontColor: "rgba(80,255,120,1)" },
    "66%":  { fontColor: "rgba(80,120,255,1)" },
    "100%": { fontColor: "rgba(255,80,80,1)" }
  }
});
```

**Bounce a loading indicator**

```javascript
ui.animate({
  id: "dot",
  duration: 700,
  iterationCount: "infinite",
  easing: "easeInOutSine",
  from: { y: 60 },
  to:   { y: 30 }
});
```
