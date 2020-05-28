import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import {toAdmin, toPost} from "../history";
import {addErrorMessage, addLoadingMessage, addSuccessMessage, setMessageState} from './globalSlice';
import {v4 as uuidV4} from 'uuid';
import {changeFormField, FORM} from "./formSlice";
import {fromJS} from "immutable";


export const slice = createSlice({
  name: 'post',
  initialState: fromJS({
    drawOpen: false,
    autoSave: {
      open: true,
      time: 1
    }
  }),
  reducers: {
    closeDrawer(state) {
      return state.update('drawOpen', () => false);
    },
    openDraw(state) {
      return state.update('drawOpen', () => true);
    },
    setAutoSaveTime(state, action) {
      return state.updateIn(['autoSave', 'time'], () => action.payload);
    },
    setAutoSaveChecked(state, action) {
      return state.updateIn(['autoSave', 'open'], () => action.payload);
    },
  }
});

export const {closeDrawer, openDraw} = slice.actions;
export const {setAutoSaveTime, setAutoSaveChecked} = slice.actions;

//TODO
export const getAllTags = () => dispatch => {
  api.getAllTags().then(res => {
    dispatch(changeFormField({allTags: res.data, form: FORM.post}));
  });
};

// 所有api统一通过dispatch调用,即使没有修改redux数据
export const modifyPost = (data, postId) => dispatch => {
  api.modifyPost(data, postId).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('上传成功'));
    } else {
      dispatch(addErrorMessage('上传失败'));
    }
  });
};

// id为列表
export const deletePost = (id) => dispatch => {
  api.deletePost({id_list: id}).then(res => {
    if (res.status === 'success') {
      toAdmin();
      dispatch(addSuccessMessage('删除成功'));
    } else {
      dispatch(addErrorMessage('删除失败'));
    }
  });
};

export const addPost = () => dispatch => {
  api.addPost().then(res => {
    const {status, data} = res;
    if (status === 'success' && data.id) {
      toPost(data.id);
      dispatch(addSuccessMessage('创建文章成功'));
    } else {
      dispatch(addErrorMessage('删除成功'));
    }
  });
};

export const addPostImg = (form, postId, successFn, errorFn) => dispatch => {
  const messageId = uuidV4();
  dispatch(addLoadingMessage({id: messageId, message: '正在上传图片'}));
  api.addPostImg(form, postId).then(res => {
    const {data, status} = res;
    if (status === 'success') {
      successFn(data);
      dispatch(setMessageState({id: messageId, state: 'success', message: '图片上传成功'}));
    } else {
      errorFn();
      dispatch(setMessageState({id: messageId, state: 'error', message: '图片上传失败'}));
    }
  });
};

export const selectDrawOpen = state => state.post.get('drawOpen');
export const selectAutoSave= state => state.post.get('autoSave');

export default slice.reducer;
