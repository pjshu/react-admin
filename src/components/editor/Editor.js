import BraftEditor from 'braft-editor';
import Table from "braft-extensions/dist/table";
// Markdown语法支持模块, 该模块暂时不支持markdown表格语法
// TODO: 支持关闭markdown语法支持
import Markdown from "braft-extensions/dist/markdown";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import Emoticon, {defaultEmoticons} from 'braft-extensions/dist/emoticon';
// 为标题区块(h1-h6)增加随机的id，便于在展示页支持锚点跳转功能
import HeaderId from 'braft-extensions/dist/header-id';
import React, {useCallback, useState} from "react";
import Preview from "./Preview";
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/emoticon.css';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-c.min';
import 'prismjs/components/prism-nasm.min';
import './prism.css';
import Prism from "./prism";
//https://prismjs.com/#languages-list


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
    },
    {
      name: 'JSX',
      syntax: 'jsx'
    },
    {
      name: 'Bash',
      syntax: 'bash'
    }, {
      name: 'C',
      syntax: 'c'
    }, {
      name: 'Nasm',
      syntax: 'nasm'
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

// uploadFn 控制图片上传
// 不添加uploadFn参数则使用编辑器默认上传功能,将图片转为base64嵌入内容
const MyEditor = ({uploadFn, value, ...props}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOnOpen = useCallback(() => {
      setModalOpen(true);
    }, []);

    const handleOnClose = useCallback(() => {
      setModalOpen(false);
    }, []);

    const myUploadFn = useCallback((param) => {
      const form = new FormData();
      form.append('image', param.file);
      const successFn = (data) => {
        param.success({
          url: data.url,
          meta: {
            id: data.name,
            title: data.name,
            alt: data.name,
          }
        });
      };
      const errorFn = (response) => {
        param.error({
          msg: 'unable to upload.'
        });
      };
      uploadFn(form, successFn, errorFn);
    }, [uploadFn]);

    const extendControls = [{
      key: 'preview',
      type: 'button',
      text: '预览',
      onClick: handleOnOpen
    }];


    return (
      <>
        {
          modalOpen ?
            <Preview {...{modalOpen, handleOnClose, value}}/> :
            null
        }
        <BraftEditor
          media={{uploadFn: myUploadFn}}
          value={value}
          {...{extendControls, ...props}}
        />
      </>
    );
  }
;

export default React.memo(MyEditor);
