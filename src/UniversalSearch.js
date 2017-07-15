import React from 'react';

class UniversalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: new Set(),
    };

    this.inputQuery = this.inputQuery.bind(this);
    this.filterMatches = this.filterMatches.bind(this);
    this.renderMatches = this.renderMatches.bind(this);
    this.checkForCategories = this.checkForCategories.bind(this);

    this.includeCategories = typeof this.includeCategories !== 'undefined' ? this.props.hasCategories : this.checkForCategories(props.listToSearch);
  }

  checkForCategories(listToSearch) {
    const listKeys = Object.keys(listToSearch);
    for (let i = 0; i < listKeys.length; i++) {
      if (typeof listToSearch[listKeys[i]] === 'object') {
        return true;
      }
    }
    return false;
  }

  inputQuery(e) {
    let re = e.target.value.trim().length > 0 ? new RegExp(e.target.value.trim(), 'gi') : '';
    this.setState({
      query: e.target.value
    });
    this.filterMatches(re);
  }

  filterMatches(re) {
    Object.keys(this.props.listToSearch).forEach((category) => {
      this.props.listToSearch[category].forEach((item) => {
        if (item.name.match(re) && re !== '') {
          item._category = category;
          this.state.results.add(item);
        }
        else if (this.state.results.has(item) && re !== '') {
          this.state.results.delete(item);
        }
        return;
      });
    });
    console.log(this.state.results)
  }

  renderMatches(resultsSet) {
    return [...resultsSet].map((matchingEntry, i) => (
      <div className="univ-search-matching-results" key={i}>{matchingEntry.name}</div>
    ));
  }

  render() {
    console.log(this.state, this.includeCategories)
    const matchingItems = this.state.results.size > 0 ? this.renderMatches(this.state.results) : <div>No Matches...</div>;

    return (
      <div className="univ-search-wrapper">
        <input onChange={this.inputQuery} />
        {this.props.placeholder}
        <br />
        <br />
        {matchingItems}
      </div>
    );
  }
}

export default UniversalSearch;
