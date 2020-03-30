import {makeStyles} from '@material-ui/core';

export default makeStyles({
  imgWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    marginTop: '20px',
    '& img': {
      width: 400,
      minHeight: 200,
      maxHeight: 250,
    },
    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 400,
      minHeight: 200,
      maxHeight: 300
    },
  },
  hidden: {
    display: "none"
  }
});
