import {makeStyles} from '@material-ui/core';

export default makeStyles({
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    marginTop: '20px',
    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 350,
      minHeight: 200,
      maxHeight: 300
    },
  },
  imgWrapper: {
    width: 350,
    height: 350,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '& img': {
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  hidden: {
    display: "none"
  }
});
