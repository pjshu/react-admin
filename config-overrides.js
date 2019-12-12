const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const {useBabelRc, override} = require('customize-cra');

/* config-overrides.js */
module.exports = {
  webpack: function override(config, env) {
    config = rewireReactHotLoader(config, env);
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': "@hot-loader/react-dom"
    };
    return config;
  },
  babel: override(
    useBabelRc()
  )
};
