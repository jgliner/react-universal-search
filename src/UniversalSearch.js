import React from 'react';

const formattingErr = ` Cannot parse object. Please make sure you're passing in "listToSearch" in one of the following formats:

Plain Array of Objects (i.e. No Categories):

[
  { name: 'foo' },
  { name: 'bar' },
  { name: 'baz' },
  ...
]

---

Keyed Objects Containing Arrays:

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
`;

const methodWarning = passedMethod => `
  Invalid Method: "${passedMethod}".\nFalling back to "greedy"\n\nValid Options are ['greedy', 'strict', and 'symbol-permissive' ]. If no method is specified, "greedy" will automatically be used without showing this warning.
`;


class UniversalSearch extends React.Component {
  constructor(props) {
    super(props);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

    // this library uses an ES6 Set()
    // typically, we get O(1) across the board with this data structure
    this.state = {
      query: '',
      results: new Set(),
      focused: !this.props.focusedOnly,
    };

    this.checkForCategories = this.checkForCategories.bind(this);
    this.inputQuery = this.inputQuery.bind(this);
    this.filterMatches = this.filterMatches.bind(this);
    this.renderMatches = this.renderMatches.bind(this);
    this.renderMatchCount = this.renderMatchCount.bind(this);
    this.renderIfNoMatches = this.renderIfNoMatches.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
  }

  componentWillMount() {
    // check if categories were explicitly passed
    // if not, iterate through the Object keys
    // and see if category inclusion can be detected from structure
    this.includeCategories = typeof this.props.hasCategories !== 'undefined' ? this.props.hasCategories : this.checkForCategories(this.props.listToSearch);
  }

  componentDidMount() {
    const validParseMethods = ['greedy', 'strict', 'symbol-permissive'];
    if (this.props.parseMethod && !validParseMethods.includes(this.props.parseMethod)) {
      console.warn(methodWarning(this.props.parseMethod));
    }

    if (typeof this.props.listToSearch !== 'object') {
      console.error(formattingErr);
    }
  }

  checkForCategories(listToSearch) {
    const listKeys = Object.keys(listToSearch);
    for (let i = 0; i < listKeys.length; i++) {
      if (Array.isArray(listToSearch[listKeys[i]])) {
        // short-circuit if following the Object --> Array structure
        return true;
      }
    }
    // if not, assume regular array
    return false;
  }

  inputQuery(e) {
    // escape input and build RE query
    let input = e.target.value.replace(/[\.\+\*\?\^\$\[\]\{\}\(\)\|\/\\]/ig, sym => `\\${sym}`);
    let re;

    if (this.props.parseMethod === 'strict') {
      re = input.trim().length > 0 ? new RegExp(`^${input.trim()}`, 'gi') : '';
    }
    else if (this.props.parseMethod === 'symbol-permissive') {
      re = input.trim().length > 0 ? new RegExp(`^([\\W\\s]+?${input.trim()}(\\w+)?[\\W\\s]+?)|^([\\W\\s]?(\\w+)?[\\W\\s]+)?${input.trim()}`, 'ig') : '';
    }
    else {
      re = input.trim().length > 0 ? new RegExp(input.trim(), 'gi') : '';
    }

    this.setState({
      query: input,
    });

    if (input) {
      // use our RE matches to filter on matching strings
      this.filterMatches(re);
    }
    else {
      // clear all results if search string is empty
      this.state.results.clear();
    }
  }

  filterMatches(re) {
    const scan = (inputArr, category) => {
      let hasHeader = false;
      // only applicable if result limit specified
      let showing = 0;
      for (let i = 0; i < inputArr.length; i++) {
        let item = inputArr[i];
        item._firstInCategory = false;
        if (item.name.match(re) && re !== '') {
          // if string matches
          showing++;

          // delete the item if it exists to re-init order
          this.state.results.delete(item);

          item._category = category;
          if (!hasHeader) {
            item._firstInCategory = true;
            hasHeader = true;
          }
            // if a limit was passed in, check if we've exceeded it
            // if so, bail out
          if (!this.props.limitResults || showing <= this.props.limitResults) {
            this.state.results.add(item);
          }
        }
        else {
          // if string does not match,
          // strip order-based props
          if (item._firstInCategory) {
            item._firstInCategory = false;
            // this category no longer has a header...
            // it will be set in the next item
            hasHeader = false;
          }
          this.state.results.delete(item);
        }
      }
    };

    if (this.includeCategories) {
      // if there are categories, iterate through the contents of each one separately
      Object.keys(this.props.listToSearch).forEach((category) => {
        scan(this.props.listToSearch[category], category);
      });
    }
    else {
      // otherwise, simply iterate through a single array
      scan(this.props.listToSearch);
    }
  }

  renderMatches(resultsSet) {
    // we use a Spread Operator to temporarily transform a Set into an Array
    // this makes it easier to map into React
    return [...resultsSet].map((matchingEntry, i) => {
      if (this.props.customComponent) {
        return this.props.customComponent(matchingEntry, i);
      }
      // default structure if not specified
      const entry = (
        <div
          className={`univ-search-matching-results ${matchingEntry._firstInCategory ? 'univ-search-category-head' : ''}`}
          key={`match_${i}`}
        >
          {
            this.includeCategories && matchingEntry._firstInCategory ? (
              <div
                className="univ-search-category-head"
                style={{ color: '#aaa', fontStyle: 'italic', fontSize: '12px', margin: '10px 0' }}
              >
                {matchingEntry._category}
              </div>
            ) : null
          }
          {matchingEntry.name}
        </div>
      );
      return entry;
    });
  }

  renderMatchCount(matchCount) {
    // optional
    return this.props.customMatchCountComponent ?
      this.props.customMatchCountComponent(matchCount) :
      <div className="univ-search-match-count" style={{ marginTop: '10px', color: '#aaa' }}>
        {matchCount} Matches
      </div>;
  }

  renderIfNoMatches(query) {
    // also optional

    // do not show "no matches found" message if no query
    // may change this to an option later
    if (!query) {
      return null;
    }
    return this.props.customNoMatchComponent ?
      this.props.customNoMatchComponent : <div className="univ-search-no-matches">No Matches...</div>
  }

  focusHandler() {
    if (this.props.focusedOnly) {
      this.setState({ focused: true });
    }
  }

  blurHandler(e) {
    if (this.props.focusedOnly && !e.relatedTarget) {
      this.setState({ focused: false });
    }
  }

  render() {
    const matchesFound = this.state.results.size > 0;

    const matchCountComponent = this.props.showMatchCount || this.props.customMatchCountComponent ? this.renderMatchCount(this.state.results.size) : null;
    const noMatchComponent = this.props.showWhenNoMatches || this.props.customNoMatchComponent ? this.renderIfNoMatches(this.state.query) : null;

    const matchingItemElements = matchesFound ? this.renderMatches(this.state.results) : noMatchComponent;

    let showResults = this.state.query && !this.state.query.match(/^\s+$/igm) && this.state.focused;

    return (
      <div className="univ-search-wrapper">
        <input
          className="univ-search-input"
          placeholder={this.props.placeholder}
          onChange={this.inputQuery}
          onMouseUp={this.focusHandler}
          onBlur={this.blurHandler}
        />
        {matchCountComponent}
        <br />
        <br />
        <div
          className="univ-search-results-wrapper"
          style={{ display: showResults ? 'inherit' : 'none' }}
          onClick={this.blurHandler}
        >
          {matchingItemElements}
        </div>
      </div>
    );
  }
}

export default UniversalSearch;
