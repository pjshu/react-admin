import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {selectRegister, openModal, closeModal} from "../../redux/userSlice";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "200px",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


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
            style={{
              marginLeft: '50px'
            }}
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
