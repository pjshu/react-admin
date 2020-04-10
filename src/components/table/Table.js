import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead as MuiTableHeader,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core';

import TablePaginationActions from '../Pagination';
import {CheckBoxColumn, EditorColumn} from './Column';

import TableToolbar from './TableToolbar';
import {
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import useStyles from './table.style';
import {objAreEqual, areEqual} from "../../helpers/misc";


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
      isMultiSortEvent: () => {
        return true;
      },
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      // pageCount: rowCount
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
  const query = useMemo(() => ({
    page: pageIndex,
    pageSize: pageSize,
    orderBy: sortBy.map(item => {
      return {field: item.id, desc: item.desc};
    }),
    search: globalFilter
  }), [globalFilter, sortBy, pageIndex, pageSize]);


  useEffect(() => {
    api.query(query).then(res => {
      const {data: {values, total}} = res;
      setData(values);
      setRowCount(total);
    });
  }, [api, query, setData]);


  const handleChangePage = useCallback((newPage) => {
    gotoPage(newPage);
  }, [gotoPage]);

  const handleChangeRowsPerPage = useCallback(event => {
    setPageSize(Number(event.target.value));
  }, [setPageSize]);

  const removeByIndexs = (array, indexs, ids) => {
    return array.filter((item, i) => {
      if (indexs.includes(i)) {
        ids.push(item.id);
        return false;
      }
      return true;
    });
  };

  const deleteData = useCallback((id_list, newData) => {
    api.delete({id_list}).then(res => {
      if (res.status === 'success') {
        setData(newData);
        setRowCount(rowCount - 1);
      }
    });
  }, [api, rowCount, setData]);

  const deleteHandler = useCallback(() => {
    const id_list = [];
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
      id_list
    );
    deleteData(id_list, newData);
  }, [data, deleteData, selectedRowIds]);

  const updateHandler = useCallback((value) => {
    let isNewData = true;
    setData(old => {
      const newData = old.map(item => {
        if (item.id === value.id) {
          isNewData = false;
          return value;
        }
        return item;
      });
      if (isNewData) {
        newData.push(value);
        setRowCount((rowCount) => rowCount + 1);
      }
      return newData;
    });
  }, [setData]);

  const numSelected = useMemo(() => {
    return Object.keys(selectedRowIds).length;
  }, [selectedRowIds]);

  return (
    <TableContainer component={Paper}>
      {renderDialog ? renderDialog(updateHandler) : null}
      <TableToolbar
        {...{
          numSelected,
          tableName,
          handleAddRow,
          deleteHandler,
          globalFilter,
          preGlobalFilteredRows,
          setGlobalFilter
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

// TODO 注意,表单头,写死不重新渲染,以后扩展可能有bug
const headerAreEqual = (prevProps, nextProps) => {
  return true;
};

const TableHeader = React.memo(({headerGroups}) => {
  const classes = useStyles();
  return (
    <MuiTableHeader>
      {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {
            headerGroup.headers.map(column => (
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
    </MuiTableHeader>
  );
}, headerAreEqual);


const MemoPagination = React.memo((props) => {
  const {rowCount, pageSize, pageIndex, handleChangePage, handleChangeRowsPerPage} = props;
  const classes = useStyles();
  return (
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
  );
}, areEqual);

const tableAreEqual = (pre, next) => {
  //不对比columns字段
  const blacklist = ['columns', 'tableName'];
  return objAreEqual(pre, next, blacklist);
};

export default React.memo(EnhancedTable, tableAreEqual);
