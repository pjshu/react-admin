import {Route, Switch} from "react-router-dom";
import React, {lazy, Suspense} from "react";
import router from '../../contants/router';

import Loading from "../Loading";

const Post = lazy(() => import("../../containers/post"));
const Posts = lazy(() => import("../../containers/posts"));
const Tags = lazy(() => import("../../containers/tags"));
const User = lazy(() => import("../../containers/user"));
const Security = lazy(() => import('../../containers/security'));
const Table = lazy(() => import('../table'));

export default function Root() {
  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route path={router.ADMIN_POST}><Post/></Route>
        <Route path={router.ADMIN_TAGS}><Tags/></Route>
        <Route path={router.ADMIN_USER}><User/></Route>
        <Route path={router.ADMIN_SECURITY}><Security/></Route>
        <Route path={'/admin/foo'}><Table/></Route>
        <Route path={router.ADMIN}><Posts/></Route>
      </Switch>
    </Suspense>
  );
}
