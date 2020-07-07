import {makeStyles} from "@material-ui/core";

export default makeStyles({
  hidden: {
    display: 'none'
  },
  button: {
    width: '100%'
  },
  box: {
    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: 100,
      maxHeight: 200,
    },
  },
  imgWrapper: {
    width: '100%',
    minHeight: 100,
    maxHeight: 200,
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
});
