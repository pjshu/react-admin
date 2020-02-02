import React, {lazy, Suspense} from 'react';
import {hot} from 'react-hot-loader/root';
import {Route, Router, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import history from "./history";
import Loading from "./components/Loading";
import PostProvider from './context';

const Root = lazy(() => import("./components/nav/"));
const Register = lazy(() => import("./containers/auth/Register"));
const Login = lazy(() => import("./containers/auth/Login"));

function App() {
  return (
    <PostProvider>
      <Suspense fallback={<Loading/>}>
        <Router history={history}>
          <Switch>
            <Route path={router.LOGIN}>
              <Login/>
            </Route>
            <Route path={router.REGISTER}>
              <Register/>
            </Route>
            <Route path={router.HOME}>
              <Root/>
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </PostProvider>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;
