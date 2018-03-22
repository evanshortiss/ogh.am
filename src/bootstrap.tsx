import { h, render } from 'preact';
import { OghamInput } from './ogham-input';
import { OghamOutput } from './ogham-output';
import getAppState from './state';

if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js');
}

render(
  <OghamInput state={getAppState()} />,
  document.querySelector('#ogham-input div[component="true"]')
);

render(
  <OghamOutput state={getAppState()} />,
  document.getElementById('ogham-output')
);
