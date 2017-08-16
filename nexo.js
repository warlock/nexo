(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["n"] = factory();
	else
		root["n"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.stringIncludes = stringIncludes;
exports.isRealNaN = isRealNaN;
exports.arrayIncludes = arrayIncludes;
/*
  We don't want to include babel-polyfill in our project.
    - Library authors should be using babel-runtime for non-global polyfilling
    - Adding babel-polyfill/-runtime increases bundle size significantly

  We will include our polyfill instance methods as regular functions.
*/

function startsWith(str, searchString, position) {
  return str.substr(position || 0, searchString.length) === searchString;
}

function endsWith(str, searchString, position) {
  var index = (position || str.length) - searchString.length;
  var lastIndex = str.lastIndexOf(searchString, index);
  return lastIndex !== -1 && lastIndex === index;
}

function stringIncludes(str, searchString, position) {
  return str.indexOf(searchString, position || 0) !== -1;
}

function isRealNaN(x) {
  return typeof x === 'number' && isNaN(x);
}

function arrayIncludes(array, searchElement, position) {
  var len = array.length;
  if (len === 0) return false;

  var lookupIndex = position | 0;
  var isNaNElement = isRealNaN(searchElement);
  var searchIndex = lookupIndex >= 0 ? lookupIndex : len + lookupIndex;
  while (searchIndex < len) {
    var element = array[searchIndex++];
    if (element === searchElement) return true;
    if (isNaNElement && isRealNaN(element)) return true;
  }

  return false;
}
//# sourceMappingURL=compat.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const tojson = __webpack_require__(2)
const tohtml = __webpack_require__(6).toHTML
const cookies = __webpack_require__(9)
const params = __webpack_require__(10)

const n = {
  cookies: cookies,
  params: params,
  router: {
    actual: {},
    options: { url : 'force' },
    get (value) {
      n.router.actual = value
    },
    set (value) {
      n.router.data = value
    },
    data: {
      ruta1: { name: 'list' },
      ruta2: { name: 'user', attr: {  } }
    }
  },
  stack: [],
  components: {
    router: {
      html: () => {
        return ``
      },
      attr: {
        nom: 'josep'
      }
    }
  },
  state: {},
  schema: '',
  stack: [],
  set (name, value) {
    if (value !== n.state[name]) {
      n.state[name] = value
      n.done()
    }
  },
  makeAttr (name, attrs) {
    var accAttr = Object.assign({}, n.components[name].attr)
    Object.keys(attrs).forEach(attr => {
      accAttr[attr] = attrs[attr]
    })
    return accAttr
  },
  render (element) {
    if (Array.isArray(element)) {
      return element.map(n.render)
    } else {
      if (element.type === 'Element' && undefined !== n.components[element.tagName]) {
        if (undefined !== n.components[element.tagName].load) n.components[element.tagName].load(n, n.makeAttr(element.tagName, element.attributes))
        const htmlSchema = n.components[element.tagName].html(n.state, n.makeAttr(element.tagName, element.attributes))
        const jsonSchema = tojson.parse(htmlSchema)
        if (undefined !== jsonSchema.children && jsonSchema.children.length > 0) jsonSchema.children = n.render(jsonSchema.children)
        const loop = n.render(jsonSchema)
        if (undefined !== n.components[element.tagName].ready) n.stack.push({
          name: element.tagName,
          attributes: n.makeAttr(element.tagName, element.attributes)
        })
        return {
          type:"Element",
          tagName:"div",
          attributes: n.makeAttr(element.tagName, element.attributes),
          children: loop
        }
      } else return element
    }
  },
  done () {
    const newSchema = n.render(n.schema)
    const htmlSchema = tohtml(newSchema)
    n.main.innerHTML = htmlSchema
  },
  start () {
    document.addEventListener('DOMContentLoaded', () => {
      n.main = document.getElementById('main')
      const main = n.main.innerHTML
      n.schema = tojson.parse(main)
      n.done()
    
      while (n.stack.length > 0) {
        const ready = n.stack.shift()
        console.log(ready.name)
        n.components[ready.name].ready(n, ready.attributes)
      }
    })
  }
}

n.start()

module.exports = n


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDefaults = undefined;
exports.parse = parse;

var _lexer = __webpack_require__(3);

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = __webpack_require__(4);

var _parser2 = _interopRequireDefault(_parser);

var _v = __webpack_require__(5);

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Tags which contain arbitrary non-parsed content
  For example: <script> JavaScript should not be parsed
*/
var childlessTags = ['style', 'script', 'template'];

/*
  Tags which auto-close because they cannot be nested
  For example: <p>Outer<p>Inner is <p>Outer</p><p>Inner</p>
*/
var closingTags = ['html', 'head', 'body', 'p', 'dt', 'dd', 'li', 'option', 'thead', 'th', 'tbody', 'tr', 'td', 'tfoot', 'colgroup'];

/*
  Closing tags which have ancestor tags which
  may exist within them which prevent the
  closing tag from auto-closing.
  For example: in <li><ul><li></ul></li>,
  the top-level <li> should not auto-close.
*/
var closingTagAncestorBreakers = {
  li: ['ul', 'ol', 'menu'],
  dt: ['dl'],
  dd: ['dl']
};

/*
  Tags which do not need the closing tag
  For example: <img> does not need </img>
*/
var voidTags = ['!doctype', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var parseDefaults = exports.parseDefaults = {
  voidTags: voidTags,
  closingTags: closingTags,
  closingTagAncestorBreakers: closingTagAncestorBreakers,
  childlessTags: childlessTags,
  format: _v2.default // transform for v0 spec
};

function parse(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;

  var tokens = (0, _lexer2.default)(str, options);
  var nodes = (0, _parser2.default)(tokens, options);
  return (0, _v2.default)(nodes, options);
}

exports.default = { parse: parse, parseDefaults: parseDefaults };
//# sourceMappingURL=index.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lexer;
exports.lex = lex;
exports.lexText = lexText;
exports.lexComment = lexComment;
exports.lexTag = lexTag;
exports.isWhitespaceChar = isWhitespaceChar;
exports.lexTagName = lexTagName;
exports.lexTagAttributes = lexTagAttributes;
exports.lexSkipTag = lexSkipTag;

var _compat = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function lexer(str, options) {
  var state = { str: str, options: options, cursor: 0, tokens: [] };
  lex(state);
  return state.tokens;
}

function lex(state) {
  var str = state.str;

  var len = str.length;
  while (state.cursor < len) {
    var isText = str.charAt(state.cursor) !== '<';
    if (isText) {
      lexText(state);
      continue;
    }

    var isComment = (0, _compat.startsWith)(str, '!--', state.cursor + 1);
    if (isComment) {
      lexComment(state);
      continue;
    }

    var tagName = lexTag(state);
    if (tagName) {
      var safeTag = tagName.toLowerCase();
      var childlessTags = state.options.childlessTags;

      if ((0, _compat.arrayIncludes)(childlessTags, safeTag)) {
        lexSkipTag(tagName, state);
      }
    }
  }
}

function lexText(state) {
  var str = state.str,
      cursor = state.cursor;

  var textEnd = str.indexOf('<', cursor);
  var type = 'text';
  if (textEnd === -1) {
    // there is only text left
    var _content = str.slice(cursor);
    state.cursor = str.length;
    state.tokens.push({ type: type, content: _content });
    return;
  }

  if (textEnd === cursor) return;

  var content = str.slice(cursor, textEnd);
  state.cursor = textEnd;
  state.tokens.push({ type: type, content: content });
}

function lexComment(state) {
  state.cursor += 4; // "<!--".length
  var str = state.str,
      cursor = state.cursor;

  var commentEnd = str.indexOf('-->', cursor);
  var type = 'comment';
  if (commentEnd === -1) {
    // there is only the comment left
    var _content2 = str.slice(cursor);
    state.cursor = str.length;
    state.tokens.push({ type: type, content: _content2 });
    return;
  }

  var content = str.slice(cursor, commentEnd);
  state.cursor = commentEnd + 3; // "-->".length
  state.tokens.push({ type: type, content: content });
}

function lexTag(state) {
  var str = state.str;

  {
    var secondChar = str.charAt(state.cursor + 1);
    var close = secondChar === '/';
    state.tokens.push({ type: 'tag-start', close: close });
    state.cursor += close ? 2 : 1;
  }
  var tagName = lexTagName(state);
  lexTagAttributes(state);
  {
    var firstChar = str.charAt(state.cursor);
    var _close = firstChar === '/';
    state.tokens.push({ type: 'tag-end', close: _close });
    state.cursor += _close ? 2 : 1;
  }
  return tagName;
}

// There is one regex for whitespace.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
var whitespace = /\s/;
function isWhitespaceChar(char) {
  return whitespace.test(char);
}

function lexTagName(state) {
  var str = state.str,
      cursor = state.cursor;

  var len = str.length;
  var start = cursor;
  while (start < len) {
    var char = str.charAt(start);
    var isTagChar = !(isWhitespaceChar(char) || char === '/' || char === '>');
    if (isTagChar) break;
    start++;
  }

  var end = start + 1;
  while (end < len) {
    var _char = str.charAt(end);
    var _isTagChar = !(isWhitespaceChar(_char) || _char === '/' || _char === '>');
    if (!_isTagChar) break;
    end++;
  }

  state.cursor = end;
  var tagName = str.slice(start, end);
  state.tokens.push({ type: 'tag', content: tagName });
  return tagName;
}

function lexTagAttributes(state) {
  var str = state.str,
      tokens = state.tokens;

  var cursor = state.cursor;
  var quote = null; // null, single-, or double-quote
  var wordBegin = cursor; // index of word start
  var words = []; // "key", "key=value", "key='value'", etc
  var len = str.length;
  while (cursor < len) {
    var char = str.charAt(cursor);
    if (quote) {
      var isQuoteEnd = char === quote;
      if (isQuoteEnd) {
        quote = null;
      }
      cursor++;
      continue;
    }

    var isTagEnd = char === '/' || char === '>';
    if (isTagEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor));
      }
      break;
    }

    var isWordEnd = isWhitespaceChar(char);
    if (isWordEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor));
      }
      wordBegin = cursor + 1;
      cursor++;
      continue;
    }

    var isQuoteStart = char === '\'' || char === '"';
    if (isQuoteStart) {
      quote = char;
      cursor++;
      continue;
    }

    cursor++;
  }
  state.cursor = cursor;

  var wLen = words.length;
  var type = 'attribute';
  for (var i = 0; i < wLen; i++) {
    var word = words[i];
    if (!(word && word.length)) continue;
    var isNotPair = word.indexOf('=') === -1;
    if (isNotPair) {
      var secondWord = words[i + 1];
      if (secondWord && (0, _compat.startsWith)(secondWord, '=')) {
        if (secondWord.length > 1) {
          var newWord = word + secondWord;
          tokens.push({ type: type, content: newWord });
          i += 1;
          continue;
        }
        var thirdWord = words[i + 2];
        i += 1;
        if (thirdWord) {
          var _newWord = word + '=' + thirdWord;
          tokens.push({ type: type, content: _newWord });
          i += 1;
          continue;
        }
      }
    }
    if ((0, _compat.endsWith)(word, '=')) {
      var _secondWord = words[i + 1];
      if (_secondWord && !(0, _compat.stringIncludes)(_secondWord, '=')) {
        var _newWord3 = word + _secondWord;
        tokens.push({ type: type, content: _newWord3 });
        i += 1;
        continue;
      }

      var _newWord2 = word.slice(0, -1);
      tokens.push({ type: type, content: _newWord2 });
      continue;
    }

    tokens.push({ type: type, content: word });
  }
}

function lexSkipTag(tagName, state) {
  var str = state.str,
      cursor = state.cursor,
      tokens = state.tokens;

  var len = str.length;
  var index = cursor;
  while (index < len) {
    var nextTag = str.indexOf('</', index);
    if (nextTag === -1) {
      lexText(state);
      break;
    }

    var tagState = { str: str, cursor: nextTag + 2, tokens: [] };
    var name = lexTagName(tagState);
    var safeTagName = tagName.toLowerCase();
    if (safeTagName !== name.toLowerCase()) {
      index = tagState.cursor;
      continue;
    }

    var content = str.slice(cursor, nextTag);
    tokens.push({ type: 'text', content: content });
    var openTag = { type: 'tag-start', close: true };
    var closeTag = { type: 'tag-end', close: false };
    lexTagAttributes(tagState);
    tokens.push.apply(tokens, [openTag].concat(_toConsumableArray(tagState.tokens), [closeTag]));
    state.cursor = tagState.cursor + 1;
    break;
  }
}
//# sourceMappingURL=lexer.js.map


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parser;
exports.hasTerminalParent = hasTerminalParent;
exports.parse = parse;

var _compat = __webpack_require__(0);

function parser(tokens, options) {
  var root = { tagName: null, children: [] };
  var state = { tokens: tokens, options: options, cursor: 0, stack: [root] };
  parse(state);
  return root.children;
}

function hasTerminalParent(tagName, stack, terminals) {
  var tagParents = terminals[tagName];
  if (tagParents) {
    var currentIndex = stack.length - 1;
    while (currentIndex >= 0) {
      var parentTagName = stack[currentIndex].tagName;
      if (parentTagName === tagName) {
        break;
      }
      if ((0, _compat.arrayIncludes)(tagParents, parentTagName)) {
        return true;
      }
      currentIndex--;
    }
  }
  return false;
}

function parse(state) {
  var tokens = state.tokens,
      options = state.options;
  var stack = state.stack;

  var nodes = stack[stack.length - 1].children;
  var len = tokens.length;
  var cursor = state.cursor;

  while (cursor < len) {
    var token = tokens[cursor];
    if (token.type !== 'tag-start') {
      nodes.push(token);
      cursor++;
      continue;
    }

    var tagToken = tokens[++cursor];
    cursor++;
    var tagName = tagToken.content.toLowerCase();
    if (token.close) {
      var item = void 0;
      while (item = stack.pop()) {
        if (tagName === item.tagName) break;
      }
      while (cursor < len) {
        var endToken = tokens[cursor];
        if (endToken.type !== 'tag-end') break;
        cursor++;
      }
      break;
    }

    var isClosingTag = (0, _compat.arrayIncludes)(options.closingTags, tagName);
    var shouldRewindToAutoClose = isClosingTag;
    if (shouldRewindToAutoClose) {
      var terminals = options.closingTagAncestorBreakers;

      shouldRewindToAutoClose = !hasTerminalParent(tagName, stack, terminals);
    }

    if (shouldRewindToAutoClose) {
      // rewind the stack to just above the previous
      // closing tag of the same name
      var currentIndex = stack.length - 1;
      while (currentIndex > 0) {
        if (tagName === stack[currentIndex].tagName) {
          stack = stack.slice(0, currentIndex);
          var previousIndex = currentIndex - 1;
          nodes = stack[previousIndex].children;
          break;
        }
        currentIndex = currentIndex - 1;
      }
    }

    var attributes = [];
    var attrToken = void 0;
    while (cursor < len) {
      attrToken = tokens[cursor];
      if (attrToken.type === 'tag-end') break;
      attributes.push(attrToken.content);
      cursor++;
    }

    cursor++;
    var children = [];
    nodes.push({
      type: 'element',
      tagName: tagToken.content,
      attributes: attributes,
      children: children
    });

    var hasChildren = !(attrToken.close || (0, _compat.arrayIncludes)(options.voidTags, tagName));
    if (hasChildren) {
      stack.push({ tagName: tagName, children: children });
      var innerState = { tokens: tokens, options: options, cursor: cursor, stack: stack };
      parse(innerState);
      cursor = innerState.cursor;
    }
  }
  state.cursor = cursor;
}
//# sourceMappingURL=parser.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           This format adheres to the v0 ASP spec.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */


exports.default = format;
exports.capitalize = capitalize;
exports.camelCase = camelCase;
exports.castValue = castValue;
exports.unquote = unquote;
exports.splitHead = splitHead;
exports.formatAttributes = formatAttributes;
exports.formatStyles = formatStyles;

var _compat = __webpack_require__(0);

function format(nodes) {
  return nodes.map(function (node) {
    var type = capitalize(node.type);
    if (type === 'Element') {
      var tagName = node.tagName.toLowerCase();
      var attributes = formatAttributes(node.attributes);
      var children = format(node.children);
      return { type: type, tagName: tagName, attributes: attributes, children: children };
    }

    return { type: type, content: node.content };
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelCase(str) {
  return str.split('-').reduce(function (str, word) {
    return str + word.charAt(0).toUpperCase() + word.slice(1);
  });
}

function castValue(str) {
  if (typeof str !== 'string') return str;
  if (str === '') return str;
  var num = +str;
  if (!isNaN(num)) return num;
  return str;
}

function unquote(str) {
  var car = str.charAt(0);
  var end = str.length - 1;
  var isQuoteStart = car === '"' || car === "'";
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }
  return str;
}

function splitHead(str, sep) {
  var idx = str.indexOf(sep);
  if (idx === -1) return [str];
  return [str.slice(0, idx), str.slice(idx + sep.length)];
}

function formatAttributes(attributes) {
  return attributes.reduce(function (attrs, pair) {
    var _splitHead = splitHead(pair.trim(), '='),
        _splitHead2 = _slicedToArray(_splitHead, 2),
        key = _splitHead2[0],
        value = _splitHead2[1];

    value = value ? unquote(value) : key;
    if (key === 'class') {
      attrs.className = value.split(' ');
    } else if (key === 'style') {
      attrs.style = formatStyles(value);
    } else if ((0, _compat.startsWith)(key, 'data-')) {
      attrs.dataset = attrs.dataset || {};
      var prop = camelCase(key.slice(5));
      attrs.dataset[prop] = castValue(value);
    } else {
      attrs[camelCase(key)] = castValue(value);
    }
    return attrs;
  }, {});
}

function formatStyles(str) {
  return str.trim().split(';').map(function (rule) {
    return rule.trim().split(':');
  }).reduce(function (styles, keyValue) {
    var _keyValue = _slicedToArray(keyValue, 2),
        rawKey = _keyValue[0],
        rawValue = _keyValue[1];

    if (rawValue) {
      var key = camelCase(rawKey.trim());
      var value = castValue(rawValue.trim());
      styles[key] = value;
    }
    return styles;
  }, {});
}
//# sourceMappingURL=v0.js.map


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7)


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _paul = __webpack_require__(8);

var _paul2 = _interopRequireDefault(_paul);

var _compat = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// c/p'd from ../index.js
var voidTags = ['!doctype', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

function serializeAttr(attr, value, isXml) {
  if (!isXml && attr === value) return attr;
  var text = value.toString();
  var quoteEscape = text.indexOf('\'') !== -1;
  var quote = quoteEscape ? '"' : '\'';
  return attr + '=' + quote + text + quote;
}

// stolen from underscore.string
function dasherize(str) {
  return str.trim().replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

function inlineStyle(style) {
  return Object.keys(style).reduce(function (css, key) {
    return css + '; ' + dasherize(key) + ': ' + style[key];
  }, '').slice(2);
}

var htmlDefaults = {};

function toHTML(tree) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : htmlDefaults;
  var doctype = options.doctype;

  var isXml = doctype === 'xml';
  var html = _paul2.default.walk(tree, function (node, walk) {
    var type = node.type,
        tagName = node.tagName,
        attributes = node.attributes,
        content = node.content;

    if (type === 'Text') return content;
    if (type === 'Comment') return '<!--' + content + '-->';
    var tag = '<' + tagName;
    for (var attr in attributes) {
      var val = attributes[attr];
      if (attr === 'dataset') {
        for (var prop in val) {
          var key = 'data-' + dasherize(prop);
          tag += ' ' + serializeAttr(key, val[prop], isXml);
        }
        continue;
      }

      if (attr === 'style') {
        tag += ' ' + serializeAttr(attr, inlineStyle(val));
        continue;
      }

      if (attr === 'className') {
        tag += ' ' + serializeAttr('class', val.join(' '));
        continue;
      }

      tag += ' ' + serializeAttr(dasherize(attr), val, isXml);
    }

    tag += '>';
    var autoClose = !isXml && (0, _compat.arrayIncludes)(voidTags, tagName.toLowerCase());
    if (autoClose) return tag;

    var innerds = walk(node.children || []).join('');
    return tag + innerds + ('</' + tagName + '>');
  });
  if (html.join) return html.join('');
  return html;
}

var newline = '\n';
var jadeDefaults = {
  indentation: '  '
};

function isWhitespaceNode(node) {
  return !(node.type === 'Text' && !node.content.trim());
}

function toJade(tree) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jadeDefaults;
  var doctype = options.doctype;

  var multi = multilineText(options.indentation);

  if (tree.filter) tree = tree.filter(isWhitespaceNode);
  var jade = _paul2.default.walk(tree, function (node, walk, depth) {
    var type = node.type,
        tagName = node.tagName,
        attributes = node.attributes;

    if (type === 'Text') {
      return multi(node.content, depth, '| ');
    }
    if (type === 'Comment') {
      var text = node.content;
      return ~text.indexOf(newline) ? multi('//', depth) + newline + multi(text, depth + 1) : multi('//' + text, depth);
    }
    var tag = tagName;
    var id = attributes.id,
        className = attributes.className;

    if (id) tag += '#' + id;
    if (className) tag += '.' + className.join('.');

    var redundantDiv = node.tagName === 'div' && tag.length > 3;
    if (redundantDiv) tag = tag.slice(3);

    tag = multi(tag, depth);
    var attrs = node.attributes;
    var props = Object.keys(attrs).filter(function (key) {
      return key !== 'className' && key !== 'id';
    });
    if (props.length) {
      var isXml = doctype === 'xml';
      tag += '(';
      tag += props.map(function (prop) {
        var val = attrs[prop];
        if (prop === 'dataset') {
          return Object.keys(val).map(function (attr) {
            return serializeAttr('data-' + dasherize(attr), val[attr], isXml);
          }).join(', ');
        }
        if (prop === 'style') return serializeAttr(prop, inlineStyle(val));
        return serializeAttr(dasherize(prop), val, isXml);
      }).join(', ');
      tag += ')';
    }
    var lowTagName = node.tagName.toLowerCase();
    if ((0, _compat.arrayIncludes)(voidTags, lowTagName)) {
      if (lowTagName === '!doctype') {
        if (!doctype) doctype = doctypeShortcut(tag);
        return multi('doctype ' + doctype, depth);
      }
      return tag;
    }

    var children = node.children;

    if (!children.length) return tag;
    if (children.length === 1 && children[0].type === 'Text') {
      var _text = children[0].content;
      return ~_text.indexOf(newline) ? tag + '.' + newline + multi(_text, depth + 1) : tag + ' ' + _text;
    }

    return tag + newline + walk(children.filter(isWhitespaceNode), depth + 1).join(newline);
  }, 0);
  if (jade.join) return jade.join(newline);
  return jade;
}

function multilineText(indentation) {
  var format = function format(line) {
    return line;
  };
  var hasTab = (0, _compat.stringIncludes)(indentation, '\t');
  if (hasTab) {
    format = function format(line) {
      return line.replace(/\t/g, indentation);
    };
  }

  function indent(depth, str) {
    while (depth--) {
      str = indentation + str;
    }
    return str;
  }

  return function (str, depth) {
    var lead = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var lines = str.split(newline).map(format).filter(function (line) {
      return !!line.trim();
    });

    var start = maxSharedIndent(lines);
    return lines.map(function (line) {
      return indent(depth, lead + line.slice(start));
    }).join(newline);
  };
}

function maxSharedIndent(lines) {
  return lines.reduce(function (num, line) {
    return Math.min(num, line.length - line.trimLeft().length);
  }, Infinity);
}

// see http://jade-lang.com/reference/doctype/
function doctypeShortcut(str) {
  if ((0, _compat.stringIncludes)(str, 'Transitional')) return 'transitional';
  if ((0, _compat.stringIncludes)(str, 'strict')) return 'strict';
  if ((0, _compat.stringIncludes)(str, 'Frameset')) return 'frameset';
  if ((0, _compat.stringIncludes)(str, 'Basic')) return 'basic';
  if ((0, _compat.stringIncludes)(str, '1.1')) return '1.1';
  if ((0, _compat.stringIncludes)(str, 'Mobile')) return 'mobile';
  return 'html';
}

module.exports = {
  toHTML: toHTML,
  toJade: toJade,
  toPug: toJade
};
//# sourceMappingURL=translate.js.map


/***/ }),
/* 8 */
/***/ (function(module, exports) {


function Paul(walkFn) {
	if(!(this instanceof Paul)) {
		return new Paul(walkFn);
	}
	var walker = this.walker = Paul.walker(walkFn);

	this.map = Paul.map(walker);
	this.filter = Paul.filter(walker);
	this.where = Paul.where(walker);

	var depthIter = this.depthIterator = Paul.depthIterator(walker);
	var breadthIter = this.breadthIterator = Paul.breadthIterator(walker);

	var methods = ['forEach', 'find', 'findWhere', 'reduce', 'parent'];
	for(var i = 0; i < methods.length; i++) {
		var method = methods[i];
		var Method = cap(method);

		this['depth'+Method] = Paul[method](depthIter);
		this['breadth'+Method] = Paul[method](breadthIter);
	}

	this.depthSiblings = Paul.siblings(walker, depthIter);
	this.breadthSiblings = Paul.siblings(walker, breadthIter);
}

Paul.walker = function walker(walkFn) {
	var walker = Array.isArray(walkFn) 
		? function(node, walk) {
			for(var i = 0; i < walkFn.length; i++) {
				var key = walkFn[i];
				if(deepHas(node, key)) walk(key);
			}
		}
		: walkFn;

	return function(tree) {
		var steps = []; // [[String key, Node node]]
		walker(tree, function(prop, node) {
			if(node === void 0) {
				steps.push([prop, deepGet(tree, prop)]);
			} else {
				steps.push([prop, node]);
			}
		});
		return steps;
	}
}

Paul.map = function map(walker) {
	return function _map(node, func) {
		var steps = walker(node);
		var notKeys = [];
		for(var i = 0; i < steps.length; i++) {
			notKeys.push(steps[i][0]);
		}
		var ret = func(deepCopy(node, notKeys));
		for(var i = 0; i < steps.length; i++) {
			var kid;
			var prop = steps[i][0];
			var child = steps[i][1];
			if(Array.isArray(child)) {
				kid = [];
				for(var j = 0; j < child.length; j++) {
					kid.push(this.map(child[j], func));
				}
			} else {
				kid = this.map(child, func);
			}
			deepSet(ret, prop, kid);
		}
		return ret;
	}
}

Paul.filter = function filter(walker) {
	return function _filter(node, func) {
		if(!func(node)) return undefined;
		var steps = walker(node);
		var notKeys = [];
		for(var i = 0; i < steps.length; i++) {
			notKeys.push(steps[i][0]);
		}
		var ret = deepCopy(node, notKeys);
		for(var i = 0; i < steps.length; i++) {
			var kid = null;
			var prop = steps[i][0];
			var child = steps[i][1];
			if(Array.isArray(child)) {
				kid = [];
				for(var j = 0; j < child.length; j++) {
					var son = child[j];
					if(_filter(son, func)) kid.push(son);
				}
			} else if(_filter(child, func)) {
				kid = child;
			}
			deepSet(ret, prop, kid);
		}
		return ret;
	}
}

Paul.where = function where(walker) {
	return function _where(node, obj) {
		return Paul.filter(walker)(node, whereFilter(obj));
	}
}

function getChildren(walker, node) {
	var children = [];
	var steps = walker(node);
	for(var i = 0; i < steps.length; i++) {
		children = children.concat(steps[i][1]);
	}
	return children;
}

Paul.depthIterator = function depthIterator(walker) {
	return function _depthIterator(tree) {
		var levels = [[tree]];
		var sweeps = [0];

		function fromEnd(arr, i) {
			return arr[arr.length - 1 - i];
		}

		return {
			next: function next() {
				if(!sweeps.length) return {done: true};
				var nodes = fromEnd(levels, 0);
				var index = fromEnd(sweeps, 0);
				if(index < nodes.length) {
					sweeps[sweeps.length - 1]++;

					var adults = fromEnd(levels, 1);
					var parent = adults 
						? adults[fromEnd(sweeps, 1) - 1]
						: undefined;

					var children = getChildren(walker, nodes[index]);
					if(children.length) {
						levels.push(children);
						sweeps.push(0);
					}

					return {
						done: false,
						value: nodes[index],
						parent: parent
					};
				} else {
					levels.pop();
					sweeps.pop();
					return next();
				}
			}
		}
	}
}

Paul.breadthIterator = function breadthIterator(walker) {
	return function _breadthIterator(tree) {
		var elder = undefined;
		var nodes = [];
		var index = 0;

		var subnodes = [tree];
		var subindex = 0;

		var level = [tree];

		return {
			next: function next() {
				if(subindex < subnodes.length) {
					return {
						done: false, 
						value: subnodes[subindex++],
						parent: elder
					};
				} else if(index < nodes.length) {
					elder = nodes[index++];
					subnodes = getChildren(walker, elder);
					subindex = 0;

					level = level.concat(subnodes);
					return next();
				} else {
					if(!level.length) {
						return {done: true};
					}

					nodes = level;
					index = 0;
					level = [];
					return next();
				}
			}
		};
	}
}

Paul.forEach = function forEach(iterator) {
	return function _forEach(tree, func) {
		var iter = iterator(tree);
		var res;
		while(!(res = iter.next()).done) {
			func(res.value, res.parent, tree);
		}
	}
}

Paul.find = function find(iterator) {
	return function _find(tree, func) {
		var iter = iterator(tree);
		var res;
		while(!(res = iter.next()).done) {
			if(func(res.value, res.parent, tree)) return res.value;
		}
		return undefined;
	}
}

Paul.findWhere = function findWhere(iterator) {
	return function _findWhere(tree, obj) {
		return Paul.find(iterator)(tree, whereFilter(obj));
	}
}

Paul.reduce = function reduce(iterator) {
	return function _reduce(tree, func, memo) {
		var iter = iterator(tree);
		var res;
		while(!(res = iter.next()).done) {
			if(memo === void 0) {
				memo = res.value;
			} else {
				memo = func(memo, res.value, res.parent, tree);
			}
		}
		return memo;
	}
}

Paul.parent = function parent(iterator) {
	return function _parent(tree, node) {
		if(node !== tree) {
			var iter = iterator(tree);
			var res;
			while(!(res = iter.next()).done) {
				if(res.value === node) {
					return res.parent;
				}
			}
		}
		return undefined;
	}
}

Paul.siblings = function siblings(walker, iterator) {
	return function _siblings(tree, node) {
		var parent = Paul.parent(iterator)(tree, node);
		if(parent) {
			var steps = walker(parent);
			for(var i = 0; i < steps.length; i++) {
				var nodes = steps[i][1];
				if(Array.isArray(nodes)) {
					var index = nodes.indexOf(node);
					if(~index) return {
						left: nodes.slice(0, index),
						right: nodes.slice(index + 1)
					};
				}
			}
		}
		return undefined;
	}
}

Paul.walk = function walk(node, func) {
	function _walk(node) {
		var rest = Array.prototype.slice.call(arguments, 1);
		if(Array.isArray(node)) {
			var nodes = [];
			for(var i = 0; i < node.length; i++) {
				nodes.push(func.apply(null, [node[i], _walk].concat(rest)));
			}
			return nodes;
		}
		return func.apply(null, [node, _walk].concat(rest));
	}

	if(func === void 0) {
		func = node;
		return _walk;
	}

	var rest = Array.prototype.slice.call(arguments, 2);
	return _walk.apply(null, [node].concat(rest));
}

function cap(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function deepCopy(obj, notKeys) {
	var ret = {};
	for(var key in obj) {
		if(obj.hasOwnProperty(key) && !~notKeys.indexOf(key)) {
			var val = obj[key];
			if(typeof val === 'object') {
				var head = key + '.';
				ret[key] = deepCopy(val, notKeys.reduce(function(s,c) {
					if(!c.indexOf(head)) {
						s.push(c.slice(head.length));
					}
					return s;
				}, []));
			} else {
				ret[key] = val;
			}
		}
	}
	return ret;
}

function deepHas(obj, prop) {
	var levels = prop.split('.');
	for(var i = 0; i < levels.length; i++) {
		obj = obj[levels[i]];
		if(!obj) return false;
	}
	return true;
}

function deepGet(obj, prop) {
	var levels = prop.split('.');
	for(var i = 0; i < levels.length; i++) {
		obj = obj[levels[i]];
	}
	return obj;
}

function deepSet(obj, prop, value) {
	var levels = prop.split('.');
	var end = levels.length - 1;
	for(var i = 0; i < end; i++) {
		obj = obj[levels[i]];
	}
	obj[levels[end]] = value;
}

function whereFilter(obj) {
	return function(node) {
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				if(obj[key] !== node[key]) return false;
			}
		}
		return true;
	}
}

module.exports = Paul;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
  set (key, value, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = `expires=${d.toUTCString()}`
    document.cookie = `${key}=${value};${expires};path=/`
  },
  get (key) {
    var value = ''
    document.cookie.split('; ').forEach(e => {
      var x = e.split('=')
      if (x[0] === key) value = x[1]
    })
    return value
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const type = __webpack_require__(11)

module.exports = () => {
  var paramstr = window.location.search
  if (!type.isEmpty(paramstr)) {
    paramstr = paramstr.substring(1)
    var parray = paramstr.split('&')
    if (parray.length > 0) {
      var params = {}
      parray.forEach(function (pstr) {
        if (!type.isEmpty(pstr)) {
          var parr = pstr.split('=')
          if (!type.isEmpty(parr[0]) && !type.isEmpty(parr[0].trim()) && !type.isEmpty(parr[1])) {
            parr[1] = parr[1].trim()
            parr[1] = decodeURIComponent(parr[1]).trim()
            if (!type.isEmpty(parr[1])) params[parr[0].trim()] = parr[1]
          }
        }
      })
      return params
    } else return {}
  } else return {}
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var tck = {

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is a function
   */
  'isFunction': function (data) {
    return typeof data === 'function';
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is a array
   */
  'isArray': function (data) {
    return typeof data === "object" && data instanceof Array;
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is a object
   */
  'isObject': function (data) {
    return (typeof data === "object") && !(data instanceof Array) && data !== null;
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is a number
   */
  'isNumber': function (data) {
    return typeof data === "number" || data instanceof Number;
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is a integer
   */
  'isInteger': function (data) {
    if (tck.isNumber(data)) return data % 1 === 0;
    else return false;
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is a string
   */
  'isString': function (data) {
    return typeof data === "string" || data instanceof String;
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is boolean
   */
  'isBoolean': function (data) {
    return typeof data === "boolean";
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Returns true when data is empty
   */
  'isEmpty': function (data) {
    return tck.isUndefined(data) || tck.isNull(data) || data === "";
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is null
   */
  'isNull': function (data) {
    return data === null;
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is not a number
   */
  'isNaN': function (data) {
    return isNaN(data);
  },

  /**
   * @param {Any} data : Data for evaluation.
   * @returns {Boolean} : Validate data is undefined
   */
  'isUndefined': function (data) {
    return undefined === data;
  }
};

module.exports = tck;


/***/ })
/******/ ]);
});