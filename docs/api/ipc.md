---
title: IPC
---

# IPC

Novadesk widgets have two script layers. The **Main script** (`index.js`) handles widget logic and data, while **UI scripts** (`*.ui.js`) handle rendering. The IPC API lets these two layers exchange messages over named channels, modelled closely after Electron's `ipcMain` / `ipcRenderer` pattern.

::: info Availability
| Global | Available in |
|---|---|
| `ipcMain` | Main script only |
| `ipcRenderer` | UI script only |

Both are injected as globals. No import is needed.
:::

::: tip In-process, not inter-process
Despite the name, Novadesk IPC runs entirely within a single QuickJS context. Messages are direct function calls with no serialization, no async overhead, and no cross-process boundary. Any JavaScript value type can be passed as a payload.
:::

#### Table of Contents
[[toc]]

## IPC Message Object

Every `on` listener and `handle` handler receives an event object as its first argument:

| Property | Type | Description |
|---|---|---|
| `type` | `string` | The channel name the message was sent on. |
| `payload` | `any` | The data that was sent. `undefined` if no payload was provided. |
| `from` | `string` | Origin side: `"main"` or `"ui"`. |
| `to` | `string` | Destination side: `"main"` or `"ui"`. |
| `channel` | `string` | Same as `type` for channel-based listeners. |

## `ipcMain`

Available in the **Main script** only. Used to receive messages from UI scripts and push messages back to them.

<MethodBox
  name="ipcMain.on(channel, listener)"
  badge="ipcMain"
  badgeType="core"
  :parameters="[
    { name: 'channel', type: 'string', description: 'Non-empty channel name to listen on.' },
    { name: 'listener', type: 'function', description: 'Callback invoked as listener(event, payload) each time a message arrives on this channel.' }
  ]"
>

Registers a persistent listener for messages sent from a UI script via `ipcRenderer.send()`. If multiple listeners are registered on the same channel, all of them are called in registration order.

::: warning No removeListener
There is no `ipcMain.off()` or `removeListener()`. Listeners are cleaned up automatically when the script that registered them is unloaded or refreshed.
:::

<template #example>

```javascript
ipcMain.on("ui-ready", (event, payload) => {
  console.log("UI is ready:", JSON.stringify(payload));
  // event.from === "ui", event.to === "main"
});
```

</template>
</MethodBox>

<MethodBox
  name="ipcMain.handle(channel, handler)"
  badge="ipcMain"
  badgeType="core"
  :parameters="[
    { name: 'channel', type: 'string', description: 'Non-empty channel name.' },
    { name: 'handler', type: 'function', description: 'Callback invoked as handler(event, payload). Its return value is passed back to the ipcRenderer.invoke() caller.' }
  ]"
>

Registers a synchronous request handler for `ipcRenderer.invoke()` calls. Only **one handler per channel** is active at a time. Calling `handle` again on the same channel silently replaces the previous handler.

::: tip When to use handle vs on
Use `handle` + `invoke` when the UI needs a value back from the Main script immediately. Use `on` + `send` for fire-and-forget notifications where no return value is needed.
:::

<template #example>

```javascript
ipcMain.handle("get-config", (event, payload) => {
  return { theme: "dark", version: 2 };
});
```

</template>
</MethodBox>

<MethodBox
  name="ipcMain.send(channel, payload)"
  badge="ipcMain"
  badgeType="core"
  :parameters="[
    { name: 'channel', type: 'string', description: 'Channel name to send on.' },
    { name: 'payload', type: 'any', optional: true, description: 'Data to send. Any JavaScript value is accepted.' }
  ]"
>

Sends a message from the Main script to all UI listeners registered on the given channel via `ipcRenderer.on()`. If no listeners are registered, the call is a silent no-op.

<template #example>

```javascript
ipcMain.send("main-ready", { ts: Date.now() });
ipcMain.send("refresh"); // payload is optional
```

</template>
</MethodBox>

## `ipcRenderer`

Available in **UI scripts** only. Used to send messages to the Main script and receive responses.

::: info Scoped to the UI script
`ipcRenderer` is passed as a local parameter to your UI script and is not accessible from the global scope. This is intentional: it keeps the UI script sandboxed. Timers (`setTimeout`, `setInterval`) are also unavailable in UI scripts.
:::

<MethodBox
  name="ipcRenderer.on(channel, listener)"
  badge="ipcRenderer"
  badgeType="ui"
  :parameters="[
    { name: 'channel', type: 'string', description: 'Non-empty channel name to listen on.' },
    { name: 'listener', type: 'function', description: 'Callback invoked as listener(event, payload) each time a message arrives on this channel.' }
  ]"
>

Registers a persistent listener for messages sent from the Main script via `ipcMain.send()`. Multiple listeners on the same channel are all called in registration order.

When a UI script is reloaded or refreshed, all its previously registered listeners are automatically removed before the script runs again, so there is no risk of duplicate listeners accumulating across reloads.

<template #example>

```javascript
ipcRenderer.on("main-ready", (event, payload) => {
  console.log("Main says:", JSON.stringify(payload));
  ui.setElementProperties("status", { text: "Connected" });
});

ipcRenderer.on("main-pong", (event, payload) => {
  console.log("pong received:", payload.ts);
});
```

</template>
</MethodBox>

<MethodBox
  name="ipcRenderer.send(channel, payload)"
  badge="ipcRenderer"
  badgeType="ui"
  :parameters="[
    { name: 'channel', type: 'string', description: 'Channel name to send on.' },
    { name: 'payload', type: 'any', optional: true, description: 'Data to send. Any JavaScript value is accepted.' }
  ]"
>

Sends a message from the UI script to all Main listeners registered on the given channel via `ipcMain.on()`. If no listeners are registered, the call is a silent no-op.

<template #example>

```javascript
ipcRenderer.send("ui-ready", { ts: Date.now() });
ipcRenderer.send("ui-ping", { msg: "hello" });
```

</template>
</MethodBox>

<MethodBox
  name="ipcRenderer.invoke(channel, payload)"
  badge="ipcRenderer"
  badgeType="ui"
  returns="any"
  :parameters="[
    { name: 'channel', type: 'string', description: 'Non-empty channel name. A matching ipcMain.handle() must be registered before calling this.' },
    { name: 'payload', type: 'any', optional: true, description: 'Data to pass to the handler.' }
  ]"
>
<template #returns>The value returned by the matching <code>ipcMain.handle()</code> handler.</template>

Calls a Main script handler and returns its return value **synchronously**. The call runs inline on the current call stack with no async overhead. A matching `ipcMain.handle()` must be registered before `invoke` is called, otherwise a `ReferenceError` is thrown.

::: warning Throws if no handler is registered
If `ipcMain.handle(channel, ...)` has not been called for the given channel before `invoke` is called, a `ReferenceError` is thrown: `No ipcMain handler for channel: <channel>`. Register handlers in your Main script before the UI script starts executing.
:::

<template #example>

:::tabs
== index.js
```javascript
ipcMain.handle("get-config", (event, payload) => {
  return { theme: "dark", version: 1 };
});
```
== ui.js
```javascript
const config = ipcRenderer.invoke("get-config");
console.log(config.theme); // "dark"
```
:::

</template>
</MethodBox>

## Limitations

These features do not exist in the current implementation:

| Missing feature | Note |
|---|---|
| `ipcMain.off()` / `removeListener()` | No public API to unregister a specific listener. Listeners are cleaned up on script unload/refresh. |
| `ipcMain.once()` / `ipcRenderer.once()` | No single-fire listener variant. Implement it manually with a flag if needed. |
| `ipcMain.emit()` | Channels are always directional (main to ui, or ui to main). There is no way to broadcast within the same layer. |
| Async `invoke` | `ipcRenderer.invoke()` is synchronous. If the handler returns a Promise, the caller receives the Promise object, not the resolved value. |

## Full Example

A complete widget using all four IPC methods together.

:::tabs
== index.js
```javascript
import { widgetWindow } from 'novadesk';

// Receive fire-and-forget notifications from the UI
ipcMain.on("ui-ready", (event, payload) => {
  console.log("[main] UI ready:", JSON.stringify(payload));
});

ipcMain.on("ui-ping", (event, payload) => {
  console.log("[main] ping received, sending pong");
  ipcMain.send("main-pong", { ts: Date.now(), echo: payload });
});

// Handle synchronous data requests from the UI
ipcMain.handle("get-config", (event, payload) => {
  return { theme: "dark", version: 1 };
});

const win = new widgetWindow({
  id: "demo",
  width: 400,
  height: 400,
  script: "ui/script.ui.js",
  backgroundColor: "rgb(10,10,10)"
});

// Push initial state to the UI
ipcMain.send("main-ready", { ts: Date.now() });
```
== ui.js
```javascript
ui.beginUpdate();

ui.addText({
  id: "status",
  text: "waiting...",
  x: 16, y: 14,
  width: 260, height: 28,
  fontSize: 16,
  fontColor: "rgb(230,230,230)"
});

ui.endUpdate();

// Listen for messages pushed from the Main script
ipcRenderer.on("main-ready", (event, payload) => {
  ui.setElementProperties("status", { text: "Connected" });
});

ipcRenderer.on("main-pong", (event, payload) => {
  console.log("[ui] pong:", JSON.stringify(payload));
});

// Fetch config synchronously from the Main script
const config = ipcRenderer.invoke("get-config");
console.log("[ui] theme:", config.theme); // "dark"

// Notify Main that the UI has finished loading
ipcRenderer.send("ui-ready", { ts: Date.now() });

// Send a ping after a short delay (use Main script timers for this)
// Note: setTimeout is not available in UI scripts
ipcRenderer.send("ui-ping", { msg: "hello from UI" });
```
:::
