import React, {useCallback} from 'react';
import {Button, Typography} from "@material-ui/core";
import {useFormikContext} from "formik";
import MyEditor from "../../components/editor/Editor";
import BraftEditor from "braft-editor";
import useStyles from './editorArea.style';
import ReactDOM from 'react-dom';
import {PreviewField} from './Preview';

const modalRoot = document.getElementById('modal-root');

const ModalEditor = React.memo(({field, uploadFn, setModalOpen}) => {
  const classes = useStyles();
  const {values, setFieldValue} = useFormikContext();
  const handleOnChange = useCallback((value) => {
    setFieldValue(field, value);
  }, [field, setFieldValue]);
  const handleOnClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  return ReactDOM.createPortal((
    <div className={classes.modalRoot}>
      <MyEditor
        uploadFn={uploadFn}
        value={BraftEditor.createEditorState(values[field])}
        onChange={handleOnChange}
      />
      <Button
        className={classes.closeBtn}
        color={'primary'}
        onClick={handleOnClose}
      >
        关闭
      </Button>
    </div>
  ), modalRoot);
});


function EditorArea({uploadFn, field, label}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const {values} = useFormikContext();
  const classes = useStyles();
  const handleOnOpen = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <Typography component="h2">
        {label}(双击修改):
      </Typography>
      <div
        onDoubleClick={handleOnOpen}
        className={classes.textField}>
        <PreviewField value={BraftEditor.createEditorState(values[field])}/>
      </div>
      {
        modalOpen ?
          <ModalEditor {...{field, uploadFn, setModalOpen}}/> :
          null
      }
    </div>
  );
}

export default React.memo(EditorArea);
