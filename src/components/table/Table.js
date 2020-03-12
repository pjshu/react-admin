import React from 'react';

import {
  Paper,
  Checkbox,
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

import TablePaginationActions from './TablePaginationActions';

import TableToolbar from './TableToolbar';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
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
import EditorDialog from "./EditorDialog";
import Toolbar from "@material-ui/core/Toolbar";
import getCurrentTime from '../../helpers/datetime';

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


const IndeterminateCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const CheckBoxColumn = (column) => ({
  id: 'selection',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Header: ({getToggleAllRowsSelectedProps}) => (
    <div>
      <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    </div>
  ),
  Cell: ({row}) => (
    <div>
      <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    </div>
  ),
});

const EditorColumn = () => ({
  id: 'editor',
  Header: '编辑',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Cell: ({openDialog, row}) => (
    <div>
      <EditIcon onClick={() => {
        openDialog('update');
        console.log(row);
      }}/>
    </div>
  ),
});

const initial = {
  title: '',
  create_time: '2019/10/20',
  update_time: '2019/10/20',
  tags: [],
  comments: 0,
};

const EnhancedTable = ({columns, data, setData, updateMyData}) => {
  const [pageCount, setPageCount] = React.useState(0);
  const [dialogInit, setDialogInit] = React.useState({
    title: '',
    create_time: '2019/10/20',
    update_time: '2019/10/20',
    tags: [],
    comments: 0,
  });
  const [dialogState, setDialogState] = React.useState({
    open: false,
    action: 'add' //add 或者 update
  });
  const openDialog = React.useCallback((state = 'add') => {
    return setDialogState({
      action: state,
      open: true
    });
  }, []);

  const closeDialog = React.useCallback((state = 'add') => {
    return setDialogState({
      action: state,
      open: false
    });
  }, []);

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
      openDialog,
      manualSorting: true,
      manualGlobalFilter: true,
      manualPagination: true,
      isMultiSortEvent: (_) => {
        return true;
      },
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetFilters: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    // useBlockLayout,
    useFlexLayout,
    hooks => {
      hooks.allColumns.push(columns => [
        EditorColumn(),
        ...columns
      ]);
    },
    hooks => {
      hooks.allColumns.push(columns => [
        CheckBoxColumn(columns),
        ...columns,
      ]);
    },
  );
  /**
   *
   'orderBy':'{"title":"标题","field":"title"}'
   'orderDirection': 'asc',
   'page':'0',
   'pageSize':'10',
   'search':'str',
   'totalCount':'1'
   */
  React.useEffect(() => {
    const query = {
      page: pageIndex,
      pageSize: pageSize,
      orderBy: sortBy.map(item => {
        return {field: item.id, desc: item.desc};
      }),
      search: globalFilter
    };
    axios.get('http://127.0.0.1:5000/api/admin/posts', {params: query}).then(res => {
      const {data: {page, posts, total}} = res;
      setData(posts);
      setPageCount(total);
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
    const ids = [];
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
      ids
    );
    axios.delete('http://127.0.0.1:5000/api/admin/posts', {
      data: ids
    }).then(res => {
      const {data: {status}} = res;
      if (status === 'success') {
        setData(newData);
      }
    });
  };

  const addHandler = user => {
    const newData = data.concat([user]);
    setData(newData);
  };

  return (
    <TableContainer component={Paper}>
      <EditorDialog {...{initial, addHandler, dialogState, openDialog, closeDialog}}/>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        {...{
          openDialog,
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
              count={pageCount}
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
