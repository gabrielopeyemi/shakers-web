import axios from 'axios';
import { serverAPI } from '../Config/APIKEYS';

export interface ServerPostArgs<DataType> {
  url: string;
  token?: string;
  data?: DataType;
  contentType?: 'multipart/form-data';
}

export interface ServerGetArgs<DataType> {
  url: string;
  token?: any;
  params?: DataType;
  contentType?: 'multipart/form-data';
}

// This will intercept every AXIOS Response and then you can do anything with it
const axiosCreate: any = axios.create({
  baseURL: serverAPI,
});

export const server: any = {
  post<T = any>({
    url,
    data,
    token,
    contentType = undefined,
  }: ServerPostArgs<T>) {
    return axiosCreate.post(url, data, {
      headers: token
        ? {
            'content-type': contentType,
            Authorization: 'Bearer ' + token,
          }
        : undefined,
    });
  },

  get<T = any>({
    url,
    params,
    token,
    contentType = undefined,
  }: ServerGetArgs<T>) {
    return axiosCreate.get(url, {
      headers: token
        ? {
            'content-type': contentType,
            Authorization: 'Bearer ' + token,
          }
        : undefined,
      params,
    });
  },
};
