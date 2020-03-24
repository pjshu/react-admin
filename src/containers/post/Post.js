import React from "react";
import {Container, Grid, Paper, TextField} from "@material-ui/core";
import {Field, Form, Formik} from 'formik';
import MyEditor from '../../components/editor/Editor';
import {Setting} from "./Setting";
import SpeedSetting from "./SpeedSetting";
import useStyles from "./post.styles";
import {useDispatch, useSelector} from "react-redux";
import {addPostImg, selectPost} from '../../redux/postSlice';
import BraftEditor from "braft-editor";
import {validatePost} from "../../helpers/validate";

function Post({postId, onSubmit, handleOnSave}) {
  const {initial} = useSelector(selectPost);
  const dispatch = useDispatch();
  const formRef = React.useRef();
  const uploadFn = (form, successFn, errorFn) => {
    dispatch(addPostImg(form, postId, successFn, errorFn));
  };
  const handleKeyDown = (e) => {
    handleOnSave(e, formRef.current.values);
  };
  const classes = useStyles();
  return (
    <Container component={Paper} className={classes.root} maxWidth={false}>
      <Formik
        innerRef={formRef}
        enableReinitialize
        initialValues={initial}
        onSubmit={onSubmit}
        validationSchema={validatePost}
      >
        {
          ({values, setFieldValue}) => (
            <Form onKeyDown={handleKeyDown}>
              <Grid container alignItems="center">
                <Field
                  name="title"
                  as={TextField}
                  fullWidth={true}
                  label="标题"
                  variant="outlined"
                />
              </Grid>
              <MyEditor
                uploadFn={uploadFn}
                value={BraftEditor.createEditorState(values.article)}
                onChange={value => {
                  setFieldValue('article', value);
                }}
                contentStyle={{
                  minHeight: '100vh'
                }}
              />
              <Setting
                formRef={formRef}
                onSubmit={onSubmit}
                uploadFn={uploadFn}
              />
              <SpeedSetting/>
            </Form>
          )
        }
      </Formik>
    </Container>
  );

}

export default Post;
