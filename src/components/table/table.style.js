import {makeStyles} from "@material-ui/core";

export default makeStyles(theme => ({
  cell: {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  tablePagination: {
    overflow: 'visible',
  },
  tablePaginationToolBar: {
    width: 200
  }
}));
