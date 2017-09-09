(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: '/' })
      .then(() => console.log('Service Worker registered successfully.'))
      .catch(error => console.log('Service Worker registration failed:', error));
  }
})();

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

import './index.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
