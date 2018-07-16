import { h, render } from 'preact';
import { OghamInput } from './ogham-input';
import { OghamOutput } from './ogham-output';
import getAppState from './state';

import './index.css'

if (navigator && navigator.serviceWorker) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

render(
  <OghamInput state={getAppState()} />,
  document.querySelector('#ogham-input div[component="true"]')
);

render(
  <OghamOutput state={getAppState()} />,
  document.getElementById('ogham-output')
);
