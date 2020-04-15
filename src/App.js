import React, {lazy, Suspense, useReducer} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import {Loading} from "./components";
import {hot} from 'react-hot-loader';
import MessageQueue from './containers/messageQueue/MessageQueue';
import security from './config/security';
import ErrorBoundaries from './components/ErrorBoundaries';
import EditorContext, {defaultValue, reducer, action} from "./redux/editorState";
import {Provider} from 'react-redux';
import store from "./redux/store";


// sentry sdk 检测报错信息
//https://sentry.io/
if (process.env.NODE_ENV !== "development") {
  const Sentry = require('@sentry/browser');
  Sentry.init({dsn: security.dsn});
}

const Root = lazy(() => import("./components"));
const Register = lazy(() => import("./containers/register"));
const Login = lazy(() => import("./containers/login"));
const RecoveryPass = lazy(() => import("./containers/recoveryPass/RecoveryPassword"));

const App = React.memo(function App() {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  return (
    <Provider store={store}>
      <EditorContext.Provider value={{state, dispatch, action}}>
        <ContextApp/>
      </EditorContext.Provider>
    </Provider>

  );
});

const ContextApp = React.memo(function ContextApp() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router>
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
});

// export default App
export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
