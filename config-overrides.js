const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const path = require('path');

// 打包参考 https://juejin.im/post/5c00916f5188254caf186f80

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env);
  config.resolve.alias = {
    ...config.resolve.alias,
    'immutable': path.resolve(process.cwd(), 'node_modules', 'immutable'),
    // 'react-dom@experimental': '@hot-loader/react-dom',
    'react-dom': 'react-dom'
  };
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      chunks: 'all',   // initial、async和all
      minSize: 30000, // 形成一个新代码块最小的体积
      maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数
      maxInitialRequests: 3,   // 最大初始化请求数
      automaticNameDelimiter: '~',   // 打包分割符
      name: true,
      cacheGroups: {
        vendors: { // 打包两个页面的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'vendors', // 分离包的名字
          chunks: 'all'
        }
        // braftEditor: {
        //   test: /braft/,
        //   priority: 100,
        //   name: 'braftEditor',
        //   chunks: 'async'
        // },
        // vendors: { // 项目基本框架等
        //   chunks: 'all',
        //   test: /(react|react-dom|react-dom-router|redux)/,
        //   priority: 101,
        //   name: 'vendors',
        // },
        // 'async-commons': {  // 异步加载公共包、组件等
        //   chunks: 'async',
        //   minChunks: 2,
        //   name: 'async-commons',
        //   priority: 90,
        // },
        // commons: { // 其他同步加载公共包
        //   chunks: 'all',
        //   minChunks: 2,
        //   name: 'commons',
        //   priority: 80,
        // }
      }
    }
  };
  return config;
};
