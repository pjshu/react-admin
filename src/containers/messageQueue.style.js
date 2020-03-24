import {makeStyles} from "@material-ui/core";

export default makeStyles({
  snackbarRoot: {
    position: 'relative'
  },
  list: {
    flexDirection: 'column-reverse',
    display: 'flex',
    zIndex: '1000',
    position: "fixed",
    bottom: 0,
    left: '10%',
    // transform: 'translateX(-50%)',
    height: 200,
    minWidth: 200,
    maxWidth: 300,
  },
  listItem: {
    display: 'block'
  },
  box: {
    width: '100%'
  }
});
