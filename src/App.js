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
    let category = null;

    const resultsHeader = (brew) => (
      <div className="brew-result-header">
        {brew._category}
      </div>
    );

    const customComponent = (brew, i) => {
      const entry = (
        <div
          key={i}
          className={`brew-search-component ${brew._category !== category ? 'brew-search-category-head' : ''}`}
        >
          <div className="brew-result-text-header">
            { brew._category !== category ? resultsHeader(brew) : null }
            <div className="brew-result-text">
              <img src="./mug.png" className="brew-mug" alt="Mug" />
              <div className="brew-name">{brew.name}</div>
              <div className="brew-stats">
                <span>{brew.abv ? `${brew.abv} ABV` : ''}</span>
                <span>{brew.ibu ? `${brew.ibu} IBU` : ''}</span>
              </div>
            </div>
          </div>
        </div>
      );
      if (brew._category !== category) {
        category = brew._category;
      }
      return entry;
    };

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
