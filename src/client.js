import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import App from "./containers/App";

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = configureStore(preloadedState);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
