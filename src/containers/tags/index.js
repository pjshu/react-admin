import Tags from "./Tags";

import React from 'react';

// const tagColumns = [
//   {title: '名字', field: 'name'},
//   {title: '描述', field: 'describe', sorting: false},
//   {title: '数量', field: 'count', editable: 'never', initialEditValue: 0},
// ];

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
        Header: '数量',
        accessor: 'count',
      }
    ],
    []
  );
  return <Tags{...{columns}}/>;
}

export default Index;
