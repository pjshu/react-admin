import React from "react";
import {Form, Formik} from 'formik';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MyEditor from "../../components/editor/Editor";
import InputWithIcon from './InputWithIcon';
import {Avatar, Button, Grid} from "@material-ui/core";
import useStyles from './user.styles';
import {useDispatch, useSelector} from "react-redux";
import {selectUserInfo, modifyUserInfo} from "../../redux/userSlice";
import BraftEditor from "braft-editor";
import {Paper} from "@material-ui/core";
import {validateUserInfo} from '../../helpers/validate'

function User() {
  const dispatch = useDispatch();
  const {initial} = useSelector(selectUserInfo);
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

  const onSubmit = async (values) => {
    const data = {...values};
    data.about = data.about.toRAW();
    if (data.avatar) {
      data.avatar = await base64Avatar(data.avatar);
    }
    dispatch(modifyUserInfo(data));
  };
  //TODO: ???
  const handleUploadAvatar = (e, setFieldValue) => {
    const file = e.target.files;
    const url = window.URL.createObjectURL(file[0]);
    setFieldValue('avatar', url);
  };

  return (
    <Grid style={{
      margin: '10px',
      minHeight: '100%',
      padding: 30,
      borderRadius: 4
    }} container component={Paper}>
      <Formik
        enableReinitialize
        initialValues={initial}
        onSubmit={onSubmit}
        validationSchema={validateUserInfo}
      >
        {
          ({values, setFieldValue, errors, touched}) => (
            <Form>
              <Grid container direction={"column"} spacing={5}>
                <Grid item>
                  <Grid container alignItems={'center'} direction={"row"} spacing={5}>
                    <Grid item style={{
                      marginLeft: '120px'
                    }}>
                      <input
                        onChange={(e) => console.log(e)}
                        accept="image/*"
                        type="file"
                        id={"avatar"}
                        style={{display: "none"}}
                      />
                      <label htmlFor={"avatar"} className={classes.avatar}>
                        <Avatar alt="Cindy Baker" src={values.avatar}/>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction={"column"} spacing={5}>
                    {
                      [
                        {name: 'username', icon: <AccountCircle/>, label: "用户名", info: '用于登录'},
                        {name: 'nickname', icon: <AccountCircleOutlinedIcon/>, label: "昵称", info: "用于展示"},
                      ].map(item => (
                        <Grid key={item.name} item>
                          <InputWithIcon
                            style={{width: '350px'}}
                            {...{...item, errors, touched}}
                          />
                        </Grid>
                      ))
                    }
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      width: '100%'
                    }}
                    type={"submit"}
                    variant="contained"
                    color="primary">
                    提交
                  </Button>
                </Grid>
                <Grid item>
                  <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                      <p>关于我</p>
                    </Grid>
                    <Grid item>
                      <MyEditor
                        name="about"
                        value={BraftEditor.createEditorState(values.about)}
                        onChange={value => {
                          setFieldValue('about', value);
                        }}
                      />
                    </Grid>
                  </Grid>
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
