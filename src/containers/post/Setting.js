import React, {useCallback, useMemo} from 'react';
import {Drawer, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField,} from '@material-ui/core';
import {Field} from '../../components/Form';
import Tags from './Tags';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from "./setting.style";
import CreateDate from "../../components/TimePickField";
import {useDispatch, useSelector} from "react-redux";
import {
  closeDrawer,
  selectDrawOpen,
  setAutoSaveChecked,
  setAutoSaveTime,
  selectAutoSave
} from '../../redux/postSlice';
import Switch from '@material-ui/core/Switch';
import {areEqual, getAttr} from "../../helpers/misc";
import {useTiming} from "../../hooks/post";
import FORM from "../../contants/form.json";
import Excerpt from "./Excerpt";
import Upload from "./Upload";


const Setting = React.memo(function Setting(props) {
  const {postId} = props;
  const drawOpen = useSelector(selectDrawOpen);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);
  const inputProps = useMemo(() => ({
    readOnly: true
  }), []);

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
          InputProps={inputProps}
        />
        <Excerpt/>
        <Upload/>
        <MemoAutoSave {...{postId}}/>
        <div className={classes.toolbar}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </Grid>
    </Drawer>
  );
});


const MemoAutoSave = React.memo(function MemoAutoSave({postId}) {
  const autoSave = useSelector(selectAutoSave);
  const [autoSaveTime, autoSaveOpen] = getAttr(autoSave, [
    'time', 'open'
  ]);
  const classes = useStyles();
  const dispatch = useDispatch();
  useTiming(autoSave, postId);
  const handleAutoSaveChange = useCallback((e) => {
    const time = e.target.value;
    if (time > 0) {
      dispatch(setAutoSaveTime(time));
    }
  }, [dispatch]);

  const title = useMemo(() => {
    return autoSaveTime === 0 ? '自动保存已关闭' : `自动保存周期为${autoSaveTime}分钟`;
  }, [autoSaveTime]);

  const inputLabelProps = {
    shrink: true,
  };

  const handleAutoSaveChecked = useCallback((e) => {
    dispatch(setAutoSaveChecked(e.target.checked));
  }, [dispatch]);

  return (
    <>
      <div>
        自动保存:
        <Switch
          checked={autoSaveOpen}
          onChange={handleAutoSaveChecked}
          color="primary"
          name="checkedB"
          inputProps={{'aria-label': 'primary checkbox'}}
        />
      </div>
      {
        autoSaveOpen && (
          <TextField
            className={classes.autoSave}
            title={title}
            value={autoSaveTime}
            id="outlined-number"
            label="自动保存周期(分钟)"
            type="number"
            InputLabelProps={inputLabelProps}
            variant="outlined"
            onChange={handleAutoSaveChange}
          />
        )
      }
    </>
  );
});


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
