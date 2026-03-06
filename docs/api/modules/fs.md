---
title: Read and write files with the fs module
---

# fs Module
Use `fs` for basic file-system operations such as reading/writing files, creating directories, and inspecting file metadata.

```javascript
import * as fs from "fs";
```

::: info Note
`fs` paths support absolute paths and relative paths. Relative paths are resolved from the entry script directory.
:::

::: info Script Context
`fs` is intended for [Main script](/guides/script-types.html#main-script-the-brain) usage.
:::

#### Table of Contents
[[toc]]

## `fs.readFile(path)`

Reads a file as text.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: File path to read.

### Return Value

- **Type**: `string | null`
- **Description**: File content, or `null` if the file could not be opened.

## `fs.writeFile(path, data, [append])`

Writes text to a file.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Target file path.

- **`data`**
  - **Type**: `string`
  - **Description**: Text to write.

- **`append`**
  - **Type**: `boolean`
  - **Required**: No
  - **Default**: `false`
  - **Description**: `true` appends to the file; `false` overwrites it.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if write succeeded; otherwise `false`.

## `fs.exists(path)`

Checks whether a file or directory exists.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Target path.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the path exists; otherwise `false`.

## `fs.mkdir(path, [recursive])`

Creates a directory.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Directory path to create.

- **`recursive`**
  - **Type**: `boolean`
  - **Required**: No
  - **Default**: `true`
  - **Description**: `true` creates intermediate directories if needed.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if the directory exists after the call; otherwise `false`.

## `fs.readdir(path)`

Lists names in a directory.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Directory path.

### Return Value

- **Type**: `string[]`
- **Description**: Array of entry names in that directory.

## `fs.unlink(path)`

Removes a file or an empty directory.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Path to remove.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if removed; otherwise `false`.

## `fs.rename(from, to)`

Renames or moves a file/directory.

### Parameters

- **`from`**
  - **Type**: `string`
  - **Description**: Existing path.

- **`to`**
  - **Type**: `string`
  - **Description**: New path.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if rename succeeded; otherwise `false`.

## `fs.copyFile(from, to, [overwrite])`

Copies a file.

### Parameters

- **`from`**
  - **Type**: `string`
  - **Description**: Source file path.

- **`to`**
  - **Type**: `string`
  - **Description**: Destination file path.

- **`overwrite`**
  - **Type**: `boolean`
  - **Required**: No
  - **Default**: `true`
  - **Description**: Whether to overwrite destination if it already exists.

### Return Value

- **Type**: `boolean`
- **Description**: `true` if copy succeeded; otherwise `false`.

## `fs.stat(path)`

Returns metadata for a file or directory.

### Parameters

- **`path`**
  - **Type**: `string`
  - **Description**: Target path.

### Return Value

- **Type**: `object | null`
- **Description**: Metadata object, or `null` if the path does not exist.

Returned object fields:

- **`isFile`** (`boolean`): `true` when path is a regular file.
- **`isDirectory`** (`boolean`): `true` when path is a directory.
- **`isSymlink`** (`boolean`): `true` when path is a symbolic link.
- **`size`** (`number`): File size in bytes (`0` for directories).
- **`mode`** (`number`): Native permission/mode value.

## Example

```javascript
import * as fs from "fs";

const baseDir = __dirname + "\\tmp_fs_api";
const nestedDir = baseDir + "\\nested\\child";
const fileA = baseDir + "\\a.txt";
const fileB = baseDir + "\\b.txt";
const fileC = baseDir + "\\c.txt";

console.log("mkdir recursive:", fs.mkdir(nestedDir, true));
console.log("writeFile a:", fs.writeFile(fileA, "Hello"));
console.log("append via writeFile:", fs.writeFile(fileA, " World", true));
console.log("readFile a:", fs.readFile(fileA));
console.log("copyFile a->b:", fs.copyFile(fileA, fileB));
console.log("rename b->c:", fs.rename(fileB, fileC));
console.log("readdir baseDir:", JSON.stringify(fs.readdir(baseDir)));
console.log("stat a:", JSON.stringify(fs.stat(fileA)));
console.log("exists c:", fs.exists(fileC));
console.log("unlink a:", fs.unlink(fileA));
console.log("unlink c:", fs.unlink(fileC));
```
