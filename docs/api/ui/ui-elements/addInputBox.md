---
title: addInputBox
---

# ui.addInputBox()

A fully interactive text input field rendered with Direct2D and DirectWrite. Supports typing, cursor movement, text selection, clipboard operations, undo/redo, password masking, multi-line editing, and per-character input filtering.

```javascript
ui.addInputBox(options);
```

::: info
Also accepts all [General Element Options](/api/ui/ui-elements/general-options/general-elements-options) (position, size, visibility, padding, tooltip, mouse events, etc.).

The cursor is always set to the I-beam regardless of `mouseEventCursorName`.
:::

#### Table of Contents
[[toc]]

## Quick Example

```javascript
ui.addInputBox({
  id: "search",
  x: 16, y: 40,
  width: 260, height: 36,
  placeholder: "Search...",
  fontSize: 14,
  fontColor: "rgb(230,230,230)",
  fillColor: "rgba(255,255,255,0.08)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  borderFocusColor: "rgb(0,180,255)",
  borderRadius: 6,
  onEnter: () => {
    const query = ui.getElementProperty("search", "text");
    ipcRenderer.send("search", { query });
  }
});
```

## Content

<PropertyBox name="text" type="string" defaultValue='""'>

Initial text content of the input box. When updated via `setElementProperties`, the content is completely replaced, the caret moves to the start, any selection is cleared, and the undo/redo history is reset.

Read the current value at any time with `ui.getElementProperty(id, "text")`.

```javascript
// Set initial value
ui.addInputBox({ id: "name", text: "John Doe" });

// Read current value
const val = ui.getElementProperty("name", "text");

// Replace programmatically
ui.setElementProperties("name", { text: "Jane Smith" });
```

</PropertyBox>

<PropertyBox name="placeholder" type="string" defaultValue='""'>

Hint text shown when the input is empty and unfocused. Rendered using `placeholderColor` and disappears as soon as the user types or `text` is set.

```javascript
placeholder: "Type to search..."
placeholder: "Enter your email"
```

</PropertyBox>

<PropertyBox name="maxLength" type="number" defaultValue="0">

Maximum number of characters accepted. `0` means unlimited. When the limit is reached, keyboard input is ignored and pasted text is truncated to fit.

```javascript
maxLength: 0    // unlimited
maxLength: 16   // username
maxLength: 4    // PIN
```

</PropertyBox>

<PropertyBox name="multiline" type="boolean" defaultValue="false">

When `true`, Enter inserts a newline and text wraps to the element width. Vertical scrolling activates when content overflows. The default text alignment becomes `left-top` so text starts at the top.

When `false`, Enter fires the `onEnter` callback and text scrolls horizontally.

</PropertyBox>

<PropertyBox name="password" type="boolean" defaultValue="false">

When `true`, all characters are displayed as bullet symbols while the actual text is preserved internally. The real value is still readable via `ui.getElementProperty(id, "text")`.

</PropertyBox>

## Input Filtering

<PropertyBox name="inputType" type="string" defaultValue='"any"'>

Restricts which characters the user can type. Programmatic updates via `text` bypass this filter. When a rejected character is entered, `onInvalidInput` fires. The value is case-insensitive.

| Value | Aliases | Allowed characters |
|---|---|---|
| `"any"` | | All characters (default) |
| `"integer"` | `"int"` | Digits and an optional leading `-` |
| `"float"` | `"number"`, `"decimal"` | Digits, optional `-`, and one `.` |
| `"letters"` | `"alpha"` | Unicode alphabetic characters only |
| `"alphanumeric"` | `"alnum"` | Letters and digits |
| `"hex"` | `"hexadecimal"` | `0–9`, `A–F`, `a–f` |
| `"email"` | | Letters, digits, `@`, `.`, `-`, `_`, `+` |
| `"custom"` | | Characters specified by `allowedChars` |

</PropertyBox>

<PropertyBox name="allowedChars" type="string" defaultValue='""'>

The exact set of characters permitted when `inputType` is `"custom"`. Each character in the string is a valid input. An empty string while `inputType` is `"custom"` blocks all keyboard input.

```javascript
inputType: "custom",
allowedChars: "0123456789+-*/(). "   // calculator input
```

</PropertyBox>

## Typography

<PropertyBox name="fontFace" type="string" defaultValue='"Segoe UI"'>

Font family name. Use with `fontPath` for a custom font file. Falls back to a system font if the name is not found.

</PropertyBox>

<PropertyBox name="fontSize" type="number" defaultValue="14">

Font size in typographic points. Applies to both input text and placeholder text.

</PropertyBox>

<PropertyBox name="fontColor / textColor" type="string" defaultValue='"rgb(240,240,240)"'>

Color or gradient of the input text. `fontColor` and `textColor` are both accepted — `fontColor` is checked first and takes precedence if both are provided.

Supports `rgb()`, `rgba()`, hex, `linearGradient()`, and `radialGradient()`.

</PropertyBox>

<PropertyBox name="fontWeight" type="number" defaultValue="400">

Font weight from `100` (thin) to `900` (black). Maps to DirectWrite font weight values.

</PropertyBox>

<PropertyBox name="italic" type="boolean" defaultValue="false">

`true` renders text in italic style.

</PropertyBox>

<PropertyBox name="fontPath" type="string" defaultValue='""'>

Path or URL to a custom font file. When using a custom font, `fontFace` must match the font family name inside the file. Remote URLs are downloaded asynchronously and the element redraws once cached.

```javascript
fontFace: "Inter",
fontPath: "./fonts/Inter-Regular.ttf"
```

</PropertyBox>

<PropertyBox name="align" type="string" defaultValue='"left"'>

Horizontal text alignment. Accepts `"left"`, `"center"`, or `"right"`. Case-insensitive. The vertical alignment is always centered (or top in multiline mode).

</PropertyBox>

## Colors

<PropertyBox name="fillColor" type="string" defaultValue='"rgb(30,30,34)"'>

Background color or gradient of the input box. Set to `"none"` or `"transparent"` to remove the background fill entirely.

```javascript
fillColor: "rgb(30,30,34)"           // solid dark
fillColor: "rgba(255,255,255,0.08)"  // frosted glass
fillColor: "transparent"             // no background
```

</PropertyBox>

<PropertyBox name="placeholderColor" type="string" defaultValue='"rgb(150,150,150)"'>

Color or gradient of the placeholder text.

</PropertyBox>

<PropertyBox name="caretColor" type="string" defaultValue='"rgb(255,255,255)"'>

Color or gradient of the blinking text cursor. The caret blinks at approximately 530ms intervals while the input has focus.

</PropertyBox>

<PropertyBox name="selectionColor" type="string" defaultValue='"rgba(135,206,235,0.5)"'>

Background color or gradient of the text selection highlight. Rendered behind the selected characters so they remain visible.

</PropertyBox>

## Border

<PropertyBox name="borderWidth" type="number" defaultValue="0">

Border thickness in pixels. `0` hides the border. Accepts integer values.

</PropertyBox>

<PropertyBox name="borderRadius" type="number" defaultValue="0">

Corner radius in pixels for both the background fill and the border. Accepts integer values.

```javascript
borderRadius: 0    // square
borderRadius: 6    // slightly rounded
borderRadius: 18   // pill shape (for a 36px tall input)
```

</PropertyBox>

<PropertyBox name="borderColor" type="string" defaultValue='"rgb(0,0,0)"'>

Border color or gradient when the input is not focused. Only visible when `borderWidth` is greater than `0`.

</PropertyBox>

<PropertyBox name="borderFocusColor" type="string">

Border color or gradient when the input has keyboard focus. Falls back to `borderColor` when not set. Set to `"none"` or `"transparent"` to suppress the focus border entirely.

```javascript
borderFocusColor: "rgb(0,180,255)"    // blue focus ring
borderFocusColor: "none"              // no focus ring
```

</PropertyBox>

## Event Callbacks

<CallbackBox name="onEnter" signature="onEnter(): void" :optional="true">

Fired when Enter is pressed in single-line mode. Not fired in multiline mode (Enter inserts a newline instead).

```javascript
onEnter: () => {
  const query = ui.getElementProperty("search", "text");
  ipcRenderer.send("search", { query });
}
```

</CallbackBox>

<CallbackBox name="onChange / onTextChange" signature="onChange(): void" :optional="true">

Fired whenever the text content changes — typing, deletion, paste, or programmatic updates via `setElementProperties`. Both `onChange` and `onTextChange` are accepted; if both are provided, `onChange` takes precedence.

```javascript
onChange: () => {
  const val = ui.getElementProperty("input", "text");
  ui.setElementProperties("char-count", { text: val.length + " / 100" });
}
```

</CallbackBox>

<CallbackBox name="onFocus" signature="onFocus(): void" :optional="true">

Fired once when the input gains keyboard focus.

```javascript
onFocus: () => {
  ui.setElementProperties("search", { borderColor: "rgb(0,180,255)" });
}
```

</CallbackBox>

<CallbackBox name="onBlur" signature="onBlur(): void" :optional="true">

Fired once when the input loses keyboard focus.

```javascript
onBlur: () => {
  ui.setElementProperties("search", { borderColor: "rgba(255,255,255,0.15)" });
  const val = ui.getElementProperty("search", "text");
  if (!val) ui.setElementProperties("search", { borderColor: "rgb(220,60,60)" });
}
```

</CallbackBox>

<CallbackBox name="onInvalidInput" signature="onInvalidInput(): void" :optional="true">

Fired when the user types a character rejected by `inputType`. Useful for showing validation feedback.

```javascript
onInvalidInput: () => {
  ui.setElementProperties("num-input", { borderColor: "rgb(220,60,60)" });
  setTimeout(() => {
    ui.setElementProperties("num-input", { borderColor: "rgba(255,255,255,0.15)" });
  }, 300);
}
```

</CallbackBox>

## Built-in Keyboard Shortcuts

These operations are handled automatically:

| Key | Action |
|---|---|
| Arrow keys | Move caret |
| `Home` / `End` | Jump to start/end of line |
| `↑` / `↓` | Move up/down a line (multiline only) |
| `Shift` + arrow keys | Extend selection |
| `Backspace` | Delete character before caret |
| `Delete` | Delete character after caret |
| `Ctrl+A` | Select all |
| `Ctrl+C` | Copy |
| `Ctrl+X` | Cut |
| `Ctrl+V` | Paste |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Enter` | Fire `onEnter` (single-line) or insert newline (multiline) |
| `Tab` | Insert 4 spaces |

## Practical Examples

**Search box with focus border**

```javascript
ui.addInputBox({
  id: "search",
  x: 16, y: 40,
  width: 260, height: 36,
  placeholder: "Search...",
  fillColor: "rgba(255,255,255,0.06)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",
  borderFocusColor: "rgb(0,180,255)",
  borderRadius: 6,
  onEnter: () => {
    const q = ui.getElementProperty("search", "text");
    ipcRenderer.send("search", { query: q });
  }
});
```

**Numeric-only input with invalid feedback**

```javascript
ui.addInputBox({
  id: "port",
  x: 80, y: 80,
  width: 100, height: 32,
  placeholder: "Port",
  inputType: "integer",
  maxLength: 5,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  borderFocusColor: "rgb(0,180,255)",
  borderRadius: 4,
  onInvalidInput: () => {
    ui.setElementProperties("port", { borderColor: "rgb(220,60,60)" });
    setTimeout(() => {
      ui.setElementProperties("port", { borderColor: "rgba(255,255,255,0.15)" });
    }, 400);
  }
});
```

**Password field**

```javascript
ui.addInputBox({
  id: "password",
  x: 16, y: 80,
  width: 260, height: 36,
  placeholder: "Password",
  password: true,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",
  borderFocusColor: "rgb(0,180,255)",
  borderRadius: 6,
  onEnter: () => {
    const pw = ui.getElementProperty("password", "text");
    ipcRenderer.send("login", { password: pw });
  }
});
```

**Multi-line notes field**

```javascript
ui.addInputBox({
  id: "notes",
  x: 16, y: 60,
  width: 360, height: 120,
  placeholder: "Write a note...",
  multiline: true,
  fillColor: "rgba(255,255,255,0.05)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.10)",
  borderFocusColor: "rgb(100,180,255)",
  borderRadius: 4,
  onChange: () => {
    const val = ui.getElementProperty("notes", "text");
    ipcRenderer.send("note-changed", { text: val });
  }
});
```

**Custom character filter — calculator**

```javascript
ui.addInputBox({
  id: "calc",
  x: 16, y: 40,
  width: 200, height: 36,
  inputType: "custom",
  allowedChars: "0123456789+-*/().",
  placeholder: "0",
  align: "right",
  borderWidth: 1,
  borderRadius: 4
});
```
