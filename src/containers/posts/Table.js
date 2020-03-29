import React, {useCallback, useMemo} from 'react';
import {toPost} from "../../history";
import Table from '../../components/table';
import Chip from "@material-ui/core/Chip";
import {useDispatch} from "react-redux";
import {addPost} from "../../redux/postSlice";
import api from '../../helpers/http';

const Tags = ({values}) => (
  <>
    {values.map(tag => (
      <Chip key={tag} label={tag}/>
    ))}
  </>
);

function Tables() {
  const dispatch = useDispatch();
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        Header: 'id',
        accessor: 'id',
        disableSortBy: true
      },
      {
        Header: '标题',
        accessor: 'title',
      },

      {
        Header: '标签',
        accessor: 'tags',
        disableSortBy: true,
        Cell: ({cell: {value}}) => <Tags values={value}/>
      },
      {
        Header: '评论',
        accessor: 'comments',
        disableSortBy: true
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

  const handleAddRow = useCallback(() => {
    dispatch(addPost());
  }, [dispatch]);

  const handleEditor = useCallback(({original}) => {
    toPost(original.id);
  }, []);

  const _api = useMemo(() => ({
    query: api.queryPosts,
    // modifyPost: api.modifyPost,
    delete: api.deletePost
  }), []);

  return (
    <Table
      tableName={'文章'}
      handleAddRow={handleAddRow}
      handleEditor={handleEditor}
      columns={columns}
      api={_api}
    />
  );
}

export default React.memo(Tables)
