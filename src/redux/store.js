import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import tagReducer from './tagSlice';
import globalReducer from './globalSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    tag: tagReducer,
    global: globalReducer
  },
});
