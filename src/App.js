import React from 'react';
import store from './redux/configureStore';
import {Provider} from 'react-redux';
import Root from "./components/Nav";
import {hot} from 'react-hot-loader/root';
import CssBaseline from "@material-ui/core/CssBaseline";
import './global.css'

function App() {
  return (
    <Provider store={store}>
      <CssBaseline/>
      <Root/>
    </Provider>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;
