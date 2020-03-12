import React, {createRef} from 'react';
import MaterialTable from 'material-table';
import {localization, options, postColumns, tableIcons} from "../../config/tableConfig";
import api from "../../helpers/http";
import {toPost} from "../../history";
import AlertMessage from "../../components/AlertMessage";
import Table from '../../components/table';
import EditIcon from "@material-ui/icons/Edit";
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
  const tableRef = createRef();

  const handleOnDelete = (oldPost) => {
    return new Promise(resolve => {
      const id = oldPost.id;
      api.deletePost({id}).then(res => {
        if (res.status === 'success') {
          AlertMessage.success('删除成功');
          resolve();
        } else {
          AlertMessage.error('删除失败');
        }
      });
    });
  };


  function handleRowUpdate(newPost) {
    return new Promise(resolve => {
      return api.modifyPost(newPost).then(res => {
        if (res.status === 'success') {
          resolve();
        }
      });
    });
  }

  function handleRowClick(_, post) {
    // TODO: 不同的块跳转到相应页面
    toPost(post.id);
  }

  function handlePagingQuery(query) {
    return new Promise((resolve) => {
      api.queryPosts(query).then(res => {
        const data = res.data;
        resolve({
          data: [...data.posts],
          page: data.page - 1,
          totalCount: data.total
        });
      });
    });
  }

  const handleAddRow = () => {

  };
  const handleEditor = () => {

  };
  return (
    <Table
      handleAddRow={handleAddRow}
      handleEditor={handleEditor}
      columns={columns}
      api={{
        query: api.queryPosts,
        // modifyPost: api.modifyPost,
        modify: api.deletePost,
      }}
    />
  );
}
