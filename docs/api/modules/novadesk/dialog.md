---
title: dialog
---

# dialog

Show a native Windows modal message box and read which button the user clicked. The call is **synchronous** — it blocks the script until the user dismisses the dialog.

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
