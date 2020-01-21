import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Field, useFormikContext} from 'formik';
import Tags from './Tags';
import CreateDate from "./CreateDate";
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from "@material-ui/core/TextField";
import {Grid} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    '& > *': {
      width: '100%',
      marginTop: 40
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
  placeholder: {
    height: 5
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

export function Setting({open, setDrawerOpen}) {
  const classes = useStyles();
  const {values, setFieldValue} = useFormikContext();

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      classes={{paper: classes.drawerPaper}}
    >
      <Grid className={classes.container}>
        {/*占位,防止被导航栏遮挡*/}
        <div className={classes.placeholder}/>
        <FormControl>
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
        <Tags {...{tags: values.tags, setFieldValue, allTags: values.allTags}}/>
        <CreateDate {...{createDate: values.createDate, setFieldValue}}/>
        <TextField label="修改日期" InputProps={{readOnly: true}} value={values.changeDate}/>
        {/*关闭导航栏按钮*/}
        <div className={classes.toolbar}>
          <IconButton onClick={setDrawerOpen}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </Grid>
    </Drawer>
  );
}

