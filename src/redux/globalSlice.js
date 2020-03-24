import {createSlice} from '@reduxjs/toolkit';
import getCurrentTime from "../helpers/datetime";
import {v4 as uuidV4} from 'uuid';

const setTimeAndIdState = (payload, state) => {
  payload.time = getCurrentTime('second');
  payload.id = uuidV4();
  payload.state = state;
};

export const slice = createSlice({
  name: 'global',
  initialState: {
    /*message exp
     * state.info 表示正在加载
    * {state:'success/info(loading)/error', message:'', time:'', id:''}
    * */
    message: [],
  },
  reducers: {
    addMessage(state, action) {
      const payload = action.payload;
      if (!payload.hasOwnProperty('time')) {
        payload.time = getCurrentTime('second');
      }
      if (!payload.hasOwnProperty('id')) {
        payload.id = uuidV4();
      }
      state.message.push(payload);
    },
    addWarningMessage(state, action) {
      const payload = {message: action.payload};
      setTimeAndIdState(payload, 'warning');
      state.message.push(payload);
    },
    //传入message
    addSuccessMessage(state, action) {
      const payload = {message: action.payload};
      setTimeAndIdState(payload, 'success');
      state.message.push(payload);
    },
    // 传入message
    addErrorMessage(state, action) {
      const payload = {message: action.payload};
      setTimeAndIdState(payload, 'error');
      state.message.push(payload);
    },
    //传入{id:'',message:''}
    addLoadingMessage(state, action) {
      const payload = action.payload;
      payload.time = getCurrentTime('second');
      payload.state = 'info';
      state.message.push(payload);
    },
    setMessageState(state, action) {
      const {id, state: state_, message} = action.payload;
      for (let item of state.message) {
        if (item.id === id) {
          item.state = state_;
          item.message = message;
        }
      }
    },
    removeMessage(state, action) {
      state.message = state.message.filter(item => item.id !== action.payload);
    },
    clearAllMessage(state) {
      // 不清空正在加载的消息条
      state.message = state.message.filter(item => item.state === 'info');
    }
  }
});
export const {addWarningMessage, addErrorMessage, addLoadingMessage, addSuccessMessage} = slice.actions;
export const {removeMessage, setMessageState, clearAllMessage} = slice.actions;
export const {closeMessage} = slice.actions;
export const selectMessage = state => state.global;

export default slice.reducer;
