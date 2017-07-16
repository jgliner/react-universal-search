import React from 'react';

import exampleData from './mappedBrews.js';

import UniversalSearch from './UniversalSearch.js';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const customComponent = (brew, i) => (
      <div key={i} className="brew-search-component">
        <div className="brew-result-text">
          <img src="./mug.png" className="brew-mug" alt="Mug" />
          <div className="brew-name">{brew.name}</div>
        </div>
        <div className="brew-stats">
          <span>{brew.abv ? `${brew.abv} ABV` : ''}</span>
          <span>{brew.ibu ? `${brew.ibu} IBU` : ''}</span>
        </div>
      </div>
    );

    return (
      <div className="search-brews">
        <h1>Please Select</h1>
        <div className="brew-search-wrapper">
          <UniversalSearch
            listToSearch={exampleData}
            customComponent={customComponent}
            hasCategories
            showMatchCount
          />
        </div>
      </div>
    );
  }
}

export default App;
