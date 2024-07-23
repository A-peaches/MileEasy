// vue.config.js 또는 webpack.config.js
const webpack = require('webpack');
module.exports = {
  configureWebpack: {
    plugins: [
      // 예시: DefinePlugin을 사용하는 경우
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      })
      // 여기에 추가적인 플러그인이나 설정을 추가할 수 있습니다.
    ]
  }
};
