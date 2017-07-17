import React from 'react';

class UniversalSearch extends React.Component {
  constructor(props) {
    super(props);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

    // this library uses an ES6 Set()
    // typically, we get O(1) across the board with this data structure
    this.state = {
      query: '',
      results: new Set(),
    };

    this.checkForCategories = this.checkForCategories.bind(this);
    this.inputQuery = this.inputQuery.bind(this);
    this.filterMatches = this.filterMatches.bind(this);
    this.renderMatches = this.renderMatches.bind(this);
    this.renderMatchCount = this.renderMatchCount.bind(this);

    // check if categories were explicitly passed
    // if not, iterate through the Object keys
    // and see if category inclusion can be detected from structure
    this.includeCategories = typeof this.includeCategories !== 'undefined' ? this.props.hasCategories : this.checkForCategories(props.listToSearch);
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
    let re = input.trim().length > 0 ? new RegExp(input.trim(), 'gi') : '';
    
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

  render() {
    let noMatchMessage = <div>No Matches...</div>;
    if (!this.state.query || this.props.hideNoMatchMessage) {
      noMatchMessage = null;
    }
    const matchCountComponent = this.props.showMatchCount ? this.renderMatchCount(this.state.results.size) : null;
    const matchingItemElements = this.state.results.size > 0 ? this.renderMatches(this.state.results) : noMatchMessage;

    return (
      <div className="univ-search-wrapper">
        <input onChange={this.inputQuery} />
        {this.props.placeholder}
        {this.props.showMatchCount ? matchCountComponent : null}
        <br />
        <br />
        <div
          className="univ-search-results-wrapper"
          style={{ display: this.state.results.size > 0 || !this.props.hideNoMatchMessage ? 'inherit' : 'none' }}
        >
          {matchingItemElements}
        </div>
      </div>
    );
  }
}

export default UniversalSearch;
