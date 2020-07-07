import {Route, Switch} from "react-router-dom";
import React, {lazy, Suspense} from "react";
import router from '../../contants/router';

import Loading from "../Loading";

const Post = lazy(() => import("../../containers/post"));
const Config = lazy(() => import("../../containers/config"));
const Posts = lazy(() => import("../../containers/posts"));
const Tags = lazy(() => import("../../containers/tags"));
const User = lazy(() => import("../../containers/user"));
const Security = lazy(() => import('../../containers/security'));
const Image = lazy(() => import('../../containers/image'));
const EditorProvider = lazy(() => import('../../redux/editorState'));

const Root = React.memo(function Root() {
  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route path={router.ADMIN_TAGS} exact><Tags/></Route>
        <Route path={router.ADMIN_PIC} exact><Image/></Route>
        <Route path={router.ADMIN_SECURITY} exact><Security/></Route>
        <Route path={router.CONFIG} exact><Config/></Route>
        <Route path={router.ADMIN} exact><Posts/></Route>
        <Switch>
          <EditorProvider>
            <Route path={router.ADMIN_USER} exact><User/></Route>
            <Route path={`${router.ADMIN_POST}/:pid`} exact><Post/></Route>
          </EditorProvider>
        </Switch>
      </Switch>
    </Suspense>
  );
});
export default Root;
