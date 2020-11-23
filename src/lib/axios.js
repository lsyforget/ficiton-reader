import Vue from 'vue'
import axios from 'axios'
import { hideLoading, showLoading } from './loading'

const strBaseURL = '/api'

const ajax = axios.create({
  baseURL: strBaseURL // 配置请求路由前缀
})

ajax.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
ajax.defaults.retry = 4
ajax.defaults.retryDelay = 1000

/* 请求拦截器 */

ajax.interceptors.request.use(
  function (config) {
    // 每次请求时会从localStorage中获取token
    // let token = store.state.token;
    // if (token) {
    //   //token = 'bearer' + ' ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中
    //   config.headers.common['Authorization'] = token;
    // }
    showLoading()
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// /* 响应拦截器 */

ajax.interceptors.response.use(
  function (response) {
    // ①10010 token过期（30天） ②10011 token无效
    hideLoading()
    // if (response.data.code === 10010 || response.data.code === 10011) {
    //   Storage.localRemove('token'); // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
    //   router.replace({
    //     path: '/login', // 到登录页重新获取token
    //   });
    // } else if (response.data.token) {
    //   // 判断token是否存在，如果存在说明需要更新token
    //   hideLoading();
    //   Storage.localSet('token', response.data.token); // 覆盖原来的token(默认一天刷新一次)
    // }
    return response
  },
  function (error) {
    hideLoading()
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = ajax
export default ajax
