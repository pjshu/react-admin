import React, {useCallback} from 'react';
import {Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal, selectRegister} from "../../redux/userSlice";
import useStyles from './modal.style';
import {createPortal} from 'react-dom';
import {SubmitBtn} from "../../components/Form";
import {FORM} from "../../redux/formSlice";

const RootModal = document.getElementById('modal-root');

const ConfirmModal = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return createPortal((
    <div className={classes.modalRoot}>
      <h2>确认提交?</h2>
      <SubmitBtn
        formName={FORM.register}
        variant="contained"
        color="primary"
      >
        确认
      </SubmitBtn>
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


function MyModal() {
  const dispatch = useDispatch();
  const {modalOpen} = useSelector(selectRegister);
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
export default React.memo(MyModal)
