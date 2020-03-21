import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
  avatar: {
    width: 200,
    height: 200,
    display: 'block',
    '& *': {
      height: '100%',
      width: '100%',
    }
  }
}));
