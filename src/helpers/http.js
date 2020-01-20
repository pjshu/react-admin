import axios from "axios";
import api from '../contants/api';

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
  console.log('error', error);
  // if (error.response.status === 504 || error.response.status === 404) {
  //   console.log("服务器被吃了⊙﹏⊙∥");
  // } else if (error.response.status === 401) {
  //   console.log("登录信息失效⊙﹏⊙∥");
  // } else if (error.response.status === 500) {
  //   console.log("服务器开小差了⊙﹏⊙∥");
  // }
  return Promise.reject(error);
});

/**
 *
 * @param {Object} params 路径参数
 * @param params.orderBy
 * @param {Array} params.filters
 * @param {string} params.orderDirection
 * @param {string} params.search 搜索词
 * @param {number} params.pageSize 每页大小
 * @param {number} params.page 页码号
 * @param {number} params.totalCount 总页数
 * @returns {Promise<AxiosResponse<T>>}
 */
const requirePosts = async (params) => {
  return await axios.get(api.posts, {params: params});
};
//获取一篇文章
const requirePost = async (postId) => {
  return await axios.get(api.post, {params: {postId}});
};

// data 包含 postId
const modifyPost = async (data) => {
  return await axios.put(api.post, {data: data});
};

const deletePost = async (postId) => {
  return await axios.delete(api.post, {data: {postId}});
};

const addNewPost = async () => {
  return await axios.post(api.post);
};

// 获取所有标签[仅包含标签名]
const requireAllTags = async () => {
  return await axios.get(api.allTags);
};

// 获取所有标签[包含标签以及详细信息]
const requireTags = async (params) => {
  return await axios.get(api.tags, {params: params});
};

const deleteTag = async (tagId) => {
  return await axios.delete(api.tags, {data: {tagId}});
};

const modifyTag = async (data) => {
  return await axios.put(api.tags, {data: data});
};

const addNewTag = async (data) => {
  return await axios.post(api.tags, {data: data});
};

const login = async (auth) => {
  return await axios.post(api.login, {data: {...auth}});
};

const logout = async () => {
  return await axios.get(api.logout);
};


export default axios;
export {
  requirePosts,
  modifyPost,
  deletePost,
  addNewPost,
  requirePost,
  requireAllTags,
  requireTags,
  deleteTag,
  modifyTag,
  addNewTag,
  login,
  logout
};
