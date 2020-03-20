import {createSlice} from '@reduxjs/toolkit';
import getCurrentTime from "../helpers/datetime";
import {v4 as uuidV4} from 'uuid';

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
    removeMessage(state, action) {
      state.message = state.message.filter(item => item.id !== action.payload);
    },
    clearAllMessage(state) {
      // 不清空正在加载的消息条
      state.message = state.message.filter(item => item.state === 'info');
    }
  }
});
export const {addMessage, removeMessage, clearSuccessMessage, clearAllMessage} = slice.actions;
export const {closeMessage} = slice.actions;
export const selectMessage = state => state.global;

export default slice.reducer;
