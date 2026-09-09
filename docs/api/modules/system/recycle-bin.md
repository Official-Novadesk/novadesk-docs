---
title: Access Windows Recycle Bin APIs from the system module.
description: Open, empty, and inspect the Windows Recycle Bin.
---

# recycleBin Module

Interact with the Windows Recycle Bin including opening, emptying, and inspecting contents. Provides programmatic access to standard Windows Recycle Bin operations.

```javascript
import { recycleBin } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="recycleBin.openBin()"
  badge="recycleBin"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> if the request was accepted by the Windows shell, <code>false</code> otherwise.</template>

Opens the Windows Recycle Bin folder in Windows Explorer, allowing users to manually manage deleted files. This provides a convenient way to access the Recycle Bin from your Novadesk widgets.

<template #example>

```javascript
import { recycleBin } from "system";

// Simple open
if (recycleBin.openBin()) {
  console.log("Recycle Bin opened successfully");
} else {
  console.log("Failed to open Recycle Bin");
}

// Integrate with UI button
function onRecycleBinButtonClick() {
  const success = recycleBin.openBin();
  if (success) {
    console.log("Opening Recycle Bin...");
  } else {
    console.error("Unable to access Recycle Bin");
  }
}
```

</template>
</MethodBox>

<MethodBox
  name="recycleBin.emptyBin()"
  badge="recycleBin"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> on success, <code>false</code> otherwise.</template>

Empties the Recycle Bin using standard Windows behavior with confirmation dialog and progress UI. This follows the same flow as right-clicking the Recycle Bin and selecting "Empty Recycle Bin" from the context menu.

The operation will:
- Show a confirmation dialog asking the user to confirm permanent deletion
- Display a progress dialog during the deletion process
- Allow the user to cancel the operation

<template #example>

```javascript
import { recycleBin } from "system";

function emptyRecycleBin() {
  // Get current stats before emptying
  const stats = recycleBin.getStats();
  if (stats && stats.count > 0) {
    console.log("Attempting to empty", stats.count, "items from Recycle Bin");
    
    const success = recycleBin.emptyBin();
    if (success) {
      console.log("Recycle Bin empty operation initiated");
      console.log("User will see confirmation dialog");
    } else {
      console.error("Failed to initiate empty operation");
    }
  } else {
    console.log("Recycle Bin is already empty");
  }
}

// Safe emptying with user feedback
function safeEmptyRecycleBin() {
  const stats = recycleBin.getStats();
  if (!stats || stats.count === 0) {
    console.log("Recycle Bin is empty - nothing to delete");
    return;
  }
  
  console.log("Recycle Bin contains:");
  console.log("- Items:", stats.count);
  console.log("- Size:", (stats.size / 1048576).toFixed(1), "MB");
  
  recycleBin.emptyBin();
}
```

</template>
</MethodBox>

<MethodBox
  name="recycleBin.emptyBinSilent()"
  badge="recycleBin"
  badgeType="core"
  returns="boolean"
>
<template #returns><code>true</code> on success, <code>false</code> otherwise.</template>

Empties the Recycle Bin silently without showing confirmation dialog or progress UI. Files are permanently deleted immediately without user interaction.

::: warning Permanent Deletion
This operation permanently deletes all files in the Recycle Bin without confirmation. Use with extreme caution as deleted files cannot be recovered.
:::

<template #example>

```javascript
import { recycleBin } from "system";

function silentEmpty() {
  // Get stats first for logging
  const stats = recycleBin.getStats();
  if (stats && stats.count > 0) {
    console.log("Silently emptying", stats.count, "items");
    console.log("Total size:", (stats.size / 1048576).toFixed(1), "MB");
    
    const success = recycleBin.emptyBinSilent();
    if (success) {
      console.log("Recycle Bin emptied silently");
    } else {
      console.error("Silent empty operation failed");
    }
  }
}

// Automated cleanup (use carefully!)
function automatedCleanup() {
  const stats = recycleBin.getStats();
  if (!stats) return;
  
  // Only auto-empty if more than 1000 items or > 1GB
  const threshold_items = 1000;
  const threshold_bytes = 1073741824; // 1GB
  
  if (stats.count > threshold_items || stats.size > threshold_bytes) {
    console.log("Automatic cleanup triggered:");
    console.log("Items:", stats.count, "Size:", (stats.size / 1e9).toFixed(2), "GB");
    
    // Use silent empty for automated cleanup
    if (recycleBin.emptyBinSilent()) {
      console.log("Automatic cleanup completed");
    }
  }
}
```

</template>
</MethodBox>

<MethodBox
  name="recycleBin.getStats()"
  badge="recycleBin"
  badgeType="core"
  returns="object | null"
>
<template #returns>An object with <code>count</code> and <code>size</code> properties, or <code>null</code> on failure.</template>

Returns current statistics about Recycle Bin contents including the number of deleted items and their total size in bytes.

The returned object contains these properties:

| Property | Type | Description |
|---|---|---|
| `count` | `number` | Number of items currently in the Recycle Bin |
| `size` | `number` | Total size of all items in bytes |

<template #example>

```javascript
import { recycleBin } from "system";

function checkRecycleBin() {
  const stats = recycleBin.getStats();
  if (stats) {
    console.log("Recycle Bin Status:");
    console.log("- Items:", stats.count);
    console.log("- Size:", (stats.size / 1048576).toFixed(1), "MB");
    
    // Analysis and recommendations
    if (stats.count === 0) {
      console.log("✅ Recycle Bin is empty");
    } else if (stats.count < 10) {
      console.log("📄 Few items in Recycle Bin");
    } else if (stats.count < 100) {
      console.log("📚 Moderate items in Recycle Bin");
    } else {
      console.log("🗂️ Many items in Recycle Bin - consider cleaning");
    }
    
    // Size analysis
    const sizeMB = stats.size / 1048576;
    if (sizeMB > 1000) { // > 1GB
      console.log("⚠️ Large files in Recycle Bin:", sizeMB.toFixed(0), "MB");
    }
    
    return stats;
  } else {
    console.log("❌ Unable to access Recycle Bin statistics");
    return null;
  }
}

// Monitor Recycle Bin growth
let previousCount = 0;
function monitorRecycleBin() {
  const stats = recycleBin.getStats();
  if (stats) {
    if (stats.count > previousCount) {
      const newItems = stats.count - previousCount;
      console.log("📥 New items added to Recycle Bin:", newItems);
    } else if (stats.count < previousCount) {
      const removedItems = previousCount - stats.count;
      console.log("🗑️ Items removed from Recycle Bin:", removedItems);
    }
    previousCount = stats.count;
  }
}

// Check every 30 seconds
setInterval(monitorRecycleBin, 30000);
```

</template>
</MethodBox>

## Recycle Bin Management Examples

### Smart Cleanup System

```javascript
import { recycleBin } from "system";

function createSmartCleanup() {
  const stats = recycleBin.getStats();
  if (!stats) {
    console.log("Cannot access Recycle Bin for cleanup");
    return;
  }
  
  const sizeMB = stats.size / 1048576;
  const sizeGB = stats.size / 1073741824;
  
  console.log("=== Smart Recycle Bin Cleanup ===");
  console.log("Items:", stats.count);
  console.log("Size:", sizeGB > 1 ? sizeGB.toFixed(2) + " GB" : sizeMB.toFixed(1) + " MB");
  
  // Cleanup recommendations
  let recommendation = "none";
  let reason = "";
  
  if (stats.count === 0) {
    recommendation = "none";
    reason = "Recycle Bin is already empty";
  } else if (stats.count > 500) {
    recommendation = "cleanup";
    reason = "Too many items (" + stats.count + ")";
  } else if (sizeGB > 2) {
    recommendation = "cleanup";
    reason = "Large size (" + sizeGB.toFixed(1) + " GB)";
  } else if (stats.count > 100 && sizeGB > 0.5) {
    recommendation = "consider";
    reason = "Moderate usage (" + stats.count + " items, " + sizeGB.toFixed(1) + " GB)";
  }
  
  console.log("Recommendation:", recommendation);
  console.log("Reason:", reason);
  
  // Execute recommendation
  if (recommendation === "cleanup") {
    console.log("Performing automatic cleanup...");
    recycleBin.emptyBinSilent();
  } else if (recommendation === "consider") {
    console.log("Consider manual cleanup through recycleBin.openBin()");
  }
  
  return { stats, recommendation, reason };
}

// Schedule smart cleanup
setInterval(createSmartCleanup, 300000); // Every 5 minutes
```

### Recycle Bin Dashboard Widget

```javascript
import { recycleBin } from "system";

class RecycleBinDashboard {
  constructor() {
    this.updateInterval = null;
    this.lastStats = null;
  }
  
  start() {
    this.update();
    this.updateInterval = setInterval(() => this.update(), 10000);
  }
  
  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
  
  update() {
    const stats = recycleBin.getStats();
    if (!stats) {
      console.log("Recycle Bin: Unavailable");
      return;
    }
    
    // Detect changes
    if (this.lastStats) {
      if (stats.count !== this.lastStats.count) {
        const change = stats.count - this.lastStats.count;
        if (change > 0) {
          console.log("🗑️ +" + change + " item(s) added to Recycle Bin");
        } else {
          console.log("♻️ " + Math.abs(change) + " item(s) removed from Recycle Bin");
        }
      }
    }
    
    this.lastStats = stats;
    this.displayStatus(stats);
  }
  
  displayStatus(stats) {
    const sizeMB = stats.size / 1048576;
    const isEmpty = stats.count === 0;
    
    // Status indicator
    let indicator;
    if (isEmpty) {
      indicator = "🗑️ Empty";
    } else if (stats.count < 10) {
      indicator = "🗑️ Light";
    } else if (stats.count < 100) {
      indicator = "📦 Moderate";
    } else {
      indicator = "📚 Full";
    }
    
    console.log(indicator, 
      "(" + stats.count + " items,", 
      sizeMB.toFixed(1) + " MB)");
  }
  
  // Action methods
  open() {
    return recycleBin.openBin();
  }
  
  empty(silent = false) {
    if (silent) {
      return recycleBin.emptyBinSilent();
    } else {
      return recycleBin.emptyBin();
    }
  }
  
  getRecommendation() {
    const stats = recycleBin.getStats();
    if (!stats || stats.count === 0) {
      return "No action needed - Recycle Bin is empty";
    }
    
    const sizeMB = stats.size / 1048576;
    if (stats.count > 200 || sizeMB > 500) {
      return "Recommend emptying - high usage detected";
    } else if (stats.count > 50 || sizeMB > 100) {
      return "Consider emptying - moderate usage";
    } else {
      return "No action needed - low usage";
    }
  }
}

// Usage
const dashboard = new RecycleBinDashboard();
dashboard.start();

// Example UI integration
console.log("Recycle Bin Recommendation:", dashboard.getRecommendation());
```

**Technical Notes:**

- All operations work with the system-wide Recycle Bin shared by all applications
- The Recycle Bin may contain files from multiple drives/partitions
- Statistics include files deleted by any user or application
- Operations may fail if the Recycle Bin is currently being accessed by other applications
- File permissions and system policies may affect the ability to empty the Recycle Bin
