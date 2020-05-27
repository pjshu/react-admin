import {
  configureStore,
  getDefaultMiddleware,
  isPlain,
  createSerializableStateInvariantMiddleware
} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import tagReducer from './tagSlice';
import globalReducer from './globalSlice';
import imagesReducer from './imageSlice';
import formReducer from './formSlice';
import {Iterable} from 'immutable';

const isSerializable = value => Iterable.isIterable(value) || isPlain(value);

const getEntries = value =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries
});


export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    tag: tagReducer,
    global: globalReducer,
    images: imagesReducer,
    form: formReducer
  },
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  }), serializableMiddleware],
});
