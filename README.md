# nexo
>Lightweight **Javascript** Web Components for Frontend

* https://www.npmjs.com/package/nexo
* https://github.com/warlock/nexo

### Documentation
* [Oficial gitbook](https://warlock.gitbooks.io/nexo)
* [Basic tutorial for Webpack](https://warlock.gitbooks.io/nexo/component-loader.html)
* [Demo with Express and Webpack](https://github.com/warlock/nexoDemo)

### Utils
* Render javascript web components with events
* Reactive model system
* DOM event handler
* Internal Event handler
* Cookies set and get
* Easy for work direcly from browser or build a bundle


### Install
```sh
npm install nexo
```

### Import module for Node.js:
```javascript
const n = require("nexo")
```

### Browser import:
```html
<script src="nexo/nexo.js"></script>
```

### Component demo:
```javascript
n.set({
  name : 'button',
  html : (n, data) => `<b id="click_now">Clickme ${data}!</b>`,
  ready : (n, data) => {
    n.on('#click_now', 'click', () => {
      console.log(`Hi! ${data}`)
    })
  }
})

n.ready(() => {
  n.render('button', 'main_div', 'Now')
})
```

## License
The MIT License (MIT)
Copyright (c) 2015 Josep Subils Rigau (josep@spellbook.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
