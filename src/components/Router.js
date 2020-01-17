import {Route, Switch} from "react-router-dom";
import React from "react";
import router from '../contants/router';
import Post from "../containers/Post";
import Article from "../containers/Article";
import Login from "../containers/auth/Login";

export default function Root() {
  return (
    <Switch>
      <Route path={router.LOGIN}><Login/></Route>
      <Route>
        <Switch>
          <Route path={router.ADMIN_POST}><Post/></Route>
          <Route path={router.ADMIN}><Article/></Route>
        </Switch>
      </Route>
    </Switch>
  );
}
