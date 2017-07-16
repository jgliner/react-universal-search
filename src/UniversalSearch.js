import React from 'react';

class UniversalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: new Set(),
    };

    this.checkForCategories = this.checkForCategories.bind(this);
    this.inputQuery = this.inputQuery.bind(this);
    this.filterMatches = this.filterMatches.bind(this);
    this.renderMatches = this.renderMatches.bind(this);
    this.renderMatchCount = this.renderMatchCount.bind(this);

    this.includeCategories = typeof this.includeCategories !== 'undefined' ? this.props.hasCategories : this.checkForCategories(props.listToSearch);
  }

  checkForCategories(listToSearch) {
    const listKeys = Object.keys(listToSearch);
    for (let i = 0; i < listKeys.length; i++) {
      if (Array.isArray(listToSearch[listKeys[i]])) {
        return true;
      }
    }
    return false;
  }

  inputQuery(e) {
    let input = e.target.value.replace(/[\.\+\*\?\^\$\[\]\{\}\(\)\|\/\\]/ig, sym => `\\${sym}`);
    let re = input.trim().length > 0 ? new RegExp(input.trim(), 'gi') : '';
    this.setState({
      query: input,
    });
    if (input) {
      this.filterMatches(re);
    }
    else {
      this.state.results.clear();
    }
  }

  filterMatches(re) {
    const scan = (inputArr, category) => {
      let offset = 0;
      inputArr.forEach((item, i) => {
        if (item.name.match(re) && re !== '') {
          if (offset - i === 0) {
            item._firstInCategory = true;
          }
          item._category = category;
          this.state.results.add(item);
        }
        else if (this.state.results.has(item) && re !== '') {
          this.state.results.delete(item);
          offset++;
        }
        else {
          offset++;
        }
      });
    };

    if (this.includeCategories) {
      Object.keys(this.props.listToSearch).forEach((category) => {
        scan(this.props.listToSearch[category], category);
      });
    }
    else {
      scan(this.props.listToSearch);
    }
  }

  renderMatches(resultsSet) {
    return [...resultsSet].map((matchingEntry, i) => {
      if (this.props.customComponent) {
        return this.props.customComponent(matchingEntry, i);
      }
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
    return this.props.customMatchCountComponent ?
      this.props.customMatchCountComponent(matchCount) :
      <div className="univ-search-match-count" style={{ marginTop: '10px', color: '#aaa' }}>
        {matchCount} Matches
      </div>;
  }

  render() {
    const matchCountComponent = this.props.showMatchCount ? this.renderMatchCount(this.state.results.size) : null;
    const matchingItemElements = this.state.results.size > 0 ? this.renderMatches(this.state.results) : <div>No Matches...</div>;

    return (
      <div className="univ-search-wrapper">
        <input onChange={this.inputQuery} />
        {this.props.placeholder}
        {this.props.showMatchCount ? matchCountComponent : null}
        <br />
        <br />
        <div className="univ-search-results-wrapper">
          {matchingItemElements}
        </div>
      </div>
    );
  }
}

export default UniversalSearch;
