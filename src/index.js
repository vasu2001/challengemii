import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightbox from 'simple-react-lightbox'
import './index.css';
import App from './App';
import { createStore } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'

const store = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);   

