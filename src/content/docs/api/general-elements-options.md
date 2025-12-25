---
title: General Elements Options
description: Options available for use with all elements in Novadesk applications.
---
## Options

#### **`id`**

- **type**: `string`
- **Required**: `true`
- **Description**: Unique identifier for the elements.

#### **`x,y`**

- **type**: `number`
- **default**:`0`
- **Description**: Specifies the x (horizontal) and y (vertical) position of the element in pixels relative to the top-left edge of the widget.

#### **`width,height`**

- **type**: `number`
- **default**: `auto calculate`
- **Description**: Specifies the width and height of the element in pixels.

#### **`solidcolor,solidcolor2`**

- **type**: `string`
- **Default**: `""`
- **Description**: Color of the element background. If `SolidColor2` is also specified, the background is a gradient composed of `SolidColor` and `SolidColor2`.

#### **`solidcolorradius`**

- **type**: `number`
- **Default**: `0`
- **Description**: Corner radius for solid color background

#### **`gradientangle`**

- **type**: `number`
- **Default**: `0`
- **Description**: Angle of the gradient in degrees when both `SolidColor` and `SolidColor2` are defined.

#### **`rotate`**

- **type**: `number`
- **Default**: `0`
- **Description**: Rotation angle in degrees

#### **`antialias`**

- **type**: `bool`
- **Default**: `true`
- **Description**: If set to `true`, antialising (edge smoothing) is used when the element is drawn.

#### **`beveltype`**

- **Type**: `number`
- **Default**: `0`
- **Description**:
  - Draws a bevel around the edges of the rectangle defined by `height` and `width`
  - Controls the visual style of the bevel
  - Valid values:
    **0** :  No bevel is applied
    **1** : Raised bevel effect
    **2**: Sunken bevel effect

#### **`bevelcolor, bevelcolor2`**

- **Type**: `string`
- **Default**: `true`
- **Description**:
  - Used when `beveltype` is set to a value other than `0`
  - Controls the colors applied to the bevel edges of the element
  - Behavior depends on the selected `beveltype`:
    - **beveltype = 1**
      - `bevelcolor`
        - Applied to the **top** and **left** edges
      - `bevelcolor2`
        - Applied to the **bottom** and **right** edges
    - **beveltype = 2**
      - `bevelcolor`
        - Applied to the **bottom** and **right** edges
      - `bevelcolor2`
        - Applied to the **top** and **left** edges

#### **`Padding`**

- **Format**: `Left, Top, Right, Bottom`
- **Description**:
  - Adds padding (in pixels) around one or more sides of a meter
  - The meter’s width and height are automatically adjusted to account for the padding
  - The padding area is drawn using the colors defined by:
    - `SolidColor`
    - `SolidColor2`
- **Syntax**:
  - `Padding=Left,Top,Right,Bottom`
- **Example**:
  ```
  Padding=5,10,5,10
  ```

#### **`transformmatrix`**

- **type**: `array`
- **Default**: `[]`
- **Description**: 6-element transformation matrix [a, b, c, d, e, f]

# Mouse Actions

### Mouse Events
- `onleftmouseup`: Executed when left mouse button is released
- `onleftmousedown`: Executed when left mouse button is pressed
- `onleftdoubleclick`: Executed when left mouse button is double-clicked
- `onrightmouseup`: Executed when right mouse button is released
- `onrightmousedown`: Executed when right mouse button is pressed
- `onrightdoubleclick`: Executed when right mouse button is double-clicked
- `onmiddlemouseup`: Executed when middle mouse button is released
- `onmiddlemousedown`: Executed when middle mouse button is pressed
- `onmiddledoubleclick`: Executed when middle mouse button is double-clicked
- `onx1mouseup`, `onx1mousedown`, `onx1doubleclick`: Executed for X1 mouse button (back button)
- `onx2mouseup`, `onx2mousedown`, `onx2doubleclick`: Executed for X2 mouse button (forward button)
- `onmouseover`: Executed when mouse enters the element
- `onmouseleave`: Executed when mouse leaves the element
- `onscrollup`: Executed when mouse wheel scrolls up
- `onscrolldown`: Executed when mouse wheel scrolls down
- `onscrollleft`: Executed when horizontal scroll moves left
- `onscrollright`: Executed when horizontal scroll moves right