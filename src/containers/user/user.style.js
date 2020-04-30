import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    margin: '10px',
    minHeight: '90%',
    padding: 30,
    borderRadius: 4
  },
  avatarWrapper: {
    width: 200
  },
  avatar: {
    width: 200,
    height: 200,
    display: 'block',
    '& *': {
      height: '100%',
      width: '100%',
    }
  },
  uploadWrapper: {
    marginLeft: '120px'
  },
  hidden: {
    display: "none"
  },
  nameFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  inputIcon: {
    width: '350px'
  },
  submitBTN: {
    marginTop: 40
  }
}));
