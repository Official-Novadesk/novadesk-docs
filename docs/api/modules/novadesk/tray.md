---
title: Tray
---

# Tray

The Tray module lets you create and control a system tray icon, its context menu, and tray events.

#### Table of Contents
[[toc]]

## Quick Start

```javascript
import { tray } from "novadesk";

const appTray = new tray("C:/path/to/icon.ico");
appTray.setToolTip("Novadesk");

appTray.setContextMenu([
  { text: "Open", action: () => console.log("open") },
  { type: "separator" },
  { text: "Exit", action: () => console.log("exit") }
]);

appTray.on("click", () => {
  console.log("Tray clicked");
});
```

## Constructor

### `new tray(image)`

Creates a tray instance. `image` is optional.

```javascript
const tray = new tray();
const trayWithIcon = new tray("C:/path/to/icon.ico");
```

## Methods

### `tray.setImage(image)`

Updates the tray icon image.

```javascript
tray.setImage("C:/path/to/icon.ico");
```

### `tray.setToolTip(toolTip)`

Sets the tray tooltip text.

```javascript
tray.setToolTip("Novadesk");
```

### `tray.setContextMenu(menu)`

Sets the context menu items for the tray icon.

**Menu item shape**

- `text` (`string`): Label text.
- `action` (`function`): Called when the item is clicked.
- `type` (`string`, optional): Use `"separator"` to insert a divider.
- `checked` (`boolean`, optional): Check state.
- `items` (`Array<object>`, optional): Nested submenu items.

```javascript
tray.setContextMenu([
  { text: "Open", action: () => console.log("open") },
  {
    text: "Manage",
    items: [
      { text: "Widget Settings", action: () => console.log("settings") }
    ]
  },
  { type: "separator" },
  { text: "Exit", action: () => console.log("exit") }
]);
```

## Events

Use `tray.on(event, handler)` to listen for tray events.

Supported events:
- `click`
- `right-click`
- `double-click`
- `scroll-up`
- `scroll-down`

```javascript
tray.on("click", (event) => {
  console.log("Tray clicked", event);
});

tray.on("double-click", () => {
  console.log("Tray double-clicked");
});

tray.on("scroll-up", () => {
  console.log("Scrolled up on tray icon");
});
```

## Cleanup

### `tray.destroy()`

Clears all tray event handlers.

```javascript
tray.destroy();
```

## Beginner Tips

- Always keep a reference to the tray object so it doesn’t get garbage collected.
- Use a `.ico` file for best results on Windows.
- Build your context menu once at startup and update it only when needed.
