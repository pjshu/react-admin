import React from 'react';
import {Modal, Typography} from "@material-ui/core";
import {useFormikContext} from "formik";
import MyEditor from "../../components/editor/Editor";
import BraftEditor from "braft-editor";
import useStyles from './excerpt.style';


function Excerpt({uploadFn}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const {values: {excerpt}, setFieldValue} = useFormikContext();
  const classes = useStyles();
  const handleOnClose = () => {
    setModalOpen(false);
  };
  const handleOnOpen = () => {
    setModalOpen(true);
  };
  const handleOnChange = (value) => {
    setFieldValue('excerpt', value);
  };
  return (
    <div>
      <Typography component="h2">
        摘录(双击修改):
      </Typography>
      <div
        className={excerpt}
        title={'双击修改'}
        dangerouslySetInnerHTML={{__html: (excerpt ? BraftEditor.createEditorState(excerpt).toHTML() : '双击修改')}}
        onDoubleClick={handleOnOpen}/>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
        onClose={handleOnClose}
      >
        <div className={classes.paper}>
          <MyEditor
            uploadFn={uploadFn}
            value={BraftEditor.createEditorState(excerpt)}
            onChange={handleOnChange}/>
        </div>
      </Modal>
    </div>
  );
}

export default Excerpt;
