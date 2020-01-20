import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import BraftEditor from "../../config/editorConfig";
import {markdown} from "markdown";
import {useFormikContext} from "formik";
import {deletePost} from "../../helpers/http";
import router from "../../contants/router";
import PostAddIcon from '@material-ui/icons/PostAdd';


const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));


export default function SpeedSetting({open, setOpen, history}) {
  const classes = useStyles();
  const [settingOpen, setSettingOpen] = React.useState(false);
  const {values, setFieldValue} = useFormikContext();

  function handleOnDelete(postId) {
    deletePost(postId).then(res => {
      console.log(res);
      if (res.data.status === 'success') {
        history.push(router.ADMIN);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  function handleFileUpload(e) {
    const file = e.target.files;
    if (file.length > 1) {
      alert("仅支持单个上传");
    }
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function (res) {
      setFieldValue('article', BraftEditor.createEditorState(markdown.toHTML(res.target.result)));
    };
  }

  const actions = [
    {icon: <DeleteOutlineIcon/>, name: '删除', onClick: () => handleOnDelete(values.postId)},
    {icon: <SaveIcon/>, name: '保存', type: "submit"},
    {
      icon: <PostAddIcon/>, name: '上传markdown', render: (<input
        accept=".md"
        onChange={handleFileUpload}
        type="file"
        multiple
        style={{display: 'none'}}
      />)
    },
    {
      icon: <SettingsIcon/>, name: '设置', onClick: () => {
        setOpen(!open);
      }
    },
  ];
  const handleClose = () => {
    setSettingOpen(false);
  };

  const handleOpen = () => {
    setSettingOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      icon={<SpeedDialIcon/>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={settingOpen}
    >
      {actions.map(({name, render, ...other}) => (
        <SpeedDialAction
          key={name}
          tooltipTitle={name}
          title={name}
          {...other}
        >{render ? render : null}
        </SpeedDialAction>
      ))}
    </SpeedDial>
  );
}

/*

 */
