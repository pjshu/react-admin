import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  textfield: {
    width: '350px',
    [theme.breakpoints.up('md')]: {
      width: '550px',
    },
  },
  formHelperText: {
    color: 'red'
  },
  passwordField: {
    width: '125px',
    height: '45px'
  }
}));
