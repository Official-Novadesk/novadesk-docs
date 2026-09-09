---
title: clipboard
description: Read and write clipboard text content.
---

# clipboard

Read and write plain text on the Windows clipboard.

```javascript
import { clipboard } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="clipboard.getText()"
  badge="clipboard"
  badgeType="core"
  returns="string"
>
<template #returns>The current clipboard text as a Unicode string. Returns an empty string <code>""</code> if the clipboard contains no text, the clipboard is locked by another application, or any other failure occurs.</template>

Returns the current plain text content of the Windows clipboard using `CF_UNICODETEXT`. Returns `""` rather than `null` on any failure — there is no separate error indicator.

<template #example>

```javascript
import { clipboard } from "system";

const text = clipboard.getText();
if (text) {
  console.log("Clipboard:", text);
} else {
  console.log("Clipboard is empty or contains no text");
}
```

</template>
</MethodBox>

<MethodBox
  name="clipboard.setText(text)"
  badge="clipboard"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'text', type: 'string', description: 'Text to write to the clipboard. Replaces any existing clipboard content. Throws TypeError if no argument is provided.' }
  ]"
>
<template #returns><code>true</code> if the clipboard was updated successfully. <code>false</code> if the clipboard could not be opened (e.g. locked by another application).</template>

Writes a plain text string to the Windows clipboard using `CF_UNICODETEXT`. Always replaces any existing clipboard content, including non-text formats. Throws `TypeError` if called without an argument.

<template #example>

```javascript
import { clipboard } from "system";

const ok = clipboard.setText("Copied from Novadesk");
if (ok) {
  console.log("Copied to clipboard");
}

// Verify
const value = clipboard.getText();
console.log(value); // "Copied from Novadesk"
```

</template>
</MethodBox>

## Practical Examples

**Copy a metric value to the clipboard**

```javascript
import { clipboard } from "system";

ipcMain.on("copy-stat", (event, payload) => {
  const text = payload.label + ": " + payload.value + "%";
  clipboard.setText(text);
  console.log("Copied:", text);
});
```

**Paste clipboard content into an input field**

```javascript
import { clipboard } from "system";

// In the main script — read clipboard and send to UI
ipcMain.on("paste-request", () => {
  const text = clipboard.getText();
  ipcMain.send("paste-text", { text });
});

// In the UI script — receive and set the input value
ipcRenderer.on("paste-text", (event, payload) => {
  ui.setElementProperties("search-input", { text: payload.text });
});
```

**Copy current date and time**

```javascript
import { clipboard } from "system";

function copyTimestamp() {
  const now = new Date();
  const stamp = now.toLocaleString();
  clipboard.setText(stamp);
  console.log("Copied:", stamp);
}

// Trigger from a context menu item
win.setContextMenu([
  { text: "Copy Timestamp", action: copyTimestamp }
]);
```
