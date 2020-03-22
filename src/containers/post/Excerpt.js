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

function Excerpt({uploadFn}) {
  const [excerptOpen, setExcerptOpen] = React.useState(false);
  const {values: {excerpt}, setFieldValue} = useFormikContext();
  const classes = useStyles();
  return (
    <div>
      <Typography component="h2">
        摘录(双击修改):
      </Typography>
      <div
        style={{
          padding: '5px',
          width: '100%',
          minHeight: '120px',
          maxHeight: '150px',
          border: '1px solid #6a6f7b',
          borderRadius: '2px'
        }}
        title={'双击修改'}
        dangerouslySetInnerHTML={{__html: (excerpt ? BraftEditor.createEditorState(excerpt).toHTML() : '双击修改')}}
        onDoubleClick={() => {
          setExcerptOpen(true);
        }}/>
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
            uploadFn={uploadFn}
            value={BraftEditor.createEditorState(excerpt)}
            onChange={value => {
              setFieldValue('excerpt', value);
            }}/>
        </div>
      </Modal>
    </div>
  );
}

export default Excerpt;
