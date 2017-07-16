import React from 'react';

import exampleData from '../data/mappedBrews.js';

import UniversalSearch from '../../dist/react-universal-search.js';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const resultsHeader = brew => (
      <div className="brew-result-header">
        {brew._category}
      </div>
    );

    const customComponent = (brew, i) => {
      const entry = (
        <div
          key={i}
          className={`brew-search-component ${brew._firstInCategory ? 'brew-search-category-head' : ''}`}
        >
          <div className="brew-result-text-header">
            { brew._firstInCategory ? resultsHeader(brew) : null }
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
      return entry;
    };

    return (
      <div className="search-brews">
        <h1>Please Select</h1>
        <div className="brew-search-wrapper">
          <UniversalSearch
            listToSearch={exampleData}
            customComponent={customComponent}
            limitResults={3}
            hasCategories
            showMatchCount
          />
        </div>
      </div>
    );
  }
}

export default App;
