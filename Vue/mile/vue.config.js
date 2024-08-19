const webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: '../../SpringBoot/src/main/resources/static', // npm run build

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },

  // 개발 서버 설정
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090', // Spring Boot 서버 주소
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
        ws: false,
      },
    },
  },
};
