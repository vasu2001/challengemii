import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightbox from 'simple-react-lightbox'
import './index.css';
import App from './App';
ReactDOM.render(
  <BrowserRouter>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </BrowserRouter>,
  document.getElementById('root')
);

