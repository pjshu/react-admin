// @flow

import {createSlice} from '@reduxjs/toolkit';
import {addErrorMessage, addLoadingMessage, addSuccessMessage, updateMessageState} from "./globalSlice";
import {v4 as uuidV4} from 'uuid';
import {getImageForm} from "../helpers/misc";
import {initTagForm, changeFormField} from "./formSlice";
import FORM from "../contants/form.json";
import {fromJS, Map} from "immutable";

export const slice = createSlice({
  name: 'tag',
  initialState: fromJS({
    dialogState: {
      action: 'add',
      open: false
    }
  }),
  reducers: {
    setDialogAsAdd(state) {
      return state.update('dialogState', () => Map({
        action: 'add',
        open: true
      }));
    },
    setDialogAsUpdate(state) {
      return state.update('dialogState', () => Map({
        action: 'update',
        open: true
      }));
    },
    closeDialog(state) {
      return state.updateIn(['dialogState', 'open'], () => false);
    },
  }
});


export const {setDialogAsAdd, setDialogAsUpdate, closeDialog} = slice.actions;


export const addTag = () => dispatch => {
  import("../helpers/api/security").then(({addTag}) => {
    addTag().then(res => {
      const {data, status} = res;
      if (status === 'success') {
        dispatch(changeFormField({form: FORM.tags, id: data.id}));
        dispatch(setDialogAsAdd());
        dispatch(addSuccessMessage('标签添加成功'));
      } else {
        dispatch(addErrorMessage('标签添加失败'));
      }
    });
  });
};

export const addTagImg = (value, updateHandler) => dispatch => {
  const upload = (image) => {
    const messageId = uuidV4();
    dispatch(addLoadingMessage({id: messageId, message: '图片正在上传'}));
    import("../helpers/api/security").then(({addTagImg}) => {
      addTagImg(image, value.id).then(res => {
        if (res.status === 'success') {
          updateHandler({...value, image: {url: res.data.url}});
          dispatch(updateMessageState({id: messageId, state: 'success', message: '图片上传成功'}));
        } else {
          dispatch(updateMessageState({id: messageId, state: 'error', message: '图片上传失败'}));
        }
      });
    });
  };
  if (value.image.url) {
    getImageForm(value.image.url).then(res => {
      upload(res);
    });
  }
};


export const modifyTag = (value: Object, updateHandler) => dispatch => {
  import("../helpers/api/security").then(({modifyTag}) => {
    modifyTag(value, value.id).then(res => {
      if (res.status === 'success') {
        updateHandler({...value});
        dispatch(initTagForm());
        dispatch(addSuccessMessage('标签修改成功'));
      } else {
        dispatch(addErrorMessage('标签修改失败'));
      }
    });
  });

};

export const selectDialogState = state => state.tag.get('dialogState');
export default slice.reducer;
