import React from 'react';
import {Button} from "@material-ui/core";
import 'braft-editor/dist/output.css';
import Prism from './prism';
import 'braft-extensions/dist/emoticon.css';
import useStyles from './preview.style';


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
    >
      <div className={classes.paper}>
        <div
          className={`${classes.table} ${classes.post} ${classes.emoji}`}
          dangerouslySetInnerHTML={{__html: value.toHTML()}}
        />
        <div>
          {/*TODO这里用原生button需要添加type='button' 否则触发提交按钮,原因未知*/}
          <Button
            className={classes.closeButton}
            variant="contained"
            color="primary"
            onClick={handleOnClose}>
            关闭
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
