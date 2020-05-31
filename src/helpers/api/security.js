// @flow
import {api_security_string} from '../../config/security_api';
import {createGenerateApiFunc} from './axios';

const api = {
  tags: '/tags%',
  tagsImage: '/images/tags%',
  allTags: '/posts/tags/all',
  posts: '/posts%',
  postsImage: '/images/posts%',
  user: '/user',
  resetPassword: '/user/password/reset',
  email: '/user/email',
  images: '/images%',
  sessions: '/sessions',
};

Object.keys(api).forEach(key => {
  api[key] = `/${api_security_string}` + api[key];
});

const generateApi = createGenerateApiFunc(api);
const queryPosts = generateApi('posts', 'get');
const getPost = generateApi('posts', 'get');
const modifyPost = generateApi('posts', 'put');
const deletePost = generateApi('posts', 'delete');
const addPost = generateApi('posts', 'post');
const getAllTags = generateApi('allTags', 'get');
const queryTags = generateApi('tags', 'get');
const deleteTag = generateApi('tags', 'delete');
const modifyTag = generateApi('tags', 'put');
const addTag = generateApi('tags', 'post');
const addTagImg = generateApi('tagsImage', 'post', 'form');
const addPostImg = generateApi('postsImage', 'post', 'form');
const modifyUserInfo = generateApi('user', 'patch');
const getUserInfo = generateApi('user', 'get');
const resetPassword = generateApi('resetPassword', 'patch');
// 修改邮箱时调用,发送验证码
const sendRestEmailCode = generateApi('email', 'get');
// 修改邮箱时调用(带上验证码与新邮箱地址)
const resetEmail = generateApi('email', 'put');
// 添加新邮箱时调用
const addEmail = generateApi('email', 'post');

const addImages = generateApi('images', 'post', 'form');
const queryImages = generateApi('images', 'get');
const modifyImageInfo = generateApi('images', 'put');
const deleteImage = generateApi('images', 'delete');
const logout = generateApi('sessions', 'delete');
export {
  queryPosts,
  getPost,
  modifyPost,
  deletePost,
  addEmail,
  addImages,
  addPost,
  addPostImg,
  addTag,
  addTagImg,
  deleteImage,
  deleteTag,
  getAllTags,
  getUserInfo,
  logout,
  modifyImageInfo,
  modifyTag,
  modifyUserInfo,
  queryImages,
  queryTags,
  resetEmail,
  resetPassword,
  sendRestEmailCode,
};
