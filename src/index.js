import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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

ReactDOM.render(<App/>, root);

// ReactDOM.createRoot(
//   root
// ).render(<App/>);
