export const types = {
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
};

export const actions = {
  setCurrentTime: (value) => ({
    type: types.SET_CURRENT_TIME,
    value
  })
};

const initialState = {
  currentTime: ''
};

export default function reducer(state = initialState, action) {
  const {type, value} = action;
  switch (type) {
    case types.SET_CURRENT_TIME:
      return {...state, currentTime: value};
    default:
      return state;
  }
}
