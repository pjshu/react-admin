import {makeStyles} from "@material-ui/core";

export default makeStyles(theme => ({
  modalRoot: {
    position: 'absolute',
    width: 800,
    zIndex: 2,
    left: '55%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginTop: theme.spacing(4),
    padding: '5px',
    width: '100%',
    minHeight: '120px',
    maxHeight: '150px',
    border: '2px solid #eee',
    borderRadius: '4px',
    overflow: 'scroll'
  }
}));
