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

const useStyles = makeStyles((theme) => styles(theme));

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
            {
              ["私密", "公开"].map(item => (
                <MenuItem key={item} value="私密">{item}</MenuItem>

              ))
            }
          </Field>
        </FormControl>
        <Tags {...{tags: values.tags, setFieldValue, allTags: values.allTags}}/>
        <CreateDate {...{
          data: values.create_date, label: '创建日期', handleOnChange: (data) => {
            setFieldValue('create_date', data);
          }
        }}/>
        <TextField label="修改日期" InputProps={{readOnly: true}} value={values.change_date}/>
        <Typography variant="div" component="h2">
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

