import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App.js';

if (module.hot) {
  module.hot.accept('./src/App.js', () => {
    const Next = require('./src/App.js').default;
    ReactDOM.render(<Next />,
      document.getElementById('app'),
    );
  });
}

ReactDOM.render(<App />,
  document.getElementById('app'),
);
