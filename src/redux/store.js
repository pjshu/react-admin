import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import tagReducer from './tagSlice';
import globalReducer from './globalSlice';
import imagesReducer from './imageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    tag: tagReducer,
    global: globalReducer,
    images: imagesReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
    // {
    // ignoredActions: [changePostFormField, changePostFormError, clearPostFormError]
    // }
  }),
});
