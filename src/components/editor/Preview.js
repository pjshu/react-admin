import React, {useContext} from 'react';
import {Button} from "@material-ui/core";
import Prism from './prism';
import 'braft-extensions/dist/emoticon.css';
import useStyles from './preview.style';
import ReactDOM from 'react-dom';
import {areEqual} from "../../helpers/misc";
import EditorContext from "../../redux/editorState";


const modalRoot = document.getElementById('modal-root');


export const PreviewField = React.memo(({name}) => {
  const {state} = useContext(EditorContext);
  const value = state[name];
  const classes = useStyles();
  return (<div
      className={`${classes.table} ${classes.post} ${classes.emoji}`}
      dangerouslySetInnerHTML={{__html: value.toHTML()}}
    />
  );
}, areEqual);


function Preview({handleOnClose, modalOpen, name}) {
  const classes = useStyles(modalOpen);

  React.useEffect(() => {
    if (modalOpen === true) {
      Prism.highlightAll();
    }
  }, [modalOpen]);
  // 这里用material-ui的拟态框(Modal组件)有两个坑:
  // 1.prism加载有问题
  //  Prism.highlightAll() 需要写成setTimeout() =>Prism.highlightAll(),0.001)的形式才会更新样式,原因未知
  // 2.编辑器光标会出现错乱,且,原因未知
  //  调用 editorRef.current.forceRender()重新,以重置光标位置
  return (
    ReactDOM.createPortal((
        <div className={classes.modal}>
          <div className={classes.paper}>
            <PreviewField name={name}/>
            <div>
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
      ),
      modalRoot
    )
  );
}

export default React.memo(Preview, areEqual);
