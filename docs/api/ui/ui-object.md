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

Refer to [addText Options](/api/ui/ui-elements/addText) for full configuration details.

### `ui.addInputBox(options)`

Creates a text input element inside the UI script.

- **`options`**
  - **Type**: `Object`
  - **Description**: InputBox element configuration. Requires a unique `id`.

Refer to [addInputBox Options](/api/ui/ui-elements/addInputBox) for full configuration details.

### `ui.addImage(options)`

Adds an image element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Image element configuration. Requires a unique `id`.

Refer to [addImage Options](/api/ui/ui-elements/addImage).

### `ui.addButton(options)`

Adds a button element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Button element configuration. Requires a unique `id`.

Refer to [addButton Options](/api/ui/ui-elements/addButton).

### `ui.addBitmap(options)`

Adds a bitmap element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Bitmap element configuration. Requires a unique `id`.

Refer to [addBitmap Options](/api/ui/ui-elements/addBitmap).

### `ui.addBar(options)`

Adds a bar element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Bar element configuration. Requires a unique `id`.

Refer to [addBar Options](/api/ui/ui-elements/addBar).

### `ui.addLine(options)`

Adds a line graph element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Line element configuration. Requires a unique `id`.

Refer to [addLine Options](/api/ui/ui-elements/addLine).

### `ui.addAreaGraph(options)`

Adds an area graph element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Area Graph element configuration. Requires a unique `id`.

Refer to [addAreaGraph Options](/api/ui/ui-elements/addAreaGraph).

### `ui.addHistogram(options)`

Adds a histogram element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Histogram element configuration. Requires a unique `id`.

Refer to [addHistogram Options](/api/ui/ui-elements/addHistogram).

### `ui.addRotator(options)`

Adds a rotator element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Rotator element configuration. Requires a unique `id`.

Refer to [addRotator Options](/api/ui/ui-elements/addRotator).

### `ui.addRoundLine(options)`

Adds a roundline element.

- **`options`**
  - **Type**: `Object`
  - **Description**: RoundLine configuration. Requires a unique `id`.

See [addRoundLine Options](/api/ui/ui-elements/addRoundLine).

### `ui.addShape(options)`

Adds a shape element.

- **`options`**
  - **Type**: `Object`
  - **Description**: Shape configuration. Requires a unique `id`.

Refer to [addShape Options](/api/ui/ui-elements/addShape).

### `ui.addLayoutBox(options)`

Adds a layout container element that can hold child elements via `children`.

- **`options`**
  - **Type**: `Object`
  - **Description**: LayoutBox configuration. Requires a unique `id`.

Refer to [addLayoutBox Options](/api/ui/ui-elements/addLayoutBox).

### `ui.layoutBox(options)`

Creates a **LayoutBox builder object** for use inside `children`.

- **`options`**
  - **Type**: `Object`
  - **Description**: Same shape as `ui.addLayoutBox(options)`, but does not render immediately.

Use this inside `children: [...]` of another `ui.addLayoutBox(...)`.

### `ui.animate(options)`

Animates supported element properties over time.

- **`options`**
  - **Type**: `Object`
  - **Description**: Animation configuration (`id`, `to`, `from`, `iterationCount`, `keyframes`, optional `duration`, optional `easing`).

Refer to [animate Options](/api/ui/animate).

### `ui.setElementProperty(id, key, value)`

Updates a single property on an element.

- **`id`** (`string`): Element identifier.
- **`key`** (`string`): Property name to update.
- **`value`** (`any`): New value for the property.

#### Example

```javascript
ui.setElementProperty("myText", "value", 0.5);
ui.setElementProperty("myImage", "textColor", "#ff0000");
```

### `ui.setElementProperty(id, options)`

Legacy form that updates multiple properties via an options object.

- **`id`** (`string`): Element identifier.
- **`options`** (`Object`): Properties to change.

#### Example

```javascript
ui.setElementProperty("myText", { value: 0.5, textColor: "#ff0000" });
```

### `ui.setElementProperties(id, props)`

Updates multiple properties on a single element.

- **`id`** (`string`): Element identifier.
- **`props`** (`Object`): Properties to change.

#### Example

```javascript
ui.setElementProperties("myText", { x: 20, y: 20 });
```

### `ui.isElementExist(id)`

Checks if an element with the given ID exists.

- **`id`** (`string`): Element identifier to check.

#### Return Value

- **Type**: `boolean`
- **Description**: Returns `true` if the element exists, `false` otherwise.

#### Example

```javascript
if (ui.isElementExist("myElement")) {
  ui.setElementProperty("myElement", "value", 0.5);
}
```

### `ui.setElementPropertiesByGroup(group, props)`

Updates every element sharing a `group`.

- **`group`** (`string`): Group name.
- **`props`** (`Object`): Properties to apply.

#### Example

```javascript
ui.setElementPropertiesByGroup("stats", { show: false });
```

### `ui.removeElements(ids)`

Removes one or more elements.

- **`ids`**
  - Can be a single `string`, an `Array` of IDs, or `null`/`undefined` to clear all elements.

::: warning
Calling `removeElements()` with no arguments removes *all* elements from the widget.
:::

#### Example

```javascript
ui.removeElements(["img1", "text3"]);
ui.removeElements(); // Clears everything
```

### `ui.removeElementById(id)`

Removes a single element by its ID.

- **`id`** (`string`): Element ID to remove.

#### Return Value

- **Type**: `boolean`
- **Description**: `true` if the element was removed, otherwise `false`.

#### Example

```javascript
ui.removeElementById("cpu-text");
```

### `ui.removeElementsByGroup(group)`

Removes all elements in a group.

- **`group`** (`string`): Group name to clear.

#### Example

```javascript
ui.removeElementsByGroup("stats");
```

### `ui.getElementProperty(id, propertyName)`

Reads a property value.

- **`id`** (`string`): Element identifier.
- **`propertyName`** (`string`): Name of the property.

#### Return Value

- **Type**: `any | null | undefined`
- **Description**: Returns `null` if the element is missing; `undefined` if the property does not exist.

#### Example

```javascript
var textValue = ui.getElementProperty("myText", "text");
```

### `ui.beginUpdate()`

Begins a batch UI update. Redraws remain deferred until `ui.endUpdate()` is called.

### `ui.endUpdate()`

Ends the batch and forces a redraw.

