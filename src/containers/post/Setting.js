import React, {useCallback,useEffect} from 'react';
import {Drawer, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField,} from '@material-ui/core';
import {Field, useFormikContext} from 'formik';
import Tags from './Tags';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from "./setting.style";
import CreateDate from "../../components/TimePickField";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, selectPost, setAutoSaveChecked, setAutoSaveTime} from '../../redux/postSlice';
import Switch from '@material-ui/core/Switch';
import EditorArea from "../../components/editor/EditorArea";

const Setting = ({formRef, onSubmit, uploadFn}) => {
  const timerId = React.useRef();
  const {drawOpen, autoSave} = useSelector(selectPost);
  const dispatch = useDispatch();
  const classes = useStyles(autoSave.open);

  const {values: {change_date}} = useFormikContext();

  const timingUpload = useCallback(() => {
    return setInterval(() => {
      onSubmit(formRef.current.values);
    }, autoSave.time * 1000 * 60);
  }, [autoSave.time, formRef, onSubmit]);

  // 计时器
  useEffect(() => {
    if (autoSave.open && autoSave.time > 0) {
      timerId.current = timingUpload();
    }
    return () => clearInterval(timerId.current);
  }, [autoSave.time, autoSave.open, timingUpload]);

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);

  const handleAutoSaveChange = useCallback((e) => {
    const time = e.target.value;
    if (time > 0) {
      dispatch(setAutoSaveTime(time));
    }
  }, [dispatch]);

  const handleAutoSaveChecked = useCallback((e) => {
    dispatch(setAutoSaveChecked(e.target.checked));
  }, [dispatch]);

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={drawOpen}
      classes={{paper: classes.drawerPaper}}
    >
      <Grid className={classes.container}>
        {/*占位,防止被导航栏遮挡*/}
        <div className={classes.placeholder}/>
        <MemoArticleState/>
        <Tags/>
        <CreateDate/>
        <TextField label="修改日期" InputProps={{readOnly: true}} value={change_date}/>
        <EditorArea uploadFn={uploadFn} field={'excerpt'} label={'摘录'}/>
        <MemoAutoSave {...{open: autoSave.open, handleAutoSaveChecked}}/>
        <MemoExcerpt {...{handleAutoSaveChange, autoSave}}/>
        <div className={classes.toolbar}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </Grid>
    </Drawer>
  );
};

const MemoAutoSave = React.memo(({open, handleAutoSaveChecked}) => {
  return (
    <div>
      自动保存:
      <Switch
        checked={open}
        onChange={handleAutoSaveChecked}
        color="primary"
        name="checkedB"
        inputProps={{'aria-label': 'primary checkbox'}}
      />
    </div>
  );
});

const MemoArticleState = React.memo(() => {
  const {values: {visibility}} = useFormikContext();
  return (
    <FormControl>
      <InputLabel>状态</InputLabel>
      <Field
        name='visibility'
        as={Select}
        value={visibility}
      >
        {
          ["私密", "公开"].map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))
        }
      </Field>
    </FormControl>
  );
});

const MemoExcerpt = React.memo(({autoSave, handleAutoSaveChange}) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.autoSave}
      title={autoSave.time === 0 ? '自动保存已关闭' : `自动保存周期为${autoSave.time}分钟`}
      value={autoSave.time}
      id="outlined-number"
      label="自动保存周期(分钟)"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      onChange={handleAutoSaveChange}
    />
  );
});


export default React.memo(Setting);
