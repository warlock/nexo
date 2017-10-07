# nexo 2.0
> WORK IN PROGRESS

## For test
```sh
npm i
npm start
```

### Test file in
```
./test/new.html
```

http://nexo.js.gl

### Demo component:
```js
class Kom extends n.Component {
  load () {
    this.setAttributes({
      a: 'b'
    })
  }

  html () {
    return `<b> ${this.tagName}</b><br>
    Attributes recibed: ${JSON.stringify(this.attributes)}
    Children components: ${JSON.stringify(this.children)}`
  }

  ready () {
    console.log(`Component ${this.tagName} is ready!`)
  }
}
```