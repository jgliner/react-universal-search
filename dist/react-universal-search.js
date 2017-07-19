!function(c,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.UniversalSearch=t(require("react")):c.UniversalSearch=t(c.react)}(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return function(c){function t(I){if(n[I])return n[I].exports;var e=n[I]={i:I,l:!1,exports:{}};return c[I].call(e.exports,e,e.exports,t),e.l=!0,e.exports}var n={};return t.m=c,t.c=n,t.d=function(c,n,I){t.o(c,n)||Object.defineProperty(c,n,{configurable:!1,enumerable:!0,get:I})},t.n=function(c){var n=c&&c.__esModule?function(){return c.default}:function(){return c};return t.d(n,"a",n),n},t.o=function(c,t){return Object.prototype.hasOwnProperty.call(c,t)},t.p="",t(t.s=0)}([function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar formattingErr = ' Cannot parse object. Please make sure you\\'re passing in \"listToSearch\" in one of the following formats:\\n\\nPlain Array of Objects (i.e. No Categories):\\n\\n[\\n  { name: \\'foo\\' },\\n  { name: \\'bar\\' },\\n  { name: \\'baz\\' },\\n  ...\\n]\\n\\n---\\n\\nKeyed Objects Containing Arrays:\\n\\n{\\n  foo: [\\n    {name: \\'bar\\'},\\n    ...\\n  ],\\n  baz: [\\n    {name: \\'qux\\'},\\n    ...\\n  ],\\n  ...\\n}\\n';\n\nvar methodWarning = function methodWarning(passedMethod) {\n  return '\\n  Invalid Method: \"' + passedMethod + '\".\\nFalling back to \"greedy\"\\n\\nValid Options are [\\'greedy\\', \\'strict\\', and \\'symbol-permissive\\' ]. If no method is specified, \"greedy\" will automatically be used without showing this warning.\\n';\n};\n\nvar UniversalSearch = function (_React$Component) {\n  _inherits(UniversalSearch, _React$Component);\n\n  function UniversalSearch(props) {\n    _classCallCheck(this, UniversalSearch);\n\n    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set\n\n    // this library uses an ES6 Set()\n    // typically, we get O(1) across the board with this data structure\n    var _this = _possibleConstructorReturn(this, (UniversalSearch.__proto__ || Object.getPrototypeOf(UniversalSearch)).call(this, props));\n\n    _this.state = {\n      query: '',\n      results: new Set()\n    };\n\n    _this.checkForCategories = _this.checkForCategories.bind(_this);\n    _this.inputQuery = _this.inputQuery.bind(_this);\n    _this.filterMatches = _this.filterMatches.bind(_this);\n    _this.renderMatches = _this.renderMatches.bind(_this);\n    _this.renderMatchCount = _this.renderMatchCount.bind(_this);\n    _this.renderIfNoMatches = _this.renderIfNoMatches.bind(_this);\n    return _this;\n  }\n\n  _createClass(UniversalSearch, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      // check if categories were explicitly passed\n      // if not, iterate through the Object keys\n      // and see if category inclusion can be detected from structure\n      this.includeCategories = typeof this.props.hasCategories !== 'undefined' ? this.props.hasCategories : this.checkForCategories(this.props.listToSearch);\n    }\n  }, {\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var validParseMethods = ['greedy', 'strict', 'symbol-permissive'];\n      if (this.props.parseMethod && !validParseMethods.includes(this.props.parseMethod)) {\n        console.warn(methodWarning(this.props.parseMethod));\n      }\n\n      if (_typeof(this.props.listToSearch) !== 'object') {\n        console.error(formattingErr);\n      }\n    }\n  }, {\n    key: 'checkForCategories',\n    value: function checkForCategories(listToSearch) {\n      var listKeys = Object.keys(listToSearch);\n      for (var i = 0; i < listKeys.length; i++) {\n        if (Array.isArray(listToSearch[listKeys[i]])) {\n          // short-circuit if following the Object --\x3e Array structure\n          return true;\n        }\n      }\n      // if not, assume regular array\n      return false;\n    }\n  }, {\n    key: 'inputQuery',\n    value: function inputQuery(e) {\n      // escape input and build RE query\n      var input = e.target.value.replace(/[\\.\\+\\*\\?\\^\\$\\[\\]\\{\\}\\(\\)\\|\\/\\\\]/ig, function (sym) {\n        return '\\\\' + sym;\n      });\n      var re = void 0;\n\n      if (this.props.parseMethod === 'strict') {\n        re = input.trim().length > 0 ? new RegExp('^' + input.trim(), 'gi') : '';\n      } else if (this.props.parseMethod === 'symbol-permissive') {\n        re = input.trim().length > 0 ? new RegExp('^([\\\\W\\\\s]+?' + input.trim() + '(\\\\w+)?[\\\\W\\\\s]+?)|^([\\\\W\\\\s]?(\\\\w+)?[\\\\W\\\\s]+)?' + input.trim(), 'ig') : '';\n      } else {\n        re = input.trim().length > 0 ? new RegExp(input.trim(), 'gi') : '';\n      }\n\n      this.setState({\n        query: input\n      });\n\n      if (input) {\n        // use our RE matches to filter on matching strings\n        this.filterMatches(re);\n      } else {\n        // clear all results if search string is empty\n        this.state.results.clear();\n      }\n    }\n  }, {\n    key: 'filterMatches',\n    value: function filterMatches(re) {\n      var _this2 = this;\n\n      var scan = function scan(inputArr, category) {\n        var hasHeader = false;\n        // only applicable if result limit specified\n        var showing = 0;\n        for (var i = 0; i < inputArr.length; i++) {\n          var item = inputArr[i];\n          item._firstInCategory = false;\n          if (item.name.match(re) && re !== '') {\n            // if string matches\n            showing++;\n\n            // delete the item if it exists to re-init order\n            _this2.state.results.delete(item);\n\n            item._category = category;\n            if (!hasHeader) {\n              item._firstInCategory = true;\n              hasHeader = true;\n            }\n            // if a limit was passed in, check if we've exceeded it\n            // if so, bail out\n            if (!_this2.props.limitResults || showing <= _this2.props.limitResults) {\n              _this2.state.results.add(item);\n            }\n          } else {\n            // if string does not match,\n            // strip order-based props\n            if (item._firstInCategory) {\n              item._firstInCategory = false;\n              // this category no longer has a header...\n              // it will be set in the next item\n              hasHeader = false;\n            }\n            _this2.state.results.delete(item);\n          }\n        }\n      };\n\n      if (this.includeCategories) {\n        // if there are categories, iterate through the contents of each one separately\n        Object.keys(this.props.listToSearch).forEach(function (category) {\n          scan(_this2.props.listToSearch[category], category);\n        });\n      } else {\n        // otherwise, simply iterate through a single array\n        scan(this.props.listToSearch);\n      }\n    }\n  }, {\n    key: 'renderMatches',\n    value: function renderMatches(resultsSet) {\n      var _this3 = this;\n\n      // we use a Spread Operator to temporarily transform a Set into an Array\n      // this makes it easier to map into React\n      return [].concat(_toConsumableArray(resultsSet)).map(function (matchingEntry, i) {\n        if (_this3.props.customComponent) {\n          return _this3.props.customComponent(matchingEntry, i);\n        }\n        // default structure if not specified\n        var entry = _react2.default.createElement(\n          'div',\n          {\n            className: 'univ-search-matching-results ' + (matchingEntry._firstInCategory ? 'univ-search-category-head' : ''),\n            key: 'match_' + i\n          },\n          _this3.includeCategories && matchingEntry._firstInCategory ? _react2.default.createElement(\n            'div',\n            {\n              className: 'univ-search-category-head',\n              style: { color: '#aaa', fontStyle: 'italic', fontSize: '12px', margin: '10px 0' }\n            },\n            matchingEntry._category\n          ) : null,\n          matchingEntry.name\n        );\n        return entry;\n      });\n    }\n  }, {\n    key: 'renderMatchCount',\n    value: function renderMatchCount(matchCount) {\n      // optional\n      return this.props.customMatchCountComponent ? this.props.customMatchCountComponent(matchCount) : _react2.default.createElement(\n        'div',\n        { className: 'univ-search-match-count', style: { marginTop: '10px', color: '#aaa' } },\n        matchCount,\n        ' Matches'\n      );\n    }\n  }, {\n    key: 'renderIfNoMatches',\n    value: function renderIfNoMatches(query) {\n      // also optional\n\n      // do not show \"no matches found\" message if no query\n      // may change this to an option later\n      if (!query) {\n        return null;\n      }\n      return this.props.customNoMatchComponent ? this.props.customNoMatchComponent : _react2.default.createElement(\n        'div',\n        { className: 'univ-search-no-matches' },\n        'No Matches...'\n      );\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var matchesFound = this.state.results.size > 0;\n\n      var matchCountComponent = this.props.showMatchCount || this.props.customMatchCountComponent ? this.renderMatchCount(this.state.results.size) : null;\n      var noMatchComponent = this.props.showWhenNoMatches || this.props.customNoMatchComponent ? this.renderIfNoMatches(this.state.query) : null;\n\n      var matchingItemElements = matchesFound ? this.renderMatches(this.state.results) : noMatchComponent;\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'univ-search-wrapper' },\n        _react2.default.createElement('input', { placeholder: this.props.placeholder, onChange: this.inputQuery }),\n        matchCountComponent,\n        _react2.default.createElement('br', null),\n        _react2.default.createElement('br', null),\n        _react2.default.createElement(\n          'div',\n          {\n            className: 'univ-search-results-wrapper',\n            style: { display: this.state.query && !this.state.query.match(/^\\s+$/igm) ? 'inherit' : 'none' }\n          },\n          matchingItemElements\n        )\n      );\n    }\n  }]);\n\n  return UniversalSearch;\n}(_react2.default.Component);\n\nexports.default = UniversalSearch;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9Vbml2ZXJzYWxTZWFyY2guanM/MzM3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgZm9ybWF0dGluZ0VyciA9ICcgQ2Fubm90IHBhcnNlIG9iamVjdC4gUGxlYXNlIG1ha2Ugc3VyZSB5b3VcXCdyZSBwYXNzaW5nIGluIFwibGlzdFRvU2VhcmNoXCIgaW4gb25lIG9mIHRoZSBmb2xsb3dpbmcgZm9ybWF0czpcXG5cXG5QbGFpbiBBcnJheSBvZiBPYmplY3RzIChpLmUuIE5vIENhdGVnb3JpZXMpOlxcblxcbltcXG4gIHsgbmFtZTogXFwnZm9vXFwnIH0sXFxuICB7IG5hbWU6IFxcJ2JhclxcJyB9LFxcbiAgeyBuYW1lOiBcXCdiYXpcXCcgfSxcXG4gIC4uLlxcbl1cXG5cXG4tLS1cXG5cXG5LZXllZCBPYmplY3RzIENvbnRhaW5pbmcgQXJyYXlzOlxcblxcbntcXG4gIGZvbzogW1xcbiAgICB7bmFtZTogXFwnYmFyXFwnfSxcXG4gICAgLi4uXFxuICBdLFxcbiAgYmF6OiBbXFxuICAgIHtuYW1lOiBcXCdxdXhcXCd9LFxcbiAgICAuLi5cXG4gIF0sXFxuICAuLi5cXG59XFxuJztcblxudmFyIG1ldGhvZFdhcm5pbmcgPSBmdW5jdGlvbiBtZXRob2RXYXJuaW5nKHBhc3NlZE1ldGhvZCkge1xuICByZXR1cm4gJ1xcbiAgSW52YWxpZCBNZXRob2Q6IFwiJyArIHBhc3NlZE1ldGhvZCArICdcIi5cXG5GYWxsaW5nIGJhY2sgdG8gXCJncmVlZHlcIlxcblxcblZhbGlkIE9wdGlvbnMgYXJlIFtcXCdncmVlZHlcXCcsIFxcJ3N0cmljdFxcJywgYW5kIFxcJ3N5bWJvbC1wZXJtaXNzaXZlXFwnIF0uIElmIG5vIG1ldGhvZCBpcyBzcGVjaWZpZWQsIFwiZ3JlZWR5XCIgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHVzZWQgd2l0aG91dCBzaG93aW5nIHRoaXMgd2FybmluZy5cXG4nO1xufTtcblxudmFyIFVuaXZlcnNhbFNlYXJjaCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhVbml2ZXJzYWxTZWFyY2gsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFVuaXZlcnNhbFNlYXJjaChwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBVbml2ZXJzYWxTZWFyY2gpO1xuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU2V0XG5cbiAgICAvLyB0aGlzIGxpYnJhcnkgdXNlcyBhbiBFUzYgU2V0KClcbiAgICAvLyB0eXBpY2FsbHksIHdlIGdldCBPKDEpIGFjcm9zcyB0aGUgYm9hcmQgd2l0aCB0aGlzIGRhdGEgc3RydWN0dXJlXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFVuaXZlcnNhbFNlYXJjaC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFVuaXZlcnNhbFNlYXJjaCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgcXVlcnk6ICcnLFxuICAgICAgcmVzdWx0czogbmV3IFNldCgpXG4gICAgfTtcblxuICAgIF90aGlzLmNoZWNrRm9yQ2F0ZWdvcmllcyA9IF90aGlzLmNoZWNrRm9yQ2F0ZWdvcmllcy5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5pbnB1dFF1ZXJ5ID0gX3RoaXMuaW5wdXRRdWVyeS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5maWx0ZXJNYXRjaGVzID0gX3RoaXMuZmlsdGVyTWF0Y2hlcy5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5yZW5kZXJNYXRjaGVzID0gX3RoaXMucmVuZGVyTWF0Y2hlcy5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5yZW5kZXJNYXRjaENvdW50ID0gX3RoaXMucmVuZGVyTWF0Y2hDb3VudC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5yZW5kZXJJZk5vTWF0Y2hlcyA9IF90aGlzLnJlbmRlcklmTm9NYXRjaGVzLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhVbml2ZXJzYWxTZWFyY2gsIFt7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgLy8gY2hlY2sgaWYgY2F0ZWdvcmllcyB3ZXJlIGV4cGxpY2l0bHkgcGFzc2VkXG4gICAgICAvLyBpZiBub3QsIGl0ZXJhdGUgdGhyb3VnaCB0aGUgT2JqZWN0IGtleXNcbiAgICAgIC8vIGFuZCBzZWUgaWYgY2F0ZWdvcnkgaW5jbHVzaW9uIGNhbiBiZSBkZXRlY3RlZCBmcm9tIHN0cnVjdHVyZVxuICAgICAgdGhpcy5pbmNsdWRlQ2F0ZWdvcmllcyA9IHR5cGVvZiB0aGlzLnByb3BzLmhhc0NhdGVnb3JpZXMgIT09ICd1bmRlZmluZWQnID8gdGhpcy5wcm9wcy5oYXNDYXRlZ29yaWVzIDogdGhpcy5jaGVja0ZvckNhdGVnb3JpZXModGhpcy5wcm9wcy5saXN0VG9TZWFyY2gpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgdmFsaWRQYXJzZU1ldGhvZHMgPSBbJ2dyZWVkeScsICdzdHJpY3QnLCAnc3ltYm9sLXBlcm1pc3NpdmUnXTtcbiAgICAgIGlmICh0aGlzLnByb3BzLnBhcnNlTWV0aG9kICYmICF2YWxpZFBhcnNlTWV0aG9kcy5pbmNsdWRlcyh0aGlzLnByb3BzLnBhcnNlTWV0aG9kKSkge1xuICAgICAgICBjb25zb2xlLndhcm4obWV0aG9kV2FybmluZyh0aGlzLnByb3BzLnBhcnNlTWV0aG9kKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdHlwZW9mKHRoaXMucHJvcHMubGlzdFRvU2VhcmNoKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXR0aW5nRXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjaGVja0ZvckNhdGVnb3JpZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja0ZvckNhdGVnb3JpZXMobGlzdFRvU2VhcmNoKSB7XG4gICAgICB2YXIgbGlzdEtleXMgPSBPYmplY3Qua2V5cyhsaXN0VG9TZWFyY2gpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0VG9TZWFyY2hbbGlzdEtleXNbaV1dKSkge1xuICAgICAgICAgIC8vIHNob3J0LWNpcmN1aXQgaWYgZm9sbG93aW5nIHRoZSBPYmplY3QgLS0+IEFycmF5IHN0cnVjdHVyZVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBpZiBub3QsIGFzc3VtZSByZWd1bGFyIGFycmF5XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaW5wdXRRdWVyeScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlucHV0UXVlcnkoZSkge1xuICAgICAgLy8gZXNjYXBlIGlucHV0IGFuZCBidWlsZCBSRSBxdWVyeVxuICAgICAgdmFyIGlucHV0ID0gZS50YXJnZXQudmFsdWUucmVwbGFjZSgvW1xcLlxcK1xcKlxcP1xcXlxcJFxcW1xcXVxce1xcfVxcKFxcKVxcfFxcL1xcXFxdL2lnLCBmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiAnXFxcXCcgKyBzeW07XG4gICAgICB9KTtcbiAgICAgIHZhciByZSA9IHZvaWQgMDtcblxuICAgICAgaWYgKHRoaXMucHJvcHMucGFyc2VNZXRob2QgPT09ICdzdHJpY3QnKSB7XG4gICAgICAgIHJlID0gaW5wdXQudHJpbSgpLmxlbmd0aCA+IDAgPyBuZXcgUmVnRXhwKCdeJyArIGlucHV0LnRyaW0oKSwgJ2dpJykgOiAnJztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5wYXJzZU1ldGhvZCA9PT0gJ3N5bWJvbC1wZXJtaXNzaXZlJykge1xuICAgICAgICByZSA9IGlucHV0LnRyaW0oKS5sZW5ndGggPiAwID8gbmV3IFJlZ0V4cCgnXihbXFxcXFdcXFxcc10rPycgKyBpbnB1dC50cmltKCkgKyAnKFxcXFx3Kyk/W1xcXFxXXFxcXHNdKz8pfF4oW1xcXFxXXFxcXHNdPyhcXFxcdyspP1tcXFxcV1xcXFxzXSspPycgKyBpbnB1dC50cmltKCksICdpZycpIDogJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZSA9IGlucHV0LnRyaW0oKS5sZW5ndGggPiAwID8gbmV3IFJlZ0V4cChpbnB1dC50cmltKCksICdnaScpIDogJyc7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBxdWVyeTogaW5wdXRcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgLy8gdXNlIG91ciBSRSBtYXRjaGVzIHRvIGZpbHRlciBvbiBtYXRjaGluZyBzdHJpbmdzXG4gICAgICAgIHRoaXMuZmlsdGVyTWF0Y2hlcyhyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjbGVhciBhbGwgcmVzdWx0cyBpZiBzZWFyY2ggc3RyaW5nIGlzIGVtcHR5XG4gICAgICAgIHRoaXMuc3RhdGUucmVzdWx0cy5jbGVhcigpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZpbHRlck1hdGNoZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaWx0ZXJNYXRjaGVzKHJlKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHNjYW4gPSBmdW5jdGlvbiBzY2FuKGlucHV0QXJyLCBjYXRlZ29yeSkge1xuICAgICAgICB2YXIgaGFzSGVhZGVyID0gZmFsc2U7XG4gICAgICAgIC8vIG9ubHkgYXBwbGljYWJsZSBpZiByZXN1bHQgbGltaXQgc3BlY2lmaWVkXG4gICAgICAgIHZhciBzaG93aW5nID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dEFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBpdGVtID0gaW5wdXRBcnJbaV07XG4gICAgICAgICAgaXRlbS5fZmlyc3RJbkNhdGVnb3J5ID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGl0ZW0ubmFtZS5tYXRjaChyZSkgJiYgcmUgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyBpZiBzdHJpbmcgbWF0Y2hlc1xuICAgICAgICAgICAgc2hvd2luZysrO1xuXG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIGl0ZW0gaWYgaXQgZXhpc3RzIHRvIHJlLWluaXQgb3JkZXJcbiAgICAgICAgICAgIF90aGlzMi5zdGF0ZS5yZXN1bHRzLmRlbGV0ZShpdGVtKTtcblxuICAgICAgICAgICAgaXRlbS5fY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgICAgIGlmICghaGFzSGVhZGVyKSB7XG4gICAgICAgICAgICAgIGl0ZW0uX2ZpcnN0SW5DYXRlZ29yeSA9IHRydWU7XG4gICAgICAgICAgICAgIGhhc0hlYWRlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBhIGxpbWl0IHdhcyBwYXNzZWQgaW4sIGNoZWNrIGlmIHdlJ3ZlIGV4Y2VlZGVkIGl0XG4gICAgICAgICAgICAvLyBpZiBzbywgYmFpbCBvdXRcbiAgICAgICAgICAgIGlmICghX3RoaXMyLnByb3BzLmxpbWl0UmVzdWx0cyB8fCBzaG93aW5nIDw9IF90aGlzMi5wcm9wcy5saW1pdFJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgX3RoaXMyLnN0YXRlLnJlc3VsdHMuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBzdHJpbmcgZG9lcyBub3QgbWF0Y2gsXG4gICAgICAgICAgICAvLyBzdHJpcCBvcmRlci1iYXNlZCBwcm9wc1xuICAgICAgICAgICAgaWYgKGl0ZW0uX2ZpcnN0SW5DYXRlZ29yeSkge1xuICAgICAgICAgICAgICBpdGVtLl9maXJzdEluQ2F0ZWdvcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgLy8gdGhpcyBjYXRlZ29yeSBubyBsb25nZXIgaGFzIGEgaGVhZGVyLi4uXG4gICAgICAgICAgICAgIC8vIGl0IHdpbGwgYmUgc2V0IGluIHRoZSBuZXh0IGl0ZW1cbiAgICAgICAgICAgICAgaGFzSGVhZGVyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpczIuc3RhdGUucmVzdWx0cy5kZWxldGUoaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5pbmNsdWRlQ2F0ZWdvcmllcykge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgY2F0ZWdvcmllcywgaXRlcmF0ZSB0aHJvdWdoIHRoZSBjb250ZW50cyBvZiBlYWNoIG9uZSBzZXBhcmF0ZWx5XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMubGlzdFRvU2VhcmNoKS5mb3JFYWNoKGZ1bmN0aW9uIChjYXRlZ29yeSkge1xuICAgICAgICAgIHNjYW4oX3RoaXMyLnByb3BzLmxpc3RUb1NlYXJjaFtjYXRlZ29yeV0sIGNhdGVnb3J5KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBvdGhlcndpc2UsIHNpbXBseSBpdGVyYXRlIHRocm91Z2ggYSBzaW5nbGUgYXJyYXlcbiAgICAgICAgc2Nhbih0aGlzLnByb3BzLmxpc3RUb1NlYXJjaCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyTWF0Y2hlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlck1hdGNoZXMocmVzdWx0c1NldCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIC8vIHdlIHVzZSBhIFNwcmVhZCBPcGVyYXRvciB0byB0ZW1wb3JhcmlseSB0cmFuc2Zvcm0gYSBTZXQgaW50byBhbiBBcnJheVxuICAgICAgLy8gdGhpcyBtYWtlcyBpdCBlYXNpZXIgdG8gbWFwIGludG8gUmVhY3RcbiAgICAgIHJldHVybiBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHJlc3VsdHNTZXQpKS5tYXAoZnVuY3Rpb24gKG1hdGNoaW5nRW50cnksIGkpIHtcbiAgICAgICAgaWYgKF90aGlzMy5wcm9wcy5jdXN0b21Db21wb25lbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLnByb3BzLmN1c3RvbUNvbXBvbmVudChtYXRjaGluZ0VudHJ5LCBpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkZWZhdWx0IHN0cnVjdHVyZSBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgIHZhciBlbnRyeSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VuaXYtc2VhcmNoLW1hdGNoaW5nLXJlc3VsdHMgJyArIChtYXRjaGluZ0VudHJ5Ll9maXJzdEluQ2F0ZWdvcnkgPyAndW5pdi1zZWFyY2gtY2F0ZWdvcnktaGVhZCcgOiAnJyksXG4gICAgICAgICAgICBrZXk6ICdtYXRjaF8nICsgaVxuICAgICAgICAgIH0sXG4gICAgICAgICAgX3RoaXMzLmluY2x1ZGVDYXRlZ29yaWVzICYmIG1hdGNoaW5nRW50cnkuX2ZpcnN0SW5DYXRlZ29yeSA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VuaXYtc2VhcmNoLWNhdGVnb3J5LWhlYWQnLFxuICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogJyNhYWEnLCBmb250U3R5bGU6ICdpdGFsaWMnLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW46ICcxMHB4IDAnIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXRjaGluZ0VudHJ5Ll9jYXRlZ29yeVxuICAgICAgICAgICkgOiBudWxsLFxuICAgICAgICAgIG1hdGNoaW5nRW50cnkubmFtZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJNYXRjaENvdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTWF0Y2hDb3VudChtYXRjaENvdW50KSB7XG4gICAgICAvLyBvcHRpb25hbFxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY3VzdG9tTWF0Y2hDb3VudENvbXBvbmVudCA/IHRoaXMucHJvcHMuY3VzdG9tTWF0Y2hDb3VudENvbXBvbmVudChtYXRjaENvdW50KSA6IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBjbGFzc05hbWU6ICd1bml2LXNlYXJjaC1tYXRjaC1jb3VudCcsIHN0eWxlOiB7IG1hcmdpblRvcDogJzEwcHgnLCBjb2xvcjogJyNhYWEnIH0gfSxcbiAgICAgICAgbWF0Y2hDb3VudCxcbiAgICAgICAgJyBNYXRjaGVzJ1xuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJJZk5vTWF0Y2hlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcklmTm9NYXRjaGVzKHF1ZXJ5KSB7XG4gICAgICAvLyBhbHNvIG9wdGlvbmFsXG5cbiAgICAgIC8vIGRvIG5vdCBzaG93IFwibm8gbWF0Y2hlcyBmb3VuZFwiIG1lc3NhZ2UgaWYgbm8gcXVlcnlcbiAgICAgIC8vIG1heSBjaGFuZ2UgdGhpcyB0byBhbiBvcHRpb24gbGF0ZXJcbiAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jdXN0b21Ob01hdGNoQ29tcG9uZW50ID8gdGhpcy5wcm9wcy5jdXN0b21Ob01hdGNoQ29tcG9uZW50IDogX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGNsYXNzTmFtZTogJ3VuaXYtc2VhcmNoLW5vLW1hdGNoZXMnIH0sXG4gICAgICAgICdObyBNYXRjaGVzLi4uJ1xuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgbWF0Y2hlc0ZvdW5kID0gdGhpcy5zdGF0ZS5yZXN1bHRzLnNpemUgPiAwO1xuXG4gICAgICB2YXIgbWF0Y2hDb3VudENvbXBvbmVudCA9IHRoaXMucHJvcHMuc2hvd01hdGNoQ291bnQgfHwgdGhpcy5wcm9wcy5jdXN0b21NYXRjaENvdW50Q29tcG9uZW50ID8gdGhpcy5yZW5kZXJNYXRjaENvdW50KHRoaXMuc3RhdGUucmVzdWx0cy5zaXplKSA6IG51bGw7XG4gICAgICB2YXIgbm9NYXRjaENvbXBvbmVudCA9IHRoaXMucHJvcHMuc2hvd1doZW5Ob01hdGNoZXMgfHwgdGhpcy5wcm9wcy5jdXN0b21Ob01hdGNoQ29tcG9uZW50ID8gdGhpcy5yZW5kZXJJZk5vTWF0Y2hlcyh0aGlzLnN0YXRlLnF1ZXJ5KSA6IG51bGw7XG5cbiAgICAgIHZhciBtYXRjaGluZ0l0ZW1FbGVtZW50cyA9IG1hdGNoZXNGb3VuZCA/IHRoaXMucmVuZGVyTWF0Y2hlcyh0aGlzLnN0YXRlLnJlc3VsdHMpIDogbm9NYXRjaENvbXBvbmVudDtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBjbGFzc05hbWU6ICd1bml2LXNlYXJjaC13cmFwcGVyJyB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyLCBvbkNoYW5nZTogdGhpcy5pbnB1dFF1ZXJ5IH0pLFxuICAgICAgICBtYXRjaENvdW50Q29tcG9uZW50LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnYnInLCBudWxsKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2JyJywgbnVsbCksXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VuaXYtc2VhcmNoLXJlc3VsdHMtd3JhcHBlcicsXG4gICAgICAgICAgICBzdHlsZTogeyBkaXNwbGF5OiB0aGlzLnN0YXRlLnF1ZXJ5ICYmICF0aGlzLnN0YXRlLnF1ZXJ5Lm1hdGNoKC9eXFxzKyQvaWdtKSA/ICdpbmhlcml0JyA6ICdub25lJyB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBtYXRjaGluZ0l0ZW1FbGVtZW50c1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBVbml2ZXJzYWxTZWFyY2g7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBVbml2ZXJzYWxTZWFyY2g7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvVW5pdmVyc2FsU2VhcmNoLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n")},function(module,exports){eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCI/M2M2MiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n")}])});