---
title: Font Face
description: Visual guide to fontFace for text elements in Novadesk. Use system fonts or load custom .ttf/.otf files.
---

# Font Face

The `fontFace` property sets the font family for a text element. It accepts the name of any installed system font or a custom font loaded via [`fontPath`](/api/ui/ui-elements/add-text#fontpath).

## System Fonts

Windows comes with a set of built-in fonts you can use directly — no extra files needed.

### Sans-Serif (Clean, Modern)

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0;">
  <div style="border: 2px solid #4fc3f7; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Segoe UI', sans-serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Segoe UI</div>
  </div>
  <div style="border: 2px solid #4fc3f7; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Arial', sans-serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Arial</div>
  </div>
  <div style="border: 2px solid #4fc3f7; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Tahoma', sans-serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Tahoma</div>
  </div>
  <div style="border: 2px solid #4fc3f7; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Verdana', sans-serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Verdana</div>
  </div>
  <div style="border: 2px solid #4fc3f7; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Trebuchet MS', sans-serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Trebuchet MS</div>
  </div>
  <div style="border: 2px solid #4fc3f7; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Calibri', sans-serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Calibri</div>
  </div>
</div>

### Serif (Traditional, Elegant)

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0;">
  <div style="border: 2px solid #ab47bc; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Georgia', serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Georgia</div>
  </div>
  <div style="border: 2px solid #ab47bc; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Times New Roman', serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Times New Roman</div>
  </div>
  <div style="border: 2px solid #ab47bc; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Cambria', serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Cambria</div>
  </div>
</div>

### Monospace (Code, Data)

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0;">
  <div style="border: 2px solid #66bb6a; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Consolas', monospace; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Consolas</div>
  </div>
  <div style="border: 2px solid #66bb6a; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Courier New', monospace; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Courier New</div>
  </div>
  <div style="border: 2px solid #66bb6a; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Lucida Console', monospace; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Lucida Console</div>
  </div>
</div>

### Display (Decorative, Headlines)

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 16px 0;">
  <div style="border: 2px solid #ffa726; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Impact', sans-serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Impact</div>
  </div>
  <div style="border: 2px solid #ffa726; border-radius: 8px; padding: 16px; text-align: center; background: #1a1a2e;">
    <div style="font-family: 'Palatino Linotype', serif; font-size: 22px; color: #fff;">Hello World</div>
    <div style="margin-top: 8px; font-size: 12px; color: #888;">Palatino Linotype</div>
  </div>
</div>

## Quick Reference

| Category | Font Names |
|---|---|
| **Sans-Serif** | `Segoe UI`, `Arial`, `Tahoma`, `Verdana`, `Trebuchet MS`, `Calibri` |
| **Serif** | `Georgia`, `Times New Roman`, `Cambria`, `Palatino Linotype` |
| **Monospace** | `Consolas`, `Courier New`, `Lucida Console` |
| **Display** | `Impact` |

::: tip Recommendation
**Segoe UI** is the default Windows system font and the safest choice for widget UIs. It renders cleanly at all sizes and weights.
:::

## Custom Fonts

Load any `.ttf` or `.otf` font file using [`fontPath`](/api/ui/ui-elements/add-text#fontpath). The `fontFace` value must match the family name embedded in the font file.

```javascript
// Download from Google Fonts and place in your widget's fonts/ folder
ui.addText({
  id: "title",
  text: "Custom Font",
  fontFace: "Inter",
  fontPath: "./fonts/Inter-Regular.ttf",
  fontSize: 20
});
```

### Finding the Font Family Name

The `fontFace` string must match the **family name** inside the font file — not the filename. To find it:

1. Open the `.ttf` or `.otf` file in Windows Font Viewer
2. The family name is shown at the top (e.g., "Inter", "JetBrains Mono")
3. Use that exact string as your `fontFace` value

::: warning Common Mistake
```javascript
// ❌ Wrong — filename doesn't always match the family name
fontFace: "Inter-Regular",
fontPath: "./fonts/Inter-Regular.ttf"

// ✅ Correct — use the family name embedded in the file
fontFace: "Inter",
fontPath: "./fonts/Inter-Regular.ttf"
```
:::

### Loading Multiple Weights

Load different weight files for the same family and switch with [`fontWeight`](/api/ui/ui-elements/add-text#fontweight):

```javascript
// Light weight
ui.addText({
  id: "subtitle",
  text: "Light Weight",
  fontFace: "Inter",
  fontPath: "./fonts/Inter-Light.ttf",
  fontWeight: 300,
  fontSize: 14
});

// Bold weight
ui.addText({
  id: "title",
  text: "Bold Weight",
  fontFace: "Inter",
  fontPath: "./fonts/Inter-Bold.ttf",
  fontWeight: 700,
  fontSize: 20
});
```

### Loading from URL

`fontPath` also accepts HTTP(S) URLs. The font downloads asynchronously and the element redraws automatically:

```javascript
ui.addText({
  id: "title",
  text: "Remote Font",
  fontFace: "Inter",
  fontPath: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  fontSize: 18
});
```

## Font Pairing Patterns

Good widget design often uses two fonts — one for headings and one for body text.

### Modern Dashboard

| Element | fontFace | fontSize | fontWeight |
|---|---|---|---|
| Widget title | `Segoe UI` | 18 | 600 (semibold) |
| Stat values | `Segoe UI` | 32 | 700 (bold) |
| Labels | `Segoe UI` | 11 | 400 (normal) |
| Status text | `Consolas` | 10 | 400 (normal) |

```javascript
// Title
ui.addText({
  id: "title", x: 16, y: 12, width: 200, height: 24,
  text: "System Monitor",
  fontFace: "Segoe UI", fontSize: 18, fontWeight: 600,
  fontColor: "rgb(255,255,255)", textAlign: "left-center"
});

// Large value
ui.addText({
  id: "value", x: 16, y: 40, width: 200, height: 40,
  text: "78%",
  fontFace: "Segoe UI", fontSize: 32, fontWeight: 700,
  fontColor: "rgb(0,180,255)", textAlign: "left-center"
});

// Small label
ui.addText({
  id: "label", x: 16, y: 80, width: 200, height: 16,
  text: "CPU Usage",
  fontFace: "Segoe UI", fontSize: 11, fontWeight: 400,
  fontColor: "rgba(255,255,255,0.6)", textAlign: "left-center"
});

// Monospace status
ui.addText({
  id: "status", x: 16, y: 100, width: 200, height: 14,
  text: "PID: 4820 • 3.2 GHz",
  fontFace: "Consolas", fontSize: 10, fontWeight: 400,
  fontColor: "rgba(255,255,255,0.4)", textAlign: "left-center"
});
```

### Media Player

| Element | fontFace | fontSize | fontWeight |
|---|---|---|---|
| Song title | `Segoe UI` | 16 | 600 |
| Artist name | `Segoe UI` | 12 | 400 |
| Timestamp | `Consolas` | 11 | 400 |

```javascript
ui.addText({
  id: "song", x: 80, y: 16, width: 200, height: 20,
  text: "Midnight City",
  fontFace: "Segoe UI", fontSize: 16, fontWeight: 600,
  fontColor: "rgb(255,255,255)", textAlign: "left-center"
});

ui.addText({
  id: "artist", x: 80, y: 38, width: 200, height: 16,
  text: "M83",
  fontFace: "Segoe UI", fontSize: 12, fontWeight: 400,
  fontColor: "rgba(255,255,255,0.6)", textAlign: "left-center"
});

ui.addText({
  id: "time", x: 80, y: 56, width: 200, height: 14,
  text: "01:23 / 04:02",
  fontFace: "Consolas", fontSize: 11, fontWeight: 400,
  fontColor: "rgba(255,255,255,0.4)", textAlign: "left-center"
});
```

## I Want To...

| Goal | Use |
|---|---|
| Default Windows look | `fontFace: "Segoe UI"` |
| Clean, minimal text | `fontFace: "Arial"` |
| Code or data display | `fontFace: "Consolas"` |
| Decorative headline | `fontFace: "Impact"` |
| Load a Google Font | `fontFace: "Inter"` + `fontPath: "./fonts/Inter-Regular.ttf"` |
| Match the system font | `fontFace: "Segoe UI"` (Windows 10/11 default) |

## Common Mistakes

| Problem | Cause | Fix |
|---|---|---|
| Font not rendering | `fontFace` doesn't match the family name in the file | Check the font file's family name in Windows Font Viewer |
| Fallback font used | Font file not found at `fontPath` | Verify the relative path from your script directory |
| Font looks wrong | Wrong weight loaded | Match `fontWeight` to the weight of the loaded `.ttf` file |
| Crashes on load | Invalid or corrupt font file | Re-download the font from a trusted source |

## Related Pages

- [Font Size](/guides/font-size) — Control text size with `fontSize`
- [Font Weight](/guides/font-weight) — Control text thickness with `fontWeight`
- [Font Color](/guides/font-color) — Control text color and gradients with `fontColor`
- [addText](/api/ui/ui-elements/add-text) — Full API reference for all text element properties
- [Color Formats](/guides/colors) — RGB, RGBA, hex, and gradient syntax
