import Tags from "./Tags";

import React from 'react';

function Index() {
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: '名字',
        accessor: 'name',
      },
      {
        Header: '描述',
        accessor: 'describe',
      }, {
        Header: '文章数量',
        accessor: 'count',
      }
    ],
    []
  );
  return <Tags columns={columns}/>;
}

export default Index;
