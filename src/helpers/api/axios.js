// @flow
import axios from "axios";
import {toLogin} from "../../history";

let base = '/admin/api/';
let localhost = 'http://127.0.0.1:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

if (process.env.NODE_ENV === 'development') {
  base = localhost + base;
} else {
  // 开发环境debug老时间超限,所以开发环境不设置超限时间
  axios.defaults.timeout = 16000;
}

axios.defaults.baseURL = base;

axios.interceptors.request.use(config => {
  const identify = localStorage.identify;
  const Authorization = localStorage.Authorization;
  if (identify && Authorization) {
    config.headers.identify = identify;
    config.headers.Authorization = `Bearer ${Authorization}`;
  }
  return config;
}, error => {
  //请求超时
  return Promise.resolve(error);
});

axios.interceptors.response.use(res => {
  const data = res.data;
  if (data.data && data.data.id && data.data.token) {
    localStorage.setItem('identify', data.data.id);
    localStorage.setItem('Authorization', data.data.token);
  }
  return data;
}, error => {
  const data = error.response;
  if (data) {
    const status = data.status;
    if (status === 401) {
      toLogin();
    }
  }
  return Promise.resolve(error.response);
});


export const createGenerateApiFunc = (api) =>
  (resource: string, method: string = 'get', type: string, ...config) =>
    (data: Object = null, id = null) => {
      if (type === 'form') {
        config.push({
          headers: {'Content-Type': 'multipart/form-data'}
        });
      }
      const url = api[resource].replace('%', id ? `/${id}` : '');
      return method === 'get' ?
        axios({method, url, params: data, ...config}) :
        axios({method, url, data: data, ...config});
    };
