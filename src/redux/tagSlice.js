import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import AlertMessage from "../components/AlertMessage";
import {addMessage} from "./globalSlice";

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
    } else {
      dispatch(addMessage({state: 'success', message: '标签添加失败'}));
      AlertMessage.failed('');
    }
  });
};
8;
export const addTagImg = (value, res, updateHandler) => dispatch => {
  api.addTagImg(value.id, res).then(res => {
    const {data, status} = res;
    if (status === 'success') {
      updateHandler({...value, image: data.image});
    } else {
      dispatch(addMessage({state: 'success', message: '标签添加图片失败'}));
      console.log('error');
    }
  });
};

export const modifyTag = (value, image, updateHandler) => dispatch => {
  api.modifyTag(value, value.id).then(res => {
    if (res.status === 'success') {
      updateHandler({...value, image});
      dispatch(initDialog());
    }
  });
};

export const selectTag = state => state.tag;
export default slice.reducer;
