
# Mouse Monitor

Monitor mouse position in Novadesk.

The Mouse monitor class allows you to monitor the current mouse cursor position on the screen.

::: warning
System monitors are **only available in the Main script**. UI scripts should request monitor data from the main script via [IPC](/api/widget-api/widget-methods/#inter-process-communication-ipc).
:::

## Creating a Mouse Monitor

```javascript
var mouse = new system.mouse();
```

## Methods

### position()

Get the current mouse cursor position.

### Return Value

- **Type**: `Object`
- **Description**: An object containing mouse coordinates:

  - **`x`**
    - **Type**: `number`
    - **Description**: X-coordinate of the mouse cursor.

  - **`y`**
    - **Type**: `number`
    - **Description**: Y-coordinate of the mouse cursor.

### destroy()

Destroy the mouse monitor and free its resources.

## Example

```javascript
// index.js
var mouse = new system.mouse();

var intervalId = setInterval(function () {
    var pos = mouse.position();
    console.log("Mouse Position: X=" + pos.x + ", Y=" + pos.y);
}, 100);

setTimeout(function () {
    clearInterval(intervalId);
    mouse.destroy();
    console.log("Mouse Monitor Destroyed");
}, 5000);
```
