export const types = {
  CHANGE_TITLE: 'CHANGE_TITLE',
  CHANGE_TEMP_TAG: 'CHANGE_TEMP_TAG',
  CHANGE_PUBLISH: 'CHANGE_PUBLISH',
  DELETE_TAG: 'DELETE_TAG',
  ADD_TAG: 'ADD_TAG',
  CHANGE_ROWS: 'CHANGE_ROWS',
  CHANGE_CONTENTS: 'CHANGE_CONTENTS',
  ADD_IMAGE: 'ADD_IMAGE',
  ADD_CONTENTS: 'ADD_CONTENTS',
  DELETE_IMAGE: 'DELETE_IMAGE',
  SET_TIMESTAMP: 'ADD_TIMESTAMP'
};

export const actions = {
  changeTitle: (value) => ({
    type: types.CHANGE_TITLE,
    value
  }),
  changeTempTag: (value) => ({
    type: types.CHANGE_TEMP_TAG,
    value
  }),
  changePublish: () => ({
    type: types.CHANGE_PUBLISH,
  }),
  deleteTag: (value) => ({
    type: types.DELETE_TAG,
    value
  }),
  addTag: (value) => ({
    type: types.ADD_TAG,
    value
  }),
  changeRow: (value) => ({
    type: types.CHANGE_ROWS,
    value
  }),
  changeContents: (value) => ({
    type: types.CHANGE_CONTENTS,
    value
  }),
  addImage: (value) => ({
    type: types.ADD_IMAGE,
    value
  }),
  addContents: (value) => ({
    type: types.ADD_CONTENTS,
    value
  }),
  deleteImage: (value) => ({
    type: types.DELETE_IMAGE,
    value
  }),
  setTimeStamp: (value) => ({
    type: types.SET_TIMESTAMP,
    value
  })
};

const initialState = {
  images: [],
  rows: 1,
  tempTags: '',
  post: {
    title: "",
    tags: [],
    timeStamp: 0,
    contents: "",
    publish: false,
  }
};

export default function reducer(state = initialState, action) {
  const {post} = state;
  const {type, value} = action;
  switch (type) {
    case types.CHANGE_TITLE:
      return {...state, post: {...post, title: value}};
    case types.CHANGE_TEMP_TAG:
      return {...state, tempTags: value};
    case types.CHANGE_PUBLISH:
      return {...state, post: {...post, publish: !post.publish}};
    case types.DELETE_TAG:
      let tempTags = new Set(state.post.tags);
      tempTags.delete(value);
      return {...state, post: {...post, tags: [...tempTags]}};
    case types.ADD_TAG:
      //去重
      let temp = new Set(state.post.tags);
      temp.add(value);
      return {...state, tempTags: '', post: {...post, tags: [...temp]}};
    case types.CHANGE_ROWS:
      return {...state, rows: value};
    case types.CHANGE_CONTENTS:
      return {...state, post: {...post, contents: value}};
    case types.ADD_IMAGE:
      return {...state, images: [...state.images, value]};
    case types.ADD_CONTENTS:
      return {...state, post: {...post, contents: post.contents + value}};
    case types.DELETE_IMAGE:
      let tempImages = [...state.images];
      tempImages.splice(tempImages.findIndex(item => item === value), 1);
      return {...state, images: tempImages};
    case types.SET_TIMESTAMP:
      return {...state, post: {...post, timeStamp: value}};
    default:
      return state;
  }
}
