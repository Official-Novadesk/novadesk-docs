# Containers Guide

Containers let you group elements and clip their rendering and hit-testing to a parent element’s shape. Any element can become a container simply by having children assigned to it.

## How It Works

- Set a child element’s `container` option to the ID of a parent element.
- The parent element becomes a container and will render its children clipped to the parent’s shape.
- Containers cannot be nested. A container cannot itself be contained by another container.

## Rules and Limitations

- The container element must exist before you assign children to it.
- A container cannot reference itself.
- Container cycles are not allowed.
- Nested containers are not supported.

## Basic Example

```javascript
// Parent shape acts as a container
win.addShape({
    id: "card",
    type: "rectangle",
    x: 20,
    y: 20,
    width: 200,
    height: 120,
    radius: 12,
    fillColor: "rgba(30, 30, 30, 1)"
});

// Child elements clipped to the card shape
win.addText({
    id: "title",
    x: 30,
    y: 30,
    width: 180,
    height: 30,
    text: "Container Title",
    fontColor: "rgba(255, 255, 255, 1)",
    container: "card"
});

win.addImage({
    id: "icon",
    x: 30,
    y: 70,
    width: 32,
    height: 32,
    path: "assets/icon.png",
    container: "card"
});
```

## Reassigning or Clearing Containers

You can reassign an element to a different container by updating its `container` property. Use an empty string to remove it from a container.

```javascript
// Move an element to a new container
win.setElementProperties("icon", { container: "card2" });

// Remove from any container
win.setElementProperties("icon", { container: "" });
```

::: tip
- Use shape elements (rectangle, ellipse, path) as containers for custom clipping.
- Keep container shapes visible if you want the clipping boundary to be obvious; set alpha to 0 for invisible masks.
:::