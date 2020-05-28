import {createSlice} from '@reduxjs/toolkit';
import api from '../helpers/http';
import {addErrorMessage, addLoadingMessage, addSuccessMessage, updateMessageState} from "./globalSlice";
import {v4 as uuidV4} from "uuid";
import {fromJS} from "immutable";

export const slice = createSlice({
  name: 'images',
  initialState: fromJS({
    clickCardId: -1,
    images: [],
    cardModalOpen: false,
    pagination: {
      count: 0,
      page: 0,
      rowsPerPage: 8
    }
  }),
  reducers: {
    deleteImage(state, action) {
      return state.update('images', value =>
        value.filter(image => !action.payload.includes(image.get('id')))
      );
    },
    setImages(state, action) {
      return state.update('images', () => fromJS(action.payload));
    },
    addImages(state, action) {
      return state.update('images', value => value.concat(fromJS(action.payload)));
    },
    // 更新图片id,url,name
    updateImage(state, action) {
      const payload = action.payload;
      const update = {...payload, upload: false};
      return state.update('images', value => value.map(image =>
        image.get('id') === payload.old_id ? image.mergeDeep(update) : image
      ));
    },
    changeImageDescribe(state, action) {
      const payload = action.payload;
      return state.update('images', value =>
        value.map(image =>
          image.get('id') === payload.id ? image.mergeDeep(payload) : image
        ));
    },
    setCount(state, action) {
      return state.updateIn(['pagination', 'count'], () => action.payload);
    },
    setPage(state, action) {
      return state.updateIn(['pagination', 'page'], () => action.payload);
    },
    setClickCardId(state, action) {
      return state.update('clickCardId', () => action.payload);
    },
    closeCardModal(state) {
      return state.update('cardModalOpen', () => false);
    },
    openCardModal(state) {
      return state.update('cardModalOpen', () => true);
    }
  }
});

export const {deleteImage, setImages, addImages, updateImage} = slice.actions;
export const {setCount, setPage, test} = slice.actions;
export const {setClickCardId, closeCardModal, openCardModal} = slice.actions;

export const deleteImageApi = (id_list) => dispatch => {
  const messageId = uuidV4();
  dispatch(addLoadingMessage({id: messageId, message: '正在删除'}));
  api.deleteImage({id_list}).then(res => {
    if (res.status === 'success') {
      dispatch(updateMessageState({id: messageId, state: 'success', message: '图片删除成功'}));
      dispatch(deleteImage(id_list));
    } else {
      dispatch(updateMessageState({id: messageId, state: 'success', message: '图片删除失败'}));
    }
  });
};

export const queryImages = (query) => dispatch => {
  api.queryImages(query).then(res => {
    const {data, status} = res;
    if (status === 'success') {
      dispatch(setCount(data.total));
      dispatch(setImages(data.values));
    } else {
      //TODO
    }
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

export const uploadImagesDesc = (describe, id) => dispatch => {
  api.modifyImageInfo({describe}, id).then(res => {
    if (res.status === 'success') {
      dispatch(updateImage({id, describe, old_id: id}));
      dispatch(addSuccessMessage('修改描述成功'));
    } else {
      dispatch(addErrorMessage('修改描述失败'));
    }
  });
};

export const selectImagesSlice = state => state.images;
export const selectImages = state => state.images.get('images');
export default slice.reducer;
