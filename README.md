# react-universal-search
Highly customizable client-side 'auto-complete' component for large datasets

---

## Development

PRs are more than welcome!

@TODO: Throw up a `CONTRIBUTING.md`
In the meantime, all I ask is ES6 only, please!

1. `git clone`
2. `cd react-universal-search`
3. `npm install`
4. `npm install --no-save react react-dom`
5. `npm run dev` (_starts `webpack-dev-server`_)
6. Navigate to `localhost:9000`

Once you are done making changes, run `npm run build`. This will create the main minified distribution bundle, `react-universal-search.js`. Please commit this file.

---

## Options

#### API
| Property | Type | Default |
|:---|:---|:---|
| customComponent | func(item, iterator) | `undefined` |
| customMatchCountComponent | func(count) | `undefined` |
| customNoMatchComponent | element | `null` |
| hasCategories | bool | _detected_ |
| limitResults | int | `0` _(all)_ |
| listToSearch | obj | `undefined` |
| parseMethod | string `['greedy', 'strict']` | `'greedy'` |
| placeholder | string | `undefined` |
| showMatchCount | bool | `false` |
| showWhenNoMatches | bool | `false` |

#### Details
| Property | Description |
|:---|:---|
| customComponent | Component called for each individual item passed in via `listToSearch`. If you want to add conditional rendering logic/styles to each entry and/or category header, this would be the place to do it. If no function is specified, the default layout is an unstyled list of `<div>` elements. -- _More info in [Custom Components](https://github.com/jgliner/react-universal-search#custom-components) below..._ |
| customMatchCountComponent | Called on every keystroke. Callback includes the number of results that match the given query. |
| customNoMatchComponent | A React element that displays when exactly zero results match the given query string. |
| hasCategories | This library will try and detect categories in your formatting automatically, to use as headers. It will always detect `false` for non-Object datatypes, as well as Arrays. Pass a boolean in here to override either of these behaviors. |
| limitResults | If `listToSearch` has categories, this will limit the number of results displayed per category. If `listToSearch` is an array, it will limit all results |
| *listToSearch* | _[Accepted Input Formats](https://github.com/jgliner/react-universal-search#accepted-input-formats)_ <br> **IMPORTANT: one property _MUST_ be called `name`. This will be the main search string. If this gets to be inconvenient, I will add another parameter for custom Key names** |
| parseMethod | How the query string should be interpreted. _[See Below](https://github.com/jgliner/react-universal-search#parsing-methods)_ for details. |
| placeholder | Placeholder text that a user will see before typing (same as in an HTML5 `<input>` element) |
| showMatchCount | Show total results after each keystroke. If this is `true` without a corresponding `customMatchCountComponent`, a default component will be used. *NOTE: This option will be overridden if a valid `customMatchCountComponent` is passed in.* |
| showWhenNoMatches | Display a message when exactly zero results match the given query string. If this is `true` without a corresponding `customNoMatchComponent`, a default component will be used. *NOTE: This option will be overridden if a valid `customNoMatchComponent` is passed in.* |

---

## Accepted Input Formats

Plain Array of Objects (i.e. No Categories):

```javascript
[
  { name: 'foo' },
  { name: 'bar' },
  { name: 'baz' },
  ...
]

```

Keyed Objects Containing Arrays:

```javascript
{
  foo: [
    {name: 'bar'},
    ...
  ],
  baz: [
    {name: 'qux'},
    ...
  ],
  ...
}
```

As long as this general structure is valid, anything else can be passed in at the inner-object level _(e.g. strings, numbers, elements, even more `<UniversalSearch>` components... <sup>though I can't think of a single use case for that...</sup>)_

---

## Custom Components

_You'll likely want to use your own React components instead of the ugly default pile of `<div>`s. Below is some key information on how I simplified this in order to make `react-universal-search` as customizable as possible while still retaining relative speed and space efficiency:_

This library temporarily injects two properties into each entry within your `listToSearch` *only if* a valid category format is detected/enabled:

`entry._category` - `string` - A copy of the item's containing Key

`entry._firstInCategory` - `bool` - Will be `true` if this is the first entry in a given category, or `undefined` if false. Use this to conditionally render your headers.

```javascript
this.props.listToSearch = {
  foo: [
    { name: 'bar' },
    { name: 'baz' },
  ],
  qux: [
    { name: 'quux' },
    { name: 'corge' },
  ],
};

// ...in your customComponent

console.log(foo[0].name)                 // 'bar'
console.log(foo[0]._category)            // 'foo'
console.log(foo[0]._firstInCategory)     // true

console.log(foo[1].name)                 // 'baz'
console.log(foo[1]._category)            // 'foo'
console.log(foo[1]._firstInCategory)     // undefined

console.log(qux[0].name)                 // 'quux'
console.log(qux[0]._category)            // 'qux'
console.log(qux[0]._firstInCategory)     // true

console.log(qux[1].name)                 // 'corge'
console.log(qux[1]._category)            // 'qux'
console.log(qux[1]._firstInCategory)     // undefined

```

[Example](https://github.com/jgliner/react-universal-search/blob/master/example/src/App.js#L22) 

---

## Parsing Methods

`greedy` (Default):
Attempts to match a string from any starting point. Beyond that, the results will take on the order in which they were passed in.

`strict`:
Attempts to match a string starting from the beginning. All other matches are discarded

```javascript
this.props.listToSearch = {
  foo: [
    { name: 'bar' },
    { name: 'baz' },
  ],
  qux: [
    { name: 'quux' },
    { name: 'corge' },
    { name: 'foobar' },
  ],
};

// <input />
e.target.value = 'ba'

// RESULTS //

// 'greedy'

// spread operator to represent Set()
[...this.state.results] = [
  { name: 'bar', _category: 'foo', _firstInCategory: true },
  { name: 'baz', _category: 'foo' },
  { name: 'foobar', _category: 'qux' },
]

// 'strict'

// spread operator to represent Set()
[...this.state.results] = [
  { name: 'bar', _category: 'foo', _firstInCategory: true },
  { name: 'baz', _category: 'foo' },
]

```

---

_@TODO:_
* _Docs_
* _Optimize_
* _Testing Suite_
* _Publish to `npm`_

---

Data Source for Example: https://www.kaggle.com/nickhould/craft-cans
> Database released under [Open Database License](http://opendatacommons.org/licenses/odbl/1.0/), individual contents under [Database Contents License](http://opendatacommons.org/licenses/dbcl/1.0/)

