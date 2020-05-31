import {createGenerateApiFunc} from './axios';

const api = {
  sessions: '/sessions',
  recoveryPassword: '/user/password/recovery',
  checkRegister: '/user/register',
  user: '/user',
};
const generateApi = createGenerateApiFunc(api);

export default {
  login: generateApi('sessions', 'post'),
  auth: generateApi('sessions', 'get'),
  register: generateApi('user', 'post'),
  sendRecPassCode: generateApi('recoveryPassword', 'get'),
  RecPassword: generateApi('recoveryPassword', 'put'),
  checkRegister: generateApi('checkRegister', 'get'),
};
