import React from 'react';

import exampleData from '../data/mappedBrews.js';

import UniversalSearch from '../../src/UniversalSearch.js';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePress(e) {
    console.info(`you just pressed ${e.target.value}`);
  }

  render() {
    const resultsHeader = brew => (
      <div className="brew-result-header">
        {brew._category}
      </div>
    );

    const customComponent = (brew, i) => {
      const entry = (
        <button
          onClick={this.handlePress}
          key={i}
          value={brew.name}
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
        </button>
      );
      return entry;
    };

    const customMatchCount = matches => (
      <div className="brew-result-count">{matches} Brews Found!</div>
    );

    const customNoMatch = (
      <div className="brew-no-match">No matches! Sorry about that :(</div>
    );

    return (
      <div className="search-brews">
        <h1>Please Select</h1>
        <div className="brew-search-wrapper">
          <UniversalSearch
            customComponent={customComponent}
            customMatchCountComponent={customMatchCount}
            customNoMatchComponent={customNoMatch}
            focusedOnly
            hasCategories
            limitResults={3}
            listToSearch={exampleData}
            parseMethod="symbol-permissive"
            placeholder="Name or Style"
          />
        </div>
      </div>
    );
  }
}

export default App;
