import React, {useCallback, useState, useContext} from 'react';
import {IconButton} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import useStyles from './speedSetting.style';
import marked from '../../config/marked';
import {useDispatch, useSelector} from "react-redux";
import {deletePost, openDraw} from '../../redux/postSlice';
import {addWarningMessage} from '../../redux/globalSlice';
import {toEditorState} from "../../components/editor/helper";
import {EditorContext} from "../../redux/editorState";
import {createFieldSelector} from "../../redux/formSlice";
import FORM from "../../contants/form.json";
import {EDITOR} from "../../config/editor";
import {SubmitPost} from './Submit'

const SpeedSetting = React.memo(function SpeedSetting({postId}) {
  const id = useSelector(createFieldSelector([FORM.post, 'id']));
  const classes = useStyles();
  const [settingOpen, setSettingOpen] = useState(false);
  const disPatch = useDispatch();

  const handleOnDelete = useCallback(() => {
    disPatch(deletePost([id]));
  }, [disPatch, id]);

  const openSetting = useCallback(() => {
    disPatch(openDraw());
  }, [disPatch]);


  const handleClose = useCallback(() => {
    setSettingOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setSettingOpen(true);
  }, []);

  return (
    <SpeedDial
      ariaLabel="setting"
      className={classes.speedDial}
      icon={<SpeedDialIcon/>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={settingOpen}
    >
      {[
        {icon: <DeleteOutlineIcon/>, name: '删除', onClick: handleOnDelete},
        {icon: <SubmitPost postId={postId}/>, name: '保存'},
        {icon: <SettingsIcon/>, name: '设置', onClick: openSetting},
        {icon: <UploadMarkdown/>, name: '上传markdown'},
      ].map(({name, ...other}) => (
        <SpeedDialAction
          key={name}
          tooltipTitle={name}
          title={name}
          {...other}
        />
      ))}
    </SpeedDial>
  );
});


const UploadMarkdown = React.memo(function UploadMarkdown() {
  const classes = useStyles();
  const disPatch = useDispatch();
  const {dispatch: disPatchEditorState, action} = useContext(EditorContext);

  const readText = useCallback((file) => {
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function (res) {
      let htmlString = marked(res.target.result);
      disPatchEditorState(action.article(toEditorState(htmlString, EDITOR.article)));
    };
  }, [action, disPatchEditorState]);

  // 上传markdown
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files;
    if (file.length > 1) {
      disPatch(addWarningMessage('仅支持单个上传'));
    }
    readText(file);
  }, [disPatch, readText]);

  return (
    <>
      <input
        className={classes.hidden}
        accept=".md"
        type="file"
        id="upload-file"
        multiple
        onChange={handleFileUpload}/>
      <label htmlFor="upload-file">
        <IconButton
          color="primary"
          component="span"
          className={classes.uploadBtn}
        >
          <InsertDriveFileOutlinedIcon color="action"/>
        </IconButton>
      </label>
    </>
  );
});

export default SpeedSetting;
