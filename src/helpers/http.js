import axios from "axios";
import {toLogin} from "../history";

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
  return res.data;
}, error => {
  const data = error.response;
  if (data) {
    const status = data.status;
    if (status === 401) {
      toLogin();
    } else if (status === 401) {
      // toAdmin();
    }
  }
  return Promise.resolve(error.response);
});

export const api = {
  tags: '/tags%',
  tagsImage: '/images/tags%',
  allTags: '/posts/tags/all',
  posts: '/posts%',
  postsImage: '/images/posts%',
  sessions: '/sessions',
  user: '/user',
  resetPassword: '/user/password/reset',
  recoveryPassword: '/user/password/recovery',
  email: '/user/email',
  checkRegister: '/user/register',
  images: '/images%',
};
const generateApi = (resource, method = 'get', type, ...config) => (data = null, id = null) => {
  if (type === 'form') {
    config.push({
      headers: {'Content-Type': 'multipart/form-data'}
    });
  }
  const url = api[resource].replace('%', id ? `/${id}` : '');
  return method === 'get' ?
    /**
     * @param data {Object}
     */
    axios({method, url, params: data, ...config}) :
    axios({method, url, data: data, ...config});
};

export default {
  queryPosts: generateApi('posts', 'get'),
  getPost: generateApi('posts', 'get'),
  modifyPost: generateApi('posts', 'put'),
  deletePost: generateApi('posts', 'delete'),
  addPost: generateApi('posts', 'post'),
  getAllTags: generateApi('allTags', 'get'),
  queryTags: generateApi('tags', 'get'),
  deleteTag: generateApi('tags', 'delete'),
  modifyTag: generateApi('tags', 'put'),
  addTag: generateApi('tags', 'post'),
  addTagImg: generateApi('tagsImage', 'post', 'form'),
  addPostImg: generateApi('postsImage', 'post', 'form'),
  checkRegister: generateApi('checkRegister', 'get'),
  login: generateApi('sessions', 'post'),
  logout: generateApi('sessions', 'delete'),
  auth: generateApi('sessions', 'get'),
  register: generateApi('user', 'post'),
  modifyUserInfo: generateApi('user', 'patch'),
  getUserInfo: generateApi('user', 'get'),
  resetPassword: generateApi('resetPassword', 'patch'),

  sendRecPassCode: generateApi('recoveryPassword', 'get'),
  RecPassword: generateApi('recoveryPassword', 'put'),

  // 修改邮箱时调用,发送验证码
  sendRestEmailCode: generateApi('email', 'get'),
  // 修改邮箱时调用(带上验证码与新邮箱地址)
  resetEmail: generateApi('email', 'put'),
  // 添加新邮箱时调用
  addEmail: generateApi('email', 'post'),

  addImages: generateApi('images', 'post', 'form'),
  queryImages: generateApi('images', 'get'),
  modifyImageInfo: generateApi('images', 'put'),
  deleteImage: generateApi('images', 'delete')
};
