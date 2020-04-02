import React, {useCallback, useState} from 'react';
import {Button, Typography} from "@material-ui/core";
import MyEditor from "../../components/editor/Editor";
import BraftEditor from "braft-editor";
import useStyles from './editorArea.style';
import ReactDOM from 'react-dom';
import {PreviewField} from './Preview';
import {Field} from "../Form";
import {useSelector} from "react-redux";
import {selects} from '../../redux';


const modalRoot = document.getElementById('modal-root');

const ModalEditor = React.memo(({name, uploadFn, setModalOpen, formName}) => {
  const classes = useStyles();
  const getValue = useCallback((value) => {
    return value;
  }, []);

  const handleOnClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  return ReactDOM.createPortal((
    <div className={classes.modalRoot}>
      <Field
        name={name}
        formName={formName}
        as={MyEditor}
        uploadFn={uploadFn}
        getValue={getValue}
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


function EditorArea({uploadFn, field, label, formName, name}) {
  const [modalOpen, setModalOpen] = useState(false);
  // const {form} = useSelector(selects[formName]);
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
        {/*<PreviewField value={BraftEditor.createEditorState(values[field])}/>*/}
      </div>
      {
        modalOpen ?
          <ModalEditor {...{field, uploadFn, setModalOpen, name, formName}}/> :
          null
      }
    </div>
  );
}

export default React.memo(EditorArea);
