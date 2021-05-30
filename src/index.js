import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './store/reducers/reducer-exams';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDukbNk7tRsoPhIBz_HiD8-Pbxb9s1S6Pw",
    authDomain: "reactproject-df131.firebaseapp.com",
    databaseURL: "https://reactproject-df131.firebaseio.com",
    projectId: "reactproject-df131",
    storageBucket: "reactproject-df131.appspot.com",
    messagingSenderId: "745172328758",
    appId: "1:745172328758:web:f28a9493f29fca05b8d397",
    measurementId: "G-MK1GG3T9VZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
)); 

ReactDOM.render(
   <Provider store={store}><App /></Provider> ,
  document.getElementById('root')
);
serviceWorker.unregister();
