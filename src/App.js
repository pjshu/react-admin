import React from 'react';
import store from './redux/configureStore';
import {Provider} from 'react-redux';
import Root from "./components/Nav";
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route} from "react-router-dom";
import router from './contants/router';
import './global.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path={router.HOME}>
          <Root/>
        </Route>
      </Router>
    </Provider>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;
