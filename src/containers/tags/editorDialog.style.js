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
      minHeight: 200
    }
  },
  hidden: {
    display: "none"
  }
});
