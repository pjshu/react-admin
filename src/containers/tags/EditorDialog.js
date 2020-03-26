import React from 'react';

import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
  Tooltip
} from '@material-ui/core';

import {Field, Form, Formik} from 'formik';
import {useDispatch} from "react-redux";
import {addTagImg, modifyTag} from '../../redux/tagSlice';
import {getImageForm} from "../../helpers/misc";
import {validateTag} from "../../helpers/validate";
import useStyles from './editorDialog.style';


const EditorDialog = ({updateHandler, dialogInit, dialogState, openDialog, closeDialog}) => {
  const classes = useStyles();
  const [image, setImage] = React.useState({
    url: ''
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    let url = dialogInit.image.url;
    setImage((image) => ({...image, url}));
  }, [dialogInit.image.url]);


  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = React.useCallback(name => event => {
    setSwitchState({...switchState, [name]: event.target.checked});
  }, [switchState]);

  const resetSwitch = React.useCallback(() => {
    setSwitchState({addMultiple: false});
  }, []);

  const handleClose = React.useCallback(() => {
    closeDialog();
    resetSwitch();
  }, [closeDialog, resetSwitch]);

  const handleChangeImage = React.useCallback((e) => {
    const file = e.target.files;
    if (!file) {
      return;
    }
    const url = window.URL.createObjectURL(file[0]);
    setImage({...image, url});
  }, [image]);

  const uploadImage = React.useCallback((value) => {
    if (image.url) {
      getImageForm(image.url).then(res => {
        dispatch(addTagImg(value, res, updateHandler));
      });
    }
  }, [dispatch, image.url, updateHandler]);

  const onSubmit = React.useCallback((value) => {
    dispatch(modifyTag(value, image, updateHandler));
    uploadImage(value);
    switchState.addMultiple ? openDialog() : closeDialog();
  }, [closeDialog, dispatch, image, openDialog, switchState.addMultiple, updateHandler, uploadImage]);

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
            validationSchema={validateTag}
          >
            <Form id={'form'}>
              {
                [
                  {label: '标签名', name: 'name',},
                  {label: '描述', name: 'describe',},
                  {label: '文章数量', name: 'count', disabled: true},
                ].map(({label, name, ...rest}) => (
                  <Field
                    key={name}
                    as={TextField}
                    autoFocus
                    margin="dense"
                    label={label}
                    name={name}
                    fullWidth
                    type="text"
                    {...rest}
                  />
                ))
              }

              <div className={classes.imgWrapper}>
                <input
                  onChange={handleChangeImage}
                  accept="image/*"
                  type="file"
                  id={"tag"}
                  className={classes.hidden}
                />
                <Box boxShadow={4} className={classes.box}>
                  <label htmlFor={"tag"}>
                    <ButtonBase focusRipple component={'div'}>
                      <img
                        title={'点击上传图片'}
                        src={image.url}
                        alt="标签插图"
                      />
                    </ButtonBase>
                  </label>
                </Box>
              </div>
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
