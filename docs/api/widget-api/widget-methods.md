# Widget Methods

Methods available on widget objects in Novadesk.

Novadesk enforces a **Strict Separation of Concerns** between the **Main script** (application logic) and **UI scripts** (visual presentation).

::: info
- **Main Script**: Manages widget windows (creation, positioning, lifecycle). It **cannot** directly add UI elements.
- **UI Script**: Manages visual elements (text, images, interactions). It **cannot** directly change window-level properties.
- **Communication**: Use the global [ipc](#inter-process-communication-ipc) object to communicate between these contexts.
:::

## UI Element Methods

::: info
The following methods are **only** accessible within the `win` object inside a UI script. They are **unavailable** in the main application script.
:::

### addText(options)

Add a text element to the widget. Available only in UI scripts.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Description**: Configuration options for the text element. The **`id`** property is required and must be unique.

See the Text UI element documentation for all available options: [Text Element Options](/api/ui-elements-api/text-element)

### addImage(options)

Add an image element to the widget. Available only in UI scripts.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Description**: Configuration options for the image element. The **`id`** property is required and must be unique.

See the Image UI element documentation for all available options: [Image Element Options](/api/ui-elements-api/image-element)

### addBar(options)

Add a bar element to the widget. Available only in UI scripts.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Description**: Configuration options for the bar element. The **`id`** property is required and must be unique.

See the Bar UI element documentation for all available options: [Bar Element Options](/api/ui-elements-api/bar-element)

### addRoundLine(options)

Add a roundline element to the widget. Available only in UI scripts.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Description**: Configuration options for the roundline element. The **`id`** property is required and must be unique.

See the RoundLine UI element documentation for all available options: [RoundLine Element Options](/api/ui-elements-api/roundline-element)

### addShape(options)

Add a shape element to the widget. Available only in UI scripts.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Description**: Configuration options for the shape element. The **`id`** property is required and must be unique.

See the Shape UI element documentation for all available options: [Shape Element Options](/api/ui-elements-api/shape-element)

### setElementProperties(id, props)

Update properties of an existing UI element. Available only in UI scripts.

### Parameters

- **`id`**
  - **Type**: `string`
  - **Description**: ID of the element to update (cannot be changed)

- **`props`**
  - **Type**: `Object`
  - **Description**: Properties to change of the element.

### Example

```javascript
win.setElementProperties("myText", {
  x: 20,
  y: 20
});
```

### removeElements(ids)

Remove one or more UI elements from the widget. Available only in UI scripts.

### Parameters

- **`ids`**
  - **Type**: `string | Array | null`
  - **Description**:
    - A single element ID
    - An array of element IDs
    - `null` or `undefined` to remove **all** elements from the widget

::: warning
Leaving the `ids` parameter empty or setting it to `null`/`undefined` will remove all elements from the widget.
:::

### Example

```javascript
// Remove a single element
win.removeElements("myText");

// Remove multiple elements
win.removeElements(["img1", "img2", "text3"]);

// Clear all content
win.removeElements();
```

### getElementProperty(id, propertyName)

Retrieve a specific property of a UI element. Available only in UI scripts.

### Parameters

- **`id`**
  - **Type**: `string`
  - **Description**: ID of the UI element.

- **`propertyName`**
  - **Type**: `string`
  - **Description**: The name of the property to retrieve (e.g., `"text"`, `"x"`, `"y"`, `"width"`, `"height"`).

### Return Value

- **Type**: `any | null | undefined`
- **Description**: The value of requested property. Returns `null` if the element is not found, or `undefined` if the property does not exist.

### Example

```javascript
var textValue = win.getElementProperty("myText", "text");
if (textValue !== null) {
  console.log("Current text: " + textValue);
}

var xPos = win.getElementProperty("myText", "x");
console.log("X Position: " + xPos);
```

### beginUpdate()

Begin a batch update for UI changes. While in an update batch, redraw is deferred until `endUpdate()` is called. Available only in UI scripts.

### Example

```javascript
win.beginUpdate();
win.setElementProperties("myText", { x: 20, y: 20 });
win.setElementProperties("myImage", { x: 60, y: 20 });
win.endUpdate();
```

### endUpdate()

End a batch update and redraw the widget. Available only in UI scripts.

### Example

```javascript
win.endUpdate();
```

## Widget Management Methods

::: info
The following methods are **only** accessible from the [Main script](/guides/script-types#main-script-the-brain) on a [widgetWindow](/api/widget-api/widget-window) object instance. They are **unavailable** in [UI scripts](/guides/script-types#ui-script-the-face).
:::

### setProperties(options)

Update widget properties after creation.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Description**: Widget properties to update. The **`id`** property cannot be changed.

See [Widget Options](/api/widget-api/widget-window#options-object) for a list of available options.

### Example (Main Script)

```javascript
var widget = new widgetWindow({ id: "my-widget" });

widget.setProperties({
  x: 200,
  y: 200
});
```

### getProperties()

Get current widget properties. Available only in the main script.

### Return Value

An object containing the current widget properties.

### Example

```javascript
var props = widget.getProperties();
console.log("Widget position: " + props.x + ", " + props.y);
```

### close()

Close and destroy the widget. Available only in the main script.

### Example

```javascript
widget.close();
```

### refresh()

Refresh the widget (reload scripts and redraw). Available only in the main script.

### Example

```javascript
widget.refresh();
```

### setFocus()

Bring the widget window into focus. Available only in the main script.

### Example

```javascript
widget.setFocus();
```

### unFocus()

Remove focus from the widget window. Available only in the main script.

### Example

```javascript
widget.unFocus();
```

### getHandle()

Get the native window handle for the widget.

### Return Value

- **Type**: `pointer | null`
- **Description**: Returns the HWND pointer for the widget window, or `null` if unavailable.

### Example

```javascript
var hWnd = widget.getHandle();
```

### getInternalPointer()

Get the internal widget pointer.

### Return Value

- **Type**: `pointer | null`
- **Description**: Returns an internal pointer to the widget instance, or `null` if unavailable.

### Example

```javascript
var ptr = widget.getInternalPointer();
```

### getTitle()

Get the current window title for the widget.

### Return Value

- **Type**: `string`
- **Description**: Window title string. Returns an empty string if unavailable.

### Example

```javascript
var title = widget.getTitle();
```

### on(eventName, callback)

### Parameters

- **`eventName`**
  - **Type**: `string`
  - **Description**: Name of the lifecycle event.
  
  Available values:
  - `"refresh"`: Executes when the widget is refreshed (scripts reloaded)
  - `"close"`: Executes **before** the window is destroyed
  - `"closed"`: Executes **after** the window has been destroyed
  - `"show"`: Executes when the widget becomes visible (via `show: true`)
  - `"hide"`: Executes when the widget is hidden (via `show: false`)
  - `"move"`: Executes after the widget has moved
  - `"focus"`: Executes when the widget gains focus
  - `"unFocus"`: Executes when the widget loses focus
  - `"over"`: Executes when the mouse enters the widget window
  - `"leave"`: Executes when the mouse leaves the widget window

- **`callback`**
  - **Type**: `function`
  - **Description**: Function executed when the specified event occurs.

### Example

```javascript
widget.on("refresh", function () {
  console.log("Widget is refreshing!");
});

widget.on("close", function () {
  console.log("Cleaning up before close...");
});

widget.on("closed", function () {
  console.log("Window is now gone.");
});
```

## Context Menu Methods

::: info
The following methods are **only** accessible in Main script.
:::

### setContextMenu(items)

Sets the entire custom context menu for the widget. This replaces any previously set custom menu items. Available only in Main script.

### Parameters

- **`items`**
  - **Type**: `Array`
  - **Description**: An array of context menu item objects.
  
  Each menu item may contain:
  
  - **`text`**
    - **Type**: `string`
    - **Description**: Text displayed for the menu item.
  
  - **`action`**
    - **Type**: `function`
    - **Description**: Function executed when the item is clicked.
  
  - **`type`**
    - **Type**: `string`
    - **Description**: Set to `"separator"` to render a line separator.
  
  - **`checked`**
    - **Type**: `boolean`
    - **Description**: Displays a checkmark next to the item when set to `true`.
  
  - **`items`**
    - **Type**: `Array`
    - **Description**: Array of sub-menu items, creating a nested context menu.

### Example

```javascript
widget.setContextMenu([
  {
    text: "Toggle Submenu",
    items: [
      {
        text: "Option A",
        action: function () {
          console.log("A");
        }
      },
      {
        text: "Option B",
        checked: true,
        action: function () {
          console.log("B");
        }
      }
    ]
  },
  {
    type: "separator"
  },
  {
    text: "Refresh",
    action: function () {
      win.refresh();
    }
  }
]);
```

### clearContextMenu()

Removes all custom items from the context menu. Available only in Main script.

### Example

```javascript
widget.clearContextMenu();
```

### disableContextMenu(disabled)

Completely disables the context menu for the widget. Available only in Main script.

### Parameters

- **`disabled`**
  - **Type**: `boolean`
  - **Description**: Set to `true` to disable the context menu. Set to `false` to enable it.

### Example

```js
widget.disableContextMenu(true);
```

### showDefaultContextMenuItems(show)

Controls the visibility of the default Novadesk context menu items (Refresh, Exit Widget, Close App). Available only in Main script.

### Parameters

- **`show`**
  - **Type**: `boolean`
  - **Description**:
    - Set to `true` to show default menu items.
    - Set to `false` to hide them.

### Example

```js
// Hide default items to use a fully custom context menu
widget.showDefaultContextMenuItems(false);
```

## Inter-Process Communication (IPC)

The global **`ipc`** object allows data exchange between the **Main script** and the **UI script**.

### ipc.on(channel, callback)

Register a listener for a specific IPC channel.

### Parameters

- **`channel`**
  - **Type**: `string`
  - **Description**: Name of the channel to listen on.

- **`callback`**
  - **Type**: `function`
  - **Description**: Function executed when data is received on the channel.

### ipc.send(channel, data)

Send data to the other script context.

### Parameters

- **`channel`**
  - **Type**: `string`
  - **Description**: Name of the channel to send data on.

- **`data`**
  - **Type**: `any`
  - **Description**: Data to send to the receiving script.

### Example

:::tabs
== index.js
```javascript
ipc.on("get-message-from-widget", function() {
  console.log("Call received from widget");
  ipc.send("send-message-to-widget", "Hello from main script");
});
```
== welcome.js
```javascript
ipc.send("get-message-from-widget");

ipc.on("send-message-to-widget", function(data) {
  console.log("Message from main script: " + data);
});
```
:::

