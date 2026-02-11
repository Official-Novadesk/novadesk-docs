# Script Types
Understanding the difference between Main scripts and UI scripts in Novadesk


Novadesk uses two distinct types of JavaScript execution environments to build widgets: **Main Scripts** and **UI Scripts**. Each has a specific role and access level.

## Main Script (The Brain)

The Main script is the entry point of your widget application. By default, Novadesk looks for a file (like `index.js`) to start the application. 

### Role
The Main script acts as the coordinator. It manages high-level logic, sets up hotkeys, handles timers, and most importantly, creates and manages widget windows.

### Characteristics
- Runs in the global application context.
- Uses `new widgetWindow()` to create widget instances.
- Manages window lifecycle (positioning, opacity, closing).
- **Cannot** directly add or modify UI elements (text, images).
- Has full access to global APIs like `novadesk`, `system`, and `ipc` (including system monitors like `system.cpu()` and timers like `setInterval`).

```javascript
// Example index.js (Main Script)
var myWidget = new widgetWindow({
  id: "clockWidget",
  width: 300,
  height: 200,
  script: "clock_ui.js"
});

// Use system monitors and timers
var cpu = new system.cpu();
setInterval(function () {
  console.log("CPU usage: " + cpu.usage());
}, 1000);

// Control window via the instance
myWidget.setProperties({ x: 100, y: 100 });
```

---

## UI Script (The Face)

The UI script is dedicated to a specific widget window. It is defined in the `script` property when creating a `widgetWindow`.

### Role
The UI script handles everything happening *inside* that specific window. It defines the visual elements (text, images) and manages user interactions.

### Characteristics
- Runs in an isolated context specific to its window.
- Provides a global object named `win` that represents the current window instance.
- **Cannot** directly change window-level properties (like X/Y position).
- Has access to global APIs like `novadesk` and `ipc`.
- **Cannot** use system monitors (e.g., `system.cpu()` is undefined). 
- **Cannot** use global timers (e.g., `setInterval()` is undefined).
- **Cannot** create new windows (e.g., `new widgetWindow()` is undefined).

```javascript
// Example clock_ui.js (UI Script)
// Use the global 'win' object for UI elements
win.addText({
  id: "time",
  text: "12:00",
  fontSize: 20
});

// Send message to the Main script
ipc.send("ui-ready");

// Listen for messages from Main
ipc.on("update-color", function (newColor) {
  win.setElementProperties("time", { fontColor: newColor });
});
```

---

## Key Differences

| Feature | Main Script | UI Script |
| :--- | :--- | :--- |
| **Common Filename** | `index.js` | `ui.js`, `view.js` |
| **Reference Object** | `new widgetWindow()` (Constructor) | `win` (Global Object) |
| **Responsibilities** | Window Management, Hotkeys, Logic | UI Elements, Local Interactions |
| **Window Control** | Direct (e.g., `widget.setProperties`) | Indirect (via IPC to Main) |
| **UI Control** | Indirect (via IPC to UI) | Direct (e.g., `win.addText`) |

---

## Communication (IPC)

Because Main and UI scripts have strict responsibilities, they use the **Inter-Process Communication (IPC)** system to talk to each other.

- **`ipc.send(channel, data)`**: Send a message to the other context.
- **`ipc.on(channel, callback)`**: Listen for incoming messages.

::: tip
A common pattern is to handle system events or heavy logic in the **Main Script** and use `ipc.send()` to tell the **UI Script** what to display.
:::

