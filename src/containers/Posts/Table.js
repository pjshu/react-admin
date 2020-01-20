import React, {createRef} from 'react';
import MaterialTable from 'material-table';
import {localization, options, postColumns, tableIcons} from "../../config/tableConfig";
import {deletePost, modifyPost, requirePosts} from "../../helpers/http";
import router from '../../contants/router';

export default function Tables({history}) {
  // TODO: 数据没加载时,加载动画
  const tableRef = createRef();

  function handleOnDelete(oldPost) {
    //TODO: 优化,删除一行需要重新获取整个表格数据,应该仅从本地表格删除数据,服务器返回是否删除成功
    return new Promise(resolve => {
      deletePost(oldPost.postId).then(res => {
        if (res.data.status === 'success') {
          resolve();
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }


  function handleRowUpdate(newPost) {
    //TODO: 优化,修改一行需要重新获取整个表格数据,应该仅从本地表格修改数据,服务器返回是否删除成功
    return new Promise(resolve => {
      return modifyPost(newPost).then(res => {
        if (res.data.status === 'success') {
          resolve();
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }

  function handleRowClick(_, post) {
    // TODO: 不同的块跳转到相应页面
    history.push(`${router.ADMIN_POST}/${post.postId}`);
  }

  function handlePagingQuery(query) {
    console.log(query);
    return new Promise((resolve) => {
      requirePosts(query).then(res => {
        const data = res.data.data;
        resolve({
          data: [...data.post],
          page: data.page,
          totalCount: data.total
        });
      }).catch(error => {
        console.log(error);
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
