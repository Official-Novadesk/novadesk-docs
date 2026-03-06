---
title: File path utilities via the global path object.
---

# Path

The global `path` object provides file-path utilities similar to the Node.js `path` module. It is available in the Main script as a global and also accessible via `require("path")`.

::: info Note
`path` is a global object, no import is needed and is available in both the [Main](/guides/script-types.html#main-script-the-brain) and [UI](/guides/script-types.html#ui-script-the-face) scripts.
:::

#### Table of Contents
[[toc]]

## `path.join(...segments)`

Joins all given segments using the platform separator and normalizes the result.

::: info Note
When using `path.join()` in the [Main script](/guides/script-types.html#main-script-the-brain), the path resolves relative to the widget root, and when using in the [UI script](/guides/script-types.html#ui-script-the-face), the path resolves relative to the script file.
:::
### Parameters

- **`...segments`** (`string`): Path segments to join.

### Return Value

- **Type**: `string`

### Example

```javascript
path.join(__dirname, "assets", "icon.png");
// "C:\\Users\\me\\Widgets\\assets\\icon.png"
```

## `path.basename(filePath [, ext])`

Returns the last portion of a path. Optionally strips a trailing extension.

### Parameters

- **`filePath`** (`string`): The file path.
- **`ext`** (`string`, optional): Extension to remove.

### Return Value

- **Type**: `string`

### Example

```javascript
path.basename("/widgets/ui.js");        // "ui.js"
path.basename("/widgets/ui.js", ".js"); // "ui"
```

## `path.dirname(filePath)`

Returns the directory name of a path.

### Parameters

- **`filePath`** (`string`): The file path.

### Return Value

- **Type**: `string`

### Example

```javascript
path.dirname("/widgets/ui.js"); // "/widgets"
```

## `path.extname(filePath)`

Returns the file extension (including the leading `.`).

### Parameters

- **`filePath`** (`string`): The file path.

### Return Value

- **Type**: `string`

### Example

```javascript
path.extname("icon.png");   // ".png"
path.extname("index.html"); // ".html"
```

## `path.isAbsolute(filePath)`

Returns `true` if the path is absolute.

### Parameters

- **`filePath`** (`string`): The file path.

### Return Value

- **Type**: `boolean`

### Example

```javascript
path.isAbsolute("C:\\widgets\\ui.js"); // true
path.isAbsolute("ui.js");              // false
```

## `path.normalize(filePath)`

Normalizes a path, resolving `..` and `.` segments.

### Parameters

- **`filePath`** (`string`): The file path.

### Return Value

- **Type**: `string`

### Example

```javascript
path.normalize("C:\\Users\\Documents\\..\\Desktop\\.\\widget.js");
// "C:\\Users\\Desktop\\widget.js"
```

## `path.relative(from, to)`

Returns the relative path from `from` to `to`.

### Parameters

- **`from`** (`string`): Start path.
- **`to`** (`string`): Destination path.

### Return Value

- **Type**: `string`

### Example

```javascript
path.relative(__dirname, path.join(__dirname, "ui.js")); // "ui.js"
```

## `path.parse(filePath)`

Returns an object describing the path components.

### Parameters

- **`filePath`** (`string`): The file path.

### Return Value

An object with properties `root`, `dir`, `base`, `ext`, and `name`.

### Example

```javascript
const parsed = path.parse("/widgets/index.js");
// { root: "/", dir: "/widgets", base: "index.js", ext: ".js", name: "index" }
```

## `path.format(pathObject)`

Returns a path string from a path object (inverse of `parse`).

### Parameters

- **`pathObject`** (`object`): An object with optional keys `dir`, `base`, `name`, `ext`.

### Return Value

- **Type**: `string`

### Example

```javascript
path.format({ dir: "/widgets", base: "index.js" }); // "/widgets/index.js"
```