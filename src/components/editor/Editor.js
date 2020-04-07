import BraftEditor from './config';
import React, {useCallback, useState, useContext} from "react";
import Preview from "./Preview";
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/emoticon.css';
import './prism.css';
import EditorContext from "../../redux/editorState";
import {areEqual} from "../../helpers/misc";


// uploadFn 控制图片上传
// 不添加uploadFn参数则使用编辑器默认上传功能,将图片转为base64嵌入内容
const ContextMyEditor = React.memo(function ContextMyEditor({name, value, uploadFn, handleOnChange, ...props}) {
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

  const media = {uploadFn: myUploadFn};
  return (
    <>
      <Preview {...{modalOpen, handleOnClose, name}}/>
      <BraftEditor
        media={media}
        value={value}
        onChange={handleOnChange}
        {...{extendControls, ...props}}
      />
    </>
  );
}, areEqual);


function MyEditor({name, ...props}) {
  const {state, dispatch, action} = useContext(EditorContext);
  const handleOnChange = useCallback((value) => {
    dispatch(action[name](value));
  }, [action, dispatch, name]);
  return <ContextMyEditor {...{...props, value: state[name], name, handleOnChange}}/>;
}

export default React.memo(MyEditor, areEqual);
