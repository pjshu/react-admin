import React, {useState} from 'react';
import {Button, makeStyles} from "@material-ui/core";
import 'braft-editor/dist/output.css';
import './prism.css';
import Prism from './prism';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: (modalOpen) => modalOpen ? '' : 'none',
    position: 'absolute',
    zIndex: '100',
    left: '50%',
    transform: 'translate(-50%, 0)'
  },
  paper: {
    width: 700,
    minHeight: 700,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    '&  table': {
      tableLayout: 'fixed',
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 0 0 1px #dfdfdf',
    },
    '&  td': {
      padding: '20px',
      letterSpacing: '1px',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: '10px',
      },
    },
    '&  tr:nth-child(even) > td:nth-child(even)': {
      background: '#F6F8FC'
    },
    '&  tr:nth-child(odd) > td:nth-child(odd)': {
      background: '#F6F8FC'
    }
  }
}));

function Preview({modalOpen, handleOnClose, value}) {
  const classes = useStyles(modalOpen);
  React.useEffect(() => {
    Prism.highlightAll();
  }, [modalOpen]);

  // 这里用material-ui的拟态框(Modal组件)有两个坑:
  // 1.prism加载有问题
  //  Prism.highlightAll() 需要写成setTimeout() =>Prism.highlightAll(),0.001)的形式才会更新样式,原因未知
  // 2.编辑器光标会出现错乱,且,原因未知
  //  调用 editorRef.current.forceRender()重新,以重置光标位置

  return (
    <div
      className={classes.modal}
      style={{}}
    >
      <div className={classes.paper}>
        <div className={classes.table} style={{
          whiteSpace: 'pre-wrap'
        }} dangerouslySetInnerHTML={{__html: value.toHTML()}}/>
        <div>
          {/*TODO这里用原生button需要添加type='button' 否则触发提交按钮,原因未知*/}
          <Button
            variant="contained"
            color="primary"
            style={{
              width: '100px',
              position: 'absolute',
              right: '20px',
              bottom: '20px'
            }} onClick={handleOnClose}>
            关闭
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
