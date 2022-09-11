const { defineConfig } = require('@vue/cli-service')
const path = require("path")
const fs = require("fs")

module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // https: {
    //   key: fs.readFileSync(path.join(__dirname,'src/ssl/cert.key')),
    //   cert: fs.readFileSync(path.join(__dirname,'src/ssl/cert.crt')),
    // },
    proxy:{
      '/api':{
        target:"https://api.map.baidu.com",
        changeOrigin:true,
        ws:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
