import React, {useReducer} from 'react';
import {toEditorState} from "../components/editor/helper";
import {EDITOR} from "../config/editor";

//redux 储存braftjs 数据有问题
// 于是用这个context储存
//BUG: about(后端) -> aboutMe
export const defaultValue = {
  article: toEditorState(null, EDITOR.article),
  excerpt: toEditorState(null, EDITOR.excerpt),
  about: toEditorState(null, EDITOR.about),
};


export function reducer(state, action) {
  switch (action.type) {
    case 'changeArticle':
      return {...state, article: action.value};
    case 'changeExcerpt':
      return {...state, excerpt: action.value};
    case 'changeAbout':
      return {...state, about: action.value};
    default:
      throw new Error();
  }
}

export const action = {
  article: (value) => ({
    type: 'changeArticle',
    value
  }),
  excerpt: (value) => ({
    type: 'changeExcerpt',
    value
  }),
  about: (value) => ({
    type: 'changeAbout',
    value
  }),
};


const EditorContext = React.createContext();

export const EditorProvider = React.memo(function Provider({children}) {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  return (
    <EditorContext.Provider value={{state, dispatch, action}}>
      {children}
    </EditorContext.Provider>
  );
});
export default EditorProvider
export {EditorContext};
