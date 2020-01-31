import React, {createRef} from 'react';
import MaterialTable from 'material-table';
import {localization, options, postColumns, tableIcons} from "../../config/tableConfig";
import api from "../../helpers/http";
import {toPost} from "../../history";

export default function Tables() {
  // TODO: 数据没加载时,加载动画
  const tableRef = createRef();

  function handleOnDelete(oldPost) {
    //TODO: 优化,删除一行需要重新获取整个表格数据,应该仅从本地表格删除数据,服务器返回是否删除成功
    return new Promise(resolve => {
      const postId = oldPost.postId;
      api.deletePost({postId}).then(res => {
        if (res.status === 'success') {
          resolve();
        }
      });
    });
  }


  function handleRowUpdate(newPost) {
    //TODO: 优化,修改一行需要重新获取整个表格数据,应该仅从本地表格修改数据,服务器返回是否删除成功
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
    toPost(post.postId);
  }

  function handlePagingQuery(query) {
    return new Promise((resolve) => {
      api.getPosts(query).then(res => {
        const data = res.data;
        resolve({
          data: [...data.post],
          page: data.page,
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
      onChangeRowsPerPage={(size) => {
        tableRef.current.onQueryChange();
        console.log(size);
      }}
      onRowClick={handleRowClick}
      editable={{
        onRowUpdate: handleRowUpdate,
        onRowDelete: handleOnDelete
      }}
    />
  );
}
