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
class Kom extends Component {
  constructor (schema) {
    super(schema)
    this.setAttributes({
      a: 'b'
    })
  }

  html () {
    return `Hola ${this.tagName} -> ${JSON.stringify(this.attributes)} -> CHILDREN ${JSON.stringify(this.children)} ...`
  }
}
```