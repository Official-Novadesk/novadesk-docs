---
title: Read system audio levels with the AudioLevel addon.
---

# AudioLevel Addon

Read live system audio levels — RMS, peak, and FFT spectrum bands. Ideal for audio meters, visualizers, and reactive widgets.

```javascript
import { addon } from "novadesk";
const audio = addon.load("path/to/AudioLevel.dll");
```

#### Table of Contents
[[toc]]

---

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

Returns current audio level data for the selected audio endpoint. Call this on an interval (e.g. every 50–100ms) to drive a live meter or visualizer.

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `port` | `string` | `"output"` | `"output"` for speakers, `"input"` for microphone. |
| `deviceId` | `string` | `""` | Device ID. Empty string uses the default device. |
| `fftSize` | `number` | `1024` | FFT window size (must be even). Larger = smoother spectrum, slower response. |
| `fftOverlap` | `number` | `512` | Overlap between FFT windows in samples. |
| `bands` | `number` | `10` | Number of frequency bands to return. |
| `freqMin` | `number` | `20.0` | Minimum frequency in Hz. |
| `freqMax` | `number` | `20000.0` | Maximum frequency in Hz. |
| `sensitivity` | `number` | `35.0` | Higher values reduce band output (less sensitive). |
| `rmsAttack` | `number` | `300` | RMS attack smoothing in ms. |
| `rmsDecay` | `number` | `300` | RMS decay smoothing in ms. |
| `peakAttack` | `number` | `50` | Peak attack smoothing in ms. |
| `peakDecay` | `number` | `2500` | Peak decay smoothing in ms. |
| `fftAttack` | `number` | `300` | FFT attack smoothing in ms. |
| `fftDecay` | `number` | `300` | FFT decay smoothing in ms. |
| `rmsGain` | `number` | `1.0` | Gain multiplier for RMS values. |
| `peakGain` | `number` | `1.0` | Gain multiplier for peak values. |

**Return value properties:**

| Property | Type | Description |
|---|---|---|
| `rms` | `number[]` | Per-channel RMS values (index 0 = left, 1 = right). |
| `peak` | `number[]` | Per-channel peak values (index 0 = left, 1 = right). |
| `bands` | `number[]` | Spectrum band levels, length equals the `bands` option. |

<template #example>

```javascript
import { addon } from "novadesk";
const audio = addon.load("path/to/AudioLevel.dll");

// Full options
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
