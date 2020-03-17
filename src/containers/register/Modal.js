import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {useSpring, animated} from 'react-spring/web.cjs';
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

const Fade = React.forwardRef(function Fade(props, ref) {
  const {in: open, children, onEnter, onExited, ...other} = props;
  const style = useSpring({
    from: {opacity: 0},
    to: {opacity: open ? 1 : 0},
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});


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
        <Fade in={modalOpen}>
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
        </Fade>
      </Modal>
    </Grid>
  );
}
