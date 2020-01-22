import {Route, Switch} from "react-router-dom";
import React from "react";
import router from '../contants/router';
import Post from "../containers/Post";
import Posts from "../containers/Posts";
import Tags from "../containers/Tags/Tags";

export default function Root() {
  return (
    <Switch>
      <Route path={router.ADMIN_POST}><Post/></Route>
      <Route path={router.ADMIN_TAGS}><Tags/></Route>
      <Route path={router.ADMIN}><Posts/></Route>
    </Switch>
  );
}
