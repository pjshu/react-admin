import getCurrentTime from "../helpers/datetime";
import {v4 as uuidV4} from 'uuid';
import useMethods from 'use-methods';
import React, {useContext} from "react";


const setTimeAndIdState = (payload, state) => {
  payload.time = getCurrentTime('second');
  payload.id = uuidV4();
  payload.state = state;
};

const defaultValue = {
  /*message exp
   * state.info 表示正在加载
  * {state:'success/info(loading)/error', message:'', time:'', id:''}
  * */
  message: [],
};

export const methods = (state) => ({
  addMessage(data) {
    if (!data.hasOwnProperty('time')) {
      data.time = getCurrentTime('second');
    }
    if (!data.hasOwnProperty('id')) {
      data.id = uuidV4();
    }
    state.message.push(data);
  },
  addWarningMessage(data) {
    const message = {message: data};
    setTimeAndIdState(message, 'warning');
    state.message.push(message);
  },
  //传入message
  addSuccessMessage(data) {
    const message = {message: data};
    setTimeAndIdState(message, 'success');
    state.message.push(message);
  },
  // 传入message
  addErrorMessage(data) {
    const message = {message: data};
    setTimeAndIdState(message, 'error');
    state.message.push(message);
  },
  //传入{id:'',message:''}
  addLoadingMessage(data) {
    data.time = getCurrentTime('second');
    data.state = 'info';
    state.message.push(data);
  },
  setMessageState(data) {
    const {id, state: state_, message} = data;
    for (let item of state.message) {
      if (item.id === id) {
        item.state = state_;
        item.message = message;
      }
    }
  },
  removeMessage(data) {
    state.message = state.message.filter(item => item.id !== data);
  },
  clearAllMessage() {
    // 不清空正在加载的消息条
    state.message = state.message.filter(item => item.state === 'info');
  }
});

export const GlobalContext = React.createContext();

export default React.memo(function GlobalProvider(children) {
  const [state, action] = useMethods(methods, defaultValue);
  return (
    <GlobalContext.Provider value={[state, action]}>
      {children}
    </GlobalContext.Provider>
  );
});

