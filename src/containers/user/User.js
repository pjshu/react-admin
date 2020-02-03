import React, {useEffect, useState} from "react";
import {Form, Formik} from 'formik';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'braft-extensions/dist/emoticon.css';
import {object} from 'yup';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import BraftEditor from "../../config/editorConfig";
import InputWithIcon from './InputWithIcon';
import {Avatar, Button, Grid, makeStyles} from "@material-ui/core";
import api from '../../helpers/http';
import styles from './styles/userStyles';

const useStyle = makeStyles(styles);

function User() {
  const classes = useStyle();
  const validationSchema = object({});
  const [state, setState] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    about: BraftEditor.createEditorState(null),
    avatar: ''
  });
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
    api.modifyUserInfo(data).then(res => {
      console.log(data);
    });
  };
  const handleUploadAvatar = (e, setFieldValue) => {
    const file = e.target.files;
    const url = window.URL.createObjectURL(file[0]);
    setFieldValue('avatar', url);
  };
  useEffect(() => {
    api.getUserInfo().then(res => {
      const data = res.data;
      data.about = BraftEditor.createEditorState(data.about);
      setState({...data, password: ''});
    });
  }, []);
  return (
    <Formik
      enableReinitialize
      initialValues={state}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {
        props => (
          <Form>
            {
              [
                {name: 'username', icon: <AccountCircle/>, label: "用户名", info: '用于登录'},
                {name: 'nickname', icon: <AccountCircleOutlinedIcon/>, label: "昵称", info: "用于展示"},
                {name: 'email', icon: <AlternateEmailIcon/>, label: "邮箱"},
                {name: "password", icon: <VpnKeyIcon/>, label: "密码", type: 'password'}
              ].map(item => (
                <InputWithIcon key={item.name} {...item}/>
              ))
            }
            <p>头像</p>
            <Grid className={classes.avatar}>
              <input
                onChange={(e) => handleUploadAvatar(e, props.setFieldValue)}
                accept="image/*"
                type="file"
                id={"avatar"}
                style={{display: "none"}}/>
              <label htmlFor={"avatar"}>
                <Avatar alt="Cindy Baker" src={props.values.avatar}/>
              </label>
            </Grid>
            <Button
              type={"submit"}
              variant="contained"
              color="primary">
              提交
            </Button>
            <p>关于我</p>
            <BraftEditor
              name="about"
              value={props.values.about}
              onChange={value => {
                props.setFieldValue('about', value);
              }}
            />
          </Form>
        )
      }
    </Formik>

  );

}

export default User;
