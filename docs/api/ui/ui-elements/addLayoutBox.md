---
title: ui.addLayoutBox(options)
---

# `ui.addLayoutBox(options)`

Creates a `LayoutBox` container element and optionally adds nested child elements through `children`.

`LayoutBox` supports direct properties (no `style` wrapper required).

#### Table of Contents
[[toc]]

## Parameters

### `options`

- **Type**: `Object`
- **Required**: `id`

### Common Layout Properties

- `id: string` (required)
- `x: number`
- `y: number`
- `width: number`
- `height: number`
- `display: "flex" | "none" | "list-item"` (default: `"flex"`)
- `flexDirection: "row" | "rowreverse" | "column" | "columnreverse"` (default: `"row"`)
- `direction: "ltr" | "rtl"` (default: `"ltr"`)
- `gap: number`
- `padding: number`
- `paddingX: number`
- `paddingY: number`
- `alignItems: "start" | "center" | "end" | "stretch"`
- `justifyContent: "start" | "center" | "end"`

### Visual Properties

- `backgroundColor: string` (color/rgba)
- `borderWidth: number`
- `borderColor: string`
- `borderRadius: number`
- `borderStyle: string | string[]` (default: `"solid"`)
  - A single style string (applies to all sides) or an array of up to 4 styles specifying `[top, right, bottom, left]` (e.g., `["solid", "none", "solid", "none"]`).
  - Supported styles: `"solid"`, `"none"` (or `"hidden"`), `"inset"`, `"outset"`, `"groove"`, `"ridge"`, `"dotted"`, `"double"`.
- `opacity: number` (`0..1` or `0..255`)
- `boxShadow: BoxShadowObject | BoxShadowObject[]`

`BoxShadowObject` keys:
- `x: number` (offset x)
- `y: number` (offset y)
- `blur: number` (blur radius)
- `spread: number` (spread radius; supports negative values)
- `color: string` (rgba/hex supported by Novadesk color parser)
- `inset: boolean` (default `false`)

Note:
- Only object syntax is supported for `boxShadow`.
- String CSS syntax is intentionally not supported.

### Children

- `children: Array<object>`
- Child items should be created with UI builders, for example:
  - `ui.text({...})`
  - `ui.image({...})`
  - `ui.shape({...})`
  - `ui.layoutBox({...})`

## Example

```javascript
ui.addLayoutBox({
  id: "card",
  x: 20, y: 20, width: 280, height: 160,
  flexDirection: "column",
  gap: 8,
  padding: 10,
  alignItems: "start",
  justifyContent: "start",
  backgroundColor: "rgba(30,30,38,0.9)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",
  borderRadius: 10,
  borderStyle: "solid",
  boxShadow: [
    { x: 0, y: 1, blur: 2, spread: 0, color: "rgba(0,0,0,0.10)", inset: false },
    { x: 0, y: 10, blur: 24, spread: -6, color: "rgba(0,0,0,0.25)", inset: false }
  ],
  children: [
    ui.text({ id: "title", x: 0, y: 0, text: "System", fontSize: 16, fontWeight: 700, fontColor: "#fff" }),
    ui.layoutBox({
      id: "row",
      width: 240,
      height: 28,
      flexDirection: "row",
      gap: 6,
      justifyContent: "end",
      alignItems: "center",
      children: [
        ui.text({ id: "cpuLbl", x: 0, y: 0, text: "CPU", fontSize: 13, fontColor: "#cfd3da" }),
        ui.text({ id: "cpuVal", x: 0, y: 0, text: "32%", fontSize: 13, fontColor: "#7fe3a1" })
      ]
    })
  ]
});
```

## `ui.layoutBox(options)`

`ui.layoutBox(options)` is a **builder/helper** version for nested composition.

- It returns a child descriptor object.
- It does **not** render immediately.
- Use it inside the `children` array of `ui.addLayoutBox(...)`.

### Example

```javascript
ui.addLayoutBox({
  id: "root",
  x: 20, y: 20, width: 300, height: 160,
  flexDirection: "column",
  gap: 8,
  children: [
    ui.layoutBox({
      id: "rowA",
      width: 260,
      height: 28,
      flexDirection: "row",
      gap: 6,
      children: [
        ui.text({ id: "t1", x: 0, y: 0, text: "CPU" }),
        ui.text({ id: "t2", x: 0, y: 0, text: "32%" })
      ]
    })
  ]
});
```

## Difference Between `ui.addLayoutBox` and `ui.layoutBox`

- `ui.addLayoutBox(...)`
  - Creates/renders the layout box immediately.
  - Use for top-level/root layout containers.

- `ui.layoutBox(...)`
  - Creates a layout descriptor object only.
  - Use inside `children: [...]` for nested layout trees.

### Rule of Thumb

- Root: `ui.addLayoutBox(...)`
- Nested child in `children`: `ui.layoutBox(...)`

## Notes

- `children` nesting is the recommended way to compose layout trees.
- `parentId` is not used by this API.
