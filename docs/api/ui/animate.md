---
title: ui.animate(options)
---

# `ui.animate(options)`

Animates supported properties of an existing element using simple tweening (with `to` and `from`) or a multi-stop keyframe timeline.

#### Table of Contents
[[toc]]

## Parameters

### `options`

- **Type**: `Object`
- **Required Keys**:
  - `id: string`
  - Either `to` OR `keyframes`

---

### Core Configuration Properties

- **`id: string`** (Required)  
  The unique identifier of the target element to animate.
- **`duration: number`** (Optional, default: `250`)  
  The total duration of the animation in milliseconds.
- **`easing: string`** (Optional, default: `"linear"`)  
  The global easing function to use for the animation. See [Supported Easing Names](#supported-easing-names) below.
- **`iterationCount: number | "infinite"`** (Optional, default: `1`)  
  The number of times the animation should play. Set to `"infinite"` to loop the animation indefinitely.

---

## Animation Workflows

You can configure animations using one of two mutually exclusive paradigms: **Tween Animation** or **Keyframe Animation**.

### 1. Tween Animation (Simple Transitions)

Uses `to` and optionally `from` to transition properties.

- **`to: Object`** (Required if `keyframes` is omitted)  
  Specifies the target properties to animate to.
- **`from: Object`** (Optional)  
  Specifies the starting properties to animate from. If omitted, the animation starts from the element's current state.

> [!IMPORTANT]
> Tween animation (`to`/`from`) **only** supports the following transform properties:
> - `x: number`
> - `y: number`
> - `width: number`
> - `height: number`
> - `rotate: number`

#### Tween Example
```javascript
// Animates a rectangle from offscreen-left to x: 220, scaling it up and rotating
ui.animate({
  id: "box",
  duration: 500,
  easing: "easeOutCubic",
  iterationCount: "infinite", // Loop forever
  from: { x: -100, y: 120, width: 40, height: 20, rotate: 0 },
  to: { x: 220, y: 120, width: 100, height: 50, rotate: 15 }
});
```

---

### 2. Keyframe Animation (Timeline Transitions)

Uses `keyframes` to build multi-stop, complex animations with custom easing per step.

- **`keyframes: Array<Object> | Object`** (Required if `to` is omitted)  
  Defines the sequence of keyframes. Cannot be combined with `to` or `from` in the same call.

#### Keyframe Array Syntax
An array of objects, where each object represents a single keyframe stop.
- **Keyframe Keys**:
  - **`offset`** or **`at`**: `number` (from `0.0` to `1.0`) or percentage `string` (e.g. `"50%"`) specifying the position of the keyframe in the timeline.
  - **`easing`**: `string` (Optional) - Easing function used to transition *to* this keyframe.
  - **Properties**: Supported properties to animate (see list below).

#### Keyframe Object Syntax
An object where keys are the offsets/percentages and values are the property states.
- **Keys**: Percentage strings (e.g. `"0%"`, `"33%"`, `"100%"`) or decimal strings (e.g. `"0"`, `"0.5"`, `"1"`).
- **Values**: Objects representing the properties to animate at that offset.

> [!IMPORTANT]
> **Supported Keyframe Properties**:
> - **Transforms (All Elements)**: `x`, `y`, `width`, `height`, `rotate`
> - **Typography (Text Elements Only)**:
>   - `fontSize: number`
>   - `fontWeight: number` (e.g., `400`, `700`)
>   - `letterSpacing: number`
>   - `fontColor: string` (RGB/RGBA/Hex color syntax, e.g. `"#ff0000"` or `"rgba(0, 255, 0, 0.5)"`)
>
> Attempting to animate typography properties on non-text elements will throw an error.

#### Keyframe Array Example
```javascript
ui.animate({
  id: "welcomeText",
  duration: 1200,
  iterationCount: "infinite",
  keyframes: [
    { offset: 0.0, x: 20, fontColor: "#ff3333", fontSize: 16 },
    { offset: 0.5, x: 120, fontColor: "#33ff33", fontSize: 24, easing: "easeOutBack" },
    { offset: 1.0, x: 20, fontColor: "#3333ff", fontSize: 16, easing: "easeInQuad" }
  ]
});
```

#### Keyframe Object Example
```javascript
ui.animate({
  id: "cardGlow",
  duration: 800,
  keyframes: {
    "0%": { rotate: 0, width: 100 },
    "50%": { rotate: 180, width: 150 },
    "100%": { rotate: 360, width: 100 }
  }
});
```

---

## Supported Easing Names

- `linear`
- `easeInQuad` | `easeOutQuad` | `easeInOutQuad`
- `easeInCubic` | `easeOutCubic` | `easeInOutCubic`
- `easeInQuart` | `easeOutQuart` | `easeInOutQuart`
- `easeInQuint` | `easeOutQuint` | `easeInOutQuint`
- `easeInSine` | `easeOutSine` | `easeInOutSine`
- `easeInExpo` | `easeOutExpo` | `easeInOutExpo`
- `easeInCirc` | `easeOutCirc` | `easeInOutCirc`
- `easeInBack` | `easeOutBack` | `easeInOutBack`
- `easeInElastic` | `easeOutElastic` | `easeInOutElastic`
- `easeInBounce` | `easeOutBounce` | `easeInOutBounce`

---

## Batch Setup Tip

When creating many elements before starting animations, wrap the creation calls with:

- `ui.beginUpdate()`
- `ui.endUpdate()`

This keeps the initial rendering stable and avoids intermediate redraw flickering during setup.
