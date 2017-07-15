import React from 'react';

class UniversalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.inputQuery = this.inputQuery.bind(this);
  }

  inputQuery (e) {
    this.setState({ query: e.target.value });
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
