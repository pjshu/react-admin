import React, {useCallback} from 'react';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useStyles from './globalFilter.style';


const GlobalFilter = ({globalFilter, setGlobalFilter}) => {
  const classes = useStyles();
  const [cacheFilter, setCacheFilter] = React.useState(globalFilter);
  const handleClearFilter = () => {
    setCacheFilter('');
    setGlobalFilter('');
  };
  const handleInputChange = useCallback((e) => {
    setCacheFilter(e.target.value);
  }, []);
  const handleSearch = useCallback((e) => {
    if (e.keyCode === 13) {
      setGlobalFilter(e.target.value);
    }
  }, [setGlobalFilter]);

  return (
    <div title={'回车搜索'} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      {
        cacheFilter && (
          <div onClick={handleClearFilter} className={classes.deleteIcon}>
            <DeleteForeverIcon/>
          </div>
        )
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


export default React.memo(GlobalFilter);
