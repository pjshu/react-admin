import axios from "axios";
import api from '../contants/api';
import history from "../history";
import router from '../contants/router';

let base = '/api/admin/';
let localhost = 'http://127.0.0.1:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 8000;

if (process.env.NODE_ENV === 'development') {
  base = localhost + base;
}

axios.defaults.baseURL = base;

axios.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token;
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
  switch (data.status) {
    case 401:
      history.push(router.LOGIN);
      break;
    case 404:
      history.push(router.ADMIN);
      break;
    default:
      break;
  }
  return Promise.resolve(error.response);
});

const generateApi = (url, method) => {
  return (data = null) => {
    return method === 'get' ? axios({method, url, params: data}) : axios({method, url, data});
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
  logout: generateApi(api.logout, 'get')
};

export default API;
