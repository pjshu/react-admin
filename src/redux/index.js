import {Map} from "immutable";

const reducer = {
  changeFormField(state, action) {
    const {form, ...values} = action.payload;
    return state.update(form, (value) => value.mergeDeep(values));
  },
  changeFormError(state, action) {
    return state.update('errors', () => Map(action.payload));
  },
  clearFormError(state) {
    return state.update('errors', () => Map({name: '', value: ''}));
  }
};
