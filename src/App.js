import React, {lazy, Suspense} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import history from "./history";
import Loading from "./components/Loading";
import {hot} from 'react-hot-loader';
import MessageQueue from './containers/MessageQueue'

const Root = lazy(() => import("./components/nav/"));
const Register = lazy(() => import("./containers/register"));
const Login = lazy(() => import("./containers/login"));
const RecoveryPass = lazy(() => import("./containers/recoveryPass/RecoveryPassword"));

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router history={history}>
        <MessageQueue/>
        <Switch>
          <Route path={router.LOGIN}><Login/></Route>
          <Route path={router.REGISTER}><Register/></Route>
          <Route path={router.RECOVER_PASSWORD}><RecoveryPass/></Route>
          <Route path={router.HOME}><Root/></Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default hot(module)(App);
