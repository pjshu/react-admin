import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
  container: {
    height: '100%'
  },
  paper: {
    width: 500,
    minHeight: 200,
    padding: 40
  },
  textField: {
    width: '265px'
  },
  button: {
    marginLeft: '30px',
    width: '125px',
    height: '45px'
  },
  validateCode: (isSendCode) => ({
    display: isSendCode ? '' : "none"
  }),
  fullWidth: {
    width: '100%'
  },
  btnWrapper: {
    marginBottom: '40px'
  }
});
