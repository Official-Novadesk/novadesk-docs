---
title: Logging and the print helper
---

# Logging

The global logging system writes messages to the Novadesk log and is accessible from both main and UI scripts.

::: info Note
Global logging writes messages to the Novadesk log and is available in both the [Main](/guides/script-types.html#main-script-the-brain) and [UI](/guides/script-types.html#ui-script-the-face) scripts.
:::

#### Table of Contents
[[toc]]

## `console.log(...args)`

Writes a general log message.

### Parameters

- **`...args`** (`any`): Values to log. Objects are serialized automatically.

### Example

```javascript
console.log("Hello", { key: "value" });
```

**Output**
```text
[TimeStamp] [Novadesk] [LOG] Hello {"key":"value"}
```

## `console.info(...args)`

Writes an informational message.

### Parameters

- **`...args`** (`any`): Values to log.

### Example

```javascript
console.info("Widget loaded successfully");
```

**Output**
```text
[TimeStamp] [Novadesk] [INFO] Widget loaded successfully
```

## `console.warn(...args)`

Writes a warning message.

### Parameters

- **`...args`** (`any`): Values to log.

### Example

```javascript
console.warn("Low memory");
```

**Output**
```text
[TimeStamp] [Novadesk] [WARN] Low memory
```

## `console.error(...args)`

Writes an error message.

### Parameters

- **`...args`** (`any`): Values to log.

### Example

```javascript
console.error("Something went wrong");
```

**Output**
```text
[TimeStamp] [Novadesk] [ERROR] Something went wrong
```

## `console.debug(...args)`

Writes a debug message.

### Parameters

- **`...args`** (`any`): Values to log.

### Example

```javascript
console.debug("tick", { frame: 42 });
```

**Output**
```text
[TimeStamp] [Novadesk] [DEBUG] tick {"frame":42}
```

::: warning Important
`console.debug` will show log only when debugging is enabled.
See the [app.enableDebugging()](/api/modules/novadesk/app.html#app-enabledebugging-enable) method.
:::

## `print(...args)`

Global function alias for `console.log()` and `console.info`.

### Example

```javascript
print("Hello from Novadesk");
```