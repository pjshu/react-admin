import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import article from "./modules/article";

const ReduxThunk = require('redux-thunk').default;
const reducer = combineReducers({
  article
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(ReduxThunk)
));

export default store;
