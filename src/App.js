import React from 'react';
import Root from "./components/Nav";
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import Login from "./containers/auth/Login";
import Register from './containers/auth/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={router.LOGIN}><Login/></Route>
        <Route path={router.REGISTER}><Register/></Route>
        <Route path={router.HOME}><Root/></Route>
      </Switch>
    </Router>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;
