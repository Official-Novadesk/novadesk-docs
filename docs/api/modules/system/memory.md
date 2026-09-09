---
title: Read system memory metrics with the memory module.
description: Read RAM usage, total, and available memory metrics.
---

# memory Module

Read and monitor physical RAM statistics including total installed memory, available memory, used memory, and usage percentages.

```javascript
import { memory } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="memory.totalBytes()"
  badge="memory"
  badgeType="core"
  returns="number"
>
<template #returns>Total physical RAM in bytes. Returns <code>0</code> if unavailable.</template>

Returns the total installed physical memory on the system. This represents the complete amount of RAM hardware installed, regardless of how much is currently in use.

<template #example>

```javascript
import { memory } from "system";

const total = memory.totalBytes();
const totalGB = (total / 1073741824).toFixed(1);
console.log("Total RAM:", totalGB, "GB");

// Check if system has enough memory for demanding tasks
if (total >= 16 * 1073741824) {
  console.log("High-memory system detected");
}
```

</template>
</MethodBox>

<MethodBox
  name="memory.availableBytes()"
  badge="memory"
  badgeType="core"
  returns="number"
>
<template #returns>Available physical RAM in bytes. Returns <code>0</code> if unavailable.</template>

Returns the currently available (free) physical memory that can be allocated immediately by applications without causing system performance issues.

<template #example>

```javascript
import { memory } from "system";

const available = memory.availableBytes();
const availableGB = (available / 1073741824).toFixed(1);
console.log("Available RAM:", availableGB, "GB");

// Monitor low memory conditions
if (available < 1073741824) { // Less than 1GB
  console.warn("Low memory warning: Only", availableGB, "GB available");
}
```

</template>
</MethodBox>

<MethodBox
  name="memory.usedBytes()"
  badge="memory"
  badgeType="core"
  returns="number"
>
<template #returns>Used physical RAM in bytes. Returns <code>0</code> if unavailable.</template>

Returns the currently used physical memory by all processes, system components, and cached data. This includes memory used by the operating system, running applications, and system caches.

<template #example>

```javascript
import { memory } from "system";

const used = memory.usedBytes();
const usedGB = (used / 1073741824).toFixed(1);
console.log("Used RAM:", usedGB, "GB");

// Calculate memory efficiency
const total = memory.totalBytes();
const efficiency = ((used / total) * 100).toFixed(1);
console.log("Memory utilization:", efficiency + "%");
```

</template>
</MethodBox>

<MethodBox
  name="memory.usagePercent()"
  badge="memory"
  badgeType="core"
  returns="number"
>
<template #returns>Memory usage as a percentage in the range <code>0–100</code>. Returns <code>0</code> if unavailable.</template>

Returns current memory usage as a percentage of total installed RAM. This provides a quick way to assess system memory pressure without manual calculations.

<template #example>

```javascript
import { memory } from "system";

const percent = memory.usagePercent();
console.log("RAM usage:", percent + "%");

// Memory pressure indicators
if (percent >= 90) {
  console.error("Critical memory usage!");
} else if (percent >= 75) {
  console.warn("High memory usage");
} else if (percent <= 25) {
  console.info("Low memory usage - system running efficiently");
}
```

</template>
</MethodBox>

## System Memory Monitoring Example

Complete example demonstrating memory monitoring and alerting functionality:

```javascript
import { memory } from "system";

function checkMemoryStatus() {
  const GB = 1073741824;
  
  // Get all memory metrics
  const total = memory.totalBytes();
  const available = memory.availableBytes();
  const used = memory.usedBytes();
  const percent = memory.usagePercent();
  
  // Display formatted results
  console.log("=== Memory Status ===");
  console.log("Total:",     (total / GB).toFixed(1), "GB");
  console.log("Available:", (available / GB).toFixed(1), "GB");
  console.log("Used:",      (used / GB).toFixed(1), "GB");
  console.log("Usage:",     percent + "%");
  
  // Memory health assessment
  let status = "Normal";
  if (percent >= 90) {
    status = "Critical - Consider closing applications";
  } else if (percent >= 75) {
    status = "High - Monitor closely";
  } else if (percent <= 25) {
    status = "Excellent - Plenty available";
  }
  
  console.log("Status:", status);
  
  // Return structured data for further processing
  return {
    totalGB: total / GB,
    availableGB: available / GB,
    usedGB: used / GB,
    percent: percent,
    status: status,
    timestamp: Date.now()
  };
}

// Monitor memory every 30 seconds
setInterval(checkMemoryStatus, 30000);

// Get immediate reading
const currentMemory = checkMemoryStatus();
```

**Important Notes:**

- Memory statistics reflect physical RAM only, not virtual memory or swap files
- Available memory includes memory that can be freed from system caches if needed
- Memory usage can fluctuate rapidly as applications allocate and free memory
- On systems with memory compression, actual usage patterns may vary from reported values
