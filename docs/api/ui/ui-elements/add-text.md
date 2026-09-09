---
title: addText
description: Add a text element with font styling, gradients, and inline tags.
---

# ui.addText()

Renders styled text inside the widget. Supports custom fonts, gradient colors, shadows, alignment, clipping, letter spacing, text decoration, case transformation, and user text selection. Inline style tags let different parts of a string carry their own formatting.

```javascript
ui.addText(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options) (position, size, visibility, padding, tooltip, mouse events, etc.).
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addText({
  id: "cpu-label",
  x: 16, y: 14,
  width: 260, height: 24,
  text: "CPU",
  fontSize: 13,
  fontColor: "rgba(180,180,180,1)",
  textAlign: "left-center"
});
```

## Content

<PropertyBox name="text" type="string" defaultValue='""'>

The text to display. Supports plain strings, `\n` newlines, and inline style tags (see [Inline Styles](#inline-styles) below).

Updating `text` via `setElementProperties` immediately redraws the element.

```javascript
ui.addText({ id: "label", text: "CPU: 72%" });

// Update at runtime
ui.setElementProperties("label", { text: "CPU: " + payload.cpu + "%" });
```

</PropertyBox>

## Font

<PropertyBox name="fontFace" type="string" defaultValue='"Arial"'>

Font family name. Must match an installed system font or the family name inside a custom font file loaded with `fontPath`.

```javascript
fontFace: "Segoe UI"
fontFace: "Consolas"
fontFace: "Inter"     // with fontPath pointing to the .ttf file
```

</PropertyBox>

<PropertyBox name="fontSize" type="number" defaultValue="12">

Font size in typographic points. Accepts integer values.

</PropertyBox>

<PropertyBox name="fontWeight" type="number | string" defaultValue="400">

Font weight as a number (`100–900`) or a named string. Named values are case-insensitive.

| String | Weight |
|---|---|
| `"thin"` | 100 |
| `"extralight"` / `"ultralight"` | 200 |
| `"light"` | 300 |
| `"normal"` / `"regular"` | 400 |
| `"medium"` | 500 |
| `"semibold"` / `"demibold"` | 600 |
| `"bold"` | 700 |
| `"extrabold"` / `"ultrabold"` | 800 |
| `"black"` / `"heavy"` | 900 |

```javascript
fontWeight: 700
fontWeight: "bold"    // equivalent
```

</PropertyBox>

<PropertyBox name="italic" type="boolean" defaultValue="false">

`true` renders the text in italic style. Also accepted as `fontStyle: "italic"` (the two are interchangeable — `fontStyle` only recognizes `"italic"`, anything else has no effect).

</PropertyBox>

<PropertyBox name="fontPath" type="string" defaultValue='""'>

Path or URL to a custom font file (`.ttf` or `.otf`). Relative paths resolve against the widget's script directory. URLs are downloaded asynchronously — the element redraws automatically once the font is cached.

`fontFace` must match the family name embedded in the file.

```javascript
fontFace: "Inter",
fontPath: "./fonts/Inter-Regular.ttf"
```

</PropertyBox>

## Color

<PropertyBox name="fontColor" type="string" defaultValue='"rgb(0,0,0)"'>

Text color or gradient. Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`. Gradients span the full text layout bounds.

```javascript
fontColor: "rgb(230,230,230)"
fontColor: "rgba(255,255,255,0.85)"
fontColor: "linearGradient(0, rgb(0,180,255), rgb(100,80,255))"
```

</PropertyBox>

## Alignment and Layout

<PropertyBox name="textAlign" type="string" defaultValue='"left"'>

Combined horizontal and vertical alignment within the element bounds. Also accepted as `align`. Case-insensitive.

| Value | Horizontal | Vertical |
|---|---|---|
| `"left"` / `"left-top"` | Left | Top (default) |
| `"center"` / `"center-top"` | Center | Top |
| `"right"` / `"right-top"` | Right | Top |
| `"left-center"` | Left | Center |
| `"center-center"` / `"middle"` | Center | Center |
| `"right-center"` | Right | Center |
| `"left-bottom"` | Left | Bottom |
| `"center-bottom"` | Center | Bottom |
| `"right-bottom"` | Right | Bottom |

Hyphenated (`"left-center"`) and joined (`"leftcenter"`) variants are both accepted.

</PropertyBox>

<PropertyBox name="textClip" type="string" defaultValue='"none"'>

How text behaves when it overflows the element bounds. Case-insensitive.

| Value | Behavior |
|---|---|
| `"none"` | Text overflows without clipping (default) |
| `"clip"` / `"on"` | Hard clip at the element boundary |
| `"ellipsis"` | Clip with a trailing `…` |
| `"wrap"` | Wrap to additional lines within the element width |

</PropertyBox>

<PropertyBox name="letterSpacing" type="number" defaultValue="0">

Extra horizontal spacing between characters in pixels. Positive values spread characters apart. Negative values tighten them.

</PropertyBox>

## Decoration

<PropertyBox name="underLine" type="boolean" defaultValue="false">

`true` draws an underline beneath the text.

</PropertyBox>

<PropertyBox name="strikeThrough" type="boolean" defaultValue="false">

`true` draws a horizontal line through the middle of the text.

</PropertyBox>

<PropertyBox name="case" type="string" defaultValue='"normal"'>

Visual case transformation applied at render time. The underlying `text` value is never changed. Case-insensitive.

| Value | Effect |
|---|---|
| `"normal"` | No transformation (default) |
| `"upper"` | ALL CAPS |
| `"lower"` | all lowercase |
| `"capitalize"` | First Letter Of Each Word |
| `"sentence"` | First letter of each sentence |

</PropertyBox>

## Shadow

<PropertyBox name="fontShadow" type="object | object[]">

One or more drop shadows behind the text. Pass a single object or an array for layered shadows.

Each shadow object:

| Property | Type | Default | Description |
|---|---|---|---|
| `x` | `number` | `0` | Horizontal offset in pixels |
| `y` | `number` | `0` | Vertical offset in pixels |
| `blur` | `number` | `0` | Blur radius in pixels |
| `color` | `string` | `"rgb(0,0,0)"` | Shadow color |

```javascript
// Single drop shadow
fontShadow: { x: 0, y: 2, blur: 4, color: "rgba(0,0,0,0.6)" }

// Glow effect (layered shadows)
fontShadow: [
  { x: 0, y: 0, blur: 8,  color: "rgba(0,180,255,0.5)" },
  { x: 0, y: 0, blur: 16, color: "rgba(0,180,255,0.3)" }
]
```

</PropertyBox>

## Text Selection

<PropertyBox name="textSelection" type="boolean" defaultValue="false">

`true` lets the user click and drag to select text. Selected text can be copied with `Ctrl+C`. The selection is highlighted using `selectionBackgroundColor`.

</PropertyBox>

<PropertyBox name="selectionBackgroundColor" type="string" defaultValue='"rgba(51,144,255,0.47)"'>

Highlight color for selected text. Only takes effect when `textSelection` is `true`. Does not support gradients.

</PropertyBox>

<PropertyBox name="selectionTextColor" type="string" defaultValue='"rgb(255,255,255)"'>

Color of the selected text itself. When not set, selected text keeps its original `fontColor`.

</PropertyBox>

## Inline Styles

Style tags inside `text` let different portions of a string carry their own formatting. Tags can be nested.

| Tag | Effect |
|---|---|
| `<b>...</b>` | Bold |
| `<i>...</i>` | Italic |
| `<u>...</u>` | Underline |
| `<s>...</s>` | Strikethrough |
| `<color=value>...</color>` | Font color (any Novadesk color format) |
| `<size=value>...</size>` | Font size in points |
| `<font=name>...</font>` | Font family |
| `<case=value>...</case>` | Case transformation (`upper`, `lower`, `capitalize`, `sentence`, `normal`) |

```javascript
ui.addText({
  id: "status",
  text: "Status: <color=rgb(0,220,100)>Online</color>",
  fontSize: 14,
  fontColor: "rgba(200,200,200,1)"
});

ui.addText({
  id: "mixed",
  text: "<b>CPU</b> <size=20>72%</size>  <color=rgba(255,140,0,1)>▲</color>",
  fontSize: 13,
  fontColor: "rgb(200,200,200)"
});
```

## Practical Examples

**Live value label updated from IPC**

```javascript
// ui.js
ui.addText({
  id: "cpu-pct",
  x: 200, y: 14,
  width: 60, height: 20,
  text: "0%",
  fontSize: 13,
  fontColor: "rgb(0,180,255)",
  textAlign: "right-center"
});

ipcRenderer.on("stats", (event, payload) => {
  ui.setElementProperties("cpu-pct", { text: payload.cpu + "%" });
});
```

**Heading with glow shadow**

```javascript
ui.addText({
  id: "heading",
  x: 16, y: 10,
  width: 260, height: 32,
  text: "SYSTEM MONITOR",
  fontSize: 14,
  fontColor: "rgb(0,200,255)",
  fontWeight: "semibold",
  letterSpacing: 3,
  case: "upper",
  textAlign: "left-center",
  fontShadow: { x: 0, y: 0, blur: 8, color: "rgba(0,180,255,0.6)" }
});
```

**Multi-style inline text**

```javascript
ui.addText({
  id: "info",
  x: 16, y: 50,
  width: 280, height: 20,
  text: "<color=rgba(160,160,160,1)>RAM:</color>  <b>58%</b>  <color=rgba(100,220,100,1)>Normal</color>",
  fontSize: 13,
  fontColor: "rgb(210,210,210)",
  textAlign: "left-center"
});
```

**Selectable log output**

```javascript
ui.addText({
  id: "log",
  x: 16, y: 80,
  width: 360, height: 80,
  text: "2026-08-11 14:23:01  Widget started\n2026-08-11 14:23:02  Connected",
  fontSize: 12,
  fontFace: "Consolas",
  fontColor: "rgba(180,220,140,1)",
  textClip: "wrap",
  textAlign: "left-top",
  textSelection: true,
  selectionBackgroundColor: "rgba(0,120,215,0.4)"
});
```

**Truncated label with ellipsis**

```javascript
ui.addText({
  id: "filename",
  x: 16, y: 120,
  width: 200, height: 20,
  text: "very-long-filename-that-exceeds-the-width.txt",
  fontSize: 13,
  fontColor: "rgba(200,200,200,1)",
  textClip: "ellipsis",
  textAlign: "left-center"
});
```
