# nexo
>A lightweight framework for creating web components in **Javascript**

https://www.npmjs.com/package/nexo
https://github.com/warlock/nexo

### Documentation
https://warlock.gitbooks.io/nexo/content

### Install
```sh
npm install nexo
```

### Import module for Node.js:
```javascript
var n = require("nexo");
```

### Browser import:
```html
<script src="nexo/nexo.js"></script>
<script>
n.ready(function () {
  console.log("DOM loaded")
})
</script>
```

### Demo:
```javascript
n.set('button', function (comp, data) {
    return '<b id="click_now">Clickme ' + data + '!</b>';
}, function (comp, data) {
    n.on(n.id('click_now'), 'click', function () {
      console.log("Hi!");
    });
});

n.ready(function () {
	n.render('button', 'main_div', 'Now');
});
```

## License
The MIT License (MIT)
Copyright (c) 2015 Josep Subils Rigau (josep@spellbook.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
