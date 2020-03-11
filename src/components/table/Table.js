import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableToolbar from './TableToolbar';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

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

const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
};

// Create an editable cell renderer
const EditableCell = ({
                        cell: {value: initialValue},
                        row: {index},
                        column: {id},
                        updateMyData, // This is a custom function that we supplied to our table instance
                      }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  const onChange = e => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      style={inputStyle}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

const EnhancedTable = ({columns, data, setData, updateMyData}) => {
  const [pageCount, setPageCount] = React.useState(0);
  const {
      getTableProps,
      headerGroups,
      prepareRow,
      page,
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
      // defaultColumn,
      updateMyData,
      // pageCount: pageCount,
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
    hooks => {
      hooks.allColumns.push(columns => [
        {
          id: 'editor',
          Header: () => (
            <div>
              <span>编辑</span>
            </div>
          ),
          Cell: ({row}) => (
            <div>
              <EditIcon onClick={() => {
                console.log(row);
              }}/>
            </div>
          ),
        },
        ...columns
      ]);
    },
    hooks => {
      hooks.allColumns.push(columns => [
        {
          id: 'selection',
          Header: ({getToggleAllRowsSelectedProps}) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({row}) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
    )
  ;
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
    axios.get('http://127.0.0.1:5000/posts', {params: query}).then(res => {
      setData(res.data.data);
      setPageCount(res.data.pageCount);
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

  const deleteUserHandler = event => {
    const ids = [];
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
      ids
    );
    axios.delete('http://127.0.0.1:5000/posts', {
      data: ids
    }).then(res => {
      const {data: {status}} = res;
      if (status === 'success') {
        setData(newData);
      }
    });
  };

  const addUserHandler = user => {
    const newData = data.concat([user]);
    setData(newData);
  };


  return (
    <TableContainer>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteUserHandler={deleteUserHandler}
        addUserHandler={addUserHandler}
        {...{globalFilter, preGlobalFilteredRows, setGlobalFilter}}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
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
              // 写入配置
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
      </MaUTable>
    </TableContainer>
  );
};

export default EnhancedTable;
