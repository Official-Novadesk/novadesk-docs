---
title: Color Formats
---

# Color Formats

This guide covers the color and gradient formats currently supported by Novadesk.

#### Table of Contents
[[toc]]


You can use these formats in color-capable fields such as `fontColor`, `backgroundColor`, `strokeColor`, `fillColor`, `barColor`, `lineColor`, and similar options.

## Supported Color Formats

## Solid Colors

### RGB Format

Use the `rgb()` function to specify colors with red, green, and blue values (0-255).

**Syntax:**
```javascript
rgb(red, green, blue)
```

Each component uses `0-255`.

**Examples:**
```javascript
// Basic RGB colors
color: "rgb(255, 255, 255)"    // White
color: "rgb(0, 0, 0)"          // Black
color: "rgb(255, 0, 0)"        // Red
color: "rgb(0, 255, 0)"        // Green
color: "rgb(0, 0, 255)"        // Blue
color: "rgb(255, 255, 0)"      // Yellow
color: "rgb(0, 255, 255)"      // Cyan
color: "rgb(255, 0, 255)"      // Magenta

// Custom colors
color: "rgb(100, 150, 200)"    // Light blue
color: "rgb(200, 100, 50)"     // Orange-brown
```

### RGBA Format

Use `rgba()` to add transparency.

**Syntax:**
```javascript
rgba(red, green, blue, alpha)
```

Alpha supports both styles:
- `0.0-1.0` (CSS-like)
- `0-255` (Novadesk-friendly numeric alpha)

**Examples:**
```javascript
// Semi-transparent colors
backgroundcolor: "rgba(0, 0, 0, 0.5)"        // 50% transparent black
backgroundcolor: "rgba(255, 255, 255, 0.8)"  // 80% opaque white
backgroundcolor: "rgba(255, 0, 0, 0.3)"      // 30% opaque red

// Gradient colors
solidcolor: "rgba(255, 100, 0, 180)"         // Orange with alpha 180/255
solidcolor2: "rgba(0, 100, 255, 200)"        // Blue with alpha 200/255

// Fully opaque (equivalent to RGB)
color: "rgba(255, 255, 255, 1.0)"            // White
color: "rgba(0, 0, 0, 1)"                    // Black
```

### Named Colors

Novadesk supports a broad list of CSS named colors (case-insensitive), for example:

```javascript
color: "red"
color: "dodgerblue"
color: "rebeccapurple"
color: "whitesmoke"
```

Special keyword:

```javascript
color: "transparent" // fully transparent
```

### Hexadecimal Format

Use hex notation with a `#` prefix for concise color specification.

**Syntax:**
```javascript
#RGB        // 3-digit hex (each digit repeated)
#RGBA       // 4-digit hex with alpha
#RRGGBB     // 6-digit hex
#RRGGBBAA   // 8-digit hex with alpha
```

**Examples:**
```javascript
// 3-digit hex (shorthand)
color: "#fff"          // White (#ffffff)
color: "#000"          // Black (#000000)
color: "#f00"          // Red (#ff0000)
color: "#0f0"          // Green (#00ff00)
color: "#00f"          // Blue (#0000ff)

// 4-digit hex with alpha
color: "#fff8"         // White with alpha 8/15
color: "#0008"         // Black with alpha 8/15

// 6-digit hex
color: "#ffffff"       // White
color: "#000000"       // Black
color: "#ff0000"       // Red
color: "#00ff00"       // Green
color: "#0000ff"       // Blue
color: "#4CAF50"       // Material Design Green

// 8-digit hex with alpha
backgroundcolor: "#ff000080"  // Red with 50% transparency
backgroundcolor: "#00ff00ff"  // Green fully opaque
```

## Gradients

Novadesk supports `linearGradient(...)` and `radialGradient(...)`.

### Linear Gradient

Defines a linear transition across 2+ colors.

**Syntax:**
```javascript
linearGradient(angle, color1, color2, ...)
```

`angle` is optional. If omitted, default angle is `0`.

**Example:**
```javascript
fontColor: "linearGradient(0, #ff8c00, #ff0080)"
fontColor: "linearGradient(90, #f00, #0f0, #00f)"
fontColor: "linearGradient(rgba(255,0,0,1), rgba(0,0,255,1))" // angle omitted
```

### Radial Gradient

Defines a radial transition across 2+ colors.

**Syntax:**
```javascript
radialGradient(shape, color1, color2, ...)
```

`shape` is optional:
- `"circle"` (default)
- `"ellipse"`

**Example:**
```javascript
fontColor: "radialGradient(circle, #ffff00, #ff0000)"
fontColor: "radialGradient(ellipse, red, rgba(0,0,0,0))"
fontColor: "radialGradient(#00f, #000)" // shape omitted
```

## Notes

- Parsing is case-insensitive and tolerates extra spaces.
- Gradients require at least 2 valid color stops.
- Explicit stop positions (percentages) are not supported in gradient strings.
- `hsl()` / `hsla()` are not currently supported by the built-in parser.

