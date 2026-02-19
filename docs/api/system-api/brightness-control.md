# Brightness Control

Get and set display brightness using the system API.

::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc) if they need system access.
:::

## system.getBrightness([options])

Returns brightness information for a display.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Required**: No
  - **Description**: Optional query options.

- **`display`**
  - **Type**: `number`
  - **Default**: `0`
  - **Description**: Display index to query.

### Return Value

- **Type**: `Object`
- **Description**: Brightness details:
  - **`supported`** (`boolean`): Whether brightness control is supported.
  - **`current`** (`number`): Current raw brightness value.
  - **`min`** (`number`): Minimum raw brightness value.
  - **`max`** (`number`): Maximum raw brightness value.
  - **`percent`** (`number`): Normalized brightness percentage (`0-100`).

## system.setBrightness(options)

Sets brightness for a display.

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Required**: Yes
  - **Description**: Brightness options.

- **`display`**
  - **Type**: `number`
  - **Default**: `0`
  - **Description**: Display index to target.

- **`percent`**
  - **Type**: `number`
  - **Required**: Yes
  - **Description**: Target brightness percentage. Values are clamped to `0-100`.

### Return Value

- **Type**: `boolean`
- **Description**: Returns `true` if brightness was updated successfully; otherwise `false`.

## Example

```javascript
// Read current brightness
var info = system.getBrightness({ display: 0 });
console.log("Brightness supported:", info.supported);
console.log("Brightness percent:", info.percent);

// Set brightness to 60%
var ok = system.setBrightness({ display: 0, percent: 60 });
console.log("Set brightness:", ok);
```
