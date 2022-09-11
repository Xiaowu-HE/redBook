# redBook
一个模仿小红书的vue项目
## 问题
1. 路由激活时使用的css类名是根据路径来匹配 可能是因为 to="/" 引起的，active-class选择样式时根据路由中的路径去匹配，然后显示，例如在my页面中，路由为localhost:8080/#/my,那么to="/”和to="/my"都可以匹配到，所有都会激活选中样式
2. 本地配置代理
```js
devServer:{
    proxy:{
      '/api':{
        target:"https://api.map.baidu.com", // 需要代理的api接口
        changeOrigin:true,   				// 是否跨域 
        ws:true,
        pathRewrite:{						// 重写路径
          '^/api':''						// 把/api开头的url 替换
        }
      }
    }
  }
	// 如https://api.map.baidu.com/a/b/c
	// 请求路径 写成 /api/a/b/c
	// 代理后 会重定向到需要代理的api接口 请求路径中多出来的/api需要重写成空字符串
```
3. Object.上的方法直接调用

   如Object.assign()
4. 想要获取地理位置 需要https链接
    如何把本地http 转换成 https?
    通过mkcert 生成
    npm i -g mkcert
    mkcert create-ca,生成之后会看到一个ca.crt和ca.key文件
    利用刚刚生成的ca证书，再生成cert证书，mkcert create-cert，会在刚刚的路径下生成cert.crt和cert.key文件
    直接双击刚刚生成的ca.crt文件，弹出的界面中选择安装证书
    在弹窗中，选择“当前用户”或“本地计算机”均可，主要是下一步，选择“将所有的证书都放入下列存储”，并且选择为“受信任的根证书颁发机构”
    路点击完成，最后弹出点击“是”即可，到此证书安装成功了。
    将刚刚生成的cert.crt和cert.key两个拷贝到项目的src/ssl文件夹中，没有可以新建一个ssl目录
    vue2在vue.config.js中写入以下关键代码
    ![image-20220909160505537](H:\html\practice\Mywebsite\redBook\image-20220909160505537.png)
    记得导入path fs