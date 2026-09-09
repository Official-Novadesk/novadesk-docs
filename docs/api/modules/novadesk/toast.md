---
title: toast
description: Show Windows toast notifications with action buttons and callbacks.
---

# toast

Show Windows toast notifications from your Novadesk widget. For blocking modal dialogs, see the [dialog](/api/modules/novadesk/dialog) API. Supports titles, messages, images, action buttons, reply input, custom sounds, and callbacks for every interaction.

```javascript
import { toast } from "novadesk";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Overview

The `toast` API wraps the native Windows notification system. Toasts appear in the bottom-right corner of the screen (Action Center area) and persist in the notification centre after they dismiss.

`toast.show()` handles initialization automatically on the first call, so you typically only need `initialize()` if you want to customize the app identity shown in the notification.

## Methods

<MethodBox
  name="toast.initialize([options])"
  badge="toast"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'options', type: 'object', optional: true, description: 'Optional app identity options. If omitted, Novadesk reads identity from the current exe version info.' }
  ]"
>
<template #returns><code>true</code> if the toast system was initialized successfully, <code>false</code> otherwise.</template>

Explicitly initializes the Windows notification system. You only need to call this if you want to override the app name or company name shown in the notification header.

`toast.show()` calls this automatically if it has not been called yet, so explicit initialization is optional in most cases.

**Options properties:**

| Property | Type | Description |
|---|---|---|
| `appName` | `string` | Display name shown in the notification header. Defaults to the exe's `FileDescription`. |
| `companyName` | `string` | Company name used to build the App User Model ID. Defaults to `"OfficialNovadesk"`. |
| `productName` | `string` | Product name used to build the App User Model ID. |
| `aumi` | `string` | Full App User Model ID override. If set, `companyName` and `productName` are ignored for AUMI purposes. |
| `shortcutPolicy` | `string` | Shortcut policy for the notification. `"ignore"` ignores shortcuts, `"require"` requires existing shortcuts without creating new ones, `"create"` (default) creates shortcuts if missing. |

<template #example>

```javascript
import { toast } from "novadesk";

// Initialize with custom app identity
const ok = toast.initialize({
  appName: "My Widget",
  companyName: "MyCompany",
  productName: "MyWidget"
});

console.log("Toast initialized:", ok);
```

</template>
</MethodBox>

<MethodBox
  name="toast.show(options)"
  badge="toast"
  badgeType="core"
  returns="number | null"
  :parameters="[
    { name: 'options', type: 'object | string', description: 'A notification options object, or a plain string used as the title.' }
  ]"
>
<template #returns>A numeric toast ID on success, or <code>null</code> if the notification could not be shown. Use <code>toast.getLastError()</code> after a <code>null</code> result to read the error message.</template>

Shows a Windows toast notification. Returns a toast ID that can be passed to `toast.hide()` to dismiss it programmatically.

Calling `toast.show("My Title")` is a shorthand — the string becomes the title and no message is set.

**Options properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | First line of the notification. |
| `message` | `string` \| `body` | — | Second line of the notification. Also accepted as `body`. |
| `thirdLine` | `string` | — | Third line of text (text-only templates). |
| `attribution` | `string` | — | Small attribution text shown below the content. |
| `image` | `string` | — | Path to an image file shown beside the text. Also accepted as `imagePath`. Relative paths resolve from the current script directory. |
| `heroImage` | `string` | — | Path to a large hero image shown above the content. Also accepted as `heroImagePath`. |
| `inlineHeroImage` | `boolean` | `false` | When `true`, the hero image is shown inline inside the notification body. |
| `crop` | `string` | `"square"` | Image crop hint for the side image. `"circle"` crops the image into a circle; `"square"` keeps it square. |
| `actions` | `string[]` | — | Array of button labels (or objects with a `label`/`text` property). Adds clickable action buttons. |
| `input` | `boolean` | `false` | When `true`, adds a free-text reply input box to the notification. |
| `duration` | `string` | `"system"` | How long the notification stays visible. `"short"` (~7s), `"long"` (~25s), `"system"` (OS default). |
| `scenario` | `string` | `"default"` | Notification scenario. `"alarm"`, `"incomingCall"` (or `"incoming-call"`), `"reminder"`, `"default"`. |
| `audio` | `string` | — | System sound name. One of: `"default"`, `"im"`, `"mail"`, `"reminder"`, `"sms"`, `"alarm"`, `"call"`. |
| `audioPath` | `string` | — | Path to a custom audio file. Relative paths resolve from the current script directory. Overrides `audio` if both are set. |
| `silent` | `boolean` | `false` | When `true`, the notification plays no sound. Overrides `audio` and `audioPath`. |
| `loop` | `boolean` | `false` | When `true`, the notification sound loops until dismissed. |
| `expiration` | `number` | — | Milliseconds from now after which the notification expires. |
| `onActivated` | `function` | — | Called when the user clicks the notification body. Also accepted as `onActivate` or `onClick`. |
| `onAction` | `function` | — | Called when the user clicks an action button. |
| `onInput` | `function` | — | Called when the user submits the reply input box. |
| `onDismissed` | `function` | — | Called when the notification is dismissed. Also accepted as `onDismiss`. |
| `onFailed` | `function` | — | Called if the notification fails to display. Also accepted as `onFail`. |

**Callback event objects:**

Each callback receives a single event object:

`onActivated(event)` — User clicked the notification body:

| Property | Type | Description |
|---|---|---|
| `toastId` | `number` | The ID returned by `toast.show()`. |
| `type` | `string` | Always `"activated"`. |

`onAction(event)` — User clicked an action button:

| Property | Type | Description |
|---|---|---|
| `toastId` | `number` | The ID returned by `toast.show()`. |
| `type` | `string` | Always `"action"`. |
| `actionIndex` | `number` | Zero-based index of the button that was clicked. |

`onInput(event)` — User submitted the reply input box:

| Property | Type | Description |
|---|---|---|
| `toastId` | `number` | The ID returned by `toast.show()`. |
| `type` | `string` | Always `"input"`. |
| `input` | `string` | The text the user typed. |

`onDismissed(event)` — Notification was dismissed:

| Property | Type | Description |
|---|---|---|
| `toastId` | `number` | The ID returned by `toast.show()`. |
| `type` | `string` | Always `"dismissed"`. |
| `reason` | `string` | `"userCanceled"`, `"applicationHidden"`, `"timedOut"`, or `"unknown"`. |

`onFailed(event)` — Notification failed:

| Property | Type | Description |
|---|---|---|
| `toastId` | `number` | The ID returned by `toast.show()`. |
| `type` | `string` | Always `"failed"`. |

<template #example>

```javascript
import { toast } from "novadesk";

// Minimal — title only
toast.show("Hello from Novadesk");

// Title and message
toast.show({
  title: "Download Complete",
  message: "your-file.zip is ready."
});

// With action buttons and callbacks
const id = toast.show({
  title: "New Message",
  message: "You have an unread message.",
  duration: "long",
  actions: ["Open", "Dismiss"],
  onActivated: (e) => {
    console.log("Body clicked, toast ID:", e.toastId);
  },
  onAction: (e) => {
    if (e.actionIndex === 0) {
      console.log("User clicked Open");
    } else {
      console.log("User clicked Dismiss");
      toast.hide(e.toastId);
    }
  },
  onDismissed: (e) => {
    console.log("Dismissed:", e.reason);
    // e.reason: "userCanceled" | "timedOut" | "applicationHidden"
  }
});

if (id === null) {
  console.error("Toast failed:", toast.getLastError());
}
```

</template>
</MethodBox>

<MethodBox
  name="toast.hide(id)"
  badge="toast"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'id', type: 'number', description: 'The toast ID returned by toast.show().' }
  ]"
>
<template #returns><code>true</code> if the notification was hidden, <code>false</code> otherwise.</template>

Programmatically dismisses a toast notification. Has no effect if the notification has already been dismissed or expired.

<template #example>

```javascript
import { toast } from "novadesk";

const id = toast.show({
  title: "Processing…",
  message: "This will close automatically."
});

// Dismiss after 5 seconds
setTimeout(() => {
  if (id !== null) {
    toast.hide(id);
    console.log("Toast hidden");
  }
}, 5000);
```

</template>
</MethodBox>

<MethodBox
  name="toast.clear()"
  badge="toast"
  badgeType="core"
  returns="undefined"
>
<template #returns>Returns <code>undefined</code>.</template>

Dismisses all active notifications sent by this widget session at once.

<template #example>

```javascript
import { toast } from "novadesk";

toast.show({ title: "Alert 1", message: "First notification" });
toast.show({ title: "Alert 2", message: "Second notification" });

// Dismiss everything at once
setTimeout(() => {
  toast.clear();
  console.log("All toasts cleared");
}, 3000);
```

</template>
</MethodBox>

<MethodBox
  name="toast.isCompatible()"
  badge="toast"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the Windows notification system is available on the current machine.</template>

Checks whether the Windows toast notification API is supported on the current system. Returns `false` on systems that lack the required Windows Runtime DLLs (very old Windows versions).

<template #example>

```javascript
import { toast } from "novadesk";

if (!toast.isCompatible()) {
  console.warn("Toast notifications are not supported on this system");
}
```

</template>
</MethodBox>

<MethodBox
  name="toast.isInitialized()"
  badge="toast"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the toast system has been initialized (either explicitly or automatically by <code>toast.show()</code>).</template>

Returns whether the notification system is ready to send notifications.

<template #example>

```javascript
import { toast } from "novadesk";

console.log("Ready:", toast.isInitialized()); // false before first show

toast.show({ title: "Test" });

console.log("Ready:", toast.isInitialized()); // true after first show
```

</template>
</MethodBox>

<MethodBox
  name="toast.getLastError()"
  badge="toast"
  badgeType="core"
  returns="string"
>
<template #returns>The error message from the last failed <code>toast.show()</code> call, or an empty string if the last call succeeded.</template>

Returns a human-readable error message for the most recent failure. Useful for debugging why `toast.show()` returned `null`.

<template #example>

```javascript
import { toast } from "novadesk";

const id = toast.show({
  title: "Test",
  message: "Hello"
});

if (id === null) {
  console.error("toast.show failed:", toast.getLastError());
}
```

</template>
</MethodBox>

## Practical Examples

### Simple Notification

```javascript
import { toast } from "novadesk";

// Single-line title only
toast.show("Hello from Novadesk");

// Title + message
toast.show({
  title: "System Alert",
  message: "CPU usage is above 90%.",
  duration: "long"
});
```

### Notification with Action Buttons

```javascript
import { toast } from "novadesk";

toast.show({
  title: "New Update Available",
  message: "Novadesk v2.1.0 is ready to install.",
  actions: ["Install Now", "Remind Me Later"],
  onAction: (e) => {
    if (e.actionIndex === 0) {
      console.log("User chose to install");
    } else {
      console.log("User deferred the update");
    }
  },
  onDismissed: (e) => {
    console.log("Notification closed:", e.reason);
  }
});
```

### Reply Input Box

Add `input: true` to include a text field where the user can type a reply:

```javascript
import { toast } from "novadesk";

toast.show({
  title: "Quick Reply",
  message: "Type your response below.",
  input: true,
  actions: ["Send"],
  onInput: (e) => {
    console.log("User typed:", e.input);
  },
  onAction: (e) => {
    console.log("Send button clicked, toast:", e.toastId);
  }
});
```

### Notification with Image

```javascript
import { toast } from "novadesk";

toast.show({
  title: "Photo Ready",
  message: "Your screenshot has been saved.",
  image: "./assets/preview.png",    // relative path, resolved from script dir
  crop: "square",                    // or "circle"
  duration: "long"
});
```

### Incoming Call Scenario

Use the `"incomingCall"` scenario for persistent call-style notifications that stay until the user acts:

```javascript
import { toast } from "novadesk";

const id = toast.show({
  title: "Incoming Call",
  message: "John Doe",
  scenario: "incomingCall",
  audio: "call",
  actions: ["Answer", "Decline"],
  onAction: (e) => {
    if (e.actionIndex === 0) {
      console.log("Call answered");
    } else {
      console.log("Call declined");
      toast.hide(e.toastId);
    }
  }
});
```

### Alarm / Reminder

```javascript
import { toast } from "novadesk";

toast.show({
  title: "⏰ Reminder",
  message: "Stand up and stretch!",
  scenario: "reminder",
  audio: "reminder",
  loop: true,
  duration: "long",
  actions: ["Dismiss"],
  onAction: (e) => toast.hide(e.toastId),
  onDismissed: () => console.log("Reminder acknowledged")
});
```

### Silent Notification

```javascript
import { toast } from "novadesk";

toast.show({
  title: "Background Sync",
  message: "Data updated silently.",
  silent: true,
  duration: "short"
});
```

**Notes:**

- Toast notifications require Windows 8 or later. Use `toast.isCompatible()` to guard on older systems
- The notification header always shows the Novadesk app name unless overridden with `toast.initialize()`
- Both `title` and `message` cannot be empty at the same time — `toast.show()` throws a `TypeError` if both are missing or blank
- `actions` and `input` are mutually exclusive in the same notification — if `input: true` is set, `actions` are still shown as the submit button
- Relative paths for `image`, `heroImage`, and `audioPath` resolve from the **current script's directory**
- `toast.clear()` only clears notifications shown in the current widget session; it does not affect other applications' notifications
