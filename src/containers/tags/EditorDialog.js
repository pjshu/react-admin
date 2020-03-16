import React, {useState} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import {Field, Form, Formik} from 'formik';
import api from '../../helpers/http';
import ButtonBase from "@material-ui/core/ButtonBase";
import {number, object, array, string} from "yup";

const base = 'http://127.0.0.1:5000/api/admin/tags/images/';
const EditorDialog = ({updateHandler, dialogInit, initDialog, dialogState, openDialog, closeDialog}) => {
  const [image, setImage] = React.useState({
    name: '',
    url: ''
  });

  React.useEffect(() => {
    let url = dialogInit.image.url;
    url = url ? base + url : url;
    setImage({
      name: dialogInit.image.url,
      url: url
    });
  }, [dialogInit]);


  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });
  const handleSwitchChange = name => event => {
    setSwitchState({...switchState, [name]: event.target.checked});
  };

  const resetSwitch = () => {
    setSwitchState({addMultiple: false});
  };

  const validationSchema = object({
    id: number()
      .min(0, 'id不能小于0')
      .required('id不能为空'),
    name: string()
      .max(64, '标签名最多64个字符')
      .required('标签名不能为空'),
    describe: string()
      .max(128, '描述最多128个字符'),
    count: number()
      .required('count不能为空'),
  });
  const handleClose = () => {
    closeDialog();
    resetSwitch();
  };

  const handleChangeImage = (e) => {
    const file = e.target.files;
    const url = window.URL.createObjectURL(file[0]);
    setImage({
      name: file.name,
      url: url
    });
  };

  const uploadImage = (value) => {

    async function getImage() {
      const form = new FormData();
      const blob = await fetch(image.url).then(r => r.blob());
      form.append('image', blob, image.name);
      return form;
    }

    getImage().then(res => {
        api.addTagImg(value.id, res).then(res => {
          const {data, status} = res;
          if (status === 'success') {
            updateHandler({...value, image: data.image});
          } else {
            console.log('error');
          }
        });
      }
    )
    ;
  };
  const onSubmit = (value) => {
    api.modifyTag(value, value.id).then(res => {
      if (res.status === 'success') {
        updateHandler({...value, image: image});
        initDialog();
      }
    });
    uploadImage(value);
    switchState.addMultiple ? openDialog() : closeDialog();
  };
  return (
    <div>
      <Dialog
        open={dialogState.open}
        onClose={handleClose}
      >
        <DialogTitle>{dialogState.action === 'add' ? '添加' : '修改'}标签</DialogTitle>
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
                name={'count'}
              />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <input
                  onChange={handleChangeImage}
                  accept="image/*"
                  type="file"
                  id={"tag"}
                  style={{display: "none"}}
                />
                <label htmlFor={"tag"}>
                  <ButtonBase focusRipple component={'div'}>
                    <img
                      title={'点击上传图片'}
                      style={{
                        width: 400,
                        minHeight: 200
                      }}
                      src={image.url}
                      // src={tagImg}
                      alt="标签插图"
                    />
                  </ButtonBase>
                </label>
              </div>
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
          {
            dialogState.action === 'add' ? (
              <Tooltip title="添加多条">
                <Switch
                  checked={switchState.addMultiple}
                  onChange={handleSwitchChange('addMultiple')}
                  value="addMultiple"
                  inputProps={{'aria-label': 'secondary checkbox'}}
                />
              </Tooltip>) : null
          }

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
