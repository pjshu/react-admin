import React, {createRef} from 'react';
import MaterialTable from 'material-table';
import {localization, options, postColumns, tableIcons} from "../../config/tableConfig";
import api from "../../helpers/http";
import {toPost} from "../../history";
import AlertMessage from "../../components/AlertMessage";


export default function Tables() {
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

  return (
    <MaterialTable
      tableRef={tableRef}
      data={handlePagingQuery}
      localization={localization}
      icons={tableIcons}
      title="文章列表"
      columns={postColumns}
      options={options}
      onSelectionChange={(data, rowData) => console.log(data, rowData)}
      onChangeRowsPerPage={() => {
        tableRef.current.onQueryChange();
      }}
      onSearchChange={(filters) => {
        console.log('filters',filters);
      }}
      onRowClick={handleRowClick}
      editable={{
        onRowUpdate: handleRowUpdate,
        onRowDelete: handleOnDelete
      }}
    />
  );
}
