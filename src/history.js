import router from './contants/router';

const createBrowserHistory = require('history').createBrowserHistory;

const history = createBrowserHistory();
const toAdmin = () => {
  history.push(router.ADMIN);
};


const toPost = (postId) => {
  history.push(`${router.ADMIN_POST}/${postId}`);
};

const toLogin = () => {
  history.push(router.LOGIN);
};

const toRecoveryPass = () => {
  history.push(router.RECOVER_PASSWORD);
};
export {toAdmin, toPost, toLogin, toRecoveryPass};
export default history;
