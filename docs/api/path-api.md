
# Path API
 Utilities for working with file and directory paths in Novadesk


The `path` module provides utilities for working with file and directory paths. It is available globally in both Main and UI scripts.

## `path.join([...paths])`

Joins all given path segments together using the platform-specific separator (`\`), then normalizes the resulting path.

### Example
```javascript
var fullPath = path.join('C:', 'Users', 'John', 'Desktop', 'widget.js');
// Returns: "C:\Users\John\Desktop\widget.js"
```

---

## `path.resolve([...paths])`

Resolves a sequence of paths or path segments into an absolute path.

### Example
```javascript
var absolutePath = path.resolve('data', 'settings.json');
// Returns absolute path relative to the application directory
```

---

## `path.dirname(path)`

Returns the directory name of a path.

### Example
```javascript
var dir = path.dirname('/app/data/file.txt');
// Returns: "/app/data"
```

---

## `path.basename(path[, ext])`

Returns the last portion of a path.

### Example
```javascript
var file = path.basename('/app/data/file.txt');
// Returns: "file.txt"

var name = path.basename('/app/data/file.txt', '.txt');
// Returns: "file"
```

---

## `path.extname(path)`

Returns the extension of the path.

### Example
```javascript
var ext = path.extname('index.html');
// Returns: ".html"
```

---

## `path.parse(path)`

Returns an object whose properties represent significant elements of the path.

### Return Value
An object with: `root`, `dir`, `base`, `ext`, `name`.

### Example
```javascript
var parts = path.parse('C:\\path\\to\\file.txt');
/*
{
  root: 'C:\\',
  dir: 'C:\\path\\to',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
```

---

## `path.isAbsolute(path)`

Determines if a path is an absolute path.

### Example
```javascript
path.isAbsolute("C:\\Users\\Desktop"); // Returns: true
path.isAbsolute("../images/logo.png"); // Returns: false
```

---

## `path.normalize(path)`

Normalizes the given path, resolving `..` and `.` segments and correcting slashes.

### Example
```javascript
var normalized = path.normalize("C:\\Users\\Documents\\..\\Desktop\\.\\widget.js");
// Returns: "C:\Users\Desktop\widget.js"
```

---

## `path.relative(from, to)`

Returns the relative path from `from` to `to` based on the current working directory.

### Example
```javascript
var rel = path.relative("C:\\data\\orandea\\test\\aaa", "C:\\data\\orandea\\impl\\bbb");
// Returns: "..\\..\\impl\\bbb"
```
