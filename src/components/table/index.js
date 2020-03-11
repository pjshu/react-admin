import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './Table';
import Chip from '@material-ui/core/Chip';

const Table = ({values}) => (
  <>
    {values.map(tag => (
      <Chip key={tag} label={tag}/>
    ))}
  </>
);
const App = () => {
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: '标题',
        accessor: 'title',
      },
      {
        Header: '修改日期',
        accessor: 'update_time',
      },
      {
        Header: '创建日期',
        accessor: 'create_time',
      },
      {
        Header: '标签',
        accessor: 'tags',
        Cell: ({cell: {value}}) => <Tags values={value}/>
      },
      {
        Header: '评论',
        accessor: 'comments',
      },
    ],
    []
  );

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
