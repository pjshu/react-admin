import React, {useCallback} from 'react';
import {createMuiTheme, MuiThemeProvider, CssBaseline} from "@material-ui/core";
import Pagination from "material-ui-flat-pagination";
import useStyles from './pagination.style';
import PropTypes from 'prop-types';


const theme = createMuiTheme();
const TablePaginationActions = ({count, page, rowsPerPage, onChangePage}) => {
  const classes = useStyles();
  const offset = React.useMemo(() => {
    return page * rowsPerPage;
  }, [page, rowsPerPage]);

  const handleOnClick = useCallback((e, offset) => {
    onChangePage(offset / rowsPerPage);
  }, [onChangePage, rowsPerPage]);
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

TablePaginationActions.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func
};

export default React.memo(TablePaginationActions);
