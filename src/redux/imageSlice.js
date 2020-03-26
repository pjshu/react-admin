import {createSlice} from '@reduxjs/toolkit';
import api from '../helpers/http';
import {addErrorMessage, addLoadingMessage, addSuccessMessage, setMessageState} from "./globalSlice";
import {v4 as uuidV4} from "uuid";

export const slice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    pagination: {
      count: 0,
      page: 0,
      rowsPerPage: 8
    }
  },
  reducers: {
    deleteImage(state, action) {
      state.images = state.images.filter(image => !action.payload.includes(image.id));
    },
    setImages(state, action) {
      state.images = action.payload;
    },
    addImages(state, action) {
      state.images = [...action.payload, ...state.images];
    },
    // 更新图片id,url,name
    updateImage(state, action) {
      const payload = action.payload;
      state.images = state.images.map(image => {
        return image.id === payload.old_id ?
          {...image, id: payload.id, image: {name: payload.image.name, url: payload.image.url}, upload: false} :
          image;
      });
    },
    changeImageDescribe(state, action) {
      const payload = action.payload;
      state.images = state.images.map(image => {
        return image.id === payload.id ?
          {...image, describe: payload.describe} :
          image;
      });
    },
    setCount(state, action) {
      state.pagination.count = action.payload;
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  }
});

export const {deleteImage, setImages, addImages, updateImage} = slice.actions;
export const {setCount, setPage, test} = slice.actions;

export const deleteImageApi = (id_list) => dispatch => {
  const messageId = uuidV4();
  dispatch(addLoadingMessage({id: messageId, message: '正在删除'}));
  api.deleteImage({id_list}).then(res => {
    if (res.status === 'success') {
      dispatch(setMessageState({id: messageId, state: 'success', message: '图片删除成功'}));
      dispatch(deleteImage(id_list));
    } else {
      dispatch(setMessageState({id: messageId, state: 'success', message: '图片删除失败'}));
    }
  });
};

export const queryImages = (query) => dispatch => {
  api.queryImages(query).then(res => {
    const data = res.data;
    dispatch(setCount(data.total));
    dispatch(setImages(data.values));
  });
};

export const uploadImages = (form, id) => dispatch => {
  api.addImages(form).then(res => {
    if (res.status === 'success') {
      const data = res.data;
      dispatch(updateImage({...data, old_id: id}));
      dispatch(addSuccessMessage('图片上传成功'));
    }
  });
};

export const uploadImagesDesc = (desc, id) => dispatch => {
  api.modifyImageInfo(desc, id).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('修改描述成功'));
    } else {
      dispatch(addErrorMessage('修改描述失败'));
    }
  });
};

export const selectImages = state => state.images;

export default slice.reducer;
