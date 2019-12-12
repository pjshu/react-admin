import React from 'react';
import store from './redux/configureStore';
import {Provider} from 'react-redux';
import Root from "./Router";
import { hot } from 'react-hot-loader/root'

function App() {
  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
