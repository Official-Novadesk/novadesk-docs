---
title: Font Weight
description: Visual guide to all fontWeight values for text elements in Novadesk.
---

# Font Weight

A visual reference for the `fontWeight` property on [addText](/api/ui/ui-elements/add-text) elements. FontWeight controls how **thick** or **thin** the text strokes appear.

#### Table of Contents
[[toc]]

## All 9 Weights

<div style="display: flex; flex-direction: column; gap: 8px; margin: 24px 0; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 100; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">100 — "thin"</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 200; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">200 — "extralight"</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 300; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">300 — "light"</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 400; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">400 — "normal" (default)</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 500; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">500 — "medium"</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 600; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">600 — "semibold"</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 700; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">700 — "bold"</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 800; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">800 — "extrabold"</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-weight: 900; font-size: 22px; color: var(--vp-c-brand); min-width: 200px;">The quick brown fox</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">900 — "black"</code>
</div>

</div>

## Named Values

| String | Number | Description |
|---|---|---|
| `"thin"` | `100` | Hairline weight — delicate, elegant |
| `"extralight"` / `"ultralight"` | `200` | Very light |
| `"light"` | `300` | Light — good for secondary text |
| `"normal"` / `"regular"` | `400` | Default body weight |
| `"medium"` | `500` | Slightly heavier than normal |
| `"semibold"` / `"demibold"` | `600` | Semi-bold — emphasis without full bold |
| `"bold"` | `700` | Bold — headings, emphasis |
| `"extrabold"` / `"ultrabold"` | `800` | Extra bold — strong emphasis |
| `"black"` / `"heavy"` | `900` | Heaviest — display, impact |

::: tip Case-insensitive
`"Bold"`, `"BOLD"`, and `"bold"` all work identically.
:::

::: info Availability
The font must support the requested weight. System fonts like **Segoe UI**, **Arial**, and **Consolas** typically support weights `100–900`. Custom fonts loaded via `fontPath` must include the weight variants you use.
:::

## When to Use Each Weight

| Weight | Best For | Example |
|---|---|---|
| `100–200` | Decorative, artistic text | Watermarks, large display numbers |
| `300` | Secondary text, captions | Timestamps, status labels |
| `400` | Body text, descriptions | Default — most text |
| `500` | Slightly emphasized text | Labels, navigation items |
| `600` | Subheadings, card titles | Section headers |
| `700` | Headings, strong emphasis | Page titles, button labels |
| `800–900` | Hero text, large numbers | Dashboard values, hero sections |

## Code Examples

### Thin Decorative Text

```javascript
ui.addText({
  id: "watermark",
  text: "DEMO",
  x: 50, y: 100,
  width: 200, height: 40,
  fontSize: 32,
  fontWeight: 100,
  fontColor: "rgba(255,255,255,0.15)"
});
```

### Light Secondary Text

```javascript
ui.addText({
  id: "subtitle",
  text: "Last updated 2 min ago",
  x: 16, y: 50,
  width: 200, height: 18,
  fontSize: 11,
  fontWeight: 300,
  fontColor: "rgb(140,140,140)"
});
```

### Bold Heading

```javascript
ui.addText({
  id: "title",
  text: "Settings",
  x: 16, y: 14,
  width: 200, height: 24,
  fontSize: 18,
  fontWeight: "bold",
  fontColor: "rgb(255,255,255)"
});
```

### Heavy Hero Number

```javascript
ui.addText({
  id: "hero-value",
  text: "98.6%",
  x: 16, y: 40,
  width: 200, height: 50,
  fontSize: 42,
  fontWeight: 900,
  fontColor: "rgb(0,180,255)"
});
```

### Visual Hierarchy in a Card

```javascript
ui.beginUpdate();

// Card background
ui.addShape({
  id: "card",
  shapeType: "rectangle",
  x: 16, y: 16,
  width: 280, height: 120,
  fillColor: "rgba(25,25,35,0.95)",
  radiusX: 10, radiusY: 10
});

// Title — semibold
ui.addText({
  id: "card-title",
  text: "Network Speed",
  x: 28, y: 28,
  width: 240, height: 24,
  fontSize: 16,
  fontWeight: "semibold",
  fontColor: "rgb(255,255,255)"
});

// Value — bold, large
ui.addText({
  id: "card-value",
  text: "↑ 12.4 MB/s",
  x: 28, y: 58,
  width: 240, height: 36,
  fontSize: 28,
  fontWeight: "bold",
  fontColor: "rgb(0,200,255)"
});

// Label — light, small
ui.addText({
  id: "card-label",
  text: "Upload • Last 60s avg",
  x: 28, y: 96,
  width: 240, height: 16,
  fontSize: 11,
  fontWeight: 300,
  fontColor: "rgb(120,120,120)"
});

ui.endUpdate();
```

## Quick Reference

| I want to... | Use |
|---|---|
| Default body text | `fontWeight: "normal"` (or `400`, or omit) |
| Bold heading | `fontWeight: "bold"` or `700` |
| Subtle secondary text | `fontWeight: 300` |
| Heavy hero number | `fontWeight: 900` |
| Slight emphasis | `fontWeight: "semibold"` or `600` |
| Thin decorative text | `fontWeight: 100` |

## Related Pages

- [addText](/api/ui/ui-elements/add-text) — full text element API reference
- [Font Size](/guides/font-size) — fontSize property and sizing guide
- [Text Align](/guides/text-align) — positioning text within its bounds
- [Color Formats](/guides/colors) — fontColor options and gradients
