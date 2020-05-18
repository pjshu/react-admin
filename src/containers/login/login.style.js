import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  paper: {
    width: 400,
    height: 300,
    padding: 40,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      marginBottom: theme.spacing(4)
    }
  },
  spacing: {
    '& > div': {
      marginTop: theme.spacing(4)
    }
  },
  fullWidth: {
    width: '100%',
  }
}));

