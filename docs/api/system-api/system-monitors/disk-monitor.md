
# Disk Monitor

Monitor disk usage in Novadesk.

The Disk monitor class allows you to monitor disk usage for specific drives or all drives on the system.

::: warning
System monitors are **only available in the Main script**. UI scripts should request monitor data from the main script via [IPC](/api/widget-api/widget-methods#inter-process-communication-ipc).
:::

## Creating a Disk Monitor

```javascript
var disk = new system.disk(options);
```

### Parameters

- **`options`**
  - **Type**: `Object`
  - **Required**: No
  - **Description**: Configuration options for the disk monitor.

- **`drive`**
  - **Type**: `string`
  - **Default**: All drives
  - **Description**: Drive letter to monitor (e.g., "C:", "D:").

## Methods

### stats()

Get current disk statistics.

### Return Value

- **Type**: `Object | Array`
- **Description**: For a single drive monitor, returns an object containing disk statistics:

  - **`drive`**
    - **Type**: `string`
    - **Description**: Drive letter.

  - **`total`**
    - **Type**: `number`
    - **Description**: Total disk space in bytes.

  - **`free`**
    - **Type**: `number`
    - **Description**: Free disk space in bytes.

  - **`used`**
    - **Type**: `number`
    - **Description**: Used disk space in bytes.

  - **`percent`**
    - **Type**: `number`
    - **Description**: Disk usage percentage (0-100).

For an all-drives monitor, returns an array of objects, each containing disk statistics for a drive.

### destroy()

Destroy the disk monitor and free its resources.

## Complete Example

```javascript
// index.js
var cDrive = new system.disk({ drive: "C:" });
var allDisks = new system.disk();  // Monitor all drives

// Update every 1 second (disk info doesn't change as frequently)
var intervalId = setInterval(function () {
    var cStats = cDrive.stats();

    // Convert bytes to GB for display
    var cTotalGB = (cStats.total / (1024 * 1024 * 1024)).toFixed(2);
    var cUsedGB = (cStats.used / (1024 * 1024 * 1024)).toFixed(2);
    var cFreeGB = (cStats.free / (1024 * 1024 * 1024)).toFixed(2);

    console.log("C: Drive - Total: " + cTotalGB + "GB, Used: " + cUsedGB + "GB, Free: " + cFreeGB + "GB (" + cStats.percent + "%)");

    var allStats = allDisks.stats();
    for (var i = 0; i < allStats.length; i++) {
        var drive = allStats[i];
        var totalGB = (drive.total / (1024 * 1024 * 1024)).toFixed(2);
        var usedGB = (drive.used / (1024 * 1024 * 1024)).toFixed(2);
        var freeGB = (drive.free / (1024 * 1024 * 1024)).toFixed(2);

        console.log(drive.drive + " Drive - Total: " + totalGB + "GB, Used: " + usedGB + "GB, Free: " + freeGB + "GB (" + drive.percent + "%)");
    }
}, 1000);

setTimeout(function () {
    clearInterval(intervalId);
    cDrive.destroy();
    allDisks.destroy();
    console.log("Disk Monitor Destroyed");
}, 30000);
```

