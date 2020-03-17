import {createSlice} from '@reduxjs/toolkit';
import {formatTime} from "../helpers/datetime";
import api from "../helpers/http";
import AlertMessage from "../components/AlertMessage";
import {toAdmin, toPost} from "../history";

export const slice = createSlice({
  name: 'post',
  initialState: {
    initial: {
      id: -1,
      title: '',
      tags: [],
      visibility: '私密',
      excerpt: '',
      article: null,
      allTags: [],
      comments: 0,
      create_date: formatTime(new Date()),
      change_date: formatTime(new Date())
    },
    drawOpen: false,
    loading: true
  },
  reducers: {
    initState(state, action) {
      state.initial = {...state.initial, ...action.payload};
    },
    addAllTags(state, action) {
      state.initial.allTags = action.payload;
    },
    closeDraw(state) {
      state.drawOpen = false;
    },
    openDraw(state) {
      state.drawOpen = true;
    },
    setLoading(state) {
      state.loading = false;
    }
  }
});
const {initState, addAllTags} = slice.actions;
export const {closeDraw, openDraw, setLoading} = slice.actions;

export const getPost = (postId) => dispatch => {
  api.getPost(null, postId).then(res => {
    if (res.status === 'success') {
      const {data} = res;
      dispatch(initState(data));
      setLoading(false);
    } else {
      AlertMessage.error("请求错误");
    }
  });
};

export const getAllTags = () => dispatch => {
  api.getAllTags().then(res => {
    dispatch(addAllTags(res.data));
  });
};

export const modifyPost = (data, postId) => dispatch => {
  api.modifyPost(data, postId).then(res => {
    if (res.status === 'success') {
      AlertMessage.success("上传成功");
    } else {
      AlertMessage.failed("上传失败");
    }
  });
};

export const deletePost = (id) => dispatch => {
  api.deletePost({id}).then(res => {
    if (res.status === 'success') {
      toAdmin();
    }
  });
};

export const addPost = () => dispatch => {
  api.addPost().then(res => {
    const {status, data} = res;
    if (status === 'success' && data.id) {
      toPost(data.id);
    }
  });
};
export const selectPost = state => state.post;

export default slice.reducer;
