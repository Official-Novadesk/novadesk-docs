# Global Variables

Global variables available in Novadesk scripts.

Novadesk provides standard global variables that help you work with file paths relative to your script.

## __dirname

The absolute path to the directory containing the current script file.

### Example
```javascript
// Load an image from an assets folder next to the script
var imagePath = path.join(__dirname, 'assets', 'icon.png');
win.addImage(imagePath, 10, 10);
```

## __filename

The absolute path to the current script file.

## __widgetsDir

The absolute directory path of the currently loaded widget script context.

::: info
In current runtime behavior, `__widgetsDir` is set to the same value as `__dirname` for the active script context.
:::

### Example
```javascript
console.log("Widget Dir:", __widgetsDir);

var iconPath = path.join(__widgetsDir, "assets", "icon.png");
```

## Mouse Event Variables

The following variables are provided in mouse callback payloads (widget events and element mouse action callbacks):

## __offsetX

X position relative to the target area.

- For widget mouse events: relative to widget client area.
- For element callbacks: relative to the element.

## __offsetY

Y position relative to the target area.

- For widget mouse events: relative to widget client area.
- For element callbacks: relative to the element.

## __offsetXPercent

Horizontal percentage based on target width.

- Type: `number`
- Range: usually `0-100` (can be outside this range when pointer is outside bounds, such as `mouseLeave`).

## __offsetYPercent

Vertical percentage based on target height.

- Type: `number`
- Range: usually `0-100` (can be outside this range when pointer is outside bounds, such as `mouseLeave`).

## __clientX

Mouse X position in widget client coordinates.

## __clientY

Mouse Y position in widget client coordinates.

## __screenX

Mouse X position in screen coordinates.

## __screenY

Mouse Y position in screen coordinates.

### Example
```javascript
widget.on("mouseMove", function (e) {
  console.log("client:", e.__clientX, e.__clientY);
  console.log("screen:", e.__screenX, e.__screenY);
  console.log("offset:", e.__offsetX, e.__offsetY);
});
```

