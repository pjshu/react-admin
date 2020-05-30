//转化BraftState
import BraftEditor from "../../config/editor";

export const convertEditorState = (data, field) => {
  try {
    data[`${field}_html`] = data[field].toHTML();
    data[field] = data[field].toRAW();
  } catch (e) {

  }
};

export const toEditorState = (data, editorId) => {
  return BraftEditor.createEditorState(data, {editorId});
};
