import React, {useCallback} from 'react';
import {Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal, selectModalOpen} from "../../redux/userSlice";
import useStyles from './modal.style';
import ReactDOM from 'react-dom';
import SubmitButton from "./Submit";

const RootModal = document.getElementById('modal-root');

const ConfirmModal = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return ReactDOM.createPortal((
    <div className={classes.modalRoot}>
      <h2>确认提交?</h2>
      <SubmitButton/>
      <Button
        className={classes.cancelBtn}
        type="button"
        onClick={handleClose}
        color="primary"
      >
        取消
      </Button>
    </div>
  ), RootModal);
});


function SubmitModal() {
  const dispatch = useDispatch();
  const modalOpen = useSelector(selectModalOpen);
  const classes = useStyles();

  const handleOpen = useCallback(() => {
    dispatch(openModal());
  }, [dispatch]);

  return (
    <Grid className={classes.root}>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="primary"
      >
        完成
      </Button>
      {
        modalOpen ?
          <ConfirmModal/> :
          null
      }
    </Grid>
  );
}

export default React.memo(SubmitModal);
