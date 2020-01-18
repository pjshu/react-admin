import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {postColumns, localization, options, tableIcons} from "../../config/tableConfig";
import {deletePost, modifyPost, requirePosts} from "../../helpers/http";
import router from '../../contants/router';

export default function Tables({history}) {
  // TODO: 数据没加载时,加载动画
  useEffect(() => {
    requirePosts().then(res => {
      setPost(res.data.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  const [post, setPost] = React.useState([]);

  function handleOnDelete(oldPost) {
    return deletePost(oldPost.postId).then(res => {
      if (res.data.status === 'success') {
        setPost(prevPost => {
          const data = [...prevPost];
          data.splice(data.indexOf(oldPost), 1);
          return [...data];
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  function handleOnChange(newPost, oldPost) {
    const data = {...newPost};
    return modifyPost(data).then(res => {
      console.log(res);
      if(res.data.status === 'success'){
        setPost(prevPost => {
            const data = [...prevPost];
            data[data.indexOf(oldPost)] = newPost;
            return [...data];
          });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  function handleRowClick(_, post) {
    history.push(`${router.ADMIN_POST}/${post.postId}`);
  }

  return (
    <MaterialTable
      localization={localization}
      icons={tableIcons}
      title="文章列表"
      columns={postColumns}
      data={post}
      options={options}
      onChangeRowsPerPage={(size) => {
        console.log(size);
      }}
      onRowClick={handleRowClick}
      editable={{
        onRowUpdate: handleOnChange,
        onRowDelete: handleOnDelete
      }}
    />
  );
}
