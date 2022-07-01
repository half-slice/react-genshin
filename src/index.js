import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App';
import { app,analytics } from './fbase'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
