import React, {lazy, Suspense} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import history from "./history";
import Loading from "./components/Loading";
import {hot} from 'react-hot-loader';
import MessageQueue from './containers/messageQueue/MessageQueue';
import ErrorBoundaries from './components/ErrorBoundaries';
import {Provider} from 'react-redux';
import store from "./redux/store";
import Login from "./containers/login";

const Root = lazy(() => import("./components/nav"));
const Register = lazy(() => import("./containers/register"));
// const Login = lazy(() => import("./containers/login"));
const RecoveryPass = lazy(() => import("./containers/recoveryPass"));

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}


export default hot(module)(App);
