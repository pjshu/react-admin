import React from 'react';
import {Modal, makeStyles, Typography, TextareaAutosize, Grid} from "@material-ui/core";
import {Field, useFormikContext} from "formik";
import MyEditor from "../../components/editor/Editor";
import BraftEditor from "braft-editor";

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 800,
    zIndex: '99',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Excerpt({excerptOpen, setExcerptOpen, uploadImage}) {
  const {values: {excerpt}, setFieldValue} = useFormikContext();
  const classes = useStyles();
  return (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={excerptOpen}
        onClose={() => {
          setExcerptOpen(false);
        }}
      >
        <div className={classes.paper}>
          <MyEditor
            uploadImage={uploadImage}
            value={BraftEditor.createEditorState(excerpt)}
            onChange={value => {
              setFieldValue('excerpt', value);
            }}/>
        </div>
        <Typography component="h2">
          摘录(双击修改):
        </Typography>
        <div
          style={{
            padding: '5px',
            width: '100%',
            minHeight: '120px',
            maxHeight: '150',
            border: '1px solid'
          }}
          title={'双击放大'}
          dangerouslySetInnerHTML={{__html: (excerpt ? excerpt.toHTML() : null)}}
          onDoubleClick={() => {
            setExcerptOpen(true);
          }}/>
      </Modal>
    </>
  );
}

export default Excerpt;
