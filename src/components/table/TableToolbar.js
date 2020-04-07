import React from 'react';

import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobalFilter from './GlobalFilter';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from "@material-ui/icons/Add";
import useStyles from './toolbar.style';
import {areEqual} from "../../helpers/misc";

const TableToolbar = props => {
  const classes = useStyles();
  const {
    numSelected,
    deleteHandler,
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    handleAddRow,
    tableName
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div>
        {
          handleAddRow ? (
            <Tooltip title="Add">
              <IconButton aria-label="add" onClick={handleAddRow}>
                <AddIcon/>
              </IconButton>
            </Tooltip>
          ) : null
        }
      </div>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected}
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {tableName}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteHandler}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          {...{
            globalFilter,
            preGlobalFilteredRows,
            setGlobalFilter
          }}
        />
      )}
    </Toolbar>
  );
};

export default React.memo(TableToolbar, areEqual);
