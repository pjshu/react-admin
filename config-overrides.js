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
  config.externals = [
    {
      module: 'immutable',
      entry: 'https://cdn.bootcdn.net/ajax/libs/immutable/3.8.2/immutable.min.js',
      global: 'immutable'
    },
    {
      module: 'react-dom',
      entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/cjs/react-dom.production.min.js',
      global: 'react-dom'
    },
  ];
  // }
  // config.optimization = {
  //   ...config.optimization,
  //   splitChunks: {
  //     chunks: 'all',   // initial、async和all
  //     minSize: 30000, // 形成一个新代码块最小的体积
  //     maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数
  //     maxInitialRequests: 3,   // 最大初始化请求数
  //     automaticNameDelimiter: '~',   // 打包分割符
  //     name: true,
  //     cacheGroups: {
  //       vendors: { // 打包两个页面的公共代码
  //         minChunks: 2, // 引入两次及以上被打包
  //         name: 'vendors', // 分离包的名字
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // };
  return config;
};
