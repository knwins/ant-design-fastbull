export default {
  dev: {
    '/api/': {     
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'https//front.xniu.io',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
