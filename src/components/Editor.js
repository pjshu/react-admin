import BraftEditor from 'braft-editor';
import Table from "braft-extensions/dist/table";
import Markdown from "braft-extensions/dist/markdown";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import 'prismjs/components/prism-python';
import HeaderId from 'braft-extensions/dist/header-id';
import React from "react";
import Preview from "./Preview";

const CodeHighlighterOptions = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'Python',
      syntax: 'python',
    }
  ]
};


BraftEditor.use([Table(), Markdown(), CodeHighlighter(CodeHighlighterOptions), HeaderId()]);
const extendControls = [{
  key: 'preview',
  type: 'button',
  text: '预览',
  onClick: () => {
    console.log('click');
  }
}];

const createEditorState = (state) => {
  return BraftEditor.createEditorState(state);
};
const MyBraftEditor = (props) => {
  return (
    <>
      <Preview/>
      <BraftEditor {...{props, extendControls}}/>;
    </>
  );
};

export default MyBraftEditor;
export {createEditorState};
