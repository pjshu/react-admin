import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
  name: {
    '& > *': {
      width: '45%',
    },
  },
  password: {
    marginTop: 20,
    marginBottom: 10,
    '& > *': {
      width: '45%',
    }
  }
});
