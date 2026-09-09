---
title: Text Clip
description: Visual guide to textClip options for overflow behavior in Novadesk text elements.
---

# Text Clip

A visual reference for the `textClip` property on [addText](/api/ui/ui-elements/add-text) elements. Controls what happens when text overflows its bounding box.

#### Table of Contents
[[toc]]

## How It Works

Every text element has a fixed bounding box (`width` × `height`). When the text is longer than the box, `textClip` decides how to handle the overflow.

```
Bounding box: width: 150px, height: 40px

Text: "This is a very long text that overflows"
```

## All 4 Behaviors

### `"none"` (default)

Text overflows without any clipping — it paints outside the bounding box.

<div style="margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="width: 150px; height: 40px; overflow: visible; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px; position: relative;">
<span style="font-size: 13px; color: var(--vp-c-brand); white-space: nowrap;">This is a very long text that overflows</span>
</div>

<div style="font-size: 12px; color: var(--vp-c-text-2); margin-top: 8px; font-family: monospace;">textClip: "none" — text paints outside the box</div>

</div>

```javascript
ui.addText({
  id: "overflow",
  text: "This is a very long text that overflows",
  x: 16, y: 20,
  width: 150, height: 40,
  textClip: "none"           // default
});
```

### `"clip"` / `"on"`

Hard clip at the element boundary — text is cut off sharply at the edge.

<div style="margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="width: 150px; height: 40px; overflow: hidden; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px;">
<span style="font-size: 13px; color: var(--vp-c-brand); white-space: nowrap;">This is a very long text that overflows</span>
</div>

<div style="font-size: 12px; color: var(--vp-c-text-2); margin-top: 8px; font-family: monospace;">textClip: "clip" — text cut off at edge</div>

</div>

```javascript
ui.addText({
  id: "clipped",
  text: "This is a very long text that overflows",
  x: 16, y: 70,
  width: 150, height: 40,
  textClip: "clip"           // or "on"
});
```

### `"ellipsis"`

Clip with a trailing `…` — shows the text fits, then adds an ellipsis.

<div style="margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="width: 150px; height: 40px; overflow: hidden; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px;">
<span style="font-size: 13px; color: var(--vp-c-brand); white-space: nowrap; text-overflow: ellipsis;">This is a very long text that overflows</span>
</div>

<div style="font-size: 12px; color: var(--vp-c-text-2); margin-top: 8px; font-family: monospace;">textClip: "ellipsis" — clipped with trailing …</div>

</div>

```javascript
ui.addText({
  id: "ellipsis",
  text: "This is a very long text that overflows",
  x: 16, y: 120,
  width: 150, height: 40,
  textClip: "ellipsis"
});
```

### `"wrap"`

Wrap text to additional lines within the element width.

<div style="margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="width: 150px; height: 70px; overflow: hidden; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px;">
<span style="font-size: 13px; color: var(--vp-c-brand);">This is a very long text that overflows</span>
</div>

<div style="font-size: 12px; color: var(--vp-c-text-2); margin-top: 8px; font-family: monospace;">textClip: "wrap" — text wraps to next line</div>

</div>

```javascript
ui.addText({
  id: "wrapped",
  text: "This is a very long text that overflows",
  x: 16, y: 170,
  width: 150, height: 70,
  textClip: "wrap"
});
```

## Side-by-Side Comparison

All 4 behaviors on the same text, same box size:

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 24px 0; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 8px; border: 1px solid var(--vp-c-divider);">

<div style="text-align: center;">
<div style="width: 120px; height: 40px; overflow: visible; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px; margin: 0 auto;">
<span style="font-size: 11px; color: var(--vp-c-brand); white-space: nowrap;">Long text here</span>
</div>
<div style="font-size: 11px; color: var(--vp-c-text-2); margin-top: 8px;">"none"</div>
</div>

<div style="text-align: center;">
<div style="width: 120px; height: 40px; overflow: hidden; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px; margin: 0 auto;">
<span style="font-size: 11px; color: var(--vp-c-brand); white-space: nowrap;">Long text here</span>
</div>
<div style="font-size: 11px; color: var(--vp-c-text-2); margin-top: 8px;">"clip"</div>
</div>

<div style="text-align: center;">
<div style="width: 120px; height: 40px; overflow: hidden; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px; margin: 0 auto;">
<span style="font-size: 11px; color: var(--vp-c-brand); white-space: nowrap; text-overflow: ellipsis;">Long text here</span>
</div>
<div style="font-size: 11px; color: var(--vp-c-text-2); margin-top: 8px;">"ellipsis"</div>
</div>

<div style="text-align: center;">
<div style="width: 120px; height: 60px; overflow: hidden; border: 2px solid var(--vp-c-brand); border-radius: 4px; padding: 4px; margin: 0 auto;">
<span style="font-size: 11px; color: var(--vp-c-brand);">Long text here</span>
</div>
<div style="font-size: 11px; color: var(--vp-c-text-2); margin-top: 8px;">"wrap"</div>
</div>

</div>

## When to Use Each

| Value | Best For |
|---|---|
| `"none"` | Text that should always be fully visible, large elements |
| `"clip"` | Hard cutoff, progress bars with labels |
| `"ellipsis"` | Filenames, labels, truncated titles |
| `"wrap"` | Descriptions, notes, multi-line content |

## Code Examples

### Truncated Filename

```javascript
ui.addText({
  id: "filename",
  text: "my-really-long-document-name-final-v2.xlsx",
  x: 16, y: 20,
  width: 200, height: 20,
  fontSize: 12,
  textClip: "ellipsis",
  fontColor: "rgb(200,200,200)"
});
```

### Wrapped Description

```javascript
ui.addText({
  id: "description",
  text: "This widget displays real-time system metrics including CPU, memory, disk usage, and network throughput.",
  x: 16, y: 60,
  width: 260, height: 60,
  fontSize: 12,
  textClip: "wrap",
  fontColor: "rgb(180,180,180)"
});
```

### Hard Clipped Badge

```javascript
ui.addText({
  id: "badge",
  text: "NEW FEATURE",
  x: 16, y: 120,
  width: 80, height: 20,
  fontSize: 10,
  fontWeight: "bold",
  textClip: "clip",
  fontColor: "rgb(0,180,255)",
  backgroundColor: "rgba(0,180,255,0.15)"
});
```

## Quick Reference

| I want to... | Use |
|---|---|
| Default — let text overflow | `textClip: "none"` (or omit) |
| Cut off text at edge | `textClip: "clip"` |
| Show `…` when truncated | `textClip: "ellipsis"` |
| Wrap to multiple lines | `textClip: "wrap"` |

## Related Pages

- [addText](/api/ui/ui-elements/add-text) — full text element API reference
- [Text Align](/guides/text-align) — positioning text within its bounds
- [Font Size](/guides/font-size) — fontSize property
- [General Options](/api/ui/ui-elements/general-options) — shared element properties
