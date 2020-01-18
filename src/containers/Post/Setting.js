import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SettingsIcon from '@material-ui/icons/Settings';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Button, Grid} from "@material-ui/core";
import DescriptionIcon from '@material-ui/icons/Description';
import {Field, useFormikContext} from 'formik';
import BraftEditor from "../../config/editorConfig";
import {markdown} from "markdown";
import Tags from './Tags';
import CreateDate from "./CreateDate";
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from "@material-ui/core/TextField";
import {deletePost} from "../../helpers/http";
import router from '../../contants/router'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  placeholder: {
    height: 70
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

export function Setting({open, setOpen,history}) {
  const classes = useStyles();
  const {values, setFieldValue} = useFormikContext();

  function handleOnDelete(postId) {
    deletePost(postId).then(res => {
      console.log(res);
      if(res.data.status === 'success'){
        history.push(router.ADMIN)
      }
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.placeholder}/>
      <FormControl className={classes.formControl}>
        <InputLabel>状态</InputLabel>
        <Field
          name='visibility'
          as={Select}
          value={values.visibility}
        >
          <MenuItem value="私密">私密</MenuItem>
          <MenuItem value="公开">公开</MenuItem>
        </Field>
      </FormControl>
      <Grid title="添加markdown文件">
        <Button component="label">
          <DescriptionIcon/>
          <input
            accept=".md"
            onChange={handleFileUpload}
            type="file"
            multiple
            style={{display: "none"}}
          />
        </Button>
        <Button variant="contained" type="submit" color="primary">
          保存
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleOnDelete(values.postId)}>
          删除
        </Button>
      </Grid>
      <Tags {...{tags: values.tags, setFieldValue, allTags: values.allTags}}/>
      <CreateDate {...{createDate: values.createDate, setFieldValue}}/>
      <TextField label="修改日期" InputProps={{readOnly: true}} value={values.changeDate}/>
      {/*关闭导航栏按钮*/}
      <div className={classes.toolbar}>
        <IconButton onClick={() => setOpen(!open)}>
          <ChevronRightIcon/>
        </IconButton>
      </div>

    </Drawer>
  );

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
}

export function SettingButton({open, setOpen}) {
  return (
    <IconButton
      color="inherit"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <SettingsIcon/>
    </IconButton>
  );
}
