---
title: Read power and battery status with the power module.
description: Read battery level, charging state, and power status.
---

# power Module

Read comprehensive system power status, battery information, and CPU clock frequencies for laptops and desktop systems.

```javascript
import { power } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="power.getStatus()"
  badge="power"
  badgeType="core"
  returns="object | null"
>
<template #returns>A comprehensive power status object, or <code>null</code> if the status cannot be read.</template>

Returns detailed information about system power status including AC connection, battery state, charge level, estimated runtime, and current CPU frequencies.

The returned object contains these properties:

| Property | Type | Description |
|---|---|---|
| `acline` | `number` | `1` when connected to AC power, `0` when running on battery |
| `status` | `number` | Battery status flags (Win32 `BATTERY_FLAG_*` constants) |
| `status2` | `number` | Additional battery status information |
| `lifetime` | `number` | Estimated remaining battery life in seconds (`-1` if unknown) |
| `percent` | `number` | Battery charge percentage (`0–100`) |
| `mhz` | `number` | Current CPU clock speed in megahertz |
| `hz` | `number` | Current CPU clock speed in hertz |

**Battery Status Flags (`status` property):**

The `status` property contains Win32 battery flags that can be checked using bitwise operations:

| Flag Value | Meaning |
|---|---|
| `1` | High battery level |
| `2` | Low battery level |
| `4` | Critical battery level |
| `8` | Charging |
| `128` | No system battery |
| `255` | Unknown status |

<template #example>

```javascript
import { power } from "system";

const status = power.getStatus();
if (status) {
  // Basic power information
  console.log("AC Power:", status.acline === 1 ? "Connected" : "Battery");
  console.log("Battery:", status.percent + "%");
  console.log("CPU Speed:", status.mhz.toFixed(0), "MHz");
  
  // Battery status analysis
  if (status.acline === 0) { // On battery
    if (status.lifetime > 0) {
      const hours = Math.floor(status.lifetime / 3600);
      const minutes = Math.floor((status.lifetime % 3600) / 60);
      console.log("Estimated runtime:", hours + "h " + minutes + "m");
    }
    
    // Check battery status flags
    const batteryFlags = status.status;
    if (batteryFlags & 4) {
      console.warn("CRITICAL: Battery level is critically low!");
    } else if (batteryFlags & 2) {
      console.warn("Warning: Battery level is low");
    } else if (batteryFlags & 1) {
      console.log("Battery level is good");
    }
    
    if (batteryFlags & 8) {
      console.log("Battery is charging");
    }
  }
  
  // CPU frequency analysis
  if (status.mhz < 1000) {
    console.log("CPU running at low frequency (power saving)");
  } else if (status.mhz > 3000) {
    console.log("CPU running at high frequency (performance mode)");
  }
} else {
  console.log("Power status unavailable");
}
```

</template>
</MethodBox>

## Power Management Examples

### Battery Monitoring and Alerts

```javascript
import { power } from "system";

function monitorBattery() {
  const status = power.getStatus();
  if (!status) {
    console.log("Power monitoring unavailable");
    return null;
  }
  
  const isOnBattery = status.acline === 0;
  const batteryPercent = status.percent;
  const batteryFlags = status.status;
  
  // Create battery status object
  const batteryStatus = {
    onBattery: isOnBattery,
    percent: batteryPercent,
    charging: (batteryFlags & 8) !== 0,
    critical: (batteryFlags & 4) !== 0,
    low: (batteryFlags & 2) !== 0,
    high: (batteryFlags & 1) !== 0,
    estimatedHours: status.lifetime > 0 ? status.lifetime / 3600 : null
  };
  
  // Battery alerts
  if (batteryStatus.onBattery) {
    if (batteryStatus.critical) {
      console.error("🔋 CRITICAL: Battery critically low (" + batteryPercent + "%)");
      // Could trigger system hibernation or emergency save
    } else if (batteryStatus.low) {
      console.warn("🔋 WARNING: Battery low (" + batteryPercent + "%)");
    } else if (batteryPercent <= 20) {
      console.warn("🔋 Battery below 20% (" + batteryPercent + "%)");
    }
    
    if (batteryStatus.estimatedHours !== null) {
      if (batteryStatus.estimatedHours < 0.5) {
        console.warn("⏰ Less than 30 minutes of battery remaining");
      }
    }
  }
  
  // Charging status
  if (batteryStatus.charging) {
    console.log("🔌 Battery charging (" + batteryPercent + "%)");
  }
  
  return batteryStatus;
}

// Monitor battery every 60 seconds
setInterval(() => {
  const battery = monitorBattery();
  if (battery) {
    console.log("Battery check:", new Date().toLocaleTimeString());
  }
}, 60000);
```

### CPU Frequency Monitoring

```javascript
import { power } from "system";

function monitorCpuFrequency() {
  const status = power.getStatus();
  if (!status) return null;
  
  const frequencyMHz = status.mhz;
  const frequencyGHz = frequencyMHz / 1000;
  
  // Determine CPU performance state
  let performanceState;
  if (frequencyMHz < 1000) {
    performanceState = "Power Saving";
  } else if (frequencyMHz < 2000) {
    performanceState = "Balanced";
  } else if (frequencyMHz < 3500) {
    performanceState = "Performance";
  } else {
    performanceState = "Maximum Performance";
  }
  
  console.log("CPU Frequency:", frequencyGHz.toFixed(2), "GHz (" + performanceState + ")");
  
  return {
    mhz: frequencyMHz,
    ghz: frequencyGHz,
    state: performanceState
  };
}

// Track frequency changes
let lastFrequency = 0;
setInterval(() => {
  const cpuInfo = monitorCpuFrequency();
  if (cpuInfo && Math.abs(cpuInfo.mhz - lastFrequency) > 100) {
    console.log("CPU frequency changed:", cpuInfo.ghz.toFixed(2), "GHz");
    lastFrequency = cpuInfo.mhz;
  }
}, 5000);
```

### Complete Power Dashboard

```javascript
import { power } from "system";

function createPowerDashboard() {
  const status = power.getStatus();
  if (!status) {
    console.log("Power information unavailable");
    return null;
  }
  
  const isOnBattery = status.acline === 0;
  const batteryPercent = status.percent;
  const cpuMHz = status.mhz;
  const batteryFlags = status.status;
  
  console.log("=== Power Status Dashboard ===");
  
  // Power source
  console.log("Power Source:", isOnBattery ? "🔋 Battery" : "🔌 AC Adapter");
  
  // Battery details (if applicable)
  if (batteryFlags !== 128) { // Not "No system battery"
    console.log("Battery Level:", batteryPercent + "%");
    
    // Visual battery indicator
    const barLength = 20;
    const filledBars = Math.round((batteryPercent / 100) * barLength);
    const batteryBar = "█".repeat(filledBars) + "░".repeat(barLength - filledBars);
    console.log("Battery Visual: [" + batteryBar + "]");
    
    // Status indicators
    const indicators = [];
    if (batteryFlags & 8) indicators.push("⚡ Charging");
    if (batteryFlags & 4) indicators.push("🚨 Critical");
    else if (batteryFlags & 2) indicators.push("⚠️ Low");
    else if (batteryFlags & 1) indicators.push("✅ Good");
    
    if (indicators.length > 0) {
      console.log("Status:", indicators.join(", "));
    }
    
    // Runtime estimate
    if (isOnBattery && status.lifetime > 0) {
      const hours = Math.floor(status.lifetime / 3600);
      const minutes = Math.floor((status.lifetime % 3600) / 60);
      console.log("Est. Runtime:", hours + "h " + minutes + "m");
    }
  } else {
    console.log("Battery: Not present (Desktop system)");
  }
  
  // CPU frequency
  console.log("CPU Frequency:", (cpuMHz / 1000).toFixed(2), "GHz");
  
  console.log("==========================");
  
  return {
    powerSource: isOnBattery ? "battery" : "ac",
    batteryPercent: batteryPercent,
    cpuFrequency: cpuMHz,
    batteryPresent: batteryFlags !== 128,
    timestamp: Date.now()
  };
}

// Update dashboard every 30 seconds
setInterval(createPowerDashboard, 30000);
createPowerDashboard(); // Initial display
```

**Important Notes:**

- Battery information is only meaningful on systems with batteries (laptops, tablets, UPS-backed systems)
- CPU frequency values reflect current processor speed and may change rapidly based on power management
- Desktop systems typically return `status: 128` indicating no system battery present
- Battery lifetime estimates depend on current power consumption and may be inaccurate
- The `status` and `status2` fields contain Win32-specific battery flags for detailed analysis
