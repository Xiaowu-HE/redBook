// 二次封装axios
import axios from "axios"

const Axios = axios.create({
  timeout: 5000,
})

// 添加请求拦截器 在发送请求之前做些什么
Axios.interceptors.request.use(function(config){
  // console.log(config);
  return config
},function(error){

  return Promise.reject(error.message)
})

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // console.log(response);
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error.message);
});

export default Axios