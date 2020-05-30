import {createGenerateApiFunc} from './axios';

const api = {
  sessions: '/sessions',
};
const generateApi = createGenerateApiFunc(api);

export default {
  login: generateApi('sessions', 'post'),
  auth: generateApi('sessions', 'get'),
};
