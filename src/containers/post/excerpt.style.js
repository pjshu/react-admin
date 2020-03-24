import {makeStyles} from "@material-ui/core";

export default makeStyles(theme => ({
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
  excerpt: {
    padding: '5px',
    width: '100%',
    minHeight: '120px',
    maxHeight: '150px',
    border: '1px solid #6a6f7b',
    borderRadius: '2px'
  }
}));
