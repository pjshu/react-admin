import {makeStyles} from "@material-ui/core";

export default makeStyles({
  snackbarRoot: {
    position: 'relative'
  },
  list: {
    flexDirection: 'column-reverse',
    display: 'flex',
    // 会对其他元素(拟态框)造成遮挡,导致该区域事件失效
    zIndex: 10,
    position: "fixed",
    bottom: 0,
    left: '10%',
    // transform: 'translateX(-50%)',
    height: 200,
    minWidth: 200,
    maxWidth: 300,
  },
  listItem: {
    display: 'block'
  },
  box: {
    width: '100%'
  }
});
