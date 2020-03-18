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
import {closeDraw, selectPost} from '../../redux/postSlice';

const useStyles = makeStyles((theme) => styles(theme));

export function Setting() {
  const classes = useStyles();
  const {drawOpen} = useSelector(selectPost);
  const {values: {change_date, visibility}} = useFormikContext();
  const dispatch = useDispatch();
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
          摘录:
        </Typography>
        <Field
          as={TextareaAutosize}
          rowsMin={5}
          rowsMax={15}
          style={{
            width: '100%'
          }}
          name={'excerpt'}
        />
        <div className={classes.toolbar}>
          <IconButton onClick={() => {
            dispatch(closeDraw());
          }}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </Grid>
    </Drawer>
  );
}

