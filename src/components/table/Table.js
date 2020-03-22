import React from 'react';

import {
  Paper,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableHead,
  TableFooter,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer
} from '@material-ui/core';

import TablePaginationActions from '../Pagination';
import {EditorColumn, CheckBoxColumn} from './Column';

import TableToolbar from './TableToolbar';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useResizeColumns,
  useFlexLayout
} from 'react-table';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  cell: {
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


const EnhancedTable = (props) => {
  const {
    tableName,
    renderDialog,
    columns,
    Columns,
    data,
    setData,
    updateMyData,
    api,
    handleAddRow,
    handleEditor
  } = props;
  const [rowCount, setRowCount] = React.useState(0);

  const classes = useStyles();
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: {sortBy, pageIndex, pageSize, selectedRowIds, globalFilter},
  } = useTable(
    {
      initialState: {
        hiddenColumns: ['id'],
      },
      columns,
      data,
      defaultColumn,
      updateMyData,
      handleEditor,
      manualSorting: true,
      manualGlobalFilter: true,
      manualPagination: true,
      isMultiSortEvent: (_) => {
        return true;
      },
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      // pageCount
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useFlexLayout,
    hooks => {
      hooks.allColumns.push(columns => [
        CheckBoxColumn(columns),
        EditorColumn(),
        ...Columns.map((item) => (
          item(columns)
        )),
        ...columns
      ]);
    },
  );
  /**
   *query={
   * 'orderBy':[{field:'title',desc:true}]
   *'page':0,
   *'pageSize':10,
   *'search':'str',
   *'totalCount':1
   * }
   */
  const query = React.useMemo(() => ({
    page: pageIndex,
    pageSize: pageSize,
    orderBy: sortBy.map(item => {
      return {field: item.id, desc: item.desc};
    }),
    search: globalFilter
  }), [globalFilter, sortBy, pageIndex, pageSize]);

  React.useEffect(() => {
    api.query(query).then(res => {
      const {data: {page, values, total}} = res;
      console.log(res);
      setData(values);
      setRowCount(total);
    });
  }, [globalFilter, sortBy, pageIndex, pageSize]);


  const handleChangePage = (newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };

  const removeByIndexs = (array, indexs, ids) => {
    return array.filter((item, i) => {
      if (indexs.includes(i)) {
        ids.push(item.id);
        return false;
      }
      return true;
    });
  };


  const deleteHandler = () => {
    const id_list = [];
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
      id_list
    );
    api.delete({id_list}).then(res => {
      if (res.status === 'success') {
        setData(newData);
        setRowCount(rowCount - 1);
      }
    });

  };
  const updateHandler = value => {
    let isNew = true;
    let newData = data.map(item => {
      if (item.id === value.id) {
        isNew = false;
        return value;
      }
      return item;
    });
    if (isNew) {
      newData.push(value);
    }
    setData(newData);
  };

  return (
    <TableContainer component={Paper}>
      {renderDialog ? renderDialog(updateHandler) : null}
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        {...{
          tableName,
          handleAddRow,
          deleteHandler,
          globalFilter,
          preGlobalFilteredRows,
          setGlobalFilter
        }}
      />
      <MuiTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  className={classes.cell}
                  // padding={'none'}
                  {...(column.disableSortBy
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))
                  }
                >
                  {column.render('Header')}
                  {column.disableSortBy ? null : (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell className={classes.cell} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              classes={{
                root: classes.tablePagination,
                toolbar: classes.tablePaginationToolBar
              }}
              // 写入配置
              labelRowsPerPage={'每页:'}
              labelDisplayedRows={
                ({from, to, count}) => {
                  return `${from}-${to}/${count}`;
                }
              }
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={rowCount}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: {'aria-label': 'rows per page'},
                // native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </TableContainer>
  );
};

export default EnhancedTable;
