const initialState = {};


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

export {dispatchWrapper, initialState, reducer};
