import React, {useCallback} from 'react';

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

import {useDispatch} from "react-redux";
import {addTagImg, modifyTag} from '../../redux/tagSlice';
import {getImageForm} from "../../helpers/misc";
import {validateTag} from "../../helpers/validate";
import useStyles from './editorDialog.style';
import {areEqual} from "../../helpers/misc";
import {Field} from "../../components/Form";
import {FORM} from "../../redux";

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

  const handleSwitchChange = useCallback(name => event => {
    setSwitchState((switchState) => (
      {...switchState, [name]: event.target.checked})
    );
  }, []);

  const resetSwitch = useCallback(() => {
    setSwitchState({addMultiple: false});
  }, []);

  const handleClose = useCallback(() => {
    closeDialog();
    resetSwitch();
  }, [closeDialog, resetSwitch]);

  const handleChangeImage = useCallback((e) => {
    const file = e.target.files;
    if (!file) {
      return;
    }
    const url = window.URL.createObjectURL(file[0]);
    setImage((image) => ({...image, url}));
  }, []);

  const uploadImage = useCallback((value) => {
    if (image.url) {
      getImageForm(image.url).then(res => {
        dispatch(addTagImg(value, res, updateHandler));
      });
    }
  }, [dispatch, image.url, updateHandler]);

  const addMultiple = useCallback(() => {
    switchState.addMultiple ? openDialog() : closeDialog();
  }, [closeDialog, openDialog, switchState.addMultiple]);

  const onSubmit = useCallback((value) => {
    dispatch(modifyTag(value, image, updateHandler));
    uploadImage(value);
    addMultiple();
  }, [addMultiple, dispatch, image, updateHandler, uploadImage]);

  return (
    <div>
      <Dialog
        open={dialogState.open}
        onClose={handleClose}
      >
        <DialogTitle>{dialogState.action === 'add' ? '添加' : '修改'}标签</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>Demo add item to react table.</DialogContentText>*/}
          {
            [
              {label: '标签名', name: 'name',},
              {label: '描述', name: 'describe',},
              {label: '文章数量', name: 'count', disabled: true},
            ].map(({label, name, ...rest}) => (
              <Field
                key={name}
                formName={FORM.tags}
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
                  {
                    image.url ? (
                      <img
                        title={'点击上传图片'}
                        src={image.url}
                        alt="标签插图"
                      />
                    ) : (
                      <span>点击上传图片</span>
                    )
                  }
                </ButtonBase>
              </label>
            </Box>
          </div>
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


export default React.memo(EditorDialog, areEqual);
