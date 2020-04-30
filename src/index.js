import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {registerSentrySDK} from './config/security';

registerSentrySDK();
// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     trackExtraHooks: [[require('react-redux/lib'), 'useSelector']],
//   });
// }

// experimental 模式hot loader无效
const root = document.getElementById('root');

ReactDOM.createRoot(
  root
).render(<App/>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
