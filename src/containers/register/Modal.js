import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal, selectRegister} from "../../redux/userSlice";
import useStyles from './registerUser.styles';

export default function MyModal() {
  const dispatch = useDispatch();
  const {modalOpen} = useSelector(selectRegister);
  const classes = useStyles();

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

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
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <h2>确认提交?</h2>
          <Button
            form={'form'}
            type={'submit'}
            variant="contained"
            color="primary"
          >
            确认
          </Button>
          <Button
            className={classes.cancelBtn}
            type="button"
            onClick={handleClose}
            color="primary"
          >
            取消
          </Button>
        </div>
      </Modal>
    </Grid>
  );
}
