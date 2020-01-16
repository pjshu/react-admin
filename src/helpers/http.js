import axios from "axios";
import api from '../contants/api';
import {options} from "../config/tableConfig";

let base = '/api';
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
  return Promise.reject(error);
});

axios.interceptors.response.use(data => {
  return data;
}, error => {
  if (error.response.status === 504 || error.response.status === 404) {
    console.log("服务器被吃了⊙﹏⊙∥");
  } else if (error.response.status === 401) {
    console.log("登录信息失效⊙﹏⊙∥");
  } else if (error.response.status === 500) {
    console.log("服务器开小差了⊙﹏⊙∥");
  }
  return Promise.reject(error);
});

// 分页获取文章
const requirePosts = async (page = 1, pageSize = options.pageSize) => {
  return await axios.get(api.posts, {params: {...{page, pageSize}}});
};
//获取一篇文章
const requirePost = async (postId) => {
  return await axios.get(api.post, {params: {postId}});
};
const modifyPost = async (data) => {
  return await axios.put(api.post, {data: data});
};

const deletePost = async (id) => {
  return await axios.delete(api.post, {data: id});
};

const newPost = async (time) => {
  return await axios.post(api.post, {data: time});
};

export default axios;
export {
  requirePosts,
  modifyPost,
  deletePost,
  newPost,
  requirePost
};
