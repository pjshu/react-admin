import React from 'react';
import {Button} from "@material-ui/core";
import 'braft-editor/dist/output.css';
import Prism from './prism';
import 'braft-extensions/dist/emoticon.css';
import useStyles from './preview.style';
import ReactDOM from 'react-dom';


const modalRoot = document.getElementById('modal-root');

export const PreviewField = ({value}) => {
  const classes = useStyles();
  return (<div
      className={`${classes.table} ${classes.post} ${classes.emoji}`}
      dangerouslySetInnerHTML={{__html: value.toHTML()}}
    />
  );
};


function Preview({modalOpen, handleOnClose, value, ...rest}) {
  const classes = useStyles();
  React.useEffect(() => {
    Prism.highlightAll();
  }, [modalOpen]);

  // 这里用material-ui的拟态框(Modal组件)有两个坑:
  // 1.prism加载有问题
  //  Prism.highlightAll() 需要写成setTimeout() =>Prism.highlightAll(),0.001)的形式才会更新样式,原因未知
  // 2.编辑器光标会出现错乱,且,原因未知
  //  调用 editorRef.current.forceRender()重新,以重置光标位置

  return (
    ReactDOM.createPortal(
      (<div
        className={classes.modal}
        {...rest}
      >
        <div
          autoCorrect={true}
          className={classes.paper}
        >
          <PreviewField value={value}/>
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
      </div>),
      modalRoot
    )
  );
}

export default Preview;
