---
title: Shared tooltip options for UI elements.
---

# General Tooltip Options
Options that apply to every UI element to control tooltip appearance and behavior.

Use these settings with methods such as `ui.addText()`, `ui.addImage()`, `ui.addButton()`, etc. together with [General Element Options](/api/ui/ui-elements/general-options/general-elements-options).

#### Table of Contents
[[toc]]

## Tooltip Options

### `tooltipText`

- **Type**: `string`
- **Default**: `""`
- **Description**: Tooltip text. Empty string disables the tooltip.

### `tooltipTitle`

- **Type**: `string`
- **Default**: `""`
- **Description**: Bold title displayed above the tooltip text.

### `tooltipIcon`

- **Type**: `string`
- **Default**: `"none"`
- **Description**: Icon next to the title.

#### Valid values

- `"none"`
- `"info"`
- `"warning"`
- `"error"`

### `tooltipBalloon`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Displays the tooltip in a cartoon balloon style.

### `tooltipMaxWidth`

- **Type**: `number`
- **Default**: `1000`
- **Description**: Maximum tooltip width in pixels; text wraps beyond this.

### `tooltipMaxHeight`

- **Type**: `number`
- **Default**: `1000`
- **Description**: Maximum tooltip height hint.

### `tooltipDisabled`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Disables tooltip display for the element even if tooltip text/title is set.

## Behavior Notes

- Tooltip targeting is tracked manually while the mouse moves, improving stability for delayed hover transitions.
- Non-interactive overlays (for example decorative text above a button) no longer steal tooltip focus from underlying interactive elements.
