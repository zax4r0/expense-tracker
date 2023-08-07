import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export type ParamsType = {
  type?: string
  text?: string
  category?: string
  status?: string
  is_active?: string
  shop_id?: string
  limit?: number
}

/**
 * This is an Axios instance created using the axios.create() method.
 * It has a base URL and headers that are set to accept and send JSON data.
 * @type {Object} - An instance of the Axios library.
 * @property {Object} headers - The default headers for all requests made with this instance.
 * @property {string} headers.Accept - The accept header, set to 'application/json'.
 * @property {string} headers.Content-Type - The content-type header, set to 'application/json'.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// Change request data/error here
Axios.interceptors.request.use(
  (config: any) => {
    const token = ''
    config.headers = {
      ...config.headers,
      // Authorization: `Bearer ${token ? token : ""}`,
      Authorization: `jwt ${token ? token : ''}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response && error.response.data.message === 'PIXER_ERROR.NOT_AUTHORIZED')
    ) {
    }
    return Promise.reject(error)
  }
)

/**
 * The HttpClient class provides methods for making HTTP requests using the AxiosC instance.
 * The methods are:
 *
 * - `get(url: string, params?: any): Promise<any>`
 *
 * - `post(url: string, data: any, options?: AxiosRequestConfig): Promise<any>`
 *
 * - `put(url: string, data: any): Promise<any>`
 *
 * - `patch(url: string, data: any): Promise<any>`
 *
 * - `delete(url: string): Promise<any>`
 *
 * They all return the response data from the server.
 */
export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params })
    return response.data
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options)
    return response.data
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data)
    return response.data
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await Axios.patch<T>(url, data)
    return response.data
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url)
    return response.data
  }
}
