# Wallpaper

Sets the desktop wallpaper using the system API.

::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc) if they need system access.
:::

## system.setWallpaper(imagePath, [style])

Sets the Windows desktop wallpaper from an image file.

### Parameters

- **`imagePath`**
  - **Type**: `string`
  - **Required**: Yes
  - **Description**: Path to the wallpaper image file. Relative paths are resolved from the current script directory.

- **`style`**
  - **Type**: `string`
  - **Required**: No
  - **Default**: `"fill"`
  - **Description**: Wallpaper display style.
  - **Valid values**:
    - `"fill"`
    - `"fit"`
    - `"stretch"`
    - `"tile"`
    - `"center"`
    - `"span"`

### Return Value

- **Type**: `boolean`
- **Description**: Returns `true` if wallpaper was set successfully; otherwise `false` (for example: invalid file path or invalid style).

## Examples

### Default Style
```javascript
system.setWallpaper("./assets/wallpaper.jpg");
```

### Explicit Style
```javascript
var ok = system.setWallpaper("C:\\Wallpapers\\space.jpg", "span");
console.log("Wallpaper changed:", ok);
```
