---
title: Creating Your First Widget
---

# Creating Your First Widget
Create, run, and package your first Novadesk widget using `nwm`.

#### Table of Contents
[[toc]]

This guide is based on the current `nwm init` template in the Novadesk project.

## Prerequisites

- Novadesk is installed.
- `nwm.exe` is available in your PATH (or run it from the Novadesk install directory).

## 1. Create a New Widget Project

Run:

```bash
nwm init my-first-widget
```

This creates a starter project:

<LiteTree>
- my-first-widget/
    meta.json
    index.js
    ui/
        script.ui.js
</LiteTree>

## 2. Understand the Starter Files

### `index.js` (Main script)
Creates the widget window and points to the UI script.

```javascript
import widgetWindow from "novadesk";

var myWindow = new widgetWindow({
    id: "myWindow",
    width: 200,
    height: 200,
    script: "ui/script.ui.js",
    backgroundColor: "#ffffffff",
});
```

### `ui/script.ui.js` (UI script)
Draws content inside the window.

```javascript
ui.addText({
    id: "hello_Text",
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    text: "Hello World",
    fontSize: 16,
    fontColor: "#000000",
    fontWeight: "bold",
    fontFamily: "Arial",
    textAlign: "centercenter",
});
```

### `meta.json`
Defines widget identity and installer/build settings.

## 3. Customize Your First Widget

Edit `ui/script.ui.js` and change text/style, for example:

```javascript
ui.addText({
    id: "hello_Text",
    x: 20,
    y: 20,
    width: 160,
    height: 60,
    text: "Hello from Novadesk!",
    fontSize: 18,
    fontColor: "rgb(30,30,30)",
    textAlign: "centercenter",
});
```

## 4. Run the Widget

From the widget folder:

```bash
cd my-first-widget
nwm run
```

This launches Novadesk and runs the widget from the current directory.

::: tip
After editing files, use tray menu `Refresh` to reload scripts quickly.
:::

## 5. Build for Distribution

Package your widget:

```bash
nwm build
```

`nwm build` validates required `meta.json` fields before packaging.

Required top-level fields:
- `name`
- `version`
- `author`
- `description`
- `icon`

Required setup fields:
- `setup.installDir`
- `setup.startMenuFolder`
- `setup.setupName`
- `setup.setupIcon`

Output is generated in `dist/`.

## Next Steps

- Learn script roles in [Script Types](/guides/script-types).
- Explore UI APIs from [UI Object Methods](/api/ui/ui-object).
- See packaging details in [Widget Build And Installer](/guides/widget-build-and-installer).
