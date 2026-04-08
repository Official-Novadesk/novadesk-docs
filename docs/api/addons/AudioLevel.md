---
title: Read system audio levels with the AudioLevel addon.
---

# AudioLevel Addon

The AudioLevel addon reads live system audio levels (RMS, peak) and FFT spectrum bands. It is ideal for audio meters, visualizers, and reactive widgets.

#### Table of Contents
[[toc]]

## Quick Start

Load the addon DLL and call `stats()` with an options object.

```javascript
import { addon } from "novadesk";

const audio = addon.load("D:/Novadesk-Project/AudioLevel/dist/x64/Debug/AudioLevel.dll");

const data = audio.stats({
  port: "output",
  fftSize: 1024,
  fftOverlap: 512,
  bands: 20,
  rmsGain: 1.0,
  fftAttack: 50,
  fftDecay: 200,
  sensitivity: 60
});

if (data) {
  console.log("RMS:", data.rms);
  console.log("Peak:", data.peak);
  console.log("Bands:", data.bands);
}
```

## `stats(options)`

Returns current audio level data for the selected endpoint/device.

### Options

All fields are optional. If you omit them, defaults are used.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `port` | `string` | `"output"` | Use `"output"` for speakers or `"input"` for microphone. |
| `deviceId` | `string` | `""` | Device ID. Use empty string for default device. |
| `fftSize` | `number` | `1024` | FFT window size. Must be even. Larger = smoother, slower. |
| `fftOverlap` | `number` | `512` | Overlap in samples between FFT windows. |
| `bands` | `number` | `10` | Number of spectrum bands to return. |
| `freqMin` | `number` | `20.0` | Minimum frequency (Hz). |
| `freqMax` | `number` | `20000.0` | Maximum frequency (Hz). |
| `sensitivity` | `number` | `35.0` | Higher values reduce band output (less sensitive). |
| `rmsAttack` | `number` | `300` | RMS attack smoothing in ms. |
| `rmsDecay` | `number` | `300` | RMS decay smoothing in ms. |
| `peakAttack` | `number` | `50` | Peak attack smoothing in ms. |
| `peakDecay` | `number` | `2500` | Peak decay smoothing in ms. |
| `fftAttack` | `number` | `300` | FFT attack smoothing in ms. |
| `fftDecay` | `number` | `300` | FFT decay smoothing in ms. |
| `rmsGain` | `number` | `1.0` | Gain multiplier for RMS values. |
| `peakGain` | `number` | `1.0` | Gain multiplier for Peak values. |

### Return Value

- **Type**: `object | null`
- **Description**:
  - Returns `null` if stats cannot be collected.
  - Returns an object with:
    - `rms`: `number[]` for left/right channel RMS values.
    - `peak`: `number[]` for left/right channel peak values.
    - `bands`: `number[]` of spectrum band levels (length equals `bands`).

## Beginner Tips

- Start with defaults and only adjust `bands` and `fftSize` as needed.
- Use `port: "input"` if you want microphone audio instead of system output.
- If values look too small, try increasing `rmsGain` or `peakGain`.

## Example (Minimal)

```javascript
import { addon } from "novadesk";

const audio = addon.load("D:/Novadesk-Project/AudioLevel/dist/x64/Debug/AudioLevel.dll");
const data = audio.stats({});

if (data) {
  const left = data.rms[0];
  const right = data.rms[1];
  console.log("RMS L/R", left, right);
}
```
