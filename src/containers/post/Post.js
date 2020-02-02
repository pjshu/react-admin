import React, {useContext, useEffect, useState} from "react";
import {Container, Grid, makeStyles, TextField} from "@material-ui/core";
import {Field, Form, Formik} from 'formik';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
import BraftEditor from '../../config/editorConfig';
import 'braft-extensions/dist/emoticon.css';
import {object} from 'yup';
import {Setting} from "./Setting";
import api from "../../helpers/http";
import {formatTime} from "../../helpers/datetime";
import SpeedSetting from "./SpeedSetting";
import {useLocation} from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";
import {PostContext} from "../../context";

const useStyle = makeStyles({
  root: {
    height: '90%',
    position: 'relative',
    background: "#fff",
    padding: 30,
    borderRadius: 4
  },
});

function Post() {
  const validationSchema = object({});
  const [alertMessage, setAlertMessage] = useState('');
  const {state, actions} = useContext(PostContext);
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const postId = path[path.length - 1];

  const onSubmit = (values) => {
    const data = {...values};
    data.article = data.article.toRAW();
    data.postId = postId;
    data.createDate = formatTime(data.createDate);
    api.modifyPost(data).then(res => {
      if (res.status === 'success') {
        setAlertMessage("上传成功");
      } else {
        setAlertMessage("上传失败");
      }
    });
  };


  useEffect(() => {
    api.getPost({postId}).then(res => {
      if (res.status === 'success') {
        const {data} = res;
        actions.init({...data, 'article': BraftEditor.createEditorState(data.article)});
      }
    });
  }, [postId]);

  useEffect(() => {
    // 获取所有标签,用于自动补全
    api.getAllTags().then(res => {
      actions.addAllTags(res.data);
    });
  }, []);

  const classes = useStyle();
  const [open, setOpen] = React.useState(true);
  const setDrawerOpen = () => {
    setOpen(!open);
  };
  return (
    <Container className={classes.root} maxWidth={false}>
      <AlertDialog {...{alertMessage}}/>
      <Formik
        enableReinitialize
        initialValues={state}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {
          props => (
            <Form onKeyDown={(e) => handleOnSave(e, props.values)}>
              <Grid container alignItems="center">
                {/* TODO: 添加未填写标题提示*/}
                <Field
                  name="title"
                  as={TextField}
                  fullWidth={true}
                  label="标题"
                  variant="outlined"/>
              </Grid>
              <BraftEditor
                name="article"
                value={props.values.article}
                onChange={value => {
                  props.setFieldValue('article', value);
                }}
              />
              <Setting {...{open, setDrawerOpen}}/>
              <SpeedSetting {...{open, setDrawerOpen}}/>
            </Form>
          )
        }
      </Formik>
    </Container>
  );

  function handleOnSave(e, value) {
    if (e.keyCode === 83 && e.ctrlKey) {
      onSubmit(value);
    }
  }
}

export default Post;
