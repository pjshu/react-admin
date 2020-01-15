import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import router from '../contants/router';
import Write from "../containers/Write";
import Article from "../containers/Article";
import Login from "../containers/auth/Login";

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route path={router.LOGIN}><Login/></Route>
        <Route>
          <Switch>
            <Route path={router.ADMIN_WRITE}><Write/></Route>
            <Route path={router.ADMIN}><Article/></Route>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}
