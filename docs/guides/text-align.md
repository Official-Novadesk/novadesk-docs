---
title: Text Align
description: Visual guide to all textAlign positions for text elements in Novadesk.
---

# Text Align

A visual reference for the `textAlign` property on [addText](/api/ui/ui-elements/add-text) elements. TextAlign controls both **horizontal** and **vertical** alignment of text within its bounding box.

#### Table of Contents
[[toc]]

## How It Works

Every text element has a bounding box defined by `x`, `y`, `width`, and `height`. The `textAlign` property decides where the text sits **inside** that box.

## All 9 Positions

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;">

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: flex-start; justify-content: flex-start; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"left"`** / `"left-top"`
<br><small>Top-left corner</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: flex-start; justify-content: center; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"center"`** / `"center-top"`
<br><small>Top-center</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: flex-start; justify-content: flex-end; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"right"`** / `"right-top"`
<br><small>Top-right corner</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: center; justify-content: flex-start; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"left-center"`**
<br><small>Center-left</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: center; justify-content: center; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"center-center"`** / `"middle"`
<br><small>Dead center</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: center; justify-content: flex-end; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"right-center"`**
<br><small>Center-right</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: flex-end; justify-content: flex-start; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"left-bottom"`**
<br><small>Bottom-left</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: flex-end; justify-content: center; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"center-bottom"`**
<br><small>Bottom-center</small>
</div>

<div style="text-align: center;">

<div style="border: 2px solid var(--vp-c-brand); border-radius: 6px; padding: 8px; height: 80px; display: flex; align-items: flex-end; justify-content: flex-end; background: var(--vp-c-bg-soft);">
<span style="font-size: 13px; color: var(--vp-c-brand);">Hello</span>
</div>

**`"right-bottom"`**
<br><small>Bottom-right</small>
</div>

</div>

## Syntax Variants

All of these are equivalent — use whichever style you prefer:

| Style | Example | Notes |
|---|---|---|
| **Simple** | `"left"`, `"center"`, `"right"` | Top-aligned only |
| **Hyphenated** | `"left-center"`, `"center-bottom"` | ✅ Recommended |
| **Joined** | `"leftcenter"`, `"centerbottom"` | ✅ Supported |
| **Alias** | `"middle"` | Same as `"center-center"` |

::: tip Case-insensitive
`"Left-Center"`, `"LEFT-CENTER"`, and `"left-center"` all work identically.
:::

## Code Examples

### Basic Centering

Center text perfectly inside a box — the most common use case:

```javascript
ui.addText({
  id: "title",
  text: "Hello World",
  x: 50, y: 50,
  width: 300, height: 60,
  textAlign: "center-center",
  fontSize: 24,
  fontColor: "rgb(255,255,255)"
});
```

### Title at Top-Left

Default alignment — text starts at the top-left corner:

```javascript
ui.addText({
  id: "label",
  text: "CPU Usage",
  x: 16, y: 14,
  width: 200, height: 24,
  textAlign: "left",        // or "left-top"
  fontSize: 14,
  fontColor: "rgb(200,200,200)"
});
```

### Right-Aligned Value

Show a number on the right side, vertically centered:

```javascript
ui.addText({
  id: "value",
  text: "72%",
  x: 200, y: 14,
  width: 100, height: 24,
  textAlign: "right-center",
  fontSize: 14,
  fontColor: "rgb(100,200,255)"
});
```

### Badge at Bottom-Right

Place a small label in the bottom-right corner:

```javascript
ui.addText({
  id: "badge",
  text: "v2.1.0",
  x: 300, y: 260,
  width: 80, height: 20,
  textAlign: "right-bottom",
  fontSize: 10,
  fontColor: "rgb(120,120,120)"
});
```

### Dashboard Stat Card

Combine multiple alignments to build a professional stat card:

```javascript
ui.beginUpdate();

// Card background
ui.addShape({
  id: "card-bg",
  shapeType: "rectangle",
  x: 16, y: 16,
  width: 260, height: 80,
  fillColor: "rgba(30,30,40,0.9)",
  radiusX: 8, radiusY: 8
});

// Label — top-left
ui.addText({
  id: "stat-label",
  text: "CPU Usage",
  x: 28, y: 24,
  width: 120, height: 20,
  textAlign: "left",
  fontSize: 12,
  fontColor: "rgb(160,160,160)"
});

// Value — center-center (big number in the middle)
ui.addText({
  id: "stat-value",
  text: "72%",
  x: 28, y: 42,
  width: 220, height: 40,
  textAlign: "center-center",
  fontSize: 28,
  fontColor: "rgb(255,255,255)"
});

// Unit — bottom-right
ui.addText({
  id: "stat-unit",
  text: "of 8 cores",
  x: 170, y: 72,
  width: 100, height: 16,
  textAlign: "right-bottom",
  fontSize: 10,
  fontColor: "rgb(120,120,120)"
});

ui.endUpdate();
```

## Quick Reference

| I want to... | Use |
|---|---|
| Center text in a box | `"center-center"` |
| Top-left corner (default) | `"left"` |
| Bottom-right corner | `"right-bottom"` |
| Horizontally center, top | `"center"` |
| Vertically center, left edge | `"left-center"` |
| Dead center of everything | `"center-center"` or `"middle"` |

## Related Pages

- [addText](/api/ui/ui-elements/add-text) — full text element API reference
- [General Options](/api/ui/ui-elements/general-options) — shared element properties
- [Color Formats](/guides/colors) — text color and gradient options
