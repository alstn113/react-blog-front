import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { tempSetUser, check } from "./modules/user";
import { HelmetProvider } from "react-helmet-async";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const loadUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (error) {
    console.log("localStorage is not working");
  }
};

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <React.StrictMode>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </React.StrictMode>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
