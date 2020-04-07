import React from 'react';
import {toEditorState} from "../helpers/misc";


//redux 储存braftjs 数据有问题
// 于是用这个context储存

export const defaultValue = {
  article: toEditorState(null),
  excerpt: toEditorState(null),
  aboutMe: toEditorState(null),
};


export function reducer(state, action) {
  switch (action.type) {
    case 'changeArticle':
      return {...state, article: action.value};
    case 'changeExcerpt':
      return {...state, excerpt: action.value};
    case 'changeAboutMe':
      return {...state, aboutMe: action.value};
    default:
      throw new Error();
  }
}

export const action = {
  // 这里参数不能改成其他,用于objAreEqual 函数数据对比
  article: (value) => ({
    type: 'changeArticle',
    value
  }),
  excerpt: (value) => ({
    type: 'changeExcerpt',
    value
  }),
  aboutMe: (value) => ({
    type: 'changeAboutMe',
    value
  }),
};


const EditorContext = React.createContext();

export default EditorContext;
