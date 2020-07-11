import {makeStyles} from "@material-ui/core";

export default makeStyles({
  root: {
    margin: '10px',
    minHeight: '90%',
    padding: 30,
    borderRadius: 4
  },
  textField: {
    display: 'block',
    border: 0,
    width: '100%',
    height: '100%',
    '&:focus': {
      outline: 'none'
    }
  },
  accordion: {
    width: '100%'
  },
  accordionActions: {
    position: 'relative'
  },
  change_date: {
    position: "absolute",
    left: 10
  },
  deleteWrapper: {
    display: 'flex',
  }
});
