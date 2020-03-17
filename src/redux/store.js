import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import tagReducer from './tagSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    tag: tagReducer
  },
});
