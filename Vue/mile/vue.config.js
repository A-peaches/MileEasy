// vue.config.js 또는 webpack.config.js
const webpack = require('webpack');
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
        // 다른 플래그들을 여기에 추가하십시오.
      }),
    ],
  },
};
