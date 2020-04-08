import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import {addErrorMessage, addLoadingMessage, addSuccessMessage, setMessageState} from "./globalSlice";
import {v4 as uuidV4} from 'uuid';
import {getImageForm} from "../helpers/misc";
import {initTagForm, changeFormField, FORM} from "./formSlice";

export const slice = createSlice({
  name: 'tag',
  initialState: {
    dialogState: {
      action: 'add',
      open: false
    }
  },
  reducers: {
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
  }
});


export const {initDialog, setDialogAsAdd, setDialogAsUpdate, closeDialog} = slice.actions;


export const addTag = () => dispatch => {
  api.addTag().then(res => {
    const {data, status} = res;
    if (status === 'success') {
      dispatch(changeFormField({form: FORM.tags, id: data.id}));
      dispatch(setDialogAsAdd());
      dispatch(addSuccessMessage('标签添加成功'));
    } else {
      dispatch(addErrorMessage('标签添加失败'));
    }
  });
};
export const addTagImg = (value, updateHandler) => dispatch => {
  const upload = (image) => {
    const messageId = uuidV4();
    dispatch(addLoadingMessage({id: messageId, message: '图片正在上传'}));
    api.addTagImg(image, value.id).then(res => {
      if (res.status === 'success') {
        updateHandler({...value, image: {url: res.data.url}});
        dispatch(setMessageState({id: messageId, state: 'success', message: '图片上传成功'}));
      } else {
        dispatch(setMessageState({id: messageId, state: 'error', message: '图片上传失败'}));
      }
    });
  };

  if (value.image.url) {
    getImageForm(value.image.url).then(res => {
      upload(res);
    });
  }
};


export const modifyTag = (value, updateHandler) => dispatch => {
  api.modifyTag(value, value.id).then(res => {
    if (res.status === 'success') {
      updateHandler({...value});
      dispatch(initTagForm());
      dispatch(addSuccessMessage('标签修改成功'));
    } else {
      dispatch(addErrorMessage('标签修改失败'));
    }
  });
};

export const selectTag = state => state.tag;
export default slice.reducer;
