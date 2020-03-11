import React from 'react';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {makeStyles, useTheme} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = props => {
  const classes = useStyles();
  const {count, page, rowsPerPage, onChangePage} = props;

  const handleFirstPageButtonClick = () => {
    onChangePage(0);
  };

  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon/>
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft/>
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight/>
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon/>
      </IconButton>
    </div>
  );
};

export default TablePaginationActions;
