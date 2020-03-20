import BraftEditor from 'braft-editor';
import Table from "braft-extensions/dist/table";
// Markdown语法支持模块, 该模块暂时不支持markdown表格语法
// TODO: 支持关闭markdown语法支持
import Markdown from "braft-extensions/dist/markdown";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import Emoticon, {defaultEmoticons} from 'braft-extensions/dist/emoticon';
// 为标题区块(h1-h6)增加随机的id，便于在展示页支持锚点跳转功能
import HeaderId from 'braft-extensions/dist/header-id';
import React from "react";
import {Button} from '@material-ui/core';
import Preview from "./Preview";
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/emoticon.css';
import 'prismjs/components/prism-python';
import './prism.css';
import useStyles from './editor.style';
import {ContentUtils} from 'braft-utils';


const codeHighlighterOptions = {
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

// TODO: 自定义表情包 https://github.com/margox/braft-extensions
const emoticons = defaultEmoticons.map(item => require(`braft-extensions/dist/assets/${item}`));

const emojiOption = {
  emoticons: emoticons, // 指定可用表情图片列表，默认为空
  closeOnBlur: true, // 指定是否在点击表情选择器之外的地方时关闭表情选择器，默认false
  closeOnSelect: true // 指定是否在选择表情后关闭表情选择器，默认false
};

BraftEditor.use([Table(), Markdown(), CodeHighlighter(codeHighlighterOptions), HeaderId(), Emoticon(emojiOption)]);


const MyEditor = ({changeValue, value, ...props}) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOnOpen = () => {
    setModalOpen(true);
  };
  const handleOnClose = () => {
    setModalOpen(false);
  };
  const handleChangeImage = (e) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    const url = URL.createObjectURL(files[0]);
    changeValue(ContentUtils.insertMedias(value, [{
      type: 'IMAGE',
      url
    }]));
  };

  const extendControls = [{
    key: 'preview',
    type: 'button',
    text: '预览',
    onClick: handleOnOpen
  }, {
    key: 'imageUpload',
    type: 'component',
    text: '图片',
    component: (
      <div>
        <input
          onChange={handleChangeImage}
          accept="image/*"
          type="file"
          id={"post_image"}
          style={{display: "none"}}
        />
        <Button style={{
          color: '#6a6f7b'
        }} component={"label"} htmlFor={"post_image"}>图片</Button>
      </div>
    )
  }
  ];
  return (
    <>
      <Preview {...{modalOpen, handleOnClose, value}}/>
      <BraftEditor value={value} {...{extendControls, ...props}}/>
    </>
  );
};

export default MyEditor;
