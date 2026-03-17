---
title: Read system audio levels with the AudioLevel addon.
---

# AudioLevel Addon
Read current system audio levels and spectrum bands via the AudioLevel native addon.

Load the addon from a built DLL and access `audioLevel` on the returned object:

```javascript
import { addon } from "novadesk";

const audio = addon.load("D:/Novadesk-Project/AudioLevel/dist/x64/Debug/AudioLevel.dll");
const audioLevel = audio.audioLevel;
```

#### Table of Contents
[[toc]]

## `audioLevel.stats([port, id, fftSize, fftOverlap, bands, freqMin, freqMax, sensitivity, rmsAttack, rmsDecay, peakAttack, peakDecay, fftAttack, fftDecay, rmsGain, peakGain])`

Returns current audio level data for the selected endpoint/device.

### Parameters

All parameters are optional. Pass `undefined` to skip a position and keep the default.

1. `port` (`string`, default `"output"`): `"output"` or `"input"`.
1. `id` (`string`, default `""`): Device ID or empty for default device.
1. `fftSize` (`number`, default `1024`)
1. `fftOverlap` (`number`, default `512`)
1. `bands` (`number`, default `10`)
1. `freqMin` (`number`, default `20.0`)
1. `freqMax` (`number`, default `20000.0`)
1. `sensitivity` (`number`, default `35.0`)
1. `rmsAttack` (`number`, default `300`)
1. `rmsDecay` (`number`, default `300`)
1. `peakAttack` (`number`, default `50`)
1. `peakDecay` (`number`, default `2500`)
1. `fftAttack` (`number`, default `300`)
1. `fftDecay` (`number`, default `300`)
1. `rmsGain` (`number`, default `1.0`)
1. `peakGain` (`number`, default `1.0`)

### Return Value

- **Type**: `object | null`
- **Description**:
  - Returns `null` when audio stats cannot be collected.
  - Returns an object with:
    - **`rms`** (`number[]`): RMS levels for left/right channels (`[left, right]`).
    - **`peak`** (`number[]`): Peak levels for left/right channels (`[left, right]`).
    - **`bands`** (`number[]`): Frequency band levels; array length equals the configured `bands`.

## Example

```javascript
import { addon } from "novadesk";

const audio = addon.load("D:/Novadesk-Project/AudioLevel/dist/x64/Debug/AudioLevel.dll");
const data = audio.audioLevel.stats(
    "output",
    "",
    2048,
    1024,
    12,
    20,
    20000,
    35,
    200,
    300
);

if (data) {
    const left = data.rms[0];
    const right = data.rms[1];
    console.log("RMS L/R", left, right);
    console.log("Bands:", data.bands);
}
```
