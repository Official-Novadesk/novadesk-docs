---
title: ui Object
---

# ui Object

The `ui` object is available inside every UI script (`.ui.js`) as a local parameter. It is the primary interface for creating and managing all visual elements in a widget.

::: info Availability
`ui` is only available in UI scripts. It is injected as a local parameter at execution time and is accessible inside any callback that closes over it (such as `ipcRenderer.on(...)` handlers).

`setTimeout`, `setInterval`, `clearTimeout`, and `clearInterval` are not available in UI scripts. Schedule time-based work from the Main script and send data via `ipcMain.send()`.
:::

::: warning UI scripts must end with `.ui.js`
The engine only executes files whose name ends in `.ui.js` (e.g. `clock.ui.js`, `script.ui.js`). Any other extension is rejected with an error and the script is not run.
:::

#### Table of Contents
[[toc]]

## Batch Updates

Every `add*`, `setElementProperties`, and `removeElements*` call triggers a redraw by default. When adding or updating many elements at once, wrap the calls in `beginUpdate` / `endUpdate` to defer all redraws to a single pass.

<MethodBox
  name="ui.beginUpdate()"
  badge="ui"
  badgeType="ui"
>

Starts a batched update. All redraws triggered by subsequent `add*`, `setElementProperties`, and `removeElements` calls are suppressed until `ui.endUpdate()` is called.

Calls can be nested. Each `beginUpdate` must be paired with a matching `endUpdate`. The redraw fires when the outermost pair is closed.

<template #example>

```javascript
ui.beginUpdate();

ui.addText({ id: "title", text: "Loading...", x: 16, y: 14 });
ui.addBar({ id: "bar", value: 0, x: 16, y: 40, width: 260, height: 8 });
ui.addShape({ id: "bg", shapeType: "rectangle", x: 0, y: 0, width: 300, height: 200, fillColor: "rgb(20,20,20)" });

ui.endUpdate(); // All three elements rendered at once
```

</template>
</MethodBox>

<MethodBox
  name="ui.endUpdate()"
  badge="ui"
  badgeType="ui"
>

Ends a batched update and triggers a single redraw with all pending changes applied.

<template #example>

```javascript
ui.beginUpdate();
// ... add or update elements ...
ui.endUpdate();
```

</template>
</MethodBox>

## Adding Elements

All `add*` methods take a single options object. Passing no argument or a non-object throws a `TypeError`. Each method links to a dedicated page for the full list of available properties.

<MethodBox
  name="ui.addText(options)"
  badge="ui"
  badgeType="ui"
>

Creates a text element. See [addText Options](/api/ui/ui-elements/addText) for all available properties.

<template #example>

```javascript
ui.addText({
  id: "label",
  text: "Hello Novadesk",
  x: 16, y: 14,
  width: 260, height: 28,
  fontSize: 16,
  fontColor: "rgb(230,230,230)"
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addImage(options)"
  badge="ui"
  badgeType="ui"
>

Adds an image element. Supports local files, HTTP/HTTPS URLs, and 9-slice scaling. See [addImage Options](/api/ui/ui-elements/addImage).

<template #example>

```javascript
ui.addImage({
  id: "logo",
  path: "./assets/logo.png",
  x: 16, y: 16,
  width: 64, height: 64
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addShape(options)"
  badge="ui"
  badgeType="ui"
>

Adds a 2D vector shape. Supported shape types are `"rectangle"`, `"ellipse"`, `"line"`, `"arc"`, `"curve"`, and `"path"`. See [addShape Options](/api/ui/ui-elements/addShape).

<template #example>

```javascript
ui.addShape({
  id: "card",
  shapeType: "rectangle",
  x: 16, y: 16,
  width: 260, height: 80,
  fillColor: "rgba(35,35,35,220)",
  strokeColor: "rgba(255,255,255,40)",
  strokeWidth: 1,
  radiusX: 10, radiusY: 10
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addButton(options)"
  badge="ui"
  badgeType="ui"
>

Adds an image-based button element with a click callback. See [addButton Options](/api/ui/ui-elements/addButton).

<template #example>

```javascript
ui.addButton({
  id: "close-btn",
  buttonImageName: "./assets/close.png",
  x: 360, y: 8,
  width: 24, height: 24,
  onLeftMouseUp: () => ipcRenderer.send("close")
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addInputBox(options)"
  badge="ui"
  badgeType="ui"
>

Creates an interactive text input field. See [addInputBox Options](/api/ui/ui-elements/addInputBox) for all available properties.

<template #example>

```javascript
ui.addInputBox({
  id: "search",
  placeholder: "Type to search...",
  x: 16, y: 50,
  width: 260, height: 36
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addBar(options)"
  badge="ui"
  badgeType="ui"
>

Adds a progress bar element. The `value` property accepts a normalized `0.0–1.0` range. See [addBar Options](/api/ui/ui-elements/addBar).

<template #example>

```javascript
ui.addBar({
  id: "cpu-bar",
  x: 16, y: 60,
  width: 260, height: 8,
  value: 0.65,
  barColor: "rgb(0,180,255)",
  barCornerRadius: 4
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addRoundLine(options)"
  badge="ui"
  badgeType="ui"
>

Adds a rounded arc element for circular progress indicators. See [addRoundLine Options](/api/ui/ui-elements/addRoundLine).

<template #example>

```javascript
ui.addRoundLine({
  id: "cpu-arc",
  x: 60, y: 60,
  width: 120, height: 120,
  value: 0.65,
  lineColor: "rgb(0,180,255)",
  lineColorBg: "rgba(255,255,255,0.1)",
  thickness: 8,
  startAngle: -135,
  totalAngle: 270,
  capType: "round"
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addLine(options)"
  badge="ui"
  badgeType="ui"
>

Adds a scrolling line graph supporting multiple overlaid data series. See [addLine Options](/api/ui/ui-elements/addLine).

<template #example>

```javascript
ui.addLine({
  id: "cpu-line",
  x: 16, y: 80,
  width: 260, height: 60,
  lineColor: "rgb(0,180,255)",
  rangeMin: 0, rangeMax: 100
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addAreaGraph(options)"
  badge="ui"
  badgeType="ui"
>

Adds a filled area graph element. See [addAreaGraph Options](/api/ui/ui-elements/addAreaGraph).

<template #example>

```javascript
ui.addAreaGraph({
  id: "mem-area",
  x: 16, y: 80,
  width: 260, height: 60,
  lineColor: "rgb(0,255,136)",
  fillColor: "rgba(0,255,136,0.15)"
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addHistogram(options)"
  badge="ui"
  badgeType="ui"
>

Adds a bar-by-bar histogram supporting dual-channel data. See [addHistogram Options](/api/ui/ui-elements/addHistogram).

<template #example>

```javascript
ui.addHistogram({
  id: "spectrum",
  x: 16, y: 80,
  width: 260, height: 60,
  primaryColor: "rgb(0,255,136)"
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addBitmap(options)"
  badge="ui"
  badgeType="ui"
>

Adds a frame-based sprite sheet element for meters, digit displays, and sprite animations. See [addBitmap Options](/api/ui/ui-elements/addBitmap).

<template #example>

```javascript
ui.addBitmap({
  id: "digits",
  bitmapImageName: "./assets/digits.png",
  bitmapFrames: 10,
  bitmapExtend: true,
  value: 42
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addRotator(options)"
  badge="ui"
  badgeType="ui"
>

Adds an image-based rotator element for gauge needles and dials. See [addRotator Options](/api/ui/ui-elements/addRotator).

<template #example>

```javascript
ui.addRotator({
  id: "needle",
  rotatorImageName: "./assets/needle.png",
  value: 0.75,
  minValue: 0, maxValue: 1,
  startAngle: -135,
  rotationAngle: 270,
  offsetX: 10, offsetY: 90
});
```

</template>
</MethodBox>

<MethodBox
  name="ui.addLayoutBox(options)"
  badge="ui"
  badgeType="ui"
>

Adds a flex layout container that positions and clips child elements. The `id` property is required. See [addLayoutBox Options](/api/ui/ui-elements/addLayoutBox).

Children are defined as plain objects with an `elementType` property set to the element type name (e.g. `"text"`, `"image"`, `"shape"`, `"bar"`, `"layoutbox"`). Nested layout boxes are supported.

::: tip
`ui.addLayoutBox` always triggers one redraw to finalize layout metadata even inside a `beginUpdate` / `endUpdate` block. This is expected behavior.
:::

<template #example>

```javascript
ui.addLayoutBox({
  id: "card",
  x: 16, y: 16,
  width: 260, height: 80,
  backgroundColor: "rgba(30,30,40,0.9)",
  borderRadius: 8,
  flexDirection: "column",
  gap: 8,
  padding: 12,
  children: [
    { elementType: "text", id: "title", text: "CPU", fontSize: 14, fontColor: "rgb(255,255,255)" },
    { elementType: "bar",  id: "bar",   value: 0.5, barColor: "rgb(0,180,255)", height: 6 }
  ]
});
```

</template>
</MethodBox>

## Updating Elements

<MethodBox
  name="ui.setElementProperties(id, props)"
  badge="ui"
  badgeType="ui"
  :parameters="[
    { name: 'id', type: 'string', description: 'Element identifier.' },
    { name: 'props', type: 'object', description: 'Object of property keys and new values. Only the provided keys are updated.' }
  ]"
>

Updates one or more properties on an existing element. Only the properties included in `props` are changed — all other properties retain their current values.

If no element with the given `id` exists, the call is a silent no-op and returns `undefined`.

<template #example>

```javascript
ui.setElementProperties("label", {
  text: "CPU: 72%",
  fontColor: "rgb(0,180,255)"
});

// Also works for a single property
ui.setElementProperties("cpu-bar", { value: 0.72 });
```

</template>
</MethodBox>

<MethodBox
  name="ui.setElementProperty(id, key, value)"
  badge="ui"
  badgeType="ui"
  :parameters="[
    { name: 'id', type: 'string', description: 'Element identifier.' },
    { name: 'key', type: 'string', description: 'Property name to update.' },
    { name: 'value', type: 'any', description: 'New value for the property.' }
  ]"
>

Updates a single property on an existing element. This is a convenience wrapper around `setElementProperties`.

::: tip Legacy form
`setElementProperty(id, optionsObject)` (two arguments, second is an object) is also accepted and behaves identically to `setElementProperties(id, optionsObject)`.
:::

<template #example>

```javascript
ui.setElementProperty("cpu-bar", "value", 0.75);
ui.setElementProperty("label", "fontColor", "rgb(255,0,0)");
```

</template>
</MethodBox>

<MethodBox
  name="ui.setElementPropertiesByGroup(group, props)"
  badge="ui"
  badgeType="ui"
  :parameters="[
    { name: 'group', type: 'string', description: 'Group name to target.' },
    { name: 'props', type: 'object', description: 'Properties to apply to every element in the group.' }
  ]"
>

Updates every element that shares the given `group` value with the same set of properties in one call. Also available as `ui.setElementPropertyByGroup(group, props)`.

<template #example>

```javascript
// Hide all elements tagged with group: "stats"
ui.setElementPropertiesByGroup("stats", { show: false });

// Update color of all label elements in a group
ui.setElementPropertiesByGroup("labels", { fontColor: "rgb(255,100,100)" });
```

</template>
</MethodBox>

<MethodBox
  name="ui.animate(options)"
  badge="ui"
  badgeType="ui"
>

Animates supported properties of an existing element. Calling `animate` on an element that is already animating replaces the running animation immediately.

Required properties: `id` and either `to` (for a simple transition) or `keyframes` (for keyframe animation). The two are mutually exclusive.

See [animate Options](/api/ui/animate) for the full property reference including all easing functions.

::: warning Throws on missing or invalid options
`animate` throws a `TypeError` if `id` is missing, if the element is not found, if `to` contains no supported properties, or if `keyframes` is malformed.
:::

<template #example>

```javascript
// Simple transition
ui.animate({
  id: "label",
  duration: 400,
  easing: "easeOutCubic",
  to: { x: 100, y: 50 }
});

// Keyframe animation
ui.animate({
  id: "dot",
  duration: 1000,
  easing: "linear",
  iterationCount: "infinite",
  keyframes: [
    { offset: 0,   x: 0 },
    { offset: 0.5, x: 200 },
    { offset: 1,   x: 0 }
  ]
});
```

</template>
</MethodBox>

## Querying Elements

<MethodBox
  name="ui.getElementProperty(id, propertyName)"
  badge="ui"
  badgeType="ui"
  returns="any"
  :parameters="[
    { name: 'id', type: 'string', description: 'Element identifier.' },
    { name: 'propertyName', type: 'string', description: 'Name of the property to read.' }
  ]"
>
<template #returns>The property value if found. Returns <code>null</code> if no element with that ID exists. Returns <code>undefined</code> if the element exists but the property name is not recognized for that element type.</template>

Reads a single property value from an existing element. Throws `TypeError` if fewer than two arguments are provided.

Properties readable on all element types include: `id`, `x`, `y`, `width`, `height`, `show`, `group`, `container`, `rotate`, `antiAlias`, `pixelHitTest`, `backgroundColor`, `backgroundColorRadius`, `bevelType`, `bevelWidth`, `bevelColor`, `bevelColor2`, `padding`, `transformMatrix`, `tooltipText`, and more.

Type-specific readable properties include `text`, `fontSize`, `fontColor`, `value`, `path`, `fillColor`, `strokeColor`, and others depending on element type.

<template #example>

```javascript
// Read text from an input box
const query = ui.getElementProperty("search", "text");
console.log("Search input:", query);

// Check if element is visible
const visible = ui.getElementProperty("panel", "show");

// Returns null if element doesn't exist
const result = ui.getElementProperty("nonexistent", "x");
// result === null
```

</template>
</MethodBox>

<MethodBox
  name="ui.isElementExist(id)"
  badge="ui"
  badgeType="ui"
  returns="boolean"
  :parameters="[
    { name: 'id', type: 'string', description: 'Element identifier to check.' }
  ]"
>
<template #returns><code>true</code> if an element with that ID exists, <code>false</code> otherwise.</template>

Checks whether an element with the given ID currently exists in the widget. Throws `TypeError` if no argument is provided.

<template #example>

```javascript
if (ui.isElementExist("cpu-bar")) {
  ui.setElementProperty("cpu-bar", "value", 0.5);
} else {
  ui.addBar({ id: "cpu-bar", x: 16, y: 60, width: 260, height: 8 });
}
```

</template>
</MethodBox>

## Removing Elements

<MethodBox
  name="ui.removeElementById(id)"
  badge="ui"
  badgeType="ui"
  returns="boolean"
  :parameters="[
    { name: 'id', type: 'string', description: 'ID of the element to remove.' }
  ]"
>
<template #returns><code>true</code> if the element was found and removed, <code>false</code> if no element with that ID exists.</template>

Removes a single element by its ID. Safe to call with an ID that does not exist.

<template #example>

```javascript
const removed = ui.removeElementById("old-label");
if (!removed) {
  console.log("Element did not exist");
}
```

</template>
</MethodBox>

<MethodBox
  name="ui.removeElements(ids)"
  badge="ui"
  badgeType="ui"
  :parameters="[
    { name: 'ids', type: 'string | string[] | null', optional: true, description: 'A single ID string, an array of ID strings, or omitted/null to remove all elements.' }
  ]"
>

Removes one or more elements. The behavior depends on what is passed:

| Argument | Behavior |
|---|---|
| No argument / `null` / `undefined` | Removes **all** elements from the widget |
| `string` | Removes the single element with that ID |
| `string[]` | Removes all elements whose IDs are in the array |

::: warning Calling with no argument clears the entire widget
`ui.removeElements()` with no argument removes every element. Use `ui.removeElementById()` when you intend to target a specific element.
:::

<template #example>

```javascript
// Remove specific elements
ui.removeElements(["img1", "text3"]);

// Remove a single element
ui.removeElements("label");

// Remove everything
ui.removeElements();
```

</template>
</MethodBox>

<MethodBox
  name="ui.removeElementsByGroup(group)"
  badge="ui"
  badgeType="ui"
  :parameters="[
    { name: 'group', type: 'string', description: 'Group name. All elements with this group value are removed.' }
  ]"
>

Removes all elements that share the given `group` value. Throws `TypeError` if no argument is provided.

<template #example>

```javascript
ui.removeElementsByGroup("stats");
```

</template>
</MethodBox>

## Practical Examples

**Building an initial UI layout**

```javascript
ui.beginUpdate();

ui.addShape({
  id: "bg",
  shapeType: "rectangle",
  x: 0, y: 0, width: 300, height: 120,
  fillColor: "rgb(20,20,28)"
});

ui.addText({
  id: "title",
  text: "System Monitor",
  x: 16, y: 12,
  width: 268, height: 24,
  fontSize: 15,
  fontColor: "rgb(230,230,230)"
});

ui.addBar({
  id: "cpu-bar",
  x: 16, y: 48,
  width: 268, height: 8,
  value: 0,
  barColor: "rgb(0,180,255)",
  barCornerRadius: 4
});

ui.addText({
  id: "cpu-label",
  text: "CPU: 0%",
  x: 16, y: 64,
  width: 268, height: 20,
  fontSize: 12,
  fontColor: "rgba(200,200,200,180)"
});

ui.endUpdate();
```

**Updating elements from an IPC message**

```javascript
ipcRenderer.on("stats-update", (event, payload) => {
  ui.beginUpdate();
  ui.setElementProperties("cpu-bar",   { value: payload.cpu / 100 });
  ui.setElementProperties("cpu-label", { text: "CPU: " + payload.cpu + "%" });
  ui.endUpdate();
});
```

**Rebuilding a list on data change**

```javascript
ipcRenderer.on("list-update", (event, payload) => {
  ui.beginUpdate();
  ui.removeElementsByGroup("list-item");

  payload.items.forEach((item, i) => {
    ui.addText({
      id: "item-" + i,
      group: "list-item",
      text: item.label,
      x: 16,
      y: 40 + i * 28,
      width: 268, height: 24,
      fontSize: 13,
      fontColor: "rgb(200,200,200)"
    });
  });

  ui.endUpdate();
});
```

**Conditional element creation**

```javascript
function ensureElement(id) {
  if (!ui.isElementExist(id)) {
    ui.addText({ id, text: "", x: 16, y: 80, width: 268, height: 20, fontSize: 12, fontColor: "rgb(180,180,180)" });
  }
}

ensureElement("status-label");
ui.setElementProperty("status-label", "text", "Ready");
```
