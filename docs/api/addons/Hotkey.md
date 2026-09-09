---
title: Register global keyboard hotkeys with the Hotkey addon.
description: "Register global keyboard shortcuts that work system-wide. Common use: toggle [widgetWindow](/api/modules/novadesk/widgetWindow) visibility."
---

# Hotkey Addon

Register global keyboard shortcuts that fire even when the widget is not focused.

## What is Hotkey?

The **Hotkey** addon lets you create keyboard shortcuts that work **everywhere on your system** — not just when your NovaDesk widget is focused. You can use it to:

- **Toggle** a widget's visibility with a shortcut like `CTRL+SHIFT+M`
- **Trigger** actions from any app, like muting audio or skipping tracks
- **Respond** to both key-down and key-up events for press-and-hold behavior

::: tip
Unlike normal keyboard events that only work when a window is focused, hotkeys captured by this addon work system-wide. The user can press the shortcut from any application.
:::

## Getting Started

First, load the addon in your script:

```javascript
import { addon } from "novadesk";

// Load the Hotkey addon DLL
const hotkey = addon.load("path/to/Hotkey.dll");
```

::: tip
Replace `"path/to/Hotkey.dll"` with the actual path to the `Hotkey.dll` file on your system.
:::

#### Table of Contents
[[toc]]

## Quick Example

Here is a minimal example that registers a global hotkey:

```javascript
import { addon } from "novadesk";
const hotkey = addon.load("path/to/Hotkey.dll");

// Register CTRL+SHIFT+M to print a message
const id = hotkey.register("CTRL+SHIFT+M", () => {
  console.log("Hotkey pressed!");
});

console.log("Hotkey registered with ID:", id);
```

## How Hotkey Strings Work

A hotkey string is a combination of **modifiers** and a **key**, joined with `+`. Tokens are **case-insensitive**, so `ctrl+shift+m` and `CTRL+SHIFT+M` both work.

**Supported modifiers:**

| Token | Aliases | Description |
|---|---|---|
| `CTRL` | `CONTROL` | Control key |
| `ALT` | — | Alt key |
| `SHIFT` | — | Shift key |
| `WIN` | `WINDOWS` | Windows/Super key |

**Supported keys:**

| Category | Values |
|---|---|
| Letters | `A`–`Z` |
| Digits | `0`–`9` |
| Function keys | `F1`–`F24` |
| Named keys | `SPACE`, `ENTER`/`RETURN`, `TAB`, `ESC`/`ESCAPE`, `BACKSPACE`, `DELETE`/`DEL`, `INSERT`/`INS`, `HOME`, `END`, `PAGEUP`/`PGUP`, `PAGEDOWN`/`PGDN`, `LEFT`, `RIGHT`, `UP`, `DOWN` |

**Examples of valid hotkey strings:**

- `"CTRL+SHIFT+M"` — Ctrl + Shift + M
- `"ALT+F4"` — Alt + F4
- `"WIN+SPACE"` — Windows key + Space
- `"CTRL+ALT+T"` — Ctrl + Alt + T
- `"F5"` — F5 alone (no modifier)

<MethodBox
  name="hotkey.register(hotkeyString, handler)"
  badge="Hotkey"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'hotkeyString', type: 'string', description: 'Hotkey expression, e.g. CTRL+SHIFT+M or ALT+F4. Tokens are case-insensitive and joined with +.' },
    { name: 'handler', type: 'function | object', description: 'A callback function (fires on key down), or an object with optional onKeyDown and onKeyUp callbacks.' }
  ]"
>
<template #returns>A registration ID (<code>number</code>). Returns <code>-11</code> if registration fails.</template>

Registers a global hotkey and returns an ID you can use to unregister it later. **Always store the returned ID** — you need it to remove the hotkey when your widget is destroyed.

**Handler formats:**

You can pass either a simple function or an object with separate down/up handlers:

| Format | When it fires |
|---|---|
| Function `() => {}` | Fires once when the key combination is pressed down |
| Object `{ onKeyDown, onKeyUp }` | `onKeyDown` fires on press, `onKeyUp` fires on release |

<template #example>

```javascript
import { addon } from "novadesk";
const hotkey = addon.load("path/to/Hotkey.dll");

// Simple — fires on key down only
const id = hotkey.register("CTRL+SHIFT+M", () => {
  console.log("Hotkey pressed");
});

// With separate down/up handlers
const id2 = hotkey.register("ALT+SPACE", {
  onKeyDown: () => console.log("ALT+SPACE down"),
  onKeyUp:   () => console.log("ALT+SPACE up")
});

console.log("Registered IDs:", id, id2);
```

</template>
</MethodBox>

<MethodBox
  name="hotkey.unregister(id)"
  badge="Hotkey"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'id', type: 'number', description: 'Registration ID returned by hotkey.register().' }
  ]"
>
<template #returns><code>true</code> if the hotkey was found and removed, <code>false</code> if the ID was not found.</template>

Unregisters a previously registered global hotkey. Always call this when your widget is destroyed or the hotkey is no longer needed.

::: warning
If you don't unregister hotkeys, they will continue to fire even after your script ends. Always clean up!
:::

<template #example>

```javascript
const id = hotkey.register("CTRL+SHIFT+M", () => console.log("fired"));

// Later, when the widget is destroyed or the hotkey is no longer needed
const ok = hotkey.unregister(id);
console.log("Removed:", ok);
```

</template>
</MethodBox>

## Full Example

Here is a complete example that registers multiple hotkeys and demonstrates cleanup:

```javascript
import { addon } from "novadesk";
const hotkey = addon.load("path/to/Hotkey.dll");

// Toggle mute with CTRL+SHIFT+M
const muteId = hotkey.register("CTRL+SHIFT+M", () => {
  console.log("Toggle mute");
});

// Volume up with CTRL+SHIFT+UP
const volUpId = hotkey.register("CTRL+SHIFT+UP", () => {
  console.log("Volume up");
});

// Volume down with CTRL+SHIFT+DOWN
const volDownId = hotkey.register("CTRL+SHIFT+DOWN", {
  onKeyDown: () => console.log("Volume down started"),
  onKeyUp:   () => console.log("Volume down released")
});

console.log("All hotkeys registered:", muteId, volUpId, volDownId);

// To clean up all hotkeys:
// hotkey.unregister(muteId);
// hotkey.unregister(volUpId);
// hotkey.unregister(volDownId);
```
