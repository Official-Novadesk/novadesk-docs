
# Display Metrics
 Retrieve screen and monitor display metrics in Novadesk


::: warning
The `system` object is **only available in the Main script**. UI scripts should communicate with the main script via [IPC](/api/widget-api/widget-methods/#inter-process-communication-ipc) if they need system data.
:::

## **`system.getDisplayMetrics()`**

Returns detailed information about screen dimensions, work areas, and connected monitors.
---

## Return Value

* **Type**: `Object`
* **Description**:
An object containing structured display data with the following properties.
---

###### **`primary`**

* **Type**: `Object`
* **Description**:
Information about the primary monitor.

- **`workArea`**: The usable desktop area (excluding taskbars, docks, etc.)
- **`screenArea`**: The full screen resolution
---

###### **`virtualScreen`**

* **Type**: `Object`
* **Description**:
Represents the combined desktop space across all monitors.

- **`x`**, **`y`**: Top-left coordinates of the virtual screen
- **`width`**, **`height`**: Total dimensions in pixels
---

###### **`monitors`**

* **Type**: `Array`
* **Description**:
An array of objects describing each connected monitor.

Each monitor object contains:
- **`id`**: Unique identifier for the monitor
- **`workArea`**: Usable desktop area for the monitor
- **`screenArea`**: Full resolution of the monitor
---

### Area Object Structure

Both **`workArea`** and **`screenArea`** objects use the same structure:

- **`x`**, **`y`**: Top-left coordinates
- **`width`**, **`height`**: Dimensions in pixels


### Example

```javascript
// index.js
var metrics = system.getDisplayMetrics();

console.log(
  "Primary screen resolution: " +
  metrics.primary.screenArea.width + "x" +
  metrics.primary.screenArea.height
);
