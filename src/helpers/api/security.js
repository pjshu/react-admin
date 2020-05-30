// @flow
import {createGenerateApiFunc} from './axios';
import {api_security_string} from '../../config/security_api';

const api = {
  tags: '/tags%',
  tagsImage: '/images/tags%',
  allTags: '/posts/tags/all',
  posts: '/posts%',
  postsImage: '/images/posts%',
  user: '/user',
  resetPassword: '/user/password/reset',
  recoveryPassword: '/user/password/recovery',
  email: '/user/email',
  checkRegister: '/user/register',
  images: '/images%',
  sessions: '/sessions',
};

Object.keys(api).forEach(key => {
  api[key] = `/${api_security_string}` + api[key];
});

const generateApi = createGenerateApiFunc(api);

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
  deleteImage: generateApi('images', 'delete'),
  logout: generateApi('sessions', 'delete'),
};
