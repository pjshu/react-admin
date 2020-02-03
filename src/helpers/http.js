import axios from "axios";
import api from '../contants/api';
import {toAdmin, toLogin} from "../history";


let base = '/api/admin/';
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
  const identify = localStorage.getItem('identify');
  const Authorization = localStorage.getItem('Authorization');
  if (identify && Authorization) {
    config.headers.identify = identify;
    config.headers.Authorization = Authorization;
  }
  return config;
}, error => {
  //请求超时
  return Promise.resolve(error);
});

axios.interceptors.response.use(res => {
  return res.data;
}, error => {
  const data = error.response;
  if (data) {
    const status = data.status;
    if (status === 401) {
      toLogin();
    } else if (status === 401) {
      toAdmin();
    }
  }
  return Promise.resolve(error.response);
});

const generateApi = (url, method) => {
  /**
   * @param data {Object}
   */
  return (data = null) => {
    return method === 'get' ?
      axios({method, url, params: data}) :
      axios({method, url, data: data});
  };
};

const API = {
  getPosts: generateApi(api.posts, 'get'),
  getPost: generateApi(api.post, 'get'),
  modifyPost: generateApi(api.post, 'put'),
  deletePost: generateApi(api.post, 'delete'),
  addPost: generateApi(api.post, 'post'),
  getAllTags: generateApi(api.allTags, 'get'),
  getTags: generateApi(api.tags, 'get'),
  deleteTag: generateApi(api.tags, 'delete'),
  modifyTag: generateApi(api.tags, 'put'),
  addTag: generateApi(api.tags, 'post'),
  login: generateApi(api.login, 'post'),
  logout: generateApi(api.logout, 'get'),
  register: generateApi(api.register, 'post'),
  auth: generateApi(api.auth, 'get'),
  modifyUserInfo: generateApi(api.userInfo, 'put'),
  getUserInfo: generateApi(api.userInfo, 'get')
};

export default API;
