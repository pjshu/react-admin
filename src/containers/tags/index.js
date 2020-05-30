import Tags from "./Tags";

import React from 'react';
import {injectReducer} from "../../redux/store";
import reducer from "../../redux/tagSlice";

function Index() {
  injectReducer('tag', reducer);
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        Header: 'id',
        accessor: 'id',
        disableSortBy: true
      },
      {
        Header: '名字',
        accessor: 'name',
      },
      {
        Header: '描述',
        accessor: 'describe',
        disableSortBy: true
      }, {
        Header: '文章数量',
        accessor: 'count',
      },
    ],
    []
  );
  return <Tags columns={columns}/>;
}

export default Index;
