import {makeStyles} from "@material-ui/core";

export default makeStyles({
  root: {
    flexDirection: 'column-reverse',
    display: 'flex',
    zIndex: 10,
    position: "fixed",
    bottom: 0,
    left: '10%',
    // transform: 'translateX(-50%)',
    // height: 200,
    minWidth: 200,
    maxWidth: 300,
  },
  snackbar: {
    position: 'relative'
  },
  listItem: {
    display: 'block'
  },
  box: {
    width: '100%'
  }
});
