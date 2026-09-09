---
title: Letter Spacing
description: Visual guide to letterSpacing for text elements in Novadesk. Control horizontal spacing between characters.
---

# Letter Spacing

The `letterSpacing` property adds extra horizontal space between characters, measured in pixels. Positive values spread characters apart. Negative values tighten them.

## Visual Scale

Each row below shows the same text with increasing letter spacing:

<div style="margin: 16px 0; display: flex; flex-direction: column; gap: 10px;">
  <div style="border: 2px solid #ef5350; border-radius: 8px; padding: 12px 16px; background: #1a1a2e;">
    <div style="font-family: 'Segoe UI', sans-serif; font-size: 20px; color: #fff; letter-spacing: -3px;">Tight Spacing</div>
    <div style="margin-top: 4px; font-size: 11px; color: #ef5350;">letterSpacing: -3px</div>
  </div>
  <div style="border: 2px solid #ffa726; border-radius: 8px; padding: 12px 16px; background: #1a1a2e;">
    <div style="font-family: 'Segoe UI', sans-serif; font-size: 20px; color: #fff; letter-spacing: -1px;">Tight Spacing</div>
    <div style="margin-top: 4px; font-size: 11px; color: #ffa726;">letterSpacing: -1px</div>
  </div>
  <div style="border: 2px solid #66bb6a; border-radius: 8px; padding: 12px 16px; background: #1a1a2e;">
    <div style="font-family: 'Segoe UI', sans-serif; font-size: 20px; color: #fff; letter-spacing: 0px;">Tight Spacing</div>
    <div style="margin-top: 4px; font-size: 11px; color: #66bb6a;">letterSpacing: 0 (default)</div>
  </div>
  <div style="border: 2px solid #42a5f5; border-radius: 8px; padding: 12px 16px; background: #1a1a2e;">
    <div style="font-family: 'Segoe UI', sans-serif; font-size: 20px; color: #fff; letter-spacing: 2px;">Tight Spacing</div>
    <div style="margin-top: 4px; font-size: 11px; color: #42a5f5;">letterSpacing: 2px</div>
  </div>
  <div style="border: 2px solid #ab47bc; border-radius: 8px; padding: 12px 16px; background: #1a1a2e;">
    <div style="font-family: 'Segoe UI', sans-serif; font-size: 20px; color: #fff; letter-spacing: 5px;">Tight Spacing</div>
    <div style="margin-top: 4px; font-size: 11px; color: #ab47bc;">letterSpacing: 5px</div>
  </div>
  <div style="border: 2px solid #78909c; border-radius: 8px; padding: 12px 16px; background: #1a1a2e;">
    <div style="font-family: 'Segoe UI', sans-serif; font-size: 20px; color: #fff; letter-spacing: 10px;">Tight Spacing</div>
    <div style="margin-top: 4px; font-size: 11px; color: #78909c;">letterSpacing: 10px</div>
  </div>
</div>

## Value Ranges

| Range | Effect | Best For |
|---|---|---|
| `-3` to `-1` | Tightens text, characters overlap slightly | Compact headers, dense UI |
| `0` | Default — no extra spacing | Body text, labels |
| `1` to `3` | Slight spread | Subheadings, emphasis |
| `4` to 8 | Wide spread | Uppercase labels, badges |
| `9+` | Very wide spread | Decorative, watermark text |

## When to Use

| Scenario | letterSpacing | Example |
|---|---|---|
| Compact stat value | `-1` to `0` | `78%` in a small card |
| Normal label | `0` | `CPU Usage` |
| Uppercase section header | `3` to `5` | `SYSTEM MONITOR` |
| Badge or tag | `2` to `4` | `LIVE`, `NEW`, `REC` |
| Decorative watermark | `8` to `12` | Background text |
| Monospace data alignment | `0` | `12:34:56` (keep tight) |

## Code Examples

### Compact Dashboard Value

Tight letter spacing makes large numbers feel dense and intentional:

```javascript
ui.addText({
  id: "value",
  x: 16, y: 40,
  width: 120, height: 40,
  text: "78%",
  fontFace: "Segoe UI",
  fontSize: 36,
  fontWeight: 700,
  letterSpacing: -1,
  fontColor: "rgb(0,180,255)",
  textAlign: "left-center"
});
```

### Uppercase Section Header

Wide spacing on uppercase text creates a clean, structured look:

```javascript
ui.addText({
  id: "header",
  x: 16, y: 12,
  width: 200, height: 20,
  text: "System Monitor",
  fontFace: "Segoe UI",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 4,
  case: "upper",
  fontColor: "rgba(255,255,255,0.5)",
  textAlign: "left-center"
});
```

### Badge / Status Tag

```javascript
ui.addText({
  id: "badge",
  x: 16, y: 80,
  width: 60, height: 18,
  text: "LIVE",
  fontFace: "Segoe UI",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 3,
  case: "upper",
  fontColor: "rgb(255,255,255)",
  textAlign: "center-center",
  backgroundColor: "rgb(0,180,255)"
});
```

### Decorative Watermark

```javascript
ui.addText({
  id: "watermark",
  x: 0, y: 150,
  width: 300, height: 30,
  text: "SYSTEM",
  fontFace: "Segoe UI",
  fontSize: 14,
  fontWeight: 300,
  letterSpacing: 12,
  case: "upper",
  fontColor: "rgba(255,255,255,0.08)",
  textAlign: "center-center"
});
```

### Full Dashboard Card

Combining `letterSpacing` with [`fontSize`](/guides/font-size), [`fontWeight`](/guides/font-weight), and [`fontColor`](/guides/font-color):

```javascript
// Section header — wide spacing, uppercase
ui.addText({
  id: "section",
  x: 16, y: 12, width: 200, height: 16,
  text: "Performance",
  fontFace: "Segoe UI", fontSize: 10, fontWeight: 600,
  letterSpacing: 4, case: "upper",
  fontColor: "rgba(255,255,255,0.4)", textAlign: "left-center"
});

// Large value — tight spacing
ui.addText({
  id: "value",
  x: 16, y: 34, width: 200, height: 36,
  text: "2,048",
  fontFace: "Segoe UI", fontSize: 32, fontWeight: 700,
  letterSpacing: -1,
  fontColor: "rgb(255,255,255)", textAlign: "left-center"
});

// Unit label — normal spacing
ui.addText({
  id: "unit",
  x: 130, y: 42, width: 60, height: 18,
  text: "MB/s",
  fontFace: "Segoe UI", fontSize: 12, fontWeight: 400,
  letterSpacing: 0,
  fontColor: "rgba(255,255,255,0.5)", textAlign: "left-bottom"
});
```

## I Want To...

| Goal | Use |
|---|---|
| Make text tighter / more compact | `letterSpacing: -1` to `-2` |
| Default spacing (no change) | `letterSpacing: 0` |
| Slight breathing room | `letterSpacing: 2` to `3` |
| Uppercase header with wide spacing | `letterSpacing: 4` to `6` + `case: "upper"` |
| Badge or tag look | `letterSpacing: 3` + `case: "upper"` + bold |
| Decorative watermark | `letterSpacing: 10+` + low opacity |

## Common Mistakes

| Problem | Cause | Fix |
|---|---|---|
| Text overflows its container | Too much positive spacing | Reduce `letterSpacing` or increase `width` |
| Characters overlap | Too much negative spacing | Use `-1` or `0` instead of `-3` |
| Monospace data misaligns | Spacing changes character width | Keep `letterSpacing: 0` for monospace data |
| Text looks spaced but container is small | Spacing adds to total width | Account for spacing in your `width` calculation |

::: tip Spacing adds to width
Letter spacing adds pixels **between** characters, so a 10-character string with `letterSpacing: 5` effectively adds `9 × 5 = 45px` of extra width. Make sure your element is wide enough.
:::

## Related Pages

- [Font Size](/guides/font-size) — Control text size with `fontSize`
- [Font Weight](/guides/font-weight) — Control text thickness with `fontWeight`
- [Font Color](/guides/font-color) — Control text color and gradients with `fontColor`
- [Font Face](/guides/font-face) — Choose system or custom fonts with `fontFace`
- [Text Align](/guides/text-align) — Position text within its element
- [addText](/api/ui/ui-elements/add-text) — Full API reference for all text element properties
