
# Global Variables
 Global variables available in Novadesk scripts


Novadesk provide standard global variables that help you work with file paths relative to your script.

## `__dirname`

The absolute path to the directory containing the current script file.

### Example
```javascript
// Load an image from an assets folder next to the script
var imagePath = path.join(__dirname, 'assets', 'icon.png');
win.addImage(imagePath, 10, 10);
```
---

## `__filename`

The absolute path to the current script file.
