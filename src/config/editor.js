import React from "react";
import BraftEditor from "braft-editor";
// import Table from "braft-extensions/dist/table";
// Markdown语法支持模块, 该模块暂时不支持markdown表格语法
// TODO: 支持关闭markdown语法支持
// import Markdown from "braft-extensions/dist/markdown";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import Emoticon, {defaultEmoticons} from 'braft-extensions/dist/emoticon';
// 为标题区块(h1-h6)增加随机的id，便于在展示页支持锚点跳转功能
import HeaderId from 'braft-extensions/dist/header-id';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-c.min';
import 'prismjs/components/prism-sql.min';
// 添加某种语法高亮时需要从prismjs/components导入相应文件
// 默认高亮html/css/js
// 支持的语言高亮https://prismjs.com/#languages-list

// 编辑器代码高亮
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
      name: 'SQL',
      syntax: 'sql'
    }
  ]
};

export const EDITOR = {
  article: 'article',
  about: 'about',
  excerpt: 'excerpt'
};

// BUG： excludeEditors设置无效
// 表格点击崩溃
// const tableConfig = {
//   defaultColumns: 3, // 默认列数
//   defaultRows: 3, // 默认行数
//   withDropdown: false, // 插入表格前是否弹出下拉菜单
//   columnResizable: false, // 是否允许拖动调整列宽，默认false
//   exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
//   excludeEditors: [EDITOR.excerpt] // 指定该模块对哪些BraftEditor无效
// };

// // TODO: 自定义表情包 https://github.com/margox/braft-extensions
const emojiOption = {
  emoticons: defaultEmoticons.map(item => require(`braft-extensions/dist/assets/${item}`)), // 指定可用表情图片列表，默认为空
  closeOnBlur: true, // 指定是否在点击表情选择器之外的地方时关闭表情选择器，默认false
  closeOnSelect: true // 指定是否在选择表情后关闭表情选择器，默认false
};

// const markdownConfig = {
//   excludeEditors: [EDITOR.excerpt]
// };

const HeaderIdConfig = {
  excludeEditors: [EDITOR.excerpt]
};

BraftEditor.use([
  // Table(tableConfig),
  // Markdown(markdownConfig),
  CodeHighlighter(codeHighlighterOptions),
  HeaderId(HeaderIdConfig),
  Emoticon(emojiOption)]
);

const config = {
  //粘贴时去除样式
  stripPastedStyles: true,
  // 隐藏工具栏控件:
  excludeControls: [
    'superscript',    // 设置文字为上标
    'subscript',//设置文字为下标
    'line-height', //行高选择器
    'letter-spacing', //字体间距
    'clear' //内容清除工具
  ]
};
export default BraftEditor;
export {config};
