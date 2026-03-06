---
title: Timer functions available in Novadesk scripts.
---

# Timer Functions

Timing helpers similar to browsers and Node.js. These functions are registered on the global object and are available in both Main and UI scripts.

::: info Note
`timers` is a global module, no import is needed, and it is available only in [Main script](/guides/script-types.html#main-script-the-brain). It is not available in [UI script](/guides/script-types.html#ui-script-the-face).
:::

#### Table of Contents
[[toc]]

## `setTimeout(callback, delay [, ...args])`

Executes `callback` once after the specified delay.

### Parameters

- **`callback`** (`function`): Function to run after the delay.
- **`delay`** (`number`, optional): Milliseconds to wait before executing. Defaults to `0`. Negative values are clamped to `0`.
- **`...args`** (`any`, optional): Additional arguments passed to `callback` when it fires.

### Return Value

- **Type**: `number`
- **Description**: Timer ID that can be passed to `clearTimeout()` to cancel.

### Example

```javascript
const id = setTimeout(() => {
  console.log("Fired after 3 seconds");
}, 3000);

// With extra arguments
setTimeout((greeting, name) => {
  console.log(greeting, name);
}, 1000, "Hello", "Novadesk");
```

## `setInterval(callback, interval [, ...args])`

Executes `callback` repeatedly at the given interval.

### Parameters

- **`callback`** (`function`): Function to run on each tick.
- **`interval`** (`number`, optional): Milliseconds between executions. Defaults to `0`. Negative values are clamped to `0`.
- **`...args`** (`any`, optional): Additional arguments passed to `callback` on each tick.

### Return Value

- **Type**: `number`
- **Description**: Timer ID that can be passed to `clearInterval()` to cancel.

### Example

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

## `clearTimeout(id)`

Cancels a timeout created with `setTimeout()`.

### Parameters

- **`id`** (`number`): Timer ID returned by `setTimeout()`.

### Example

```javascript
const id = setTimeout(() => {
  console.log("This will not run");
}, 5000);

clearTimeout(id);
```

## `clearInterval(id)`

Cancels an interval created with `setInterval()`.

### Parameters

- **`id`** (`number`): Timer ID returned by `setInterval()`.

### Example

```javascript
const id = setInterval(() => {
  console.log("Repeating");
}, 1000);

setTimeout(() => {
  clearInterval(id);
  console.log("Interval stopped after 5 seconds");
}, 5000);
```