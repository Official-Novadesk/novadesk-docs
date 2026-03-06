---
title: Inter-Process Communication (IPC) between Main and UI scripts.
---

# IPC

Novadesk uses a two-process model. The **Main script** (`index.js`) runs widget logic, while each **UI script** (e.g. `ui.js`) manages rendering. The IPC API lets these two layers exchange messages over named channels.

#### Table of Contents
[[toc]]

::: info
`ipcMain` is only available in the Main script.
`ipcRenderer` is only available in UI scripts.
:::

## IPC Message Object

Every listener receives an **event** object as its first argument with the following shape:

- **`type`** (`string`): The channel name (defaults to `"message"`).
- **`payload`** (`any`): The data that was sent.
- **`from`** (`string`): Origin of the message  `"main"` or `"ui"`.
- **`to`** (`string`): Destination  `"main"` or `"ui"`.
- **`channel`** (`string`): The channel the message was dispatched on.

## `ipcMain`

Global object exposed in the Main script for communicating with UI scripts.

### `ipcMain.on(channel, listener)`

Listens for messages sent from a UI script via `ipcRenderer.send()`.

#### Parameters

- **`channel`** (`string`): Non-empty channel name to listen on.
- **`listener`** (`function`): Callback invoked as `listener(event, payload)`.

#### Example

```javascript
ipcMain.on("ui-ready", (event, payload) => {
  console.log("UI is ready:", JSON.stringify(payload));
});
```

### `ipcMain.handle(channel, handler)`

Registers a handler that responds to `ipcRenderer.invoke()` calls. Only one handler can be active per channel  registering again replaces the previous handler.

#### Parameters

- **`channel`** (`string`): Non-empty channel name.
- **`handler`** (`function`): Callback invoked as `handler(event, payload)`. The return value is sent back to the invoking UI script.

#### Example

```javascript
ipcMain.handle("get-config", (event, payload) => {
  return { theme: "dark", version: 2 };
});
```

### `ipcMain.send(channel, payload)`

Sends a message from the Main script to all UI listeners registered on the given channel.

#### Parameters

- **`channel`** (`string`): Channel name.
- **`payload`** (`any`, optional): Data to send.

#### Example

```javascript
ipcMain.send("main-ready", { ts: Date.now(), note: "hello from main" });
```

## `ipcRenderer`

Global object exposed in UI scripts for communicating with the Main script.

### `ipcRenderer.on(channel, listener)`

Listens for messages sent from the Main script via `ipcMain.send()`.

#### Parameters

- **`channel`** (`string`): Non-empty channel name to listen on.
- **`listener`** (`function`): Callback invoked as `listener(event, payload)`.

#### Example

```javascript
ipcRenderer.on("main-ready", (event, payload) => {
  console.log("Main says:", JSON.stringify(payload));
  ui.setElementProperties("status", { text: "main-ready" });
});
```

### `ipcRenderer.send(channel, payload)`

Sends a message from a UI script to all Main listeners registered on the given channel.

#### Parameters

- **`channel`** (`string`): Channel name.
- **`payload`** (`any`, optional): Data to send.

#### Example

```javascript
ipcRenderer.send("ui-ready", { ts: Date.now() });
```

### `ipcRenderer.invoke(channel, payload)`

Sends a request to the Main script and returns the result synchronously. The Main script must have a handler registered via `ipcMain.handle()` for the same channel; otherwise a `ReferenceError` is thrown.

#### Parameters

- **`channel`** (`string`): Non-empty channel name.
- **`payload`** (`any`, optional): Data to send.

#### Return Value

The value returned by the corresponding `ipcMain.handle()` handler.

#### Example

:::tabs
== index.js
```javascript
ipcMain.handle("get-config", (event, payload) => {
  return { theme: "dark" };
});
```
== ui.js
```javascript
const config = ipcRenderer.invoke("get-config");
console.log(config.theme); // "dark"
```
:::

## Full Example

:::tabs
== index.js
```javascript
import { widgetWindow } from 'novadesk';

ipcMain.on("ui-ready", (event, payload) => {
  console.log("[main] UI ready:", JSON.stringify(payload));
});

ipcMain.on("ui-ping", (event, payload) => {
  console.log("[main] ping from UI");
  ipcMain.send("main-pong", { ts: Date.now(), echo: payload });
});

ipcMain.handle("get-config", () => {
  return { theme: "dark", version: 1 };
});

const win = new widgetWindow({
  id: "demo",
  width: 400,
  height: 400,
  script: "ui.js",
  backgroundColor: "rgb(10,10,10)"
});

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

ipcRenderer.on("main-ready", (event, payload) => {
  ui.setElementProperties("status", { text: "main-ready" });
});

ipcRenderer.on("main-pong", (event, payload) => {
  console.log("[ui] pong:", JSON.stringify(payload));
});

const config = ipcRenderer.invoke("get-config");
console.log("[ui] config:", JSON.stringify(config));

ipcRenderer.send("ui-ready", { ts: Date.now() });
```
:::
