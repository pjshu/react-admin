import BraftEditor from 'braft-editor';
import Table from "braft-extensions/dist/table";
import Markdown from "braft-extensions/dist/markdown";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import 'prismjs/components/prism-python';
import Emoticon, {defaultEmoticons} from 'braft-extensions/dist/emoticon';
import HeaderId from 'braft-extensions/dist/header-id'

const emoticons = defaultEmoticons.map(item => require(`braft-extensions/dist/assets/${item}`));


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

const EmoticonOptions = {
  emoticons: emoticons
};


BraftEditor.use([Table(), Markdown(), CodeHighlighter(CodeHighlighterOptions), HeaderId()]);

export default BraftEditor;
