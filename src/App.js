import React, {lazy, Suspense, useReducer} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import history from "./history";
import {Loading} from "./components";
import {hot} from 'react-hot-loader';
import MessageQueue from './containers/messageQueue/MessageQueue';
import ErrorBoundaries from './components/ErrorBoundaries';
import EditorContext, {action, defaultValue, reducer} from "./redux/editorState";
import {Provider} from 'react-redux';
import store from "./redux/store";


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
});

export default hot(module)(App);
// export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
