import React from 'react';
import {localization, options, postColumns, tableIcons} from "../../config/tableConfig";
import api from "../../helpers/http";
import {toPost} from "../../history";
import AlertMessage from "../../components/AlertMessage";
import Table from '../../components/table';
import Chip from "@material-ui/core/Chip";


const Tags = ({values}) => (
  <>
    {values.map(tag => (
      <Chip key={tag} label={tag}/>
    ))}
  </>
);

export default function Tables() {
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
        Header: '标签',
        accessor: 'tags',
        Cell: ({cell: {value}}) => <Tags values={value}/>
      },
      {
        Header: '评论',
        accessor: 'comments',
      },
      {
        Header: '状态',
        accessor: 'visibility'
      },
      {
        Header: '修改日期',
        accessor: 'change_date',
      },
      {
        Header: '创建日期',
        accessor: 'create_date',
      },
    ],
    []
  );
  const handleAddRow = () => {
    api.addPost().then(res => {
      const {data, status} = res;
      if (status === 'success') {
        toPost(data.id);
      }
    });
  };
  const handleEditor = ({original}) => {
    toPost(original.id);
  };
  return (
    <Table
      tableName={'文章'}
      handleAddRow={handleAddRow}
      handleEditor={handleEditor}
      columns={columns}
      api={{
        query: api.queryPosts,
        // modifyPost: api.modifyPost,
        delete: api.deletePost
      }}
    />
  );
}
