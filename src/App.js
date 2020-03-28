import React, {lazy, Suspense} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import history from "./history";
import Loading from "./components/Loading";
import {hot} from 'react-hot-loader';
import MessageQueue from './containers/MessageQueue';
import * as Sentry from '@sentry/browser';
import security from './config/security';
import ErrorBoundaries from './components/ErrorBoundaries';


Sentry.init({dsn: security.dsn});

const Root = lazy(() => import("./components/nav/"));
const Register = lazy(() => import("./containers/register"));
const Login = lazy(() => import("./containers/login"));
const RecoveryPass = lazy(() => import("./containers/recoveryPass/RecoveryPassword"));

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router history={history}>
        <ErrorBoundaries>
          <MessageQueue/>
          <Switch>
            <Route path={router.LOGIN}><Login/></Route>
            <Route path={router.REGISTER}><Register/></Route>
            <Route path={router.RECOVER_PASSWORD}><RecoveryPass/></Route>
            <Route path={router.ADMIN}><Root/></Route>
          </Switch>
        </ErrorBoundaries>
      </Router>
    </Suspense>
  );
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
