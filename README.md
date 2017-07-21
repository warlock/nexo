# nexo
> Lightweight **Javascript** Web Components for Frontend

http://nexo.js.gl

### Documentation
* [npm webpage](https://www.npmjs.com/package/nexo)
* [git repository](https://github.com/warlock/nexo)
* [Oficial documentation](https://nexo.js.gl)
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
  html : n => `<button id="click_now">Clickme ${n.data}!</button>`,
  ready : n => {
    n.on('#click_now', 'click', () => {
      console.log(`Hi! ${n.model('name').get()}`)
    })
  }
})

n.ready(() => {
  n.model('name').set('Nexo')
  n.render('button', { element : '#main_div', data : 'Now' })
})
```

## License
The MIT License (MIT)
Copyright (c) 2015 Josep Subils (js@js.gl)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
