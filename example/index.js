import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App.js';

if (module.hot) {
  module.hot.accept('./src/App.js', () => {
    console.log('HMR Accepted');
  });
}

ReactDOM.render(<App />,
  document.getElementById('app'),
);
