import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from 'axios'

export interface AxiosDefaultConfig {
  baseURL?: string
  timeout?: number
  responseType?: ResponseType
  retry?: boolean
  headers: {
    [key: string]: string
  }
}

type Header = { accept: string; contentType?: string }

export interface IAxiosClient {
  addAuth(bearer: string): IAxiosClient
  addHeader(header: Header): IAxiosClient
  get<TResponse>(path: string): Promise<TResponse>
  post<TRequest, TResponse>(
    path: string,
    body: TRequest,
    config?: AxiosRequestConfig<TRequest>,
  ): Promise<TResponse>
  delete<TResponse>(path: string): Promise<TResponse>
  put<TRequest, TResponse>(
    path: string,
    body: TRequest,
    config?: AxiosRequestConfig<TRequest>,
  ): Promise<TResponse>
  patch<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse>
}

export class AxiosClient implements IAxiosClient {
  private client: AxiosInstance

  constructor(config: AxiosDefaultConfig) {
    this.client = axios.create({ ...config })
  }

  addAuth(bearer: string): this {
    this.client.defaults.headers.common.Authorization = `Bearer ${bearer}`
    return this
  }

  addHeader(header: Header) {
    this.client.defaults.headers.common.Accept = header.accept

    const defaultContentType = this.client.defaults.headers.common[
      'Content-Type'
    ]

    this.client.defaults.headers.common['Content-Type'] = header.contentType
      ? header.contentType
      : defaultContentType

    return this
  }

  async put<TRequest, TResponse>(
    path: string,
    body: TRequest,
    config?: AxiosRequestConfig<TRequest>,
  ): Promise<TResponse> {
    const { data } = await this.client.put<TResponse>(path, body, config)
    return data
  }

  async post<TRequest, TResponse>(
    path: string,
    body: TRequest,
    config?: AxiosRequestConfig<TRequest>,
  ): Promise<TResponse> {
    const { data } = await this.client.post<TResponse>(path, body, config)
    return data
  }

  async delete<TResponse>(path: string): Promise<TResponse> {
    const { data } = await this.client.delete<TResponse>(path)
    return data
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    const { data } = await this.client.get<TResponse>(path)
    return data
  }

  async patch<TRequest, TResponse>(
    path: string,
    body: TRequest,
  ): Promise<TResponse> {
    const { data } = await this.client.patch<TResponse>(path, body)
    return data
  }
}
