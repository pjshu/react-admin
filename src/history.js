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

const toPreView = () => {
  history.push();
};
export {toAdmin, toPost, toLogin, toPreView};
export default history;
