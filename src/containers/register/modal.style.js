import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: 'inline',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  modalRoot: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: "200px",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cancelBtn: {
    marginLeft: '50px'
  }
}));
