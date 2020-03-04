import BraftEditor from "../config/editorConfig";
import {formatTime} from "../helpers/datetime";

const initialState = {
  id: -1,
  title: '',
  tags: [],
  visibility: '私密',
  article: BraftEditor.createEditorState(null),
  allTags: [],
  comments: 0,
  create_date: formatTime(new Date()),
  change_date: formatTime(new Date())
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {...action.state};
    case 'addAllTags':
      return {...state, allTags: action.allTags};
    default:
      return state;
  }
};

const dispatchWrapper = (dispatch) => ({
  init(state) {
    return dispatch({type: 'init', state});
  },
  addAllTags(allTags) {
    return dispatch({type: 'addAllTags', allTags});
  }
});
export {dispatchWrapper, reducer, initialState};
