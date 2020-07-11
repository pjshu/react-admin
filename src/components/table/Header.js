import useStyles from "./table.style";
import {TableCell, TableHead as MuiTableHeader, TableRow, TableSortLabel} from "@material-ui/core";
import React from "react";

const TableHeader = ({headerGroups}) => {
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
};
export default TableHeader;
