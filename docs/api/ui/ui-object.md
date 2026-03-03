---
title: Win Object Methods
---

# Win Object Methods
Methods available on the UI script `win` object and `widgetWindow` instances in Novadesk.

Novadesk enforces a **Strict Separation of Concerns** between the **Main script** (application logic) and **UI scripts** (visual presentation).

::: info
- **Main Script**: Manages widget windows (creation, positioning, lifecycle). It **cannot** directly add UI elements.
- **UI Script**: Manages visual elements (text, images, interactions). It **cannot** directly change window-level properties.
- **Communication**: Use the global [ipc](/api/ipc) object to communicate between these contexts.
:::

#### Table of Contents
[[toc]]

## UI Element Methods

::: info
The following methods are only available inside a UI script via the `win` object.
:::

### `ui.addText(options)`

Creates a text element inside the UI script.

- **`options`**
  - **Type**: `Object`
  - **Description**: Text element configuration. Requires a unique `id`.

Refer to [addText Options](/api/ui/addText) for full configuration details.

### `ui.addImage(options)`

Adds an image element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Image element configuration. Requires a unique `id`.

Refer to [addImage Options](/api/ui/addImage).

### `ui.addBar(options)`

Adds a bar element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Bar element configuration. Requires a unique `id`.

Refer to [addBar Options](/api/ui/addBar).

### `ui.addRoundLine(options)`

Adds a roundline element.

- **`options`**
  - **Type**: `Object`
  - **Description**: RoundLine configuration. Requires a unique `id`.

See [addRoundLine Options](/api/ui/addRoundLine).

### `ui.addShape(options)`

Adds a shape element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Shape configuration. Requires a unique `id`.

Refer to [addShape Options](/api/ui/addShape).

### `win.setElementProperties(id, props)`

Updates a single element.

- **`id`** (`string`): Element identifier.
- **`props`** (`Object`): Properties to change.

#### Example

```javascript
win.setElementProperties("myText", { x: 20, y: 20 });
```

### `win.setElementPropertiesByGroup(group, props)`

Updates every element sharing a `group`.

- **`group`** (`string`): Group name.
- **`props`** (`Object`): Properties to apply.

#### Example

```javascript
win.setElementPropertiesByGroup("stats", { show: false });
```

### `win.removeElements(ids)`

Removes one or more elements.

- **`ids`**
  - Can be a single `string`, an `Array` of IDs, or `null`/`undefined` to clear all elements.

::: warning
Calling `removeElements()` with no arguments removes *all* elements from the widget.
:::

#### Example

```javascript
win.removeElements(["img1", "text3"]);
win.removeElements(); // Clears everything
```

### `win.removeElementsByGroup(group)`

Removes all elements in a group.

- **`group`** (`string`): Group name to clear.

#### Example

```javascript
win.removeElementsByGroup("stats");
```

### `win.getElementProperty(id, propertyName)`

Reads a property value.

- **`id`** (`string`): Element identifier.
- **`propertyName`** (`string`): Name of the property.

#### Return Value

- **Type**: `any | null | undefined`
- **Description**: Returns `null` if the element is missing; `undefined` if the property does not exist.

#### Example

```javascript
var textValue = win.getElementProperty("myText", "text");
```

### `win.beginUpdate()`

Begins a batch UI update. Redraws remain deferred until `win.endUpdate()` is called.

### `win.endUpdate()`

Ends the batch and forces a redraw.

