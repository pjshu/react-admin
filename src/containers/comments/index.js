import React, {useMemo} from 'react';
import Comment from './Comment';
import {Content} from './Cell';
// import {Content, Extend, ExtendHeader} from './Cell';
import {formatTime} from "../../helpers/datetime";

function Index() {
  const columns = useMemo(
    () => [
      // {
      //   // Build our expander column
      //   id: 'expander', // Make sure it has an ID
      //   Header: ({getToggleAllRowsExpandedProps, isAllRowsExpanded}) => (
      //     <ExtendHeader {...{getToggleAllRowsExpandedProps, isAllRowsExpanded}}/>
      //   ),
      //   Cell: ({row}) => <Extend row={row}/>,
      //   disableSortBy: true,
      //   maxWidth: 80
      // },
      {
        id: 'id',
        Header: 'id',
        accessor: 'id',
        disableSortBy: true,
        maxWidth: 80
      }, {
        Header: '文章id',
        accessor: 'post_id',
        disableSortBy: true,
        maxWidth: 80
      },
      {
        Header: '显示',
        accessor: 'show',
        disableSortBy: true,
        Cell: ({row}) => row.original.show ? '是' : '否',
        maxWidth: 80
      },
      {
        Header: '文章标题',
        accessor: 'post_title',
        disableSortBy: true
      },
      {
        Header: '内容',
        accessor: 'content',
        disableSortBy: true,
        width: 200,
        Cell: ({row}) => <Content row={row}/>,
      },
      {
        Header: '昵称',
        accessor: 'nickname',
        disableSortBy: true
      },
      {
        Header: '邮箱',
        accessor: 'email',
        disableSortBy: true
      },
      {
        Header: '浏览器',
        accessor: 'browser',
        disableSortBy: true
      }, {
        Header: '操作系统',
        accessor: 'system',
        disableSortBy: true
      }, {
        Header: '网站',
        accessor: 'website',
        disableSortBy: true
      },
      {
        Header: '评论时间',
        accessor: 'create_date',
        Cell: ({row}) => formatTime(row.original.create_date),
      },
      {
        Header: '父评论id',
        accessor: 'parent_id',
        disableSortBy: true,
        maxWidth: 100
      }
    ],
    []
  );
  return (
    <Comment columns={columns}/>
  );
}

export default Index;
