import React, {useCallback, useEffect, useMemo} from 'react';
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
import {useTiming} from "../../hook";
import {FORM} from "../../redux/formSlice";


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
        <CreateDate formName={FORM.post}/>
        <Field
          name={'change_date'}
          label="修改日期"
          formName={FORM.post}
          variant={'standard'}
          InputProps={{readOnly: true}}
        />
        <EditorArea
          name={'excerpt'}
          uploadFn={uploadFn}
          label={'摘录'}
          formName={FORM.post}
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
  useTiming(autoSave, postId);
  return (
    <ContextAutoSave {...{autoSave, open: autoSave.open}}/>
  );
}, areEqual);

const ContextAutoSave = React.memo(function ContextAutoSave({autoSave, open}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAutoSaveChange = useCallback((e) => {
    const time = e.target.value;
    if (time > 0) {
      dispatch(setAutoSaveTime(time));
    }
  }, [dispatch]);

  const title = useMemo(() => {
    return autoSave.time === 0 ? '自动保存已关闭' : `自动保存周期为${autoSave.time}分钟`;
  }, [autoSave.time]);

  const inputLabelProps = {
    shrink: true,
  };
  const handleAutoSaveChecked = useCallback((e) => {
    dispatch(setAutoSaveChecked(e.target.checked));
  }, [dispatch]);

  return (
    <>
      {
        open ? (
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
              title={title}
              value={autoSave.time}
              id="outlined-number"
              label="自动保存周期(分钟)"
              type="number"
              InputLabelProps={inputLabelProps}
              variant="outlined"
              onChange={handleAutoSaveChange}
            />
          </>
        ) : null
      }

    </>
  );
}, areEqual);


const MemoArticleState = React.memo(() => {
  return (
    <FormControl>
      <InputLabel>状态</InputLabel>
      <Field
        formName={FORM.post}
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
