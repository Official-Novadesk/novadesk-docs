---
title: Read system audio levels with the AudioLevel addon.
description: Read system-wide audio levels. For per-app volume control, see [AppVolume](/api/addons/AppVolume) for VU meters and visualizations.
---

# AudioLevel Addon

Read live system audio levels — RMS, peak, and FFT spectrum bands. Ideal for audio meters, visualizers, and reactive widgets.

## What is AudioLevel?

The **AudioLevel** addon captures real-time audio data from your system's speakers or microphone. You can use it to build:

- **Volume meters** — show how loud the current audio output is
- **Audio visualizers** — display frequency spectrum bars that react to music
- **Reactive widgets** — change colors or animations based on sound

It works by using the Windows WASAPI loopback capture feature to tap into whatever audio is currently playing.

## Getting Started

First, load the addon in your script:

```javascript
import { addon } from "novadesk";

// Load the AudioLevel addon DLL
const audio = addon.load("path/to/AudioLevel.dll");
```

::: tip
Replace `"path/to/AudioLevel.dll"` with the actual path to the `AudioLevel.dll` file on your system.
:::

::: info
This API comes from the AudioLevel addon, not the built-in `system` module.
:::

#### Table of Contents
[[toc]]

## Quick Example

Here is a minimal example that reads audio levels every 50ms:

```javascript
import { addon } from "novadesk";
const audio = addon.load("path/to/AudioLevel.dll");

// Poll audio levels every 50ms
setInterval(() => {
  const data = audio.stats({});
  if (data) {
    console.log("Left RMS:", data.rms[0].toFixed(3));
    console.log("Right RMS:", data.rms[1].toFixed(3));
  }
}, 50);
```

<MethodBox
  name="audio.stats(options)"
  badge="AudioLevel"
  badgeType="core"
  returns="object | null"
  :parameters="[
    { name: 'options', type: 'object', description: 'Configuration object. All fields are optional — defaults are used for any omitted option.' }
  ]"
>
<template #returns>An object with <code>rms</code>, <code>peak</code>, and <code>bands</code> arrays, or <code>null</code> if stats cannot be collected.</template>

Returns current audio level data for the selected audio endpoint. Call this on a short interval (e.g. every 50–100ms) to drive a live meter or visualizer.

::: warning
On the first call, the addon initializes the audio capture device, which may take a few milliseconds. Subsequent calls return immediately.
:::

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `port` | `string` | `"output"` | `"output"` for speakers/headphones, `"input"` for microphone. |
| `deviceId` | `string` | `""` | Device ID string. Empty string uses the default device. |
| `fftSize` | `number` | `1024` | FFT window size (must be even). Larger values give smoother spectrum but slower response. |
| `fftOverlap` | `number` | `512` | Overlap between FFT windows in samples. |
| `bands` | `number` | `10` | Number of frequency bands to return. More bands = finer frequency detail. |
| `freqMin` | `number` | `20.0` | Minimum frequency in Hz. |
| `freqMax` | `number` | `20000.0` | Maximum frequency in Hz. |
| `sensitivity` | `number` | `35.0` | Higher values reduce band output (less sensitive). Lower values make the bars jump more. |
| `rmsAttack` | `number` | `300` | RMS attack smoothing in milliseconds. How fast RMS reacts to volume increases. |
| `rmsDecay` | `number` | `300` | RMS decay smoothing in milliseconds. How fast RMS drops when volume decreases. |
| `peakAttack` | `number` | `50` | Peak attack smoothing in milliseconds. |
| `peakDecay` | `number` | `2500` | Peak decay smoothing in milliseconds. Keep this high for a slow-falling peak indicator. |
| `fftAttack` | `number` | `300` | FFT attack smoothing in milliseconds. |
| `fftDecay` | `number` | `300` | FFT decay smoothing in milliseconds. |
| `rmsGain` | `number` | `1.0` | Gain multiplier for RMS values. Increase to amplify the signal. |
| `peakGain` | `number` | `1.0` | Gain multiplier for peak values. |

**Return value properties:**

| Property | Type | Description |
|---|---|---|
| `rms` | `number[]` | Per-channel RMS values (index 0 = left, 1 = right). Range `0.0–1.0`. |
| `peak` | `number[]` | Per-channel peak values (index 0 = left, 1 = right). Range `0.0–1.0`. |
| `bands` | `number[]` | Spectrum band levels. Length equals the `bands` option. Range `0.0–1.0`. |

<template #example>

```javascript
import { addon } from "novadesk";
const audio = addon.load("path/to/AudioLevel.dll");

// Full options — custom FFT size, 20 bands, higher gain
const data = audio.stats({
  port: "output",
  fftSize: 1024,
  bands: 20,
  rmsGain: 1.5
});

if (data) {
  console.log("RMS L/R:", data.rms[0], data.rms[1]);
  console.log("Peak L/R:", data.peak[0], data.peak[1]);
  console.log("Bands:", data.bands);
}

// Minimal — all defaults
const simple = audio.stats({});
if (simple) {
  console.log("RMS left:", simple.rms[0]);
}
```

</template>
</MethodBox>

::: warning
NovaDesk's QuickJS engine supports `console.log`, `console.info`, `console.warn`, `console.error`, and `console.debug`. It does **not** support `console.clear()` or other browser console methods.
:::

## Building a Simple Audio Visualizer

Here is a practical example that displays frequency bands as console bars:

```javascript
import { addon } from "novadesk";
const audio = addon.load("path/to/AudioLevel.dll");

setInterval(() => {
  const data = audio.stats({ bands: 10, rmsGain: 2.0 });
  if (!data) return;

  // Draw a bar for each frequency band
  const bars = data.bands.map(level => {
    const filled = Math.round(level * 20);
    return "█".repeat(filled) + "░".repeat(20 - filled);
  });

  console.log("RMS:", (data.rms[0] * 100).toFixed(0) + "%");
  bars.forEach((bar, i) => console.log(`Band ${i}: ${bar}`));
}, 100);
```
