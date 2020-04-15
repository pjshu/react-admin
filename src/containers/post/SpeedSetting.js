import React, {useCallback, useState, useContext} from 'react';
import {IconButton} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import useStyles from './speedSetting.style';
import marked from '../../config/marked';
import {useDispatch, useSelector} from "react-redux";
import {deletePost, openDraw} from '../../redux/postSlice';
import {addWarningMessage} from '../../redux/globalSlice';
import {SubmitBtn} from "../../components/Form";
import {areEqual, toEditorState} from "../../helpers/misc";
import EditorContext from "../../redux/editorState";
import {FORM, selectForm} from "../../redux/formSlice";
import {EDITOR} from "../../config/editor";


const SpeedSetting = React.memo(function SpeedSetting({postId}) {
  const {[FORM.post]: {id}} = useSelector(selectForm);
  return <ContextSpeedSetting id={id} postId={postId}/>;
}, areEqual);

const ContextSpeedSetting = React.memo(function ({id, postId}) {
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
        {icon: <SaveIcon/>, name: '保存', type: "submit", form: 'post-form'},
        {icon: <SettingsIcon/>, name: '设置', onClick: openSetting},
        {icon: <UploadMarkdown {...{postId}}/>, name: '上传markdown'},
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
}, areEqual);

const UploadMarkdown = React.memo(({postId}) => {
  const classes = useStyles();
  const disPatch = useDispatch();
  const {disPatchEditorState, action} = useContext(EditorContext);

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
        <SubmitBtn
          as={IconButton}
          color="primary"
          component="span"
          className={classes.uploadBtn}
          formName={FORM.post}
          hookParam={postId}
        >
          <InsertDriveFileOutlinedIcon color="action"/>
        </SubmitBtn>
      </label>
    </>
  );
}, areEqual);

export default SpeedSetting;
