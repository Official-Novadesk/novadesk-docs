---
title: Read network throughput and totals with the network module.
description: Read network throughput and total data transferred.
---

# network Module

Read real-time network receive/transmit speeds and cumulative traffic totals across all operational network interfaces.

```javascript
import { network } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

::: info Sampling
Network values are sampled and cached internally for approximately 400ms. Very frequent calls may return the same cached sample to optimize performance and reduce system overhead.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="network.rxSpeed()"
  badge="network"
  badgeType="core"
  returns="number"
>
<template #returns>Current receive speed in bytes per second across all operational interfaces. Returns <code>0</code> if unavailable.</template>

Returns the current network download throughput in real-time. This represents the combined receive rate across all active network interfaces including Ethernet, Wi-Fi, and other connections.

<template #example>

```javascript
import { network } from "system";

const rxSpeed = network.rxSpeed();
const rxKBps = (rxSpeed / 1024).toFixed(1);
const rxMBps = (rxSpeed / 1048576).toFixed(2);

console.log("Download speed:", rxKBps, "KB/s");

// For high-speed connections, show in MB/s
if (rxSpeed > 1048576) {
  console.log("Download speed:", rxMBps, "MB/s");
}

// Monitor for high network activity
if (rxSpeed > 10485760) { // > 10 MB/s
  console.log("High download activity detected");
}
```

</template>
</MethodBox>

<MethodBox
  name="network.txSpeed()"
  badge="network"
  badgeType="core"
  returns="number"
>
<template #returns>Current transmit speed in bytes per second across all operational interfaces. Returns <code>0</code> if unavailable.</template>

Returns the current network upload throughput in real-time. This represents the combined transmit rate across all active network interfaces.

<template #example>

```javascript
import { network } from "system";

const txSpeed = network.txSpeed();
const txKBps = (txSpeed / 1024).toFixed(1);

console.log("Upload speed:", txKBps, "KB/s");

// Detect upload activity
if (txSpeed > 1024) { // > 1 KB/s
  console.log("Upload activity detected");
}

// Monitor upload/download ratio for network analysis
const rxSpeed = network.rxSpeed();
if (rxSpeed > 0 && txSpeed > 0) {
  const ratio = (rxSpeed / txSpeed).toFixed(1);
  console.log("Download/Upload ratio:", ratio + ":1");
}
```

</template>
</MethodBox>

<MethodBox
  name="network.bytesReceived()"
  badge="network"
  badgeType="core"
  returns="number"
>
<template #returns>Total bytes received since the last system boot across all operational interfaces. Returns <code>0</code> if unavailable.</template>

Returns the cumulative bytes downloaded since the last system boot. This counter represents all network traffic received by the system across all network interfaces.

<template #example>

```javascript
import { network } from "system";

const totalRx = network.bytesReceived();
const totalRxGB = (totalRx / 1073741824).toFixed(2);

console.log("Total received since boot:", totalRxGB, "GB");

// Data usage monitoring
const dailyLimit = 50 * 1073741824; // 50 GB limit
if (totalRx > dailyLimit) {
  console.warn("High data usage detected:", totalRxGB, "GB");
}

// Calculate average since boot (requires uptime)
const uptimeHours = getSystemUptimeHours(); // Custom function
if (uptimeHours > 0) {
  const avgMBperHour = (totalRx / 1048576 / uptimeHours).toFixed(1);
  console.log("Average download:", avgMBperHour, "MB/hour");
}
```

</template>
</MethodBox>

<MethodBox
  name="network.bytesSent()"
  badge="network"
  badgeType="core"
  returns="number"
>
<template #returns>Total bytes sent since the last system boot across all operational interfaces. Returns <code>0</code> if unavailable.</template>

Returns the cumulative bytes uploaded since the last system boot. This counter represents all network traffic transmitted by the system across all network interfaces.

<template #example>

```javascript
import { network } from "system";

const totalTx = network.bytesSent();
const totalTxGB = (totalTx / 1073741824).toFixed(2);

console.log("Total sent since boot:", totalTxGB, "GB");

// Upload activity analysis
const totalRx = network.bytesReceived();
const uploadRatio = ((totalTx / totalRx) * 100).toFixed(1);
console.log("Upload ratio:", uploadRatio + "% of downloads");

// Detect heavy uploaders
if (totalTx > 10 * 1073741824) { // > 10 GB uploaded
  console.log("Heavy upload activity detected");
}
```

</template>
</MethodBox>

## Network Monitoring Dashboard Example

Complete example demonstrating comprehensive network monitoring with real-time speeds and session totals:

```javascript
import { network } from "system";

function createNetworkDashboard() {
  const KB = 1024;
  const MB = 1048576;
  const GB = 1073741824;
  
  // Get current speeds
  const rxSpeed = network.rxSpeed();
  const txSpeed = network.txSpeed();
  
  // Get session totals
  const totalRx = network.bytesReceived();
  const totalTx = network.bytesSent();
  
  // Format speeds intelligently
  function formatSpeed(bytesPerSec) {
    if (bytesPerSec >= MB) {
      return (bytesPerSec / MB).toFixed(1) + " MB/s";
    } else if (bytesPerSec >= KB) {
      return (bytesPerSec / KB).toFixed(1) + " KB/s";
    } else {
      return bytesPerSec.toFixed(0) + " B/s";
    }
  }
  
  // Format totals
  function formatTotal(bytes) {
    if (bytes >= GB) {
      return (bytes / GB).toFixed(2) + " GB";
    } else if (bytes >= MB) {
      return (bytes / MB).toFixed(1) + " MB";
    } else if (bytes >= KB) {
      return (bytes / KB).toFixed(1) + " KB";
    } else {
      return bytes.toFixed(0) + " bytes";
    }
  }
  
  console.log("=== Network Dashboard ===");
  console.log("Current Activity:");
  console.log("  Download:", formatSpeed(rxSpeed));
  console.log("  Upload:  ", formatSpeed(txSpeed));
  
  console.log("\nSession Totals:");
  console.log("  Received:", formatTotal(totalRx));
  console.log("  Sent:    ", formatTotal(totalTx));
  
  // Activity indicators
  const isActive = rxSpeed > 1024 || txSpeed > 1024; // > 1 KB/s
  console.log("\nStatus:", isActive ? "Active" : "Idle");
  
  // Calculate ratios and patterns
  if (totalRx > 0 && totalTx > 0) {
    const ratio = (totalRx / totalTx).toFixed(1);
    console.log("RX/TX Ratio:", ratio + ":1");
  }
  
  return {
    speeds: { rx: rxSpeed, tx: txSpeed },
    totals: { rx: totalRx, tx: totalTx },
    activity: isActive,
    timestamp: Date.now()
  };
}

// Real-time network monitoring
function startNetworkMonitoring() {
  let previousRx = network.bytesReceived();
  let previousTx = network.bytesSent();
  let lastUpdate = Date.now();
  
  setInterval(() => {
    const currentRx = network.bytesReceived();
    const currentTx = network.bytesSent();
    const now = Date.now();
    
    // Calculate actual transfer rates over time
    const timeDiff = (now - lastUpdate) / 1000; // seconds
    const rxDelta = currentRx - previousRx;
    const txDelta = currentTx - previousTx;
    
    if (timeDiff > 0) {
      const actualRxSpeed = rxDelta / timeDiff;
      const actualTxSpeed = txDelta / timeDiff;
      
      console.log("Measured speeds over", timeDiff.toFixed(1), "seconds:");
      console.log("  RX:", (actualRxSpeed / 1024).toFixed(1), "KB/s");
      console.log("  TX:", (actualTxSpeed / 1024).toFixed(1), "KB/s");
    }
    
    previousRx = currentRx;
    previousTx = currentTx;
    lastUpdate = now;
    
  }, 5000); // Update every 5 seconds
}

// Initialize monitoring
createNetworkDashboard();
startNetworkMonitoring();
```

**Technical Notes:**

- Network statistics include all operational interfaces (Ethernet, Wi-Fi, VPN, etc.)
- Speed measurements are instantaneous and may fluctuate rapidly during network activity
- Session totals reset on system reboot and include all network traffic, not just user applications
- Values represent raw bytes transferred, not application-layer data (includes protocol overhead)
- The 400ms caching helps reduce system load when polling frequently from multiple widgets

**Performance Considerations:**

- Avoid polling network functions more frequently than every 400ms to respect internal caching
- For real-time displays, update intervals of 1-5 seconds provide good responsiveness
- Network counters can overflow on systems with very high traffic over long uptimes
