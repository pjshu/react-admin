import {makeStyles} from "@material-ui/core";

export default makeStyles(theme => ({
  modalRoot: {
    position: 'fixed',
    width: 450,
    zIndex: 1201,
    left: '55%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
  textField: {
    width: 400,
  },
  fieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  switchWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    marginBottom: '10px'
  },
  closeIcon: {
    position: 'absolute',
    left: 5,
    top: 5,
    zIndex: 1202
  }
}));
