import React from 'react';
import store from './redux/configureStore';
import {Provider} from 'react-redux';
import Root from "./components/Nav";
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import Login from "./containers/auth/Login";
import Register from './containers/auth/Register'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={router.LOGIN}><Login/></Route>
          <Route path={router.REGISTER}><Register/></Route>
          <Route path={router.HOME}><Root/></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;
