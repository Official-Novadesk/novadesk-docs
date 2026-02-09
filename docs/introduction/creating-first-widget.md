# Creating Your First Widget
 A step-by-step guide to creating, running, and building your first Novadesk widget using the nwm tool.

This guide will walk you through the process of creating a simple widget using the **Novadesk Widget Maker (nwm)**.

## Prerequisites

Before you begin, ensure you have Novadesk installed and the `nwm.exe` tool available in your path or Novadesk directory.

## 1. Initialize Your Widget

Use the `nwm init` command to scaffold a new widget project. Open your terminal and run:

```bash
nwm init my-first-widget
```

This creates a new directory called `my-first-widget` with the following structure:

<LiteTree>
- my-first-widget/
    meta.json      // Widget metadata (name, version, author, etc.)
    index.js       // Main entry point (window creation)
    ui/            // Example folder (you can rename or add more)
        ui.js
</LiteTree>

::: info
The folder structure is determined by the `widget` template. You can add your own folders (like `lib`, `styles`, etc.) and `nwm build` will automatically include them.
:::

## 2. Customize Your Widget

Open `my-first-widget/ui/ui.js` and edit the text to make it your own:

```javascript
win.addText({
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

To see your widget in action, use the `nwm run` command from inside the widget directory:

```bash
cd my-first-widget
nwm run
```

This launches Novadesk and loads your widget script. The terminal will remain open to show you any logs or error messages from your widget.

::: tip
You can right-click the Novadesk tray icon and select **Refresh** to reload your script after making changes.
:::

## 4. Build for Distribution

Once you're happy with your widget, you can build it into a standalone executable using `nwm build`:

```bash
nwm build
```

This command performs several actions:
1. **Validation**: Checks `meta.json` for required fields (`name`, `version`, `author`, `description`, `icon`).
2. **Scaffolding**: Creates a `dist` folder.
3. **Packaging**: Copies `Novadesk.exe` and your scripts into the correct structure.
4. **Metadata**: Syncs your widget's name, version, and author into the executable's internal version information.

Your finished widget will be in the `dist` folder:

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

