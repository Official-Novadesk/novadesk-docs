---
title: Path
description: Path utilities for resolving widget and system directories.
---

# Path

The global `path` object provides Windows-aware file-path utilities modelled after the Node.js `path` module. It is always available with no import needed.

::: info Availability
`path` is a global in both the [Main script](/guides/script-types.html#main-script-the-brain) and the [UI script](/guides/script-types.html#ui-script-the-face). Use it directly without any import.

```javascript
const full = path.join(__dirname, "assets", "icon.png");
```
:::

::: tip Working with `__dirname`
`path` pairs naturally with the [`__dirname`](#path-globals) global. Use `path.join(__dirname, ...)` to build absolute paths relative to the current script — this is the recommended way to reference local assets and config files.
:::

#### Table of Contents
[[toc]]

## Path Globals

These variables are injected into every script automatically. No import is needed.

| Global | Available in | Description |
|---|---|---|
| `__filename` | Main + UI | Absolute path of the currently executing script file. |
| `__dirname` | Main + UI | Directory containing the currently executing script. Equivalent to `path.dirname(__filename)`. |
| `__widgetDir` | Main + UI | The Widgets directory — `<NovadeskDir>/Widgets/`. |
| `__addonsPath` | Main + UI | The Addons directory. See resolution order below. |
| `__mainScriptDirPath` | Main + UI | Directory of the widget's Main script. In the Main script this is the same as `__dirname`. In a UI script it points to the widget root, not the UI script's own folder. |

::: tip `__dirname` in UI scripts
In a UI script, `__dirname` points to the UI script's own directory, not the widget root. If you need to reference a file in the widget root from a UI script, use `__mainScriptDirPath` instead.
:::

**`__addonsPath` resolution order:**
1. If `<NovadeskDir>/Addons/` exists, use it.
2. Else if `<Documents>/Novadesk/Addons/` exists, use it.
3. Otherwise returns the Documents path as a fallback without creating any directories.

## Path Methods

<MethodBox
  name="path.join(...segments)"
  badge="path"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: '...segments', type: 'string', description: 'One or more path segments to join together. Any number of arguments is accepted.' }
  ]"
>
<template #returns>The joined and normalized path string, using backslash as the separator on Windows.</template>

Joins all given path segments together and normalizes the result, collapsing redundant separators and resolving `.` and `..` segments lexically. Both forward slashes and backslashes are accepted as input.

::: warning Absolute segment resets the path
If any segment is an absolute path, all preceding segments are discarded. This matches Node.js behavior: `path.join("C:/a", "D:/b")` returns `"D:/b"`.
:::

<template #example>

```javascript
path.join(__dirname, "assets", "icon.png");
// "C:/Widgets/my-widget/assets/icon.png"

path.join("C:/Users/me", ".", "Desktop");
// "C:/Users/me/Desktop"

path.join("a", "b", "..", "c");
// "a/c"

// No arguments returns "."
path.join();
// "."
```

</template>
</MethodBox>

<MethodBox
  name="path.basename(filePath [, ext])"
  badge="path"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'The file path to extract the last component from.' },
    { name: 'ext', type: 'string', optional: true, description: 'If provided, strips this suffix from the result. The match is case-sensitive.' }
  ]"
>
<template #returns>The last path component. If <code>ext</code> is provided and the basename ends with it, the suffix is removed.</template>

Returns the last portion of a path, typically the filename. Optionally strips a trailing extension.

::: warning Extension stripping is case-sensitive
`path.basename("ui.js", ".js")` returns `"ui"`, but `path.basename("ui.js", ".JS")` returns `"ui.js"` unchanged.
:::

<template #example>

```javascript
path.basename("C:/Widgets/my-widget/ui.js");          // "ui.js"
path.basename("C:/Widgets/my-widget/ui.js", ".js");   // "ui"
path.basename("/widgets/ui.js");                       // "ui.js"
path.basename("/widgets/ui.js", ".js");                // "ui"

// Trailing separator returns empty string
path.basename("C:/Widgets/my-widget/");               // ""

// No argument returns empty string
path.basename();                                       // ""
```

</template>
</MethodBox>

<MethodBox
  name="path.dirname(filePath)"
  badge="path"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'The file path to extract the directory from.' }
  ]"
>
<template #returns>The directory portion of the path. Returns <code>"."</code> when there is no directory part.</template>

Returns the directory portion of a path — everything up to but not including the last component.

<template #example>

```javascript
path.dirname("C:/Widgets/my-widget/ui.js");
// "C:/Widgets/my-widget"

path.dirname("/widgets/ui.js");
// "/widgets"

// No directory part returns "."
path.dirname("index.js");
// "."

// No argument returns "."
path.dirname();
// "."
```

</template>
</MethodBox>

<MethodBox
  name="path.extname(filePath)"
  badge="path"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'The file path to extract the extension from.' }
  ]"
>
<template #returns>The file extension including the leading dot, or an empty string if there is none.</template>

Returns the file extension of the last path component, including the leading dot. When the filename has multiple dots, only the last extension is returned. Dotfiles (e.g. `.gitignore`) have no extension.

<template #example>

```javascript
path.extname("icon.png");        // ".png"
path.extname("index.html");      // ".html"
path.extname("archive.tar.gz");  // ".gz"  (last extension only)
path.extname("README");          // ""
path.extname(".gitignore");      // ""     (dotfiles have no extension)
path.extname("");                // ""
```

</template>
</MethodBox>

<MethodBox
  name="path.isAbsolute(filePath)"
  badge="path"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'The path string to test.' }
  ]"
>
<template #returns><code>true</code> if the path is absolute, <code>false</code> if it is relative or ambiguous.</template>

Returns `true` if the path is absolute. On Windows, a path is considered absolute only when it has both a drive letter and a root separator (e.g. `C:/...`) or is a UNC path. Drive-relative paths like `C:foo` and root-relative paths like `/foo` return `false`.

::: tip Guard against relative paths
Use `path.isAbsolute()` to validate a path before passing it to file APIs that require an absolute path.
:::

<template #example>

```javascript
path.isAbsolute("C:/Widgets/ui.js");  // true
path.isAbsolute("//server/share");    // true  (UNC path)
path.isAbsolute("ui.js");             // false
path.isAbsolute("assets/icon.png");   // false
path.isAbsolute("C:foo");             // false  (drive-relative, not absolute)
path.isAbsolute();                    // false
```

</template>
</MethodBox>

<MethodBox
  name="path.normalize(filePath)"
  badge="path"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'The path to normalize.' }
  ]"
>
<template #returns>The normalized path. Returns <code>"."</code> when called with no arguments.</template>

Normalizes a path by resolving `.` and `..` segments and collapsing redundant separators. Forward slashes in input are converted to backslashes in the output on Windows.

::: warning UNC paths lose the double backslash
Passing a UNC path like `\\server\share\foo` through `normalize` returns `\server\share\foo` (single leading backslash). Avoid running UNC paths through `normalize` if exact preservation is required.
:::

<template #example>

```javascript
path.normalize("C:/Users/me/../Desktop/./widget.js");
// "C:/Users/Desktop/widget.js"

path.normalize("assets//images/icon.png");
// "assets/images/icon.png"

path.normalize("a/b/../c");
// "a/c"

// No argument returns "."
path.normalize();
// "."
```

</template>
</MethodBox>

<MethodBox
  name="path.relative(from, to)"
  badge="path"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'from', type: 'string', description: 'The starting path, typically a directory.' },
    { name: 'to', type: 'string', description: 'The destination path.' }
  ]"
>
<template #returns>The relative path from <code>from</code> to <code>to</code>. Returns an empty string if fewer than two arguments are provided, or if the paths are on different drives.</template>

Computes the relative path from `from` to `to` using pure lexical analysis with no filesystem access. Useful when you need a portable path relative to a known base.

::: warning Different drives return an empty string
If `from` and `to` are on different drive letters (e.g. `C:/` and `D:/`), `path.relative` returns `""`. Always check the result before using it.
:::

<template #example>

```javascript
path.relative(__dirname, path.join(__dirname, "assets", "icon.png"));
// "assets/icon.png"

path.relative("C:/Widgets/a", "C:/Widgets/b/ui.js");
// "../b/ui.js"

// Same path
path.relative("C:/Widgets/a", "C:/Widgets/a");
// "."

// Different drives returns ""
path.relative("C:/a", "D:/b");
// ""
```

</template>
</MethodBox>

<MethodBox
  name="path.parse(filePath)"
  badge="path"
  badgeType="core"
  returns="object"
  :parameters="[
    { name: 'filePath', type: 'string', description: 'The file path to break into components. Required — omitting it throws a TypeError.' }
  ]"
>
<template #returns>An object with <code>root</code>, <code>dir</code>, <code>base</code>, <code>name</code>, and <code>ext</code> string properties.</template>

Breaks a path string into its individual components. This is the inverse of `path.format()`.

| Property | Description | Example for `"C:/Widgets/my-widget/index.js"` |
|---|---|---|
| `root` | Drive root including trailing separator | `"C:/"` |
| `dir` | Full directory path | `"C:/Widgets/my-widget"` |
| `base` | Filename with extension | `"index.js"` |
| `name` | Filename without extension | `"index"` |
| `ext` | Extension including the leading dot | `".js"` |

::: warning Throws if no argument is provided
`path.parse()` with no argument throws `TypeError: path.parse(path) requires path`. All other `path` methods return a safe default instead.
:::

<template #example>

```javascript
const p = path.parse("C:/Widgets/my-widget/index.js");
// {
//   root: "C:/",
//   dir:  "C:/Widgets/my-widget",
//   base: "index.js",
//   name: "index",
//   ext:  ".js"
// }

console.log(p.name);  // "index"
console.log(p.ext);   // ".js"

// Filename only (no directory)
path.parse("index.js");
// { root: "", dir: "", base: "index.js", name: "index", ext: ".js" }

// Dotfile
path.parse(".gitignore");
// { root: "", dir: "", base: ".gitignore", name: ".gitignore", ext: "" }
```

</template>
</MethodBox>

<MethodBox
  name="path.format(pathObject)"
  badge="path"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'pathObject', type: 'object', description: 'An object with any of: dir (string), base (string), name (string), ext (string). All properties are optional.' }
  ]"
>
<template #returns>The assembled path string. Returns an empty string if all properties are absent or empty.</template>

Constructs a path string from an object of components. This is the inverse of `path.parse()`. When `base` is provided it takes priority — `name` and `ext` are only used when `base` is absent or empty.

::: warning Throws if argument is not an object
`path.format()` with no argument, or with a non-object argument, throws `TypeError: path.format(obj) requires object`.
:::

<template #example>

```javascript
// Using base
path.format({ dir: "C:/Widgets/my-widget", base: "index.js" });
// "C:/Widgets/my-widget/index.js"

// Using name + ext (when base is absent)
path.format({ dir: "C:/Widgets/my-widget", name: "index", ext: ".js" });
// "C:/Widgets/my-widget/index.js"

// base takes priority over name + ext
path.format({ dir: "C:/Widgets", base: "app.js", name: "ignored", ext: ".ignored" });
// "C:/Widgets/app.js"

// Round-trip rename with parse
const parts = path.parse("C:/Widgets/my-widget/index.js");
parts.base = "";       // clear base so name + ext are used
parts.name = "ui";
path.format(parts);
// "C:/Widgets/my-widget/ui.js"
```

</template>
</MethodBox>

## Practical Examples

**Building paths to widget assets**

```javascript
const configPath = path.join(__dirname, "config", "config.json");
const iconPath   = path.join(__dirname, "assets", "icon.png");
```

**Extracting file information**

```javascript
const filePath = path.join(__dirname, "ui.js");

const ext  = path.extname(filePath);                           // ".js"
const name = path.basename(filePath, ext);                     // "ui"
const dir  = path.dirname(filePath);                           // widget directory

console.log(`${name} is a ${ext} file in ${dir}`);
```

**Validating a path before use**

```javascript
function loadFile(filePath) {
  if (!path.isAbsolute(filePath)) {
    filePath = path.join(__dirname, filePath);
  }
  return fs.readFile(filePath, "utf8");
}
```

**Referencing the widget root from a UI script**

```javascript
// In a UI script, __dirname is the UI script's own folder.
// Use __mainScriptDirPath to reach the widget root.
const configPath = path.join(__mainScriptDirPath, "config", "config.json");
```

**Changing a file extension**

```javascript
function changeExtension(filePath, newExt) {
  const parts = path.parse(filePath);
  parts.base = "";       // clear base so name + ext are used
  parts.ext  = newExt;
  console.log("Formatted Path:",path.format(parts));
  return path.format(parts);
}

changeExtension(path.join(__dirname, "icon.png"), ".ico");
```
