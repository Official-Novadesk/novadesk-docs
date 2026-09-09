---
title: dialog
description: Show native Windows modal message boxes and file picker dialogs from JavaScript.
---

# dialog

Show native Windows modal dialogs. Includes message boxes and file picker dialogs. All calls are **synchronous** — they block the script until the user responds.

```javascript
import { dialog } from "novadesk";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

<MethodBox
  name="dialog.show(options)"
  badge="dialog"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'options', type: 'object', description: 'An object describing the dialog title, message, icon type, and button set.' }
  ]"
>
<template #returns>
  A lowercase string identifying the button the user clicked: <code>"ok"</code>, <code>"cancel"</code>, <code>"yes"</code>, <code>"no"</code>, <code>"retry"</code>, <code>"abort"</code>, or <code>"ignore"</code>.
</template>

Shows a native Windows modal message box. Execution of the calling script is paused until the user closes the dialog. The return value tells you which button was pressed.

Passing a non-object argument throws a `TypeError` synchronously.

**Options properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `""` | Text shown in the dialog title bar. |
| `message` | `string` | `""` | Body text displayed in the dialog. Use `\n` for line breaks. |
| `type` | `string` | `"info"` | Icon to display. See [Icon types](#icon-types) below. |
| `buttons` | `string` | `"ok"` | Set of buttons to display. See [Button sets](#button-sets) below. |

**Icon types (`type`):**

| Value | Aliases | Description |
|---|---|---|
| `"info"` | `"information"` | Blue information circle icon |
| `"warning"` | `"warn"` | Yellow warning triangle icon |
| `"error"` | — | Red error icon |
| `"question"` | — | Question mark icon |

Unrecognised values fall back to `"info"`. The `type` field is case-insensitive.

**Button sets (`buttons`):**

| Value | Aliases | Buttons shown | Possible return values |
|---|---|---|---|
| `"ok"` | — | OK | `"ok"` |
| `"ok-cancel"` | `"okcancel"` | OK, Cancel | `"ok"`, `"cancel"` |
| `"yes-no"` | `"yesno"` | Yes, No | `"yes"`, `"no"` |
| `"yes-no-cancel"` | `"yesnocancel"` | Yes, No, Cancel | `"yes"`, `"no"`, `"cancel"` |
| `"retry-cancel"` | `"retrycancel"` | Retry, Cancel | `"retry"`, `"cancel"` |
| `"abort-retry-ignore"` | `"abortretryignore"` | Abort, Retry, Ignore | `"abort"`, `"retry"`, `"ignore"` |

Unrecognised values fall back to `"ok"`. The `buttons` field is case-insensitive.

::: warning Blocking call
`dialog.show()` is synchronous and blocks the JS thread until the user responds. Timers, IPC events, and widget updates will not fire while the dialog is open. Keep dialogs reserved for moments that genuinely need an immediate user decision.
:::

<template #example>

```javascript
import { dialog } from "novadesk";

// Simple info message
dialog.show({
  title: "Done",
  message: "Operation completed successfully.",
  type: "info",
  buttons: "ok"
});

// Ask a yes/no question and act on the result
const answer = dialog.show({
  title: "Confirm",
  message: "Are you sure you want to empty the Recycle Bin?",
  type: "question",
  buttons: "yes-no"
});

if (answer === "yes") {
  console.log("User confirmed");
} else {
  console.log("User cancelled");
}
```

</template>
</MethodBox>

## File Dialogs

File picker dialogs let users select files or directories using native Windows Explorer dialogs. All file dialog calls are **synchronous** and block until the user confirms or cancels.

<MethodBox
  name="dialog.showOpenDialog(options)"
  badge="dialog"
  badgeType="core"
  returns="string | string[] | null"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Dialog configuration. See options table below.' }
  ]"
>
<template #returns>A single path string, an array of paths (when <code>multiSelect</code> is true), or <code>null</code> if the user cancelled.</template>

Opens a native Windows file open dialog. Returns the selected path(s), or `null` if the user cancels.

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `""` | Dialog title bar text. |
| `defaultPath` | `string` | `""` | Initial directory or file path. |
| `filters` | `object[]` | `[]` | Array of `{ name, extensions }` filter objects. `extensions` is an array of strings without dots (e.g. `["jpg", "png"]`). |
| `multiSelect` | `boolean` | `false` | Allow selecting multiple files. Returns an array when `true`. |

<template #example>

```javascript
// Single file selection
const file = dialog.showOpenDialog({
  title: "Open Image",
  filters: [
    { name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] },
    { name: "All Files", extensions: ["*"] }
  ]
});

if (file) {
  console.log("Selected:", file);
}

// Multi-file selection
const files = dialog.showOpenDialog({ multiSelect: true });
if (files) {
  files.forEach(f => console.log(f));
}
```

</template>
</MethodBox>

<MethodBox
  name="dialog.showSaveDialog(options)"
  badge="dialog"
  badgeType="core"
  returns="string | null"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Dialog configuration. See options table below.' }
  ]"
>
<template #returns>The chosen save path as a string, or <code>null</code> if the user cancelled.</template>

Opens a native Windows file save dialog. The user can type a filename or pick an existing file to overwrite. Returns the chosen path, or `null` if cancelled.

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `""` | Dialog title bar text. |
| `defaultPath` | `string` | `""` | Initial directory or suggested filename. |
| `defaultExtension` | `string` | `""` | Extension appended automatically when the user doesn't type one (without leading dot, e.g. `"json"`). |
| `filters` | `object[]` | `[]` | Array of `{ name, extensions }` filter objects. |

<template #example>

```javascript
const savePath = dialog.showSaveDialog({
  title: "Save Config",
  defaultPath: "config",
  defaultExtension: "json",
  filters: [
    { name: "JSON Files", extensions: ["json"] }
  ]
});

if (savePath) {
  fs.writeFile(savePath, JSON.stringify(config, null, 2));
}
```

</template>
</MethodBox>

<MethodBox
  name="dialog.openDirectory(options)"
  badge="dialog"
  badgeType="core"
  returns="string | null"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Dialog configuration. See options table below.' }
  ]"
>
<template #returns>The selected directory path as a string, or <code>null</code> if the user cancelled.</template>

Opens a native folder picker dialog. Returns the selected directory path, or `null` if cancelled.

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `""` | Dialog title bar text. |
| `defaultPath` | `string` | `""` | Initial directory to show. |

<template #example>

```javascript
const dir = dialog.openDirectory({ title: "Select Output Folder" });
if (dir) {
  console.log("Output folder:", dir);
}
```

</template>
</MethodBox>

<MethodBox
  name="dialog.showFileExplorerDialog(options)"
  badge="dialog"
  badgeType="core"
  returns="string | string[] | null"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Dialog configuration. See options table below.' }
  ]"
>
<template #returns>A path string, array of paths (multi-select open), or <code>null</code> if cancelled.</template>

A unified file explorer dialog that supports open, save, and directory picking modes. `dialog.showFileExplorer()` is an alias for this method.

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `"open"` | Dialog mode: `"open"`, `"save"`, `"directory"`, or `"folder"`. |
| `title` | `string` | `""` | Dialog title bar text. |
| `defaultPath` | `string` | `""` | Initial path. |
| `defaultExtension` | `string` | `""` | Auto-appended extension for save mode. |
| `filters` | `object[]` | `[]` | Array of `{ name, extensions }` filter objects. |
| `multiSelect` | `boolean` | `false` | Allow selecting multiple files (open mode only). |

<template #example>

```javascript
// Open mode (default)
const file = dialog.showFileExplorerDialog({ type: "open" });

// Save mode
const out = dialog.showFileExplorerDialog({
  type: "save",
  defaultExtension: "txt",
  filters: [{ name: "Text Files", extensions: ["txt"] }]
});

// Directory picker
const folder = dialog.showFileExplorerDialog({ type: "directory" });
```

</template>
</MethodBox>

<MethodBox
  name="dialog.openFile(options)"
  badge="dialog"
  badgeType="core"
  returns="string | string[] | null"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Dialog configuration. Accepts title, defaultPath, filters, and multiSelect.' }
  ]"
>
<template #returns>The selected file path, an array of paths when <code>multiSelect</code> is true, or <code>null</code> if cancelled.</template>

Shorthand for opening a file. Equivalent to `dialog.showOpenDialog()`.

<template #example>

```javascript
const path = dialog.openFile({
  filters: [{ name: "Scripts", extensions: ["js"] }]
});
if (path) console.log("File:", path);
```

</template>
</MethodBox>

<MethodBox
  name="dialog.saveFile(options)"
  badge="dialog"
  badgeType="core"
  returns="string | null"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Dialog configuration. Accepts title, defaultPath, defaultExtension, and filters.' }
  ]"
>
<template #returns>The chosen save path, or <code>null</code> if cancelled.</template>

Shorthand for saving a file. Equivalent to `dialog.showSaveDialog()`.

<template #example>

```javascript
const out = dialog.saveFile({ defaultExtension: "log" });
if (out) fs.writeFile(out, logContent);
```

</template>
</MethodBox>

## Return Values

`dialog.show()` always returns a string. The value depends on which button the user clicked:

| Return value | When returned |
|---|---|
| `"ok"` | User clicked **OK** |
| `"cancel"` | User clicked **Cancel** |
| `"yes"` | User clicked **Yes** |
| `"no"` | User clicked **No** |
| `"retry"` | User clicked **Retry** |
| `"abort"` | User clicked **Abort** |
| `"ignore"` | User clicked **Ignore** |

If the dialog cannot be shown (which is rare), the return value defaults to `"ok"`.

## Practical Examples

### Show a simple message

```javascript
import { dialog } from "novadesk";

dialog.show({
  title: "Novadesk",
  message: "Widget loaded successfully.",
  type: "info"
});
```

### Confirm before a destructive action

```javascript
import { dialog } from "novadesk";
import { recycleBin } from "system";

function confirmEmptyBin() {
  const stats = recycleBin.getStats();
  if (!stats || stats.count === 0) {
    dialog.show({
      title: "Recycle Bin",
      message: "The Recycle Bin is already empty.",
      type: "info"
    });
    return;
  }

  const sizeMB = (stats.size / 1048576).toFixed(1);
  const answer = dialog.show({
    title: "Empty Recycle Bin",
    message: `Permanently delete ${stats.count} item(s) (${sizeMB} MB)?\n\nThis cannot be undone.`,
    type: "question",
    buttons: "yes-no"
  });

  if (answer === "yes") {
    recycleBin.emptyBinSilent();
    dialog.show({
      title: "Recycle Bin",
      message: "Recycle Bin emptied successfully.",
      type: "info"
    });
  }
}
```

### Save / discard / cancel pattern

```javascript
import { dialog } from "novadesk";

function promptSaveChanges() {
  const answer = dialog.show({
    title: "Unsaved Changes",
    message: "You have unsaved changes.\nWould you like to save before closing?",
    type: "question",
    buttons: "yes-no-cancel"
  });

  if (answer === "yes") {
    // Save and continue
    saveSettings();
    return true;
  } else if (answer === "no") {
    // Discard and continue
    return true;
  } else {
    // "cancel" — user changed their mind
    return false;
  }
}
```

### Retry loop on failure

```javascript
import { dialog } from "novadesk";
import { webFetch } from "system";

async function fetchWithRetry(url) {
  while (true) {
    try {
      const data = await webFetch(url);
      return data;
    } catch (err) {
      const answer = dialog.show({
        title: "Network Error",
        message: `Failed to connect to:\n${url}\n\nWould you like to retry?`,
        type: "error",
        buttons: "retry-cancel"
      });

      if (answer !== "retry") {
        return null;
      }
    }
  }
}
```

### Show an error with details

```javascript
import { dialog } from "novadesk";

function showError(message) {
  dialog.show({
    title: "Error",
    message: message,
    type: "error",
    buttons: "ok"
  });
}

// Usage
showError("Failed to load configuration file.\nCheck that config.json exists in the widget folder.");
```

**Notes:**

- Both `type` and `buttons` are case-insensitive — `"Warning"`, `"WARNING"`, and `"warning"` are all equivalent
- Empty strings for `type` or `buttons` fall back to the defaults (`"info"` and `"ok"` respectively)
- The dialog title and message support Unicode, including emoji and non-Latin scripts
- The dialog is modal to the application (`MB_APPLMODAL`) — other windows remain accessible while it is open
- `\n` in the `message` string produces a line break in the dialog body
