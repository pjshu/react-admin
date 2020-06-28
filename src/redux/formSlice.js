import {createSelector, createSlice} from "@reduxjs/toolkit";
import {formatTime} from "../helpers/datetime";
import {fromJS, Map} from "immutable";
import FORM from '../contants/form.json';

const defaultData = {
  post: {
    id: -1,
    title: '',
    tags: [],
    visibility: '私密',
    allTags: [],
    comments: 0,
    create_date: formatTime(new Date()),
    change_date: formatTime(new Date())
  },
  tags: {
    id: -1,
    name: '',
    describe: '',
    count: 0,
    image: {
      url: ''
    }
  },
  userInfo: {
    username: '',
    nickname: '',
    avatar: '',
    motto: '',
    ICP: ''
  },
  resetPassword: {
    old_password: '', password: '', confirm_password: ''
  },
  resetEmail: {
    email: '', code: ''
  },
  register: {
    username: '',
    nickname: '',
    password: '',
    confirm_password: '',
    email: ''
  },
  // 重置密码时邮件验证
  recoveryPasswordSendCode: {
    email: '',
  },
  recoveryPassword: {
    code: '', password: '', confirm_password: ''
  },
  login: {
    username: '', password: ''
  },
  errors: {
    name: '', value: ''
  }
};

export const slice = createSlice({
  name: 'form',
  initialState: fromJS(defaultData),
  reducers: {
    initTagForm(state) {
      return state.update(FORM.tags, () => fromJS(defaultData[FORM.tags]));
    },
    changeFormField(state, action) {
      const {form, ...values} = action.payload;
      return state.update(form, (value) => value.mergeDeep(values));
    },
    changePostTags(state, action) {
      const value = action.payload;
      return state.updateIn([FORM.post, 'tags'], () => value);

    },
    changeFormError(state, action) {
      return state.update('errors', () => Map(action.payload));
    },
    clearFormError(state) {
      return state.update('errors', () => Map({name: '', value: ''}));
    }
  }
});

export const {changePostTags, changeFormField, changeFormError, clearFormError, initTagForm} = slice.actions;
export const selectForm = state => state.form;

export const errorSelector = state => state.form.get('errors');

export const createFieldSelector = (field) => createSelector(
  selectForm,
  state => state.getIn(field)
);

export const createFormSelector = (formName) => createSelector(
  selectForm,
  state => state.get(formName)
);

export default slice.reducer;

