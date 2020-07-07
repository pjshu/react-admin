import React, {useCallback, useState} from 'react';
import {Button, Typography} from "@material-ui/core";
import MyEditor from "../../components/editor/Editor";
import useStyles from './editorArea.style';
import ReactDOM from 'react-dom';
import {PreviewField} from './Preview';


const modalRoot = document.getElementById('modal-root');

const ModalEditor = React.memo(({name, uploadFn, setModalOpen}) => {
  const classes = useStyles();

  const handleOnClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return ReactDOM.createPortal((
    <div className={classes.modalRoot}>
      <MyEditor
        name={name}
        uploadFn={uploadFn}
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


function EditorArea({uploadFn, label, name}) {
  const [modalOpen, setModalOpen] = useState(false);
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
        <PreviewField name={name}/>
      </div>
      {
        modalOpen ?
          <ModalEditor {...{uploadFn, setModalOpen, name}}/> :
          null
      }
    </div>
  );
}

export default React.memo(EditorArea);
export {ModalEditor};
