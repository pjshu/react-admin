import React from 'react';
import {makeStyles, createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from "material-ui-flat-pagination";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    direction: 'row'
  },
}));

const theme = createMuiTheme();
const TablePaginationActions = ({count, page, rowsPerPage, onChangePage}) => {
  const classes = useStyles();
  const offset = React.useMemo(() => {
    return page * rowsPerPage;
  }, [page, rowsPerPage]);

  const handleOnClick = (e, offset) => {
    onChangePage(offset / rowsPerPage);
  };
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Pagination
          className={classes.root}
          limit={rowsPerPage}
          offset={offset}
          total={count}
          onClick={handleOnClick}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default TablePaginationActions;
