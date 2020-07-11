import React, {useCallback, useMemo} from "react";
import useStyles from "./table.style";
import {TablePagination} from "@material-ui/core";
import TablePaginationActions from "../Pagination";

const MemoPagination = React.memo((props) => {
  const {rowCount, pageSize, pageIndex, handleChangePage, handleChangeRowsPerPage} = props;
  const classes = useStyles();

  const labelDisplayedRows = useCallback(({from, to, count}) => {
    return `${from}-${to}/${count}`;
  }, []);

  const SelectProps = useMemo(() => ({
    inputProps: {'aria-label': 'rows per page'},
    // native: true,
  }), []);

  return (
    <TablePagination
      classes={{
        root: classes.tablePagination,
        toolbar: classes.tablePaginationToolBar
      }}
      // 写入配置
      labelRowsPerPage={'每页:'}
      labelDisplayedRows={labelDisplayedRows}
      rowsPerPageOptions={[5, 10, 25]}
      colSpan={3}
      count={rowCount}
      rowsPerPage={pageSize}
      page={pageIndex}
      SelectProps={SelectProps}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
}, (pre, next) => {
  return pre.rowCount === next.rowCount &&
    pre.pageSize === next.pageSize &&
    pre.pageIndex === next.pageIndex;
});

export default MemoPagination;
