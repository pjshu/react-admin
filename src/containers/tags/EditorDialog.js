import React, {useState} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import {object} from 'yup';
import {Field, Form, Formik} from 'formik';
import api from '../../helpers/http';


const EditorDialog = ({addHandler, dialogInit, initDialog, dialogState, openDialog, closeDialog}) => {
  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = name => event => {
    setSwitchState({...switchState, [name]: event.target.checked});
  };

  const resetSwitch = () => {
    setSwitchState({addMultiple: false});
  };

  const validationSchema = object({});
  const handleClose = () => {
    closeDialog();
    resetSwitch();
  };

  const onSubmit = (value) => {
    api.addTag(value).then(res => {
      const {data: {status, id}} = res;
      if (status === 'success') {
        addHandler(value);
        initDialog(dialogInit);
      }
    });
    switchState.addMultiple ? openDialog() : closeDialog();
  };
  return (
    <div>
      <Dialog
        open={dialogState.open}
        onClose={handleClose}
      >
        <DialogTitle>{dialogState.action === 'add' ? '添加' : '修改'}文章</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>Demo add item to react table.</DialogContentText>*/}
          <Formik
            enableReinitialize
            initialValues={dialogInit}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form id={'form'}>
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                label="标签名"
                fullWidth
                type="text"
                name={'name'}
              />
              <Field
                as={TextField}
                margin="dense"
                label="描述"
                type="text"
                fullWidth
                name={'describe'}
              />
              <Field
                as={TextField}
                disabled={true}
                margin="dense"
                label="文章数量"
                type="text"
                fullWidth
                value={'count'}
              />
              {/*<Field*/}
              {/*  as={TextField}*/}
              {/*  margin="dense"*/}
              {/*  label="创建日期"*/}
              {/*  type="text"*/}
              {/*  fullWidth*/}
              {/*  name={'create_time'}*/}
              {/*/>*/}
              {/*<Field*/}
              {/*  as={TextField}*/}
              {/*  margin="dense"*/}
              {/*  label="修改日期"*/}
              {/*  disabled={true}*/}
              {/*  type="text"*/}
              {/*  fullWidth*/}
              {/*  name={'update_time'}*/}
              {/*/>*/}
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions>
          <Tooltip title="添加多条">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{'aria-label': 'secondary checkbox'}}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button form={'form'} type={'submit'} color="primary">
            {
              dialogState.action === 'add' ? '添加' : '更新'
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default EditorDialog;