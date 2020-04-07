import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import {addErrorMessage, addLoadingMessage, addSuccessMessage, setMessageState} from "./globalSlice";
import {v4 as uuidV4} from 'uuid';

export const slice = createSlice({
  name: 'tag',
  initialState: {
    form: {
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
      state.form.count = 0;
      state.form.image = {url: ''};
    },
    setTagId(state, action) {
      state.form.id = action.payload;
    },
    setTagValue(state, action) {
      state.form = action.payload;
    },
    setDialogAsAdd(state) {
      state.dialogState.action = 'add';
      state.dialogState.open = true;
    },
    setDialogAsUpdate(state) {
      state.dialogState.action = 'update';
      state.dialogState.open = true;
    },
    closeDialog(state) {
      state.dialogState.open = false;
    },
    changeTagsFormField(state, action) {
      const {name, value} = action.payload;
      state.form[name] = value;
    },
    changeTagsFormError(state, action) {
      const {name, value} = action.payload;
      state.errors = {name, value};
    },
    clearTagsFormError(state) {
      state.errors = {name: '', value: ''};
    }
  }
});


export const {initDialog, setTagId, setDialogAsAdd, setDialogAsUpdate, closeDialog, setTagValue} = slice.actions;
export const {changeTagsFormField, changeTagsFormError, clearTagsFormError} = slice.actions;


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

export const selectTag = state => state.tag;
export default slice.reducer;
