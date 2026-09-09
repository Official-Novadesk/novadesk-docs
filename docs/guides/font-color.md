---
title: Font Color
description: Visual guide to fontColor options for text elements in Novadesk.
---

# Font Color

A visual reference for the `fontColor` property on [addText](/api/ui/ui-elements/add-text) elements. Supports solid colors, transparency, and gradients.

#### Table of Contents
[[toc]]

## Solid Colors

### RGB

```javascript
fontColor: "rgb(255, 255, 255)"    // white
fontColor: "rgb(0, 180, 255)"      // blue
fontColor: "rgb(0, 200, 120)"      // green
```

<div style="display: flex; flex-direction: column; gap: 6px; margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="font-size: 20px; font-weight: 600; color: rgb(255, 255, 255);">rgb(255, 255, 255) — White</div>
<div style="font-size: 20px; font-weight: 600; color: rgb(0, 180, 255);">rgb(0, 180, 255) — Blue</div>
<div style="font-size: 20px; font-weight: 600; color: rgb(0, 200, 120);">rgb(0, 200, 120) — Green</div>
<div style="font-size: 20px; font-weight: 600; color: rgb(255, 100, 50);">rgb(255, 100, 50) — Orange</div>
<div style="font-size: 20px; font-weight: 600; color: rgb(200, 50, 200);">rgb(200, 50, 200) — Purple</div>
<div style="font-size: 20px; font-weight: 600; color: rgb(255, 200, 0);">rgb(255, 200, 0) — Gold</div>

</div>

### RGBA (with opacity)

Add an alpha value for transparent text:

```javascript
fontColor: "rgba(255, 255, 255, 0.8)"     // 80% opaque white
fontColor: "rgba(0, 180, 255, 0.5)"       // 50% opaque blue
fontColor: "rgba(255, 255, 255, 0.15)"    // faint ghost text
```

<div style="display: flex; flex-direction: column; gap: 6px; margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="font-size: 20px; font-weight: 600; color: rgba(255, 255, 255, 1.0);">rgba(255, 255, 255, 1.0) — Full opacity</div>
<div style="font-size: 20px; font-weight: 600; color: rgba(255, 255, 255, 0.8);">rgba(255, 255, 255, 0.8) — Slightly faded</div>
<div style="font-size: 20px; font-weight: 600; color: rgba(255, 255, 255, 0.5);">rgba(255, 255, 255, 0.5) — Half transparent</div>
<div style="font-size: 20px; font-weight: 600; color: rgba(255, 255, 255, 0.3);">rgba(255, 255, 255, 0.3) — Ghost text</div>
<div style="font-size: 20px; font-weight: 600; color: rgba(255, 255, 255, 0.15);">rgba(255, 255, 255, 0.15) — Watermark</div>

</div>

### Hex Colors

```javascript
fontColor: "#FFFFFF"       // white (6-digit)
fontColor: "#00B4FF"       // blue
fontColor: "#FF6432CC"     // orange with alpha (8-digit)
fontColor: "#fff"          // white (3-digit shorthand)
```

<div style="display: flex; flex-direction: column; gap: 6px; margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="font-size: 20px; font-weight: 600; color: #FFFFFF;">#FFFFFF — White</div>
<div style="font-size: 20px; font-weight: 600; color: #00B4FF;">#00B4FF — Blue</div>
<div style="font-size: 20px; font-weight: 600; color: #00C878;">#00C878 — Green</div>
<div style="font-size: 20px; font-weight: 600; color: #FF6432;">#FF6432 — Orange</div>
<div style="font-size: 20px; font-weight: 600; color: #C832C8;">#C832C8 — Purple</div>

</div>

### Named Colors

Novadesk supports CSS named colors:

```javascript
fontColor: "white"
fontColor: "coral"
fontColor: "dodgerblue"
fontColor: "mediumseagreen"
```

<div style="display: flex; flex-direction: column; gap: 6px; margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="font-size: 20px; font-weight: 600; color: white;">white</div>
<div style="font-size: 20px; font-weight: 600; color: coral;">coral</div>
<div style="font-size: 20px; font-weight: 600; color: dodgerblue;">dodgerblue</div>
<div style="font-size: 20px; font-weight: 600; color: mediumseagreen;">mediumseagreen</div>
<div style="font-size: 20px; font-weight: 600; color: gold;">gold</div>
<div style="font-size: 20px; font-weight: 600; color: hotpink;">hotpink</div>

</div>

See [Color Formats](/guides/colors) for the full list of named colors.

## Gradient Text

### Linear Gradient

```javascript
fontColor: "linearGradient(0, rgb(0,180,255), rgb(100,80,255))"
```

<div style="margin: 24px 0; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="font-size: 28px; font-weight: 700; background: linear-gradient(0deg, rgb(0,180,255), rgb(100,80,255)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">linearGradient(0, blue → purple)</div>

<div style="font-size: 12px; color: var(--vp-c-text-2); margin-top: 8px; font-family: monospace;">linearGradient(0, rgb(0,180,255), rgb(100,80,255))</div>

</div>

<div style="margin: 24px 0; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="font-size: 28px; font-weight: 700; background: linear-gradient(90deg, rgb(255,100,50), rgb(255,200,0), rgb(0,200,120)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Sunset Gradient</div>

<div style="font-size: 12px; color: var(--vp-c-text-2); margin-top: 8px; font-family: monospace;">linearGradient(90, rgb(255,100,50), rgb(255,200,0), rgb(0,200,120))</div>

</div>

### Radial Gradient

```javascript
fontColor: "radialGradient(rgb(255,200,0), rgb(255,100,0))"
```

<div style="margin: 24px 0; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="font-size: 28px; font-weight: 700; background: radial-gradient(rgb(255,200,0), rgb(255,100,0)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Radial Glow Effect</div>

<div style="font-size: 12px; color: var(--vp-c-text-2); margin-top: 8px; font-family: monospace;">radialGradient(rgb(255,200,0), rgb(255,100,0))</div>

</div>

## Code Examples

### Status Colors

```javascript
ui.beginUpdate();

ui.addText({
  id: "status-ok",
  text: "● Online",
  x: 16, y: 20,
  width: 120, height: 20,
  fontSize: 13,
  fontColor: "rgb(0, 200, 120)"
});

ui.addText({
  id: "status-warn",
  text: "● Warning",
  x: 16, y: 44,
  width: 120, height: 20,
  fontSize: 13,
  fontColor: "rgb(255, 180, 0)"
});

ui.addText({
  id: "status-err",
  text: "● Offline",
  x: 16, y: 68,
  width: 120, height: 20,
  fontSize: 13,
  fontColor: "rgb(255, 60, 60)"
});

ui.endUpdate();
```

### Faded Secondary Text

```javascript
ui.addText({
  id: "title",
  text: "CPU Usage",
  x: 16, y: 14,
  width: 200, height: 24,
  fontSize: 16,
  fontWeight: "bold",
  fontColor: "rgb(255, 255, 255)"
});

ui.addText({
  id: "subtitle",
  text: "Updated 2 min ago",
  x: 16, y: 40,
  width: 200, height: 16,
  fontSize: 11,
  fontColor: "rgba(255, 255, 255, 0.4)"
});
```

### Gradient Title

```javascript
ui.addText({
  id: "gradient-title",
  text: "Novadesk",
  x: 50, y: 50,
  width: 200, height: 40,
  fontSize: 28,
  fontWeight: "bold",
  fontColor: "linearGradient(90, rgb(0,180,255), rgb(100,80,255))"
});
```

### Watermark

```javascript
ui.addText({
  id: "watermark",
  text: "DEMO",
  x: 80, y: 120,
  width: 200, height: 40,
  fontSize: 32,
  fontWeight: 900,
  fontColor: "rgba(255, 255, 255, 0.08)"
});
```

### Dashboard Card with Color Coding

```javascript
ui.beginUpdate();

ui.addShape({
  id: "card",
  shapeType: "rectangle",
  x: 16, y: 16,
  width: 280, height: 100,
  fillColor: "rgba(25,25,35,0.95)",
  radiusX: 10, radiusY: 10
});

// Title — white
ui.addText({
  id: "title",
  text: "Network",
  x: 28, y: 28,
  width: 240, height: 20,
  fontSize: 14,
  fontColor: "rgb(255, 255, 255)"
});

// Value — gradient
ui.addText({
  id: "value",
  text: "↑ 12.4 MB/s",
  x: 28, y: 52,
  width: 240, height: 32,
  fontSize: 24,
  fontWeight: "bold",
  fontColor: "linearGradient(90, rgb(0,180,255), rgb(0,200,120))"
});

// Status — green
ui.addText({
  id: "status",
  text: "● Connected",
  x: 28, y: 84,
  width: 120, height: 16,
  fontSize: 11,
  fontColor: "rgb(0, 200, 120)"
});

ui.endUpdate();
```

## Quick Reference

| I want to... | Use |
|---|---|
| White text | `fontColor: "rgb(255,255,255)"` |
| Faded/ghost text | `fontColor: "rgba(255,255,255,0.15)"` |
| Status green | `fontColor: "rgb(0,200,120)"` |
| Error red | `fontColor: "rgb(255,60,60)"` |
| Gradient text | `fontColor: "linearGradient(90, rgb(0,180,255), rgb(100,80,255))"` |
| Named color | `fontColor: "dodgerblue"` |

## Related Pages

- [addText](/api/ui/ui-elements/add-text) — full text element API reference
- [Color Formats](/guides/colors) — all color formats and named colors
- [Font Size](/guides/font-size) — fontSize property
- [Font Weight](/guides/font-weight) — fontWeight property
- [Text Align](/guides/text-align) — positioning text within its bounds
