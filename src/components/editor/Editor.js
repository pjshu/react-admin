import BraftEditor from 'braft-editor';
import Table from "braft-extensions/dist/table";
import Markdown from "braft-extensions/dist/markdown";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import 'prismjs/components/prism-python';
import HeaderId from 'braft-extensions/dist/header-id';
import React from "react";
import {makeStyles} from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({}));

const MyEditor = (props) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOnOpen = () => {
    setModalOpen(true);
  };
  const handleOnClose = () => {
    setModalOpen(false);
  };
  const extendControls = [{
    key: 'preview',
    type: 'button',
    text: '预览',
    onClick: handleOnOpen
  }];
  return (
    <>
      <Preview {...{modalOpen, handleOnClose, value: props.value.toHTML()}}/>
      <BraftEditor {...{extendControls, ...props}}/>
    </>
  );
};

export default MyEditor;
