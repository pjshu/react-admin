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
  Tooltip
} from '@material-ui/core';

import {useDispatch, useSelector} from "react-redux";
import {closeDialog as _closeDialog, selectDialogState} from '../../redux/tagSlice';
import useStyles from './editorDialog.style';
import {Field, SubmitBtn} from "../../components/Form";
import {FORM, changeFormField, createFieldSelector} from "../../redux/formSlice";


const EditorDialog = (props) => {
  const {updateHandler, openDialog} = props;
  const url = useSelector(createFieldSelector([FORM.tags, 'image', 'url']));
  const dialogState = useSelector(selectDialogState);
  const dispatch = useDispatch();
  const action = dialogState.get('action');

  const closeDialog = useCallback(() => {
    dispatch(_closeDialog());
  }, [dispatch]);
  const classes = useStyles();


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
    const URL = window.URL.createObjectURL(file[0]);
    dispatch(changeFormField({form: FORM.tags, image: {url: URL}}));
  }, [dispatch]);
  const addMultiple = useCallback(() => {
    switchState.addMultiple ? openDialog() : closeDialog();
  }, [closeDialog, openDialog, switchState.addMultiple]);

  return (
    <div>
      <Dialog
        open={dialogState.get('open')}
        onClose={handleClose}
      >
        <DialogTitle>{action === 'add' ? '添加' : '修改'}标签</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>Demo add item to react table.</DialogContentText>*/}
          {
            [
              {label: '标签名', name: 'name',},
              {label: '描述', name: 'describe',},
              {label: '文章数量', name: 'count', disabled: true},
            ].map(({label, name, ...rest}) => (
              <div key={name}>
                <Field
                  formName={FORM.tags}
                  autoFocus
                  margin="dense"
                  label={label}
                  name={name}
                  fullWidth
                  type="text"
                  {...rest}
                />
              </div>
            ))
          }
          <div className={classes.imgContainer}>
            <input
              onChange={handleChangeImage}
              accept="image/*"
              type="file"
              id={"tag-img"}
              className={classes.hidden}
            />
            <Box boxShadow={4} className={classes.box}>
              <label htmlFor={"tag-img"}>
                <ButtonBase focusRipple component={'div'}>
                  <div className={classes.imgWrapper}>
                    {
                      url ? (
                        <img
                          src={url}
                          alt={"点击上传图片"}
                        />
                      ) : (
                        <span>点击上传图片</span>
                      )
                    }
                  </div>
                </ButtonBase>
              </label>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          {
            action === 'add' ? (
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
          <SubmitBtn
            formName={FORM.tags}
            hookParam={{
              addMultiple,
              updateHandler
            }}
            color="primary"
          >
            {
              action === 'add' ? '添加' : '更新'
            }
          </SubmitBtn>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(EditorDialog);
