import React from 'react';

import exampleData from './mappedBrews.js';

import UniversalSearch from './UniversalSearch.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="univ-search-wrapper">
        <h1>Please Select</h1>
        <UniversalSearch
          listToSearch={exampleData}
        />
      </div>
    );
  }
}

export default App;
