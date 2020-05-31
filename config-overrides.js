const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const path = require('path');

// 打包参考 https://juejin.im/post/5c00916f5188254caf186f80

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env);
  config.resolve.alias = {
    ...config.resolve.alias,
    'immutable': path.resolve(process.cwd(), 'node_modules', 'immutable'),
    // 'react-dom@experimental': '@hot-loader/react-dom',
    // 'react-dom': 'react-dom'
  };
  config.externals = {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'immutable': 'immutable',
    // 'axios': 'axios'
  };
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      ...config.optimization.splitChunks,
      minSize: 0,
      maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数
      cacheGroups: {
        vendors: {// 项目基本框架等
          test: /(\/(react|react-redux|redux|@reduxjs|yup|react-dom|immutable|react-router-dom|axios)[\\/])|(src\/components\/Form.js|helpers\/api\/axios.js|helpers\/api\/common.js)/i,
          chunks: 'all',
          name: 'common',
          priority: 11,
          reuseExistingChunk: true,
        },
        editor: {
          test: /\/((draft-convert|draft-js|braft-editor|braft-utils|braft-finder|braft-extensions|prismjs|marked|components\/editor)[\\/])|(config\/editor.js|config\/marked.js)/i,
          chunks: 'all',
          name: 'editor',
          priority: 10,
          reuseExistingChunk: true,
        },
        'async-commons': {  // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 2,
          name: 'async-commons',
          priority: 9,
          reuseExistingChunk: true,
        },
        common: { // 打包两个页面的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'common', // 分离包的名字
          chunks: 'all',
          priority: 8,
        },
        // security: {
        //   test: /(helpers\/api\/security.js|config\/security_api.js)/i,
        //   chunks: 'all',
        //   name: 'security',
        //   priority: 1000,
        //   reuseExistingChunk: true,
        //   minSize: 0
        // },
      }
    }
  };
  return config;
};
