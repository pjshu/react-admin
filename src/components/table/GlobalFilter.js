import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    zIndex: '100',
    position: 'absolute',
    right: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    borderBottom: '1px solid',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

const GlobalFilter = ({globalFilter, setGlobalFilter}) => {
  const classes = useStyles();
  const [cacheFilter, setCacheFilter] = React.useState(globalFilter);
  const handleClearFilter = () => {
    setCacheFilter('');
    setGlobalFilter('');
  };
  const handleInputChange = (e) => {
    setCacheFilter(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      setGlobalFilter(e.target.value);
    }
  };
  return (
    <div title={'回车搜索'} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      {
        cacheFilter ? (
          <div onClick={handleClearFilter} className={classes.deleteIcon}>
            <DeleteForeverIcon/>
          </div>) : null
      }
      <InputBase
        value={cacheFilter || ''}
        onKeyDown={handleSearch}
        onChange={handleInputChange}
        // placeholder={`${count} 条...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{'aria-label': 'search'}}
      />
    </div>
  );
};


export default GlobalFilter;
