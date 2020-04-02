import React, {useCallback} from "react";
import {Form, Formik} from 'formik';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import InputWithIcon from './InputWithIcon';
import {Avatar, Button, Grid, Paper, Typography} from "@material-ui/core";
import useStyles from './user.style';
import {useDispatch, useSelector} from "react-redux";
import {modifyUserInfo, selectUserInfo} from "../../redux/userSlice";
import {validateUserInfo} from '../../helpers/validate';
import EditorArea from '../../components/editor/EditorArea';


function User() {
  const dispatch = useDispatch();
  const {initial} = useSelector(selectUserInfo);
  const formRef = React.useRef();
  const classes = useStyles();
  //blob url to base64
  const base64Avatar = (data) => new Promise((resolve => {
    fetch(data).then(res => {
      res.blob().then(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });
  }));

  const onSubmit = useCallback(async (values) => {
    const data = {...values};
    if (data.about) {
      data.about = data.about.toRAW();
    }
    if (data.avatar) {
      data.avatar = await base64Avatar(data.avatar);
    }
    dispatch(modifyUserInfo(data));
  }, [dispatch]);

  const handleUploadAvatar = (e) => {
    const file = e.target.files;
    const url = window.URL.createObjectURL(file[0]);
    formRef.current.setFieldValue('avatar', url);
  };

  return (
    <Grid className={classes.root} container component={Paper}>
      <Formik
        innerRef={formRef}
        enableReinitialize
        initialValues={initial}
        onSubmit={onSubmit}
        validationSchema={validateUserInfo}
      >
        {
          ({values}) => (
            <Form>
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
                      <Avatar alt="Cindy Baker" src={values.avatar}/>
                    </label>
                  </Grid>
                </Grid>
                <Grid item container direction={"column"} spacing={5}>
                  {
                    [
                      {name: 'username', icon: <AccountCircle/>, label: "用户名", info: '用于登录'},
                      {name: 'nickname', icon: <AccountCircleOutlinedIcon/>, label: "昵称", info: "用于展示"},
                    ].map(item => (
                      <Grid item container key={item.name}>
                        <Grid className={classes.nameFieldWrapper}>
                          <Typography>{item.label}(必填)</Typography>
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
                <Grid item>
                  <Button
                    type={"submit"}
                    variant="contained"
                    color="primary">
                    提交
                  </Button>
                </Grid>
                <Grid item container direction={"column"} spacing={5}>
                  <EditorArea field={'about'} label={'用户介绍'} name={'excerpt'}/>
                </Grid>
              </Grid>
            </Form>
          )
        }
      </Formik>
    </Grid>
  );
}

export default User;
