---
title: Show styled text input overlays with the InputBox addon.
---

# InputBox Addon

Show a styled text input overlay window anchored to a widget. Supports validation, multiline, password mode, and rich styling.

```javascript
import { addon } from "novadesk";
const inputBox = addon.load("path/to/InputBox.dll");
```

#### Table of Contents
[[toc]]

---

<MethodBox
  name="inputBox.show(optionsOrDefaultValue)"
  badge="InputBox"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'optionsOrDefaultValue', type: 'string | object', description: 'Pass a string to set the initial text only, or a full options object for complete control.' }
  ]"
>
<template #returns>A numeric InputBox instance ID. Returns <code>0</code> if creation fails.</template>

Opens an input overlay window. Throws a `TypeError` if the argument is neither a string nor an object.

**Position & size options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `x` | `number` | `100` | X position. If `widgetHwnd` is set, treated as offset from that window. |
| `y` | `number` | `100` | Y position. If `widgetHwnd` is set, treated as offset from that window. |
| `width` / `w` | `number` | `300` | Width in pixels (clamped `120–1200`). |
| `height` / `h` | `number` | `40` | Height in pixels (clamped `28–800`). |
| `widgetHwnd` / `hwnd` | `number` | — | Widget window handle. When provided, `x`/`y` are relative to that window. |

**Behavior options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `topMost` | `boolean` | `true` | Keep the input box above other windows. |
| `unfocusDismiss` | `boolean` | `true` | Close when focus is lost. |
| `multiline` | `boolean` | `false` | Allow multi-line input. Use `Ctrl+Enter` to submit in multiline mode. |
| `password` | `boolean` | `false` | Mask characters. Disables multiline if both are true. |
| `allowScroll` | `boolean` | `false` | Enable vertical scrollbar in multiline mode. |
| `maxLength` | `number` | `0` | Max characters allowed (clamped `0–32766`). `0` = unlimited. |

**Input validation options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `inputType` | `string` | `"Any"` | Allowed input type: `Any`, `Integer`/`Int`, `Float`/`Number`, `Letters`, `Alphanumeric`, `Hex`/`Hexadecimal`, `Email`, `Custom`. |
| `allowedChars` | `string` | — | Allowed character set when `inputType` is `Custom`. |
| `minValue` | `number` | — | Minimum numeric value (enables range validation). |
| `maxValue` | `number` | — | Maximum numeric value (enables range validation). |

**Styling options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `defaultValue` | `string` | — | Initial text content. |
| `fontFace` | `string` | `"Segoe UI"` | Font family. |
| `fontSize` | `number` | `14` | Font size in pt (clamped `8–72`). |
| `bold` | `boolean` | `false` | Bold text. |
| `italic` | `boolean` | `false` | Italic text. |
| `align` | `string` | `"LEFT"` | Text alignment: `LEFT`, `CENTER`, `RIGHT`. |
| `borderVisible` | `boolean` | `true` | Show border. |
| `borderThickness` | `number` | `1` | Border width (clamped `0–12`). |
| `fontColor` / `textColor` | `string` | — | Text color (CSS-style: `rgb(...)`, `rgba(...)`, hex). |
| `backgroundColor` / `bgColor` | `string` | — | Background color. |
| `borderColor` | `string` | — | Border color. |

**Callback options:**

| Callback | Trigger |
|---|---|
| `onEnter` | Enter submits valid input. In multiline mode, requires `Ctrl+Enter`. |
| `onEsc` | Escape key is pressed. |
| `onDismiss` | Box is dismissed (blur or close). |
| `onInvalid` | An invalid character is typed or an invalid value is submitted. |
| `onChange` | Text content changes. |

All callbacks receive no arguments. Use `lastText()`, `lastReason()`, and `lastId()` to inspect the event data.

<template #example>

```javascript
import { addon, widgetWindow } from "novadesk";
const inputBox = addon.load("path/to/InputBox.dll");

const win = new widgetWindow({ id: "demo", width: 400, height: 300, script: "ui.js" });

const id = inputBox.show({
  widgetHwnd: win.getHandle(),
  x: 16,
  y: 200,
  width: 320,
  defaultValue: "Type here...",
  inputType: "Any",
  onEnter: () => console.log("Submitted:", inputBox.lastText()),
  onEsc:   () => console.log("Cancelled"),
});

console.log("InputBox ID:", id);
```

</template>
</MethodBox>

---

<MethodBox
  name="inputBox.open(optionsOrDefaultValue)"
  badge="InputBox"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'optionsOrDefaultValue', type: 'string | object', description: 'Same as show().' }
  ]"
>
<template #returns>Numeric InputBox instance ID. Returns <code>0</code> if creation fails.</template>

Alias of `inputBox.show()`. Identical behavior.

<template #example>

```javascript
const id = inputBox.open({ defaultValue: "hello" });
```

</template>
</MethodBox>

---

<MethodBox
  name="inputBox.close(id)"
  badge="InputBox"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'id', type: 'number', description: 'InputBox instance ID returned by show() or open().' }
  ]"
>
<template #returns><code>true</code> if the input box was found and closed, <code>false</code> otherwise.</template>

Closes a specific InputBox instance by ID.

<template #example>

```javascript
const id = inputBox.show({ defaultValue: "hello" });
inputBox.close(id);
```

</template>
</MethodBox>

---

<MethodBox
  name="inputBox.closeAll()"
  badge="InputBox"
  badgeType="core"
  returns="boolean"
>
<template #returns>Always <code>true</code>.</template>

Closes all open InputBox windows.

<template #example>

```javascript
inputBox.closeAll();
```

</template>
</MethodBox>

---

<MethodBox
  name="inputBox.lastText()"
  badge="InputBox"
  badgeType="core"
  returns="string"
>
<template #returns>The text from the most recent InputBox event.</template>

Returns the text content from the last callback event. Call this inside any callback to read what the user typed.

<template #example>

```javascript
inputBox.show({
  onEnter: () => {
    console.log("User typed:", inputBox.lastText());
  }
});
```

</template>
</MethodBox>

---

<MethodBox
  name="inputBox.lastReason()"
  badge="InputBox"
  badgeType="core"
  returns="number"
>
<template #returns>Numeric reason code for the most recent event.</template>

Returns the reason code from the last callback event.

**Reason codes:**

| Code | Meaning |
|---|---|
| `0` | None |
| `1` | Enter (submitted) |
| `2` | Esc (cancelled) |
| `3` | Dismiss (focus lost) |
| `4` | Invalid input |
| `5` | Change (text edited) |

<template #example>

```javascript
inputBox.show({
  onDismiss: () => {
    const reason = inputBox.lastReason();
    console.log("Closed with reason:", reason);
  }
});
```

</template>
</MethodBox>

---

<MethodBox
  name="inputBox.lastId()"
  badge="InputBox"
  badgeType="core"
  returns="number"
>
<template #returns>The InputBox instance ID that triggered the most recent event.</template>

Returns the ID of the InputBox that fired the last callback. Useful when multiple InputBox instances are open simultaneously.

<template #example>

```javascript
inputBox.show({
  onChange: () => {
    console.log("Changed in box:", inputBox.lastId());
  }
});
```

</template>
</MethodBox>

---

## Examples

### Integer input with range

```javascript
import { addon } from "novadesk";
const inputBox = addon.load("path/to/InputBox.dll");

inputBox.show({
  defaultValue: "50",
  inputType: "Integer",
  minValue: 0,
  maxValue: 100,
  onEnter:   () => console.log("Value:", inputBox.lastText()),
  onInvalid: () => console.log("Out of range:", inputBox.lastText()),
});
```

### Custom character set (hex color input)

```javascript
inputBox.show({
  defaultValue: "FFAA00",
  inputType: "Custom",
  allowedChars: "0123456789ABCDEFabcdef",
  maxLength: 6,
  onEnter: () => console.log("Color:", "#" + inputBox.lastText()),
});
```

### Multiline note

```javascript
inputBox.show({
  multiline: true,
  allowScroll: true,
  width: 400,
  height: 200,
  onEnter: () => console.log("Note saved:", inputBox.lastText()),
});
```
