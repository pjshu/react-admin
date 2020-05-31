// @flow
import {api_security_string} from '../../config/security_api';
import {createGenerateApiFunc} from './axios'

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
  modifyUserInfo: generateApi('user', 'patch'),
  getUserInfo: generateApi('user', 'get'),
  resetPassword: generateApi('resetPassword', 'patch'),
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
