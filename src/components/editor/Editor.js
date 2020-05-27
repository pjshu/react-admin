import BraftEditor from '../../config/editor';
import React, {useCallback, useState, useContext, useMemo} from "react";
import Preview from "./Preview";
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/emoticon.css';
import EditorContext from "../../redux/editorState";


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

  const extendControls = useMemo(() => [{
    key: 'preview',
    type: 'button',
    text: '预览',
    onClick: handleOnOpen
  }], [handleOnOpen]);

  const media = useMemo(() => ({uploadFn: myUploadFn}), [myUploadFn]);

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
}, (pre, next) => {
  return pre.value === next.value;
});


function MyEditor({name, ...props}) {
  const {state: {[name]: value}, dispatch, action} = useContext(EditorContext);

  const handleOnChange = useCallback((value) => {
    dispatch(action[name](value));
  }, [action, dispatch, name]);

  return <ContextMyEditor {...{...props, value, name, handleOnChange}}/>;
}

export default React.memo(MyEditor, () => true);
