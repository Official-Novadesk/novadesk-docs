---
title: Parse, stringify, read, and write JSON with the json module.
description: Parse, stringify, read, and write JSON files with merge support.
---

# json Module

Work with JSON values and JSON files.

```javascript
import { json } from "system";
```

::: info Availability
Available in the [Main script](/guides/script-types.html#main-script-the-brain) only.
:::

#### Table of Contents
[[toc]]

## Methods

<MethodBox
  name="json.parse(text)"
  badge="json"
  badgeType="core"
  returns="any"
  :parameters="[
    { name: 'text', type: 'string', description: 'JSON source text to parse.' }
  ]"
>
<template #returns>The parsed JavaScript value — object, array, string, number, boolean, or null.</template>

Parses a JSON string into a JavaScript value. Throws if the text is not valid JSON.

<template #example>

```javascript
import { json } from "system";

const obj = json.parse('{"name":"Novadesk","version":1}');
console.log(obj.name);    // "Novadesk"
console.log(obj.version); // 1
```

</template>
</MethodBox>

<MethodBox
  name="json.stringify(value [, space])"
  badge="json"
  badgeType="core"
  returns="string"
  :parameters="[
    { name: 'value', type: 'any', description: 'The JavaScript value to serialize.' },
    { name: 'space', type: 'number | string', optional: true, description: 'Indentation for pretty-printing. Pass a number of spaces or a string.' }
  ]"
>
<template #returns>The JSON-encoded string representation of the value.</template>

Converts a JavaScript value to a JSON string.

<template #example>

```javascript
import { json } from "system";

const s = json.stringify({ name: "Novadesk", ok: true }, 2);
console.log(s);
// {
//   "name": "Novadesk",
//   "ok": true
// }
```

</template>
</MethodBox>

<MethodBox
  name="json.read(path)"
  badge="json"
  badgeType="core"
  returns="object | array | null"
  :parameters="[
    { name: 'path', type: 'string', description: 'Absolute path or path relative to the entry script directory.' }
  ]"
>
<template #returns">The parsed JSON value on success, an empty object <code>{}</code> for empty/whitespace-only files, or <code>null</code> if the file cannot be read or does not exist.</template>

Reads a JSON file from disk and parses it. If the file exists but contains only whitespace, returns an empty object `{}`. Throws if the file exists but contains invalid JSON.

::: info Path Resolution
Paths are resolved relative to the current script directory. If no current script directory is available, falls back to the entry script directory, and finally to the widgets directory.
:::

<template #example>

```javascript
import { json } from "system";

const data = json.read(__dirname + "\\settings.json");
if (data !== null) {
  console.log("theme:", data.theme);
}
```

</template>
</MethodBox>

<MethodBox
  name="json.write(path, value [, merge])"
  badge="json"
  badgeType="core"
  returns="boolean"
  :parameters="[
    { name: 'path', type: 'string', description: 'Absolute path or path relative to the entry script directory.' },
    { name: 'value', type: 'any', description: 'The value to serialize and write.' },
    { name: 'merge', type: 'boolean', optional: true, description: 'false (default) overwrites the file. true applies JSON merge-patch against the existing file.' }
  ]"
>
<template #returns><code>true</code> on success, <code>false</code> on failure.</template>

Writes a value as pretty-printed JSON to a file (indented with 4 spaces). When `merge` is `true`, the existing file is read first and a JSON merge-patch is applied — useful for updating specific fields without overwriting others.

::: info Path Resolution
Paths are resolved relative to the current script directory. If no current script directory is available, falls back to the entry script directory, and finally to the widgets directory.
:::

::: tip JSON Merge Patch
When using `merge: true`, the function performs [JSON Merge Patch (RFC 7396)](https://tools.ietf.org/html/rfc7396) to combine the existing file content with the new value. This allows selective updates of object properties.
:::

<template #example>

```javascript
import { json } from "system";

// Overwrite
json.write(__dirname + "\\settings.json", { theme: "dark", refreshMs: 500 });

// Merge — only updates refreshMs, leaves other fields intact
json.write(__dirname + "\\settings.json", { refreshMs: 1000 }, true);
```

</template>
</MethodBox>
