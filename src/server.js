import qs from "qs";
import path from "path";
import Express from "express";

import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackConfig from "../webpack.config";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import counterApp from "./reducers";
import App from "./containers/App";

const app = Express();
const port = 3000;

const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
);

const renderFullPage = (html, preloadedState) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            "\\u003c"
          )}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
};

// We are going to fill these out in the sections to follow
const handleRender = (req, res) => {
  const params = qs.parse(req.query);
  const counter = parseInt(params.counter, 10) || 0;

  let preloadedState = { counter };

  const store = configureStore(preloadedState);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  res.send(renderFullPage(html, finalState));
};

// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.info(
      `==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
    );
  }
});
