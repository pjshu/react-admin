import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import './global.css';
import router from './contants/router'
import Nav from "./components/Nav";

export default function Root() {
  return (
    <Router>
      <Switch>
      <Route path="/admin"><Nav/></Route>
      </Switch>
    </Router>
  );
}
