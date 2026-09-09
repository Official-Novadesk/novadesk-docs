---
title: Show styled text input overlays with the InputBox addon.
description: Show styled text input overlays with validation and callbacks.
---

# InputBox Addon

Show a styled text input overlay window. For an inline text field, see [addInputBox](/api/ui/ui-elements/add-input-box) anchored to a widget. Supports validation, multiline, password mode, and rich styling.

## What is InputBox?

The **InputBox** addon lets you display a popup text input field on top of your NovaDesk widget. You can use it for:

- **Quick text entry** — ask the user for a name, URL, or search query
- **Number input** — with validation to ensure only valid numbers are entered
- **Password fields** — mask characters for sensitive input
- **Multiline notes** — allow multi-line text with scrolling

The input box appears as a separate floating window that can be anchored to your widget.

## Getting Started

First, load the addon in your script:

```javascript
import { addon } from "novadesk";

// Load the InputBox addon DLL
const inputBox = addon.load("path/to/InputBox.dll");
```

::: tip
Replace `"path/to/InputBox.dll"` with the actual path to the `InputBox.dll` file on your system.
:::

#### Table of Contents
[[toc]]

## Quick Example

Here is a minimal example that shows a text input and prints what the user types:

```javascript
import { addon, widgetWindow } from "novadesk";
const inputBox = addon.load("path/to/InputBox.dll");

const win = new widgetWindow({ id: "demo", width: 400, height: 300, script: "ui.js" });

// Show a simple input box
const id = inputBox.show({
  widgetHwnd: win.getHandle(),
  defaultValue: "Type here...",
  onEnter: () => console.log("Submitted:", inputBox.lastText()),
  onEsc:   () => console.log("Cancelled"),
});

console.log("InputBox ID:", id);
```

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

Opens an input overlay window. You can pass just a string for simple cases, or a full options object for complete control. Throws a `TypeError` if the argument is neither a string nor an object.

**Position & size options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `x` | `number` | `100` | X position. If `widgetHwnd` is set, this is an offset from that window. |
| `y` | `number` | `100` | Y position. If `widgetHwnd` is set, this is an offset from that window. |
| `width` / `w` | `number` | `300` | Width in pixels (clamped to `120–1200`). |
| `height` / `h` | `number` | `40` | Height in pixels (clamped to `28–800`). |
| `widgetHwnd` / `hwnd` | `number` | — | Widget window handle. When provided, `x`/`y` are relative to that window. |

**Behavior options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `topMost` | `boolean` | `true` | Keep the input box above other windows. |
| `unfocusDismiss` | `boolean` | `true` | Close when focus is lost. Set to `false` to keep it open. |
| `multiline` | `boolean` | `false` | Allow multi-line input. Use `Ctrl+Enter` to submit in multiline mode. |
| `password` | `boolean` | `false` | Mask characters (show dots instead of text). Disables multiline if both are true. |
| `allowScroll` | `boolean` | `false` | Enable vertical scrollbar in multiline mode. |
| `maxLength` | `number` | `0` | Max characters allowed (clamped to `0–32766`). `0` = unlimited. |

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
| `defaultValue` | `string` | — | Initial text content shown when the input box opens. |
| `placeholder` | `string` | — | Placeholder text shown when the input is empty. Disappears when the user starts typing. |
| `fontFace` | `string` | `"Segoe UI"` | Font family. |
| `fontSize` | `number` | `14` | Font size in points (clamped to `8–72`). |
| `bold` | `boolean` | `false` | Bold text. |
| `italic` | `boolean` | `false` | Italic text. |
| `align` | `string` | `"LEFT"` | Text alignment: `LEFT`, `CENTER`, `RIGHT`. |
| `borderVisible` | `boolean` | `true` | Show border around the input box. |
| `borderThickness` | `number` | `1` | Border width in pixels (clamped to `0–12`). |
| `fontColor` / `textColor` | `string` | — | Text color (CSS-style: `rgb(...)`, `rgba(...)`, hex like `#FF0000`). |
| `backgroundColor` / `bgColor` | `string` | — | Background color. |
| `borderColor` | `string` | — | Border color. |

**Callback options:**

| Callback | When it fires |
|---|---|
| `onEnter` | User presses Enter to submit valid input. In multiline mode, requires `Ctrl+Enter`. |
| `onEsc` | User presses the Escape key. |
| `onDismiss` | Input box is dismissed (clicked outside or closed). |
| `onInvalid` | User types an invalid character or submits an invalid value. |
| `onChange` | Text content changes as the user types. |

::: tip
All callbacks receive no arguments. Use `inputBox.lastText()`, `inputBox.lastReason()`, and `inputBox.lastId()` inside callbacks to inspect the event data.
:::

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
  placeholder: "Enter your name",
  inputType: "Any",
  onEnter: () => console.log("Submitted:", inputBox.lastText()),
  onEsc:   () => console.log("Cancelled"),
});

console.log("InputBox ID:", id);
```

</template>
</MethodBox>

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

Alias of `inputBox.show()`. Identical behavior — use whichever name you prefer.

<template #example>

```javascript
const id = inputBox.open({ defaultValue: "hello" });
```

</template>
</MethodBox>

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

Closes a specific InputBox instance by its ID. Use this when you have multiple input boxes open and want to close just one.

<template #example>

```javascript
const id = inputBox.show({ defaultValue: "hello" });
inputBox.close(id);
```

</template>
</MethodBox>

<MethodBox
  name="inputBox.closeAll()"
  badge="InputBox"
  badgeType="core"
  returns="boolean"
>
<template #returns>Always <code>true</code>.</template>

Closes **all** open InputBox windows at once. Useful for cleanup when your widget is destroyed.

<template #example>

```javascript
inputBox.closeAll();
```

</template>
</MethodBox>

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

<MethodBox
  name="inputBox.lastReason()"
  badge="InputBox"
  badgeType="core"
  returns="number"
>
<template #returns>Numeric reason code for the most recent event.</template>

Returns the reason code from the last callback event. This tells you **why** the callback was triggered.

**Reason codes:**

| Code | Meaning |
|---|---|
| `0` | None (no event) |
| `1` | Enter (user submitted) |
| `2` | Esc (user cancelled) |
| `3` | Dismiss (focus lost) |
| `4` | Invalid input |
| `5` | Change (text was edited) |

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

<MethodBox
  name="inputBox.lastId()"
  badge="InputBox"
  badgeType="core"
  returns="number"
>
<template #returns>The InputBox instance ID that triggered the most recent event.</template>

Returns the ID of the InputBox that fired the last callback. Useful when you have multiple InputBox instances open simultaneously and need to know which one triggered the event.

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

## Examples

### Simple text input

```javascript
import { addon } from "novadesk";
const inputBox = addon.load("path/to/InputBox.dll");

inputBox.show({
  defaultValue: "Hello",
  placeholder: "Enter something...",
  onEnter: () => console.log("Value:", inputBox.lastText()),
  onEsc:   () => console.log("Cancelled"),
});
```

### Integer input with range validation

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
  placeholder: "Write your note here...",
  onEnter: () => console.log("Note saved:", inputBox.lastText()),
});
```

### Password input

```javascript
inputBox.show({
  password: true,
  width: 250,
  placeholder: "Enter password",
  onEnter: () => console.log("Password entered"),
});
```
