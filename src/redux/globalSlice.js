import {createSlice} from '@reduxjs/toolkit';
import getCurrentTime from "../helpers/datetime";
import {v4 as uuidV4} from 'uuid';
import {fromJS, Map} from "immutable";

const setTimeAndIdState = (payload, state) => {
  payload.time = getCurrentTime('second');
  payload.id = uuidV4();
  payload.state = state;
};

export const slice = createSlice({
  name: 'global',
  initialState: fromJS({
    /*message exp
     * state.info 表示正在加载
    * {state:'success/info(loading)/error', message:'', time:'', id:''}
    * */
    message: [],
  }),
  reducers: {
    addMessage(state, action) {
      const payload = action.payload;
      if (!payload.hasOwnProperty('time')) {
        payload.time = getCurrentTime('second');
      }
      if (!payload.hasOwnProperty('id')) {
        payload.id = uuidV4();
      }
      return state.update('message', (value) => value.push(Map(payload)));
    },
    addWarningMessage(state, action) {
      const payload = {message: action.payload};
      setTimeAndIdState(payload, 'warning');
      return state.update('message', (value) => value.push(Map(payload)));
    },
    //传入message
    addSuccessMessage(state, action) {
      const payload = {message: action.payload};
      setTimeAndIdState(payload, 'success');
      return state.update('message', (value) => value.push(Map(payload)));
    },
    // 传入message
    addErrorMessage(state, action) {
      const payload = {message: action.payload};
      setTimeAndIdState(payload, 'error');
      return state.update('message', (value) => value.push(Map(payload)));
    },
    //传入{id:'',message:''}
    addLoadingMessage(state, action) {
      const payload = action.payload;
      payload.time = getCurrentTime('second');
      payload.state = 'info';
      return state.update('message', (value) => value.push(Map(payload)));
    },
    setMessageState(state, action) {
      const payload = action.payload;
      return state.update('message', value => {
        return value.map(item =>
          item.get('id') === payload.id ? item.merge(payload) : item
        );
      });
    },
    removeMessage(state, action) {
      return state.update('message', value => value.filter(item => item.get('id') !== action.payload));
    },
    clearAllMessage(state) {
      // 不清空正在加载的消息条
      return state.update('message', value => value.filter(item => item.get('state') === 'info'));
    }
  }
});
export const {addWarningMessage, addErrorMessage, addLoadingMessage, addSuccessMessage} = slice.actions;
export const {removeMessage, setMessageState, clearAllMessage} = slice.actions;
export const selectMessage = state => state.global.get('message');

export default slice.reducer;
