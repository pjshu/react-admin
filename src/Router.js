import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import React from "react";
import router from './contants/router';
import Write from "./containers/Write";
import Article from "./containers/Article";
import TopNav from "./components/TopNav";


export default function Root() {
  return (
    <Router>
      <Route path={router.ADMIN}><TopNav/></Route>
      <Switch>
        <Route path={router.ADMIN_WRITE}><Write/></Route>
        <Route path={router.ADMIN}><Article/></Route>
      </Switch>
    </Router>
  );
}
