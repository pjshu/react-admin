import React, {useState} from 'react';
import {Modal, makeStyles} from "@material-ui/core";
import 'braft-editor/dist/output.css';
// import './table.css';
// import './prism.css';
// import Prism from './prism';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 700,
    minHeight: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Preview({modalOpen, handleOnClose, value}) {
  const classes = useStyles();
  // React.useEffect(() => {
  //   setTimeout(() => Prism.highlightAll(), 0);
  // }, [modalOpen]);

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={handleOnClose}
    >
      <div className={classes.paper}>
        <div style={{
          whiteSpace: 'pre-wrap'
        }} dangerouslySetInnerHTML={{__html: value}}/>
      </div>
    </Modal>
  );
}

export default Preview;
