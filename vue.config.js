module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://111.229.137.7:9091/',//后台接口
        ws: true,
        changOrigin: true, 
        pathRewrite: {
            '^/api': '' 
        }
      }
    }
  }
}