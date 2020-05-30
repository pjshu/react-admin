import {
  configureStore,
  getDefaultMiddleware,
  isPlain,
  createSerializableStateInvariantMiddleware,
  combineReducers
} from '@reduxjs/toolkit';

import globalReducer from './globalSlice';
import formReducer from './formSlice';
import {Iterable} from 'immutable';

const isSerializable = value => Iterable.isIterable(value) || isPlain(value);

const getEntries = value =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries
});

const staticReducers = {
  global: globalReducer,
  form: formReducer,
};

const asyncReducers = {};

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}

const store = configureStore({
  asyncReducers: {},

  reducer: createReducer(),
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  }), serializableMiddleware],
});

export const injectReducer = (key, asyncReducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(asyncReducers));
  }
};

export default store;
