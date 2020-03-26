import React, {useState} from 'react';
import {IconButton} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import {useFormikContext} from "formik";
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import useStyles from './speedSetting.style';
import marked from '../../config/marked';
import BraftEditor from "braft-editor";
import {useDispatch} from "react-redux";
import {deletePost, openDraw} from '../../redux/postSlice';
import {addWarningMessage} from '../../redux/globalSlice';


export default function SpeedSetting() {
  const classes = useStyles();
  const [settingOpen, setSettingOpen] = useState(false);
  const {values, setFieldValue} = useFormikContext();
  const disPatch = useDispatch();

  const handleOnDelete = React.useCallback(() => {
    disPatch(deletePost([values.id]));
  }, [disPatch, values.id]);

  const openSetting = React.useCallback(() => {
    disPatch(openDraw());
  }, [disPatch]);

  const handleFileUpload = React.useCallback((e) => {
    const file = e.target.files;
    if (file.length > 1) {
      disPatch(addWarningMessage('仅支持单个上传'));
    }

    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function (res) {
      let htmlString = marked(res.target.result);
      setFieldValue('article', BraftEditor.createEditorState(htmlString));
    };
  }, [disPatch, setFieldValue]);

  const handleClose = () => {
    setSettingOpen(false);
  };

  const handleOpen = () => {
    setSettingOpen(true);
  };

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
        {icon: <SaveIcon/>, name: '保存', type: "submit"},
        {icon: <SettingsIcon/>, name: '设置', onClick: openSetting},
        {icon: <UploadMarkdown {...{handleFileUpload}}/>, name: '上传markdown'},
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
}

const UploadMarkdown = (props) => {
  const classes = useStyles();
  return (
    <>
      <input
        className={classes.hidden}
        accept=".md"
        type="file"
        id="upload-file"
        multiple
        onChange={props.handleFileUpload}/>
      <label htmlFor="upload-file">
        <IconButton color="primary" component="span" className={classes.uploadBtn}>
          <InsertDriveFileOutlinedIcon color="action"/>
        </IconButton>
      </label>
    </>
  );
};
