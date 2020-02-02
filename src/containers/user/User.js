import React from "react";
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
import Avatar from '@material-ui/core/Avatar';
import BraftEditor from "../../config/editorConfig";
import Button from '@material-ui/core/Button';
import InputWithIcon from './InputWithIcon';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

function User() {
  const validationSchema = object({});
  const onSubmit = (values) => {
    const data = {...values};
    data.about = data.about.toRAW();
    if (data.avatar) {
      fetch(data.avatar).then(res => {
        console.log(res);
      });
      // const reader = new FileReader(values.avatar);
      // reader.onloadend = () => {
      //   const base64Avatar = reader.result;
      //   console.log(base64Avatar);
      // };
    }
  };
  const handleUploadAvatar = (e, setFieldValue) => {
    const file = e.target.files;
    const url = window.URL.createObjectURL(file[0]);
    setFieldValue('avatar', url);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: '',
        nickname: '',
        email: '',
        password: '',
        about: BraftEditor.createEditorState(null),
        avatar: null
      }}
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
            <Grid>
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
            <p>关于我</p>
            <Button type={"submit"} variant="contained" color="primary">
              提交
            </Button>
            <BraftEditor
              name="about"
              value={props.values.article}
              onChange={value => {
                props.setFieldValue('article', value);
              }}
            />
          </Form>
        )
      }
    </Formik>

  );

}

export default User;
