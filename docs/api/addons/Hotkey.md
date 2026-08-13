---
title: Register global keyboard hotkeys with the Hotkey addon.
---

# Hotkey Addon

Register global keyboard shortcuts that fire even when the widget is not focused.

```javascript
import { addon } from "novadesk";
const hotkey = addon.load("path/to/Hotkey.dll");
```

#### Table of Contents
[[toc]]

---

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
<template #returns>A registration ID (<code>number</code>). Returns <code>-1</code> if registration fails.</template>

Registers a global hotkey and returns an ID you can use to unregister it later. Always store the returned ID.

**Supported modifier tokens:**

| Token | Aliases |
|---|---|
| `CTRL` | `CONTROL` |
| `ALT` | — |
| `SHIFT` | — |
| `WIN` | `WINDOWS` |

**Supported key tokens:**

| Category | Values |
|---|---|
| Letters | `A`–`Z` |
| Digits | `0`–`9` |
| Function keys | `F1`–`F24` |
| Named keys | `SPACE`, `ENTER`/`RETURN`, `TAB`, `ESC`/`ESCAPE`, `BACKSPACE`, `DELETE`/`DEL`, `INSERT`/`INS`, `HOME`, `END`, `PAGEUP`/`PGUP`, `PAGEDOWN`/`PGDN`, `LEFT`, `RIGHT`, `UP`, `DOWN` |

<template #example>

```javascript
import { addon } from "novadesk";
const hotkey = addon.load("path/to/Hotkey.dll");

// Simple — fires on key down
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

---

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

Unregisters a previously registered global hotkey.

<template #example>

```javascript
const id = hotkey.register("CTRL+SHIFT+M", () => console.log("fired"));

// Later, remove it
const ok = hotkey.unregister(id);
console.log("Removed:", ok);
```

</template>
</MethodBox>
