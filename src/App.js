import React from 'react';

import exampleData from './brews.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props)
    return (
      <div className="example-parent-component">
        <h1>Please Select</h1>
        <br />
        <select>
          {
            exampleData.map((opt, i) => (
              <option value={i}>{opt.style} | {opt.brewery_id}</option>
            ))
          }
        </select>
      </div>
    );
  }
}

export default App;
