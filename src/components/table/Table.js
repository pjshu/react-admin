import React, {useCallback, useMemo, useState} from 'react';

import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
} from '@material-ui/core';

import {addColumns, useDeleteData, useDeleteHandler, useGetQuery, useQuery, useUpdateHandler} from "./tool";
import TableToolbar from './TableToolbar';
import {
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import useStyles from './table.style';
import MemoPagination from './Pagination';
import TableHeader from './Header';

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
    handleEditor,
  } = props;
  const [rowCount, setRowCount] = useState(0);

  const classes = useStyles();
  const defaultColumn = useMemo(
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
        // hiddenColumns: ['id'],
      },
      columns,
      data,
      defaultColumn,
      updateMyData,
      handleEditor,
      manualSorting: true,
      manualGlobalFilter: true,
      manualPagination: true,
      paginateExpandedRows: true,
      isMultiSortEvent: () => {
        return true;
      },
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      pageCount: rowCount
    },
    useFlexLayout,
    useGlobalFilter,
    useSortBy,
    useResizeColumns,
    // useExpanded,
    useRowSelect,
    usePagination,
    hooks => addColumns(hooks, handleEditor, Columns),
  );
  const query = useGetQuery({sortBy, pageIndex, pageSize, globalFilter});
  const updateHandler = useUpdateHandler(setData, setRowCount);
  const deleteData = useDeleteData({api, setData, setRowCount});
  const deleteHandler = useDeleteHandler({selectedRowIds, deleteData, data});
  useQuery({api, setData, setRowCount, query});


  const handleChangePage = useCallback((newPage) => {
    gotoPage(newPage);
  }, [gotoPage]);

  const handleChangeRowsPerPage = useCallback(event => {
    setPageSize(Number(event.target.value));
  }, [setPageSize]);


  const numSelected = useMemo(() => {
    return Object.keys(selectedRowIds).length;
  }, [selectedRowIds]);

  return (
    <TableContainer component={Paper}>
      {renderDialog && renderDialog(updateHandler)}
      <TableToolbar
        {...{
          numSelected,
          tableName,
          handleAddRow,
          deleteHandler,
          globalFilter,
          preGlobalFilteredRows,
          setGlobalFilter,
        }}
      />
      <MuiTable {...getTableProps()}>
        <TableHeader headerGroups={headerGroups}/>
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
            <MemoPagination
              {...{rowCount, pageSize, pageIndex, handleChangePage, handleChangeRowsPerPage}}
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </TableContainer>
  );
};


export default React.memo(EnhancedTable);
