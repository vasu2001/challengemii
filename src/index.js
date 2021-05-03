import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightbox from 'simple-react-lightbox'
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore,getFirestore } from 'redux-firestore'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import firebaseConfig from './firebase';

const store = createStore(rootReducer, 
  compose(
  applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
  reduxFirestore(firebaseConfig), 
  reactReduxFirebase(firebaseConfig)
  ));

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

