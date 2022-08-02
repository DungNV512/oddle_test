import axios, { AxiosRequestConfig } from 'axios'
import config from 'config'

const createService = (
  config?: AxiosRequestConfig,
  skipInterceptorResponse = false,
) => {
  const instance = axios.create(config)
  if (!skipInterceptorResponse) {
    instance.interceptors.response.use(
      (response) => response, // wrap response, error
      (error) => { 
        return Promise.reject(error?.response)
      },
    )
  }
  return instance
}

const axiosService = createService({
  baseURL: config.apiEndpoint,
  headers: {
    'Authorization': `token ${config.githubToken}`
  },
  timeout: 60000,
})
export default axiosService
