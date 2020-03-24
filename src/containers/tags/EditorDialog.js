import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import {Field, Form, Formik} from 'formik';
import ButtonBase from "@material-ui/core/ButtonBase";
import {useDispatch} from "react-redux";
import {addTagImg, modifyTag} from '../../redux/tagSlice';
import {getImageForm} from "../../helpers/misc";
import {validateTag} from "../../helpers/validate";
import Box from "@material-ui/core/Box";
import useStyles from './editorDialog.style';

const EditorDialog = ({updateHandler, dialogInit, dialogState, openDialog, closeDialog}) => {
  const classes = useStyles();
  const [image, setImage] = React.useState({
    url: ''
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    let url = dialogInit.image.url;
    setImage({...image, url});
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

  const handleClose = () => {
    closeDialog();
    resetSwitch();
  };

  const handleChangeImage = (e) => {
    const file = e.target.files;
    if (!file) {
      return;
    }
    const url = window.URL.createObjectURL(file[0]);
    setImage({...image, url});
  };

  const uploadImage = (value) => {
    getImageForm(image.url).then(res => {
      dispatch(addTagImg(value, res, updateHandler));
    });
  };

  const onSubmit = (value) => {
    dispatch(modifyTag(value, image, updateHandler));
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
            validationSchema={validateTag}
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
