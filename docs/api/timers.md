---
title: Timers
---

# Timers

Global timing functions modelled after the browser and Node.js timer APIs. All four functions are available as globals with no import needed.

::: info Availability
Timer functions are globals available in the [Main script](/guides/script-types.html#main-script-the-brain) only. They are **not** available in [UI scripts](/guides/script-types.html#ui-script-the-face) — `setTimeout`, `setInterval`, `clearTimeout`, and `clearInterval` are explicitly set to `undefined` inside UI scripts.
:::

::: tip
Use `setTimeout` for a one-shot delay and `setInterval` for repeating work. Always store the returned ID so you can cancel it with `clearTimeout` or `clearInterval` when the widget is done.
:::

#### Table of Contents
[[toc]]

## Timer Methods

<MethodBox
  name="setTimeout(callback, delay [, ...args])"
  badge="timers"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'callback', type: 'function', description: 'Function to execute after the delay. Required — omitting it throws a TypeError.' },
    { name: 'delay', type: 'number', optional: true, description: 'Milliseconds to wait before executing. Defaults to 0 if omitted. Negative values are clamped to 0.' },
    { name: '...args', type: 'any', optional: true, description: 'Extra arguments forwarded to the callback when it fires.' }
  ]"
>
<template #returns>A numeric timer ID. Pass it to <code>clearTimeout()</code> to cancel before it fires.</template>

Schedules `callback` to run **once** after `delay` milliseconds. The timer is automatically cleaned up when it fires or when the script that registered it is unloaded or refreshed.

::: warning callback is required
If the first argument is missing or not a function, a `TypeError` is thrown. `delay` is optional.
:::

<template #example>

```javascript
// Fire once after 3 seconds
const id = setTimeout(() => {
  console.log("Fired after 3 seconds");
}, 3000);

// Pass extra arguments to the callback
setTimeout((greeting, name) => {
  console.log(greeting, name); // "Hello Novadesk"
}, 1000, "Hello", "Novadesk");

// Cancel before it fires
const cancelId = setTimeout(() => {
  console.log("This will not run");
}, 5000);
clearTimeout(cancelId);

// No delay — runs on the next timer tick
setTimeout(() => {
  console.log("Runs as soon as possible");
});
```

</template>
</MethodBox>

<MethodBox
  name="setInterval(callback, interval [, ...args])"
  badge="timers"
  badgeType="core"
  returns="number"
  :parameters="[
    { name: 'callback', type: 'function', description: 'Function to execute on each tick. Required — omitting it throws a TypeError.' },
    { name: 'interval', type: 'number', optional: true, description: 'Milliseconds between executions. Defaults to 0 if omitted. Negative values are clamped to 0.' },
    { name: '...args', type: 'any', optional: true, description: 'Extra arguments forwarded to the callback on each tick.' }
  ]"
>
<template #returns>A numeric timer ID. Pass it to <code>clearInterval()</code> to stop the repeating calls.</template>

Schedules `callback` to run **repeatedly** every `interval` milliseconds until explicitly stopped with `clearInterval()`.

::: warning Always clear your intervals
Intervals keep running until explicitly stopped. If you do not call `clearInterval()`, the callback continues firing even after a widget reload — accumulating duplicate intervals. Always clear in a `win.on("close", ...)` handler or equivalent.
:::

<template #example>

```javascript
let tick = 0;
const id = setInterval(() => {
  tick += 1;
  console.log("tick", tick);
  if (tick >= 5) {
    clearInterval(id);
    console.log("Interval stopped");
  }
}, 1000);
```

</template>
</MethodBox>

<MethodBox
  name="clearTimeout(id)"
  badge="timers"
  badgeType="core"
  :parameters="[
    { name: 'id', type: 'number', description: 'Timer ID returned by setTimeout(). If the ID is invalid or the timer has already fired, this is a no-op.' }
  ]"
>

Cancels a pending one-shot timer. If the timer has already fired, or the ID is not recognized, calling this is safe and has no effect.

::: tip clearTimeout and clearInterval are interchangeable
Both functions share the same underlying implementation. `clearTimeout` can cancel an interval ID and `clearInterval` can cancel a timeout ID. Using the matching pair is still recommended for clarity.
:::

<template #example>

```javascript
const id = setTimeout(() => {
  console.log("This will not run");
}, 5000);

clearTimeout(id);
```

</template>
</MethodBox>

<MethodBox
  name="clearInterval(id)"
  badge="timers"
  badgeType="core"
  :parameters="[
    { name: 'id', type: 'number', description: 'Timer ID returned by setInterval(). If the ID is invalid or already cleared, this is a no-op.' }
  ]"
>

Stops a repeating interval. If the ID is not recognized or has already been cleared, calling this is safe and has no effect.

<template #example>

```javascript
const id = setInterval(() => {
  console.log("Repeating...");
}, 1000);

// Stop after 5 seconds
setTimeout(() => {
  clearInterval(id);
  console.log("Interval stopped");
}, 5000);
```

</template>
</MethodBox>

## Behavior and Lifecycle

**Delay clamping.** Any delay or interval value less than `0` is clamped to `0`. Passing `0` schedules the callback to run on the next available timer tick (as soon as the message loop processes it), not synchronously.

**Timer IDs.** IDs are integers starting from `50000` and incrementing. They are unique within the current Novadesk session.

**Automatic cleanup.** When a script is unloaded or refreshed, all timers registered by that script are automatically cancelled and freed. You do not need to cancel every timer on exit, but it is good practice to do so in a `win.on("close", ...)` handler to avoid any timing edge cases during hot-reload.

**Extra arguments.** Any arguments passed after `delay` or `interval` are stored and forwarded to the callback each time it fires. This works the same for both `setTimeout` and `setInterval`.

**Exceptions in callbacks.** If a timer callback throws an exception, the error is logged and execution continues normally. For `setInterval`, the interval keeps running even if one tick throws.

**Not available in UI scripts.** `setTimeout`, `setInterval`, `clearTimeout`, and `clearInterval` are all set to `undefined` inside UI scripts. Schedule time-based work from the Main script and send results to the UI via `ipcMain.send()`.

## Practical Examples

**Update a display every second**

```javascript
import { widgetWindow } from "novadesk";

const win = new widgetWindow({
  id: "clock",
  width: 300,
  height: 80,
  script: "ui/clock.ui.js"
});

const id = setInterval(() => {
  const now = new Date().toLocaleTimeString();
  ipcMain.send("tick", { time: now });
}, 1000);

win.on("close", () => {
  clearInterval(id);
});
```

**Run something once after startup**

```javascript
setTimeout(() => {
  console.log("Widget finished loading");
  ipcMain.send("ready", { ts: Date.now() });
}, 500);
```

**Retry with a delay**

```javascript
let attempts = 0;

function tryFetch() {
  attempts += 1;
  console.log("Attempt", attempts);

  // Simulate a failed fetch
  const success = false;

  if (!success && attempts < 3) {
    setTimeout(tryFetch, 2000);
  } else {
    console.log("Done after", attempts, "attempt(s)");
  }
}

tryFetch();
```

**Clear all timers on widget close**

```javascript
import { widgetWindow } from "novadesk";

const win = new widgetWindow({ id: "demo", width: 300, height: 200 });

const intervalId = setInterval(() => {
  ipcMain.send("update");
}, 1000);

const timeoutId = setTimeout(() => {
  console.log("Initial delay done");
}, 500);

win.on("close", () => {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
});
```
