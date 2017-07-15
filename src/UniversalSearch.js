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
          this.state.results.add(item.name);
        }
        else {
          this.state.results.delete(item.name);
        }
      });
    });
    console.log(this.state.results)
  }

  render() {
    console.log(this.state)
    return (
      <div className="univ-search-wrapper">
        <input onChange={this.inputQuery} />
        {this.props.placeholder}
      </div>
    );
  }
}

export default UniversalSearch;
