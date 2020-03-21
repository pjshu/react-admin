import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  TextareaAutosize,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import {Field, useFormikContext} from 'formik';
import Tags from './Tags';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "./styles/settingStyles";
import CreateDate from "../../components/TimePickField";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, selectPost, setAutoSaveTime, setAutoSaveChecked} from '../../redux/postSlice';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => styles(theme));

export function Setting({formikRef, onSubmit}) {
  const classes = useStyles();
  const timerId = React.useRef();
  const {drawOpen, autoSave} = useSelector(selectPost);
  const dispatch = useDispatch();
  const {values: {change_date, visibility}} = useFormikContext();
  // 计时器
  React.useEffect(() => {
    if (autoSave.open && autoSave.time > 0) {
      timerId.current = setInterval(() => {
        if (formikRef.current) {
          onSubmit(formikRef.current.values);
        }
      }, autoSave.time * 1000 * 60);
    }
    return () => clearInterval(timerId.current);
  }, [autoSave.time, autoSave.open]);

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  const handleAutoSaveChange = (e) => {
    const time = e.target.value;
    if (time > 0) {
      dispatch(setAutoSaveTime(time));
    }
  };
  const handleAutoSaveChecked = (e) => {
    dispatch(setAutoSaveChecked(e.target.checked));
  };
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
        <FormControl>
          <InputLabel>状态</InputLabel>
          <Field
            name='visibility'
            as={Select}
            value={visibility}
          >
            {
              ["私密", "公开"].map(item => (
                <MenuItem key={item} value="私密">{item}</MenuItem>
              ))
            }
          </Field>
        </FormControl>
        <Tags/>
        <CreateDate/>
        <TextField label="修改日期" InputProps={{readOnly: true}} value={change_date}/>
        <Typography component="h2">
          摘录(双击放大):
        </Typography>
        <Field
          title={'双击放大'}
          as={TextareaAutosize}
          rowsMin={5}
          rowsMax={15}
          style={{
            width: '100%'
          }}
          name={'excerpt'}
          onDoubleClick={e => {
            console.log(e);
          }}
        />
        <div>
          自动保存:
          <Switch
            checked={autoSave.open}
            onChange={handleAutoSaveChecked}
            color="primary"
            name="checkedB"
            inputProps={{'aria-label': 'primary checkbox'}}
          />
        </div>
        <TextField
          style={{display: autoSave.open ? '' : 'none'}}
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
        <div className={classes.toolbar}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </Grid>
    </Drawer>
  );
}

