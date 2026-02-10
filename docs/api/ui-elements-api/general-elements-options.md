# General Elements Options

Options available for use with all elements in Novadesk applications.

## Element Options

### id

- **Type**: `string`
- **Required**: `true`
- **Description**: Unique identifier for the elements. If an element with the same ID already exists, it will be **replaced**.

### x, y

- **Type**: `number`
- **Default**: `0`
- **Description**: Specifies the x (horizontal) and y (vertical) position of the element in pixels relative to the top-left edge of the widget.

### width, height

- **Type**: `number`
- **Default**: `auto calculate`
- **Description**: Specifies the width and height of the element in pixels.

### container

- **Type**: `string`
- **Default**: `""`
- **Description**: Assigns the element to a container element by ID. The container element clips and groups its children for rendering and hit-testing.

::: info
- The container element must already exist.
- A container cannot be contained by another container (no nested containers).
- An element cannot be its own container, and container cycles are not allowed.
:::

### backgroundColor

- **Type**: `string`
- **Default**: `""`
- **Description**: Color of the element background. Support both [Solid Color](/guides/colors#solid-colors) and [Gradient Color](/guides/colors#gradients) .

### backgroundColorRadius

- **Type**: `number`
- **Default**: `0`
- **Description**: Sets the corner radius for the element's background in pixels. When greater than 0, this creates rounded corners for the background shape.

### rotate

- **Type**: `number`
- **Default**: `0`
- **Description**: Rotation angle in degrees.

### antiAlias

- **Type**: `boolean`
- **Default**: `true`
- **Description**: If set to `true`, antialiasing (edge smoothing) is used when the element is drawn.

### show

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Controls element visibility. Set to `false` to hide the element without removing it.

### bevelType

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Draws a bevel around the edges of the rectangle defined by `width` and `height`. Controls the visual style of the bevel.

- **Valid values**:
  - `"none"`: No bevel
  - `"raised"`: Raised bevel effect
  - `"sunken"`: Sunken bevel effect
  - `"emboss"`: Embossed effect (3D border)
  - `"pillow"`: Pillow effect (faded inside)

### bevelWidth

- **Type**: `number`
- **Default**: `1`
- **Description**: Sets the width of the bevel in pixels. Optional; defaults to `1` when a `bevelType` is specified.

### bevelColor, bevelColor2

- **Type**: `color string`
- **Default**:
  - `bevelColor`: `"255,255,255,200"`
  - `bevelColor2`: `"0,0,0,150"`
- **Description**: Used when `bevelType` is enabled. Controls the colors applied to the bevel edges.

- **Behavior**:
  - For `raised` and `sunken` bevel types, these colors create highlight and shadow effects.
  - `bevelColor` typically acts as the primary (highlight) color.
  - `bevelColor2` provides the contrasting (shadow) color.

### padding

- **Type**: `number | array`
- **Default**: `0`
- **Description**: Adds padding (in pixels) around the content of the element. The padding area is drawn using the colors defined by `solidColor` and `solidColor2`.

- **Syntax**:
  - `padding: 10`: All sides set to 10px
  - `padding: [horizontal, vertical]`: e.g. `[5, 10]`
  - `padding: [left, top, right, bottom]`: e.g. `[5, 10, 15, 20]`

- **Example**:
```js
padding: [5, 10, 5, 10]
```

### transformMatrix

- **Type**: `array` (6 numbers)
- **Default**: `[]`
- **Description**: A 6-element affine transformation matrix `[m11, m12, m21, m22, dx, dy]`. This allows for advanced 2D transformations including translation, scaling, rotation, and shearing.

- **Matrix Structure**:
`[ ScaleX, SkewY, SkewX, ScaleY, TranslateX, TranslateY ]`

- **Example**:
```javascript
// Skew transformation
transformMatrix: [1, 0.5, 0, 1, 0, 0]
```

## Tooltip Options

Options for displaying tooltips when hovering over the element.

### tooltipText

- **Type**: `string`
- **Default**: `""`
- **Description**: Text to display in the tooltip. If empty, no tooltip is shown.

### tooltipTitle

- **Type**: `string`
- **Default**: `""`
- **Description**: Title text displayed in bold above the tooltip text.

### tooltipIcon

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Icon to display next to the tooltip title.

- **Valid Values**:
  - `"none"`
  - `"info"`
  - `"warning"`
  - `"error"`

### tooltipBalloon

- **Type**: `boolean`
- **Default**: `false`
- **Description**: If `true`, the tooltip is displayed in a cartoon-balloon style.

### tooltipMaxWidth

- **Type**: `number`
- **Default**: `1000`
- **Description**: Maximum width of the tooltip in pixels. Text exceeding this width will wrap to multiple lines.

### tooltipMaxHeight

- **Type**: `number`
- **Default**: `1000`
- **Description**: Maximum height of the tooltip in pixels. This is a hint for the tooltip layout, though actual height is determined by content.

## Mouse Actions

Events that trigger JavaScript functions in response to user interaction.

### onLeftMouseUp, onLeftMouseDown, onLeftDoubleClick

- **Type**: `function`
- **Description**: Events triggered by the left mouse button.
  - `onLeftMouseUp`: Button released
  - `onLeftMouseDown`: Button pressed
  - `onLeftDoubleClick`: Button double-clicked

- **Example**:
```javascript
onLeftMouseUp: function() { console.log("Left click!"); }
```

### onRightMouseUp, onRightMouseDown, onRightDoubleClick

- **Type**: `function`
- **Description**: Events triggered by the right mouse button.
  - `onRightMouseUp`: Button released
  - `onRightMouseDown`: Button pressed
  - `onRightDoubleClick`: Button double-clicked

- **Example**:
```javascript
onRightMouseUp: function() { console.log("Right click!"); }
```

### onMiddleMouseUp, onMiddleMouseDown, onMiddleDoubleClick

- **Type**: `function`
- **Description**: Events triggered by the middle mouse button (scroll wheel click).
  - `onMiddleMouseUp`: Button released
  - `onMiddleMouseDown`: Button pressed
  - `onMiddleDoubleClick`: Button double-clicked

- **Example**:
```javascript
onMiddleMouseUp: function() { console.log("Middle click!"); }
```

### onX1MouseUp, onX1MouseDown, onX1DoubleClick

- **Type**: `function`
- **Description**: Events triggered by the X1 mouse button (usually "Back").

- **Example**:
```javascript
onX1MouseUp: function() { console.log("Back button clicked"); }
```

### onX2MouseUp, onX2MouseDown, onX2DoubleClick

- **Type**: `function`
- **Description**: Events triggered by the X2 mouse button (usually "Forward").

- **Example**:
```javascript
onX2MouseUp: function() { console.log("Forward button clicked"); }
```

### onMouseOver, onMouseLeave

- **Type**: `function`
- **Description**: Events triggered by mouse movement.
  - `onMouseOver`: Cursor enters the element area
  - `onMouseLeave`: Cursor leaves the element area

- **Example**:
```javascript
onMouseOver: function() { console.log("Mouse entered!"); }
```

### onScrollUp, onScrollDown

- **Type**: `function`
- **Description**: Events triggered by vertical scrolling.

- **Example**:
```javascript
onScrollUp: function() { console.log("Scrolled up"); }
```

### onScrollLeft, onScrollRight

- **Type**: `function`
- **Description**: Events triggered by horizontal scrolling.

- **Example**:
```javascript
onScrollLeft: function() { console.log("Scrolled left"); }
```
