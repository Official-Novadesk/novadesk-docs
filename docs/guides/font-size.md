---
title: Font Size
description: Visual guide to fontSize for text elements in Novadesk.
---

# Font Size

A visual reference for the `fontSize` property on [addText](/api/ui/ui-elements/add-text) elements. Font size is measured in **typographic points**. Default is `12`.

#### Table of Contents
[[toc]]

## Visual Scale

<div style="display: flex; flex-direction: column; gap: 8px; margin: 24px 0; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 10px; color: var(--vp-c-brand); min-width: 240px;">Caption, fine print</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">10</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 12px; color: var(--vp-c-brand); min-width: 240px;">Default body text (base size)</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">12</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 14px; color: var(--vp-c-brand); min-width: 240px;">Small labels, secondary text</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">14</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 16px; color: var(--vp-c-brand); min-width: 240px;">Regular body text, descriptions</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">16</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 18px; color: var(--vp-c-brand); min-width: 240px;">Section subheadings</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">18</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 20px; color: var(--vp-c-brand); min-width: 240px;">Card titles, widget headings</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">20</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 24px; color: var(--vp-c-brand); min-width: 240px;">Page headings, hero text</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">24</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 32px; color: var(--vp-c-brand); min-width: 240px;">Large display numbers</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">32</code>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
  <span style="font-size: 40px; color: var(--vp-c-brand); min-width: 240px;">Dashboard hero values</span>
  <code style="font-size: 12px; color: var(--vp-c-text-2);">40</code>
</div>

</div>

## Common Size Ranges

| Use Case | Recommended Range | Example |
|---|---|---|
| Timestamps, fine print | `8–11` | "Last updated 2 min ago" |
| Default text, labels | `12–14` | "CPU Usage", "Settings" |
| Body text, descriptions | `14–16` | Widget content, descriptions |
| Subheadings | `18–20` | Section titles |
| Widget titles | `20–24` | "System Monitor" |
| Large numbers, hero values | `28–48` | "72%", "1920×1080" |

## Code Examples

**Small timestamp:**

```javascript
ui.addText({
  id: "timestamp",
  text: "Updated 2 min ago",
  x: 16, y: 280,
  width: 200, height: 16,
  fontSize: 10,
  fontColor: "rgb(120,120,120)"
});
```

**Widget title:**

```javascript
ui.addText({
  id: "title",
  text: "System Monitor",
  x: 16, y: 14,
  width: 260, height: 28,
  fontSize: 20,
  fontWeight: "bold",
  fontColor: "rgb(255,255,255)"
});
```

**Large dashboard value:**

```javascript
ui.addText({
  id: "big-value",
  text: "72%",
  x: 16, y: 40,
  width: 200, height: 50,
  fontSize: 36,
  fontWeight: "bold",
  fontColor: "rgb(0,180,255)"
});
```

**Visual hierarchy in a card:**

```javascript
ui.beginUpdate();

ui.addShape({
  id: "card",
  shapeType: "rectangle",
  x: 16, y: 16,
  width: 280, height: 140,
  fillColor: "rgba(25,25,35,0.95)",
  radiusX: 10, radiusY: 10
});

// Title — large, bold
ui.addText({
  id: "card-title",
  text: "System Monitor",
  x: 28, y: 28,
  width: 250, height: 28,
  fontSize: 20,
  fontWeight: "bold",
  fontColor: "rgb(255,255,255)"
});

// Big number — extra large, semibold
ui.addText({
  id: "card-value",
  text: "72%",
  x: 28, y: 60,
  width: 120, height: 44,
  fontSize: 36,
  fontWeight: "semibold",
  fontColor: "rgb(0,180,255)"
});

// Label — small, regular
ui.addText({
  id: "card-label",
  text: "CPU Usage",
  x: 28, y: 108,
  width: 120, height: 18,
  fontSize: 12,
  fontColor: "rgb(160,160,160)"
});

// Status — small, light
ui.addText({
  id: "card-status",
  text: "Normal",
  x: 180, y: 108,
  width: 100, height: 18,
  fontSize: 11,
  fontWeight: 300,
  textAlign: "right",
  fontColor: "rgb(0,200,120)"
});

ui.endUpdate();
```

## Quick Reference

| I want to... | Use |
|---|---|
| Default body text | `fontSize: 12` (or omit) |
| Widget title | `fontSize: 20` |
| Large hero number | `fontSize: 36` |
| Small timestamp | `fontSize: 10` |
| Section subheading | `fontSize: 18` |
| Page heading | `fontSize: 24` |

## Related Pages

- [addText](/api/ui/ui-elements/add-text) — full text element API reference
- [Font Weight](/guides/font-weight) — fontWeight property and weight guide
- [Text Align](/guides/text-align) — positioning text within its bounds
- [Color Formats](/guides/colors) — fontColor options and gradients
