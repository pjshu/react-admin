import router from './contants/router';

const createBrowserHistory = require('history').createBrowserHistory;

const history = createBrowserHistory();
const toAdmin = () => {
  history.push(router.ADMIN);
};

const toPost = (postId, search) => {
  history.push({
    pathname: `${router.ADMIN_POST}/${postId}`,
    search: search ? `?${search}` : ''
  });
};


export {toAdmin, toPost};
export default history;
