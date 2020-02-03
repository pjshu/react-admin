import React, {useEffect} from "react";
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
import styles from "./styles/postStyles";

const useStyle = makeStyles(styles);

function Post({postState, init, addAllTags}) {
  const validationSchema = object({});
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
      } else {
      }
    });
  };


  useEffect(() => {
    api.getPost({postId}).then(res => {
      if (res.status === 'success') {
        const {data} = res;
        init({...data, 'article': BraftEditor.createEditorState(data.article)});
      }
    });
  }, [postId]);

  useEffect(() => {
    // 获取所有标签,用于自动补全
    api.getAllTags().then(res => {
      addAllTags(res.data);
    });
  }, []);

  const classes = useStyle();
  const [open, setOpen] = React.useState(true);
  const setDrawerOpen = () => {
    setOpen(!open);
  };
  return (
    <Container className={classes.root} maxWidth={false}>
      <Formik
        enableReinitialize
        initialValues={postState}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {
          props => (
            <Form onKeyDown={(e) => handleOnSave(e, props.values)}>
              <Grid container alignItems="center">
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
