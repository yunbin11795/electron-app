
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface customConfig {
  notCancel?:boolean
}

interface MyAxiosRequestConfig<D = any> extends AxiosRequestConfig {
  customConfig?: customConfig,
  data?: D;
}

export interface MyAxiosInstance extends AxiosInstance {
  <T = any, R = AxiosResponse<T>, D = any>(config: MyAxiosRequestConfig<D>): Promise<R>;
}

export interface MyInternalAxiosRequestConfig extends InternalAxiosRequestConfig{
  customConfig?:customConfig
}
