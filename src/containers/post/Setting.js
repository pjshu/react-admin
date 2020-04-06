import React, {useCallback, useEffect} from 'react';
import {Drawer, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField,} from '@material-ui/core';
import {Field} from '../../components/Form';
import Tags from './Tags';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from "./setting.style";
import CreateDate from "../../components/TimePickField";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, selectPost, setAutoSaveChecked, setAutoSaveTime} from '../../redux/postSlice';
import Switch from '@material-ui/core/Switch';
import EditorArea from "../../components/editor/EditorArea";
import {areEqual} from "../../helpers/misc";
import {useSubmitPost} from "../../hook";


const Setting = React.memo(function Setting({uploadFn, postId}) {
  const {drawOpen} = useSelector(selectPost);
  return <ContextSetting {...{drawOpen, uploadFn, postId}}/>;
}, areEqual);

const ContextSetting = React.memo(function ContextSetting(props) {
  const {uploadFn, drawOpen, postId} = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeDrawer());
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
        <CreateDate formName={'post'}/>
        <Field
          name={'change_date'}
          label="修改日期"
          formName={'post'}
          variant={'standard'}
          InputProps={{readOnly: true}}
        />
        <EditorArea
          uploadFn={uploadFn}
          field={'excerpt'}
          label={'摘录'}
          formName={'post'}
        />
        <MemoAutoSave {...{postId}}/>
        <div className={classes.toolbar}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </Grid>
    </Drawer>
  );
}, areEqual);

const MemoAutoSave = React.memo(function MemoAutoSave({postId}) {
  const {autoSave} = useSelector(selectPost);
  return <ContextAutoSave {...{autoSave, open: autoSave.open, postId}}/>;
}, areEqual);

const ContextAutoSave = React.memo(function ContextAutoSave({autoSave, open, postId}) {
  const timerId = React.useRef();
  const dispatch = useDispatch();
  const classes = useStyles(open);
  const onSubmit = useSubmitPost(postId);

  const timingUpload = useCallback(() => {
    return setInterval(() => {
      onSubmit();
    }, autoSave.time * 1000 * 60);
  }, [autoSave.time, onSubmit]);

  // 计时器
  useEffect(() => {
    if (autoSave.open && autoSave.time > 0) {
      timerId.current = timingUpload();
    }
    return () => clearInterval(timerId.current);
  }, [autoSave.time, autoSave.open, timingUpload]);

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
    <>
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
    </>
  );
}, areEqual);

const MemoArticleState = React.memo(() => {
  return (
    <FormControl>
      <InputLabel>状态</InputLabel>
      <Field
        formName={'post'}
        name={'visibility'}
        as={Select}
      >
        {
          ["私密", "公开"].map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))
        }
      </Field>
    </FormControl>
  );
}, areEqual);


export default Setting;
