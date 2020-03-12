import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './Table';
import Chip from '@material-ui/core/Chip';

const Tags = ({values}) => (
  <>
    {values.map(tag => (
      <Chip key={tag} label={tag}/>
    ))}
  </>
);

const Table = ({columns}) => {


  const [data, setData] = React.useState([]);
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    // setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div>
      <CssBaseline/>
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
      />
    </div>
  );
};

export default Table;
