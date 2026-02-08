
# Timer Functions
 Timer functions for scheduling code execution in Novadesk


Novadesk provides several timer functions to schedule code execution, similar to those found in browsers and Node.js.

::: warning
Timer functions are **only available in the Main script**. UI scripts should use main script for timing logic and communicate via [IPC](/api/widget-api/widget-methods/#inter-process-communication-ipc).
:::

## **`setTimeout(callback, delay)`**

Execute a function after a specified delay.

###### **`callback`**

* **Type**: `function`
* **Description**: Function to execute after the specified delay.
---

###### **`delay`**

* **Type**: `number`
* **Description**: Delay in milliseconds before the callback is executed.
---

### Return Value

* **Type**: `number`
* **Description**: Timer ID that can be used with `clearTimeout`.
---

### Example

```js
// Execute a function after 3 seconds
var timerId = setTimeout(function() {
  console.log("This runs after 3 seconds");
}, 3000);

// Cancel the timer before it executes
// clearTimeout(timerId);
```

## **`setInterval(callback, interval)`**

Execute a function repeatedly at specified intervals.

###### **`callback`**

* **Type**: `function`
* **Description**: Function to execute repeatedly.
---

###### **`interval`**

* **Type**: `number`
* **Description**: Interval in milliseconds between executions.
---

### Return Value

* **Type**: `number`
* **Description**: Timer ID that can be used with `clearInterval`.
---

### Example

```js
// Execute a function every 2 seconds
var intervalId = setInterval(function() {
  console.log("This runs every 2 seconds");
}, 2000);

// Cancel the interval after 10 seconds
setTimeout(function() {
  clearInterval(intervalId);
  console.log("Interval stopped");
}, 10000);
```

## **`clearTimeout(id)`**

Cancel a timer created with `setTimeout`.

###### **`id`**

* **Type**: `number`
* **Description**: Timer ID returned by `setTimeout`.
---

### Example

```js
var timerId = setTimeout(function() {
  console.log("This will not run");
}, 5000);

// Cancel the timer
clearTimeout(timerId);
console.log("Timer cancelled");
```

## **`clearInterval(id)`**

Cancel a timer created with `setInterval`.

###### **`id`**

* **Type**: `number`
* **Description**: Timer ID returned by `setInterval`.
---

### Example

```js
var intervalId = setInterval(function() {
  console.log("This runs repeatedly");
}, 1000);

// Stop the interval after 5 seconds
setTimeout(function() {
  clearInterval(intervalId);
  console.log("Interval stopped");
}, 5000);
```

## **`setImmediate(callback)`**

Execute a function as soon as possible in the next event loop iteration.

###### **`callback`**

* **Type**: `function`
* **Description**: Function to execute in the next event loop iteration.
---

### Return Value

* **Type**: `number`
* **Description**: ID that can be used to cancel the immediate callback.
---

### Example

```js
console.log("First");

setImmediate(function() {
  console.log("This runs after current execution completes");
});

console.log("Second");

// Output order:
// First
// Second
// This runs after current execution completes
```
