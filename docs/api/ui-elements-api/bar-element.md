## Example

:::tabs
== index.js
```javascript
var exampleBarWindow = new widgetWindow({
    id: "exampleBar",
    width: 300,
    height: 40,
    backgroundColor:"rgba(255, 255, 255, 1)",
    script: "ui/ui.js",
});
```
== ui/ui.js
```javascript
win.addBar({
    id:"cpu-Bar",
    x:50,
    y:10,
    width:200,
    height:20,
    value:0.5,
    barColor:"rgba(20, 232, 115, 1)",
    solidColor:"rgba(241, 216, 19, 1)",
    solidColorRadius:8,
    barCornerRadius:8
})
```
:::


## Preview

![Widget Preview](https://github.com/Official-Novadesk/novadesk-assets/blob/master/docs/barPreview.png?raw=true)
