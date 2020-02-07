import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'// 基础路径
})

request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    console.log('未转化完成', err)

    return {}
  }
}]

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401) {
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirenctLogin()
      return
    }
    try {
      const { data } = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUser', user)

      return request(error.config)
    } catch (error) {
      redirenctLogin()
      // router.push('/login')
    }
  }
  return Promise.reject(error)
})

function redirenctLogin () {
  router.push({
    name: 'tab-bar',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
