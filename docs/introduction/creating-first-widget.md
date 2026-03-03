---
title: Creating Your First Widget
---

# Creating Your First Widget
A step-by-step guide to creating, running, and building your first Novadesk widget using the `nwm` tool.

#### Table of Contents
[[toc]]

This guide walks you through creating a simple widget using the **Novadesk Widget Maker (nwm)**.

## Prerequisites

Before you begin, ensure Novadesk is installed and `nwm.exe` is available in your PATH or Novadesk directory.

## 1. Initialize Your Widget

Run `nwm init` to scaffold a new widget project:

```bash
nwm init my-first-widget
```

The command creates:

<LiteTree>
- my-first-widget/
    meta.json      // Widget metadata (name, version, author, etc.)
    index.js       // Main entry point (window creation)
    ui/            // Example folder (you can rename or add more)
        ui.js
</LiteTree>

::: info
The template decides the initial structure. You can add folders (e.g., `lib`, `styles`) and `nwm build` will include them.
:::

## 2. Customize Your Widget

Edit `my-first-widget/ui/ui.js` and change the displayed text:

```javascript
ui.addText({
    id: "hello_Text",
    x: 10,
    y: 10,
    width: 200,
    height: 30,
    text: "Hello from my first widget!",
    fontsize: 16,
    fontcolor: "#000000",
    textalign: "centercenter"
});
```

## 3. Run and Preview

From your widget directory:

```bash
cd my-first-widget
nwm run
```

This launches Novadesk and loads your widget script. The terminal stays open to show logs or errors.

::: tip
Right-click the Novadesk tray icon and select **Refresh** to reload your script after edits.
:::

## 4. Build for Distribution

Run `nwm build` to package a standalone executable:

```bash
nwm build
```

It performs:
1. **Validation**: Ensures `meta.json` has required fields (`name`, `version`, `author`, `description`, `icon`).
2. **Scaffolding**: Creates a `dist` folder.
3. **Packaging**: Copies `Novadesk.exe` plus your scripts.
4. **Metadata**: Synchronizes the widget’s metadata into the executable.

The final widget lives inside `dist`.

<!-- {% filetree %}
- dist/
  - MyWidgetName.exe   # Your renamed executable
  - Widgets/
    - index.js
    - ui/
      - ui.js
{% /filetree %} -->

## 5. Sharing Your Widget

To share your widget, simply zip the contents of the `dist` folder and send it to others. When they run the `.exe`, it will automatically launch your widget with its custom name and identity!

Learn more about the full build and installer flow here: [Widget Build and Installer](/guides/widget-build-and-installer).

