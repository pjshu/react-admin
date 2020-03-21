import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    maxWidth: 800,
    minWidth: 760,
    height: '100%',
    width: '100%',
  },
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
