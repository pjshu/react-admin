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
import {selectTag, closeDialog as _closeDialog} from '../../redux/tagSlice';
import useStyles from './editorDialog.style';
import {areEqual} from "../../helpers/misc";
import {Field, SubmitBtn} from "../../components/Form";
import {FORM, selectForm, changeFormField} from "../../redux/formSlice";


const EditorDialog = React.memo((props) => {
  const {[FORM.tags]: {image}} = useSelector(selectForm);
  const {dialogState} = useSelector(selectTag);

  return <ContextEditorDialog {...{...props, dialogState, image}}/>;
});


const ContextEditorDialog = (props) => {
  const {updateHandler, dialogState, openDialog, image} = props;
  const dispatch = useDispatch();
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
    const url = window.URL.createObjectURL(file[0]);
    dispatch(changeFormField({form: FORM.tags, image: {url}}));
  }, [dispatch]);
  const addMultiple = useCallback(() => {
    switchState.addMultiple ? openDialog() : closeDialog();
  }, [closeDialog, openDialog, switchState.addMultiple]);

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
              id={"tag-img"}
              className={classes.hidden}
            />
            <Box boxShadow={4} className={classes.box}>
              <label htmlFor={"tag-img"}>
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
          <SubmitBtn
            formName={FORM.tags}
            hookParam={{
              addMultiple,
              updateHandler
            }}
            color="primary"
          >
            {
              dialogState.action === 'add' ? '添加' : '更新'
            }
          </SubmitBtn>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default React.memo(EditorDialog, areEqual);
