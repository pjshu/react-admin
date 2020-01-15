import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
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
}));

export function Setting(props) {
  const classes = useStyles();
  const {open} = props;
  const {values, setFieldValue} = useFormikContext();
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
      </Grid>
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

export function SettingButton(props) {
  const {open, setOpen} = props;
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
