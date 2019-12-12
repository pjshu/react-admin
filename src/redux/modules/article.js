export const types = {
  CHANGE_TITLE: 'CHANGE_TITLE',
  CHANGE_TEMP_TAG: 'CHANGE_TEMP_TAG',
  CHANGE_PUBLISH: 'CHANGE_PUBLISH',
  DELETE_TAG: 'DELETE_TAG',
  ADD_TAG: 'ADD_TAG',
  CHANGE_ROW: 'ADD_ROW',
  CHANGE_CONTENTS: 'CHANGE_CONTENTS'
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
    type: types.CHANGE_ROW,
    value
  }),
  changeContents: (value) => ({
    type: types.CHANGE_CONTENTS,
    value
  })
};

const initialState = {
  rows: 1,
  tempTags: '',
  post: {
    title: "",
    tags: [],
    timeStamp: new Date() * 1,
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
    case types.CHANGE_ROW:
      return {...state, row: value};
    case types.CHANGE_CONTENTS:
      return {...state, post: {...post, contents: value}};
  }
}
