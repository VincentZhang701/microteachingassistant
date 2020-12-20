import axios from 'axios'
import myApi from './myApi'
import { message } from 'ant-design-vue'

const instance = axios.create({
  baseURL: 'http://localhost:9090',
  timeout: 3000
})

const Http = {}

for (const key in myApi) {
  const api = myApi[key]
  Http[key] = async (params, config = {}) => {
    let response = {}
    try {
      response = await instance[api.method](api.url, params, config)
    } catch (err) {
      response = err
    }
    return response
  }
}

instance.interceptors.request.use(
  config => {
    message.info('请求中......')
    return config
  },
  err => {
    message.error('请求错误，请稍后重试')
    return err
  }
)

instance.interceptors.response.use(
  res => {
    message.success('请求成功')
    return res.data
  },
  err => {
    message.error('请求错误，请稍后重试')
    return err
  })

export default Http
