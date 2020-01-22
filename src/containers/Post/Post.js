import React, {useEffect, useState} from "react";
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

const useStyle = makeStyles({
  root: {
    position: 'relative',
    background: "#fff",
    padding: 30,
    borderRadius: 4
  },
});

function Post({history}) {
  const validationSchema = object({});
  const onSubmit = (values) => {
    const data = {...values};
    data.article = data.article.toRAW();
    data.postId = postId;
    api.modifyPost({data}).then(res => {
      console.log(res);
    });
  };
  const path = history.location.pathname.split('/');
  const searchParam = history.location.search.split('=');
  const postId = path[path.length - 1];
  const isNewPost = searchParam[searchParam.length - 1];
  const [initialValues, setInitialValues] = useState({
    postId: postId,
    title: '',
    tags: [],
    visibility: '私密',
    article: BraftEditor.createEditorState(null),
    allTags: [],
    createDate: new Date(),
    changeDate: formatTime(new Date())
  });
  useEffect(() => {
    // 获取所有标签,用于自动补全
    if (isNewPost) {
      api.getAllTags().then(res => {
        setInitialValues({...initialValues, allTags: res.data});
      });
    } else {
      api.getPost({params: {postId}}).then(res => {
        const {data, status} = res;
        if (status === 'success') {
          data.article = BraftEditor.createEditorState(data.article);
          setInitialValues(data);
        }
      });
    }
  }, [postId, isNewPost]);
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const setDrawerOpen = () => {
    setOpen(!open);
  };
  return (
    <Container className={classes.root} maxWidth={false}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
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
