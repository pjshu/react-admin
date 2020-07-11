import {makeStyles} from "@material-ui/core";

export default makeStyles({
  content: {
    minHeight: 80,
    width: '100%',
    overflow: 'hidden',
    border: '0',
    '&:focus': {
      outline: 'none'
    }
  }
});
