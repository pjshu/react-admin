import React from "react";
import InputWithIcon from './InputWithIcon';
import {Avatar, Grid, Paper, Typography} from "@material-ui/core";
import useStyles from './user.style';
import {useDispatch, useSelector} from "react-redux";
import EditorArea from '../../components/editor/EditorArea';
import {areEqual} from "../../helpers/misc";
import {changeFormField, FORM, selectForm} from '../../redux/formSlice';
import {SubmitBtn} from "../../components/Form";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import GradeIcon from '@material-ui/icons/Grade';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircle from '@material-ui/icons/AccountCircle';


const User = React.memo(function User() {
  const {[FORM.userInfo]: {avatar}} = useSelector(selectForm);
  return <ContextUser avatar={avatar}/>;
}, areEqual);

const ContextUser = React.memo(function ContextUser({avatar}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  //blob url to base64


  const handleUploadAvatar = (e) => {
    const file = e.target.files;
    const url = window.URL.createObjectURL(file[0]);
    dispatch(changeFormField({form: FORM.userInfo, avatar: url}));
  };

  return (
    <Grid className={classes.root} container component={Paper}>
      <Grid container direction={"column"} spacing={5}>
        <Grid item container alignItems={'center'} direction={"row"} spacing={5}>
          <Grid item className={classes.avatarWrapper}>
            <Typography>用户头像</Typography>
          </Grid>
          <Grid item className={classes.uploadWrapper}>
            <input
              onChange={handleUploadAvatar}
              accept="image/*"
              type="file"
              id={"avatar"}
              className={classes.hidden}
            />
            <label htmlFor={"avatar"} className={classes.avatar}>
              <Avatar alt="Cindy Baker" src={avatar}/>
            </label>
          </Grid>
        </Grid>
        <Grid item container direction={"column"} spacing={5}>
          {
            [
              {name: 'username', icon: <AccountCircle/>, label: "用户名(必填)", info: '用于登录'},
              {name: 'nickname', icon: <AccountBoxIcon/>, label: "昵称(必填)", info: "用于展示"},
              {name: 'motto', icon: <GradeIcon/>, label: "座右铭", info: "用于展示,选填"},
              {name: 'icp', icon: <FingerprintIcon/>, label: "备案号", info: "备案信息,选填"},
            ].map(item => (
              <Grid item container key={item.name}>
                <Grid className={classes.nameFieldWrapper}>
                  <Typography>{item.label}</Typography>
                </Grid>
                <Grid item>
                  <InputWithIcon
                    className={classes.inputIcon}
                    {...item}
                  />
                </Grid>
              </Grid>
            ))
          }
        </Grid>

        <Grid item container direction={"column"} spacing={5}>
          <EditorArea label={'用户介绍'} name={'about'}/>
        </Grid>
      </Grid>

      <Grid item>
        <SubmitBtn
          className={classes.submitBTN}
          formName={FORM.userInfo}
          type={"submit"}
          variant="contained"
          color="primary"
        >
          提交
        </SubmitBtn>
      </Grid>
    </Grid>
  );
});

export default User;
