import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import {addSuccessMessage, addErrorMessage, setMessageState, addLoadingMessage} from "./globalSlice";
import {v4 as uuidV4} from 'uuid';

export const slice = createSlice({
  name: 'tag',
  initialState: {
    initial: {
      id: -1,
      name: '',
      describe: '',
      count: 0,
      image: {
        url: ''
      }
    },
    dialogState: {
      action: 'add',
      open: false
    }
  },
  reducers: {
    initDialog(state) {
      Object.keys(state.initial).forEach(key => {
        state.initial[key] = '';
      });
      state.initial.count = 0;
      state.initial.image = {url: ''};
    },
    setTagId(state, action) {
      state.initial.id = action.payload;
    },
    setTagValue(state, action) {
      state.initial = action.payload;
    },
    setDialogAsAdd(state) {
      state.dialogState.action = 'add';
      state.dialogState.open = true;
    },
    setDialogAsUpdate(state) {
      state.dialogState.action = 'update';
      state.dialogState.open = true;
    },
    closeDialog(state, action) {
      state.dialogState.action = action.payload;
      state.dialogState.open = false;
    },
  }
});


export const {initDialog, setTagId, setDialogAsAdd, setDialogAsUpdate, closeDialog, setTagValue} = slice.actions;


export const addTag = () => dispatch => {
  api.addTag().then(res => {
    const {data, status} = res;
    if (status === 'success') {
      dispatch(setTagId(data.id));
      dispatch(setDialogAsAdd());
      dispatch(addSuccessMessage('标签添加成功'));
    } else {
      dispatch(addErrorMessage('标签添加失败'));
    }
  });
};
8;
export const addTagImg = (value, data, updateHandler) => dispatch => {
  const messageId = uuidV4();
  dispatch(addLoadingMessage({id: messageId, message: '图片正在上传'}));
  api.addTagImg(data, value.id).then(res => {
    if (res.status === 'success') {
      updateHandler({...value, image: {url: res.data.url}});
      dispatch(setMessageState({id: messageId, state: 'success', message: '图片上传成功'}));
    } else {
      dispatch(setMessageState({id: messageId, state: 'error', message: '图片上传失败'}));
    }
  });
};

export const modifyTag = (value, image, updateHandler) => dispatch => {
  api.modifyTag(value, value.id).then(res => {
    if (res.status === 'success') {
      updateHandler({...value, image});
      dispatch(initDialog());
      dispatch(addSuccessMessage('标签修改成功'));
    } else {
      dispatch(addErrorMessage('标签修改失败'));
    }
  });
};

export const addAddImages = () => dispatch => {
  // api.addTagImg
};
export const selectTag = state => state.tag;
export default slice.reducer;
