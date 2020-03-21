import React from "react";
import {Container, Grid, TextField} from "@material-ui/core";
import {Field, Form, Formik} from 'formik';
import MyEditor from '../../components/editor/Editor';
import {Setting} from "./Setting";
import SpeedSetting from "./SpeedSetting";
import useStyles from "./styles/postStyles";
import {useSelector} from "react-redux";
import {selectPost} from '../../redux/postSlice';
import BraftEditor from "braft-editor";
import {Paper} from "@material-ui/core";


function Post({validationSchema, onSubmit, handleOnSave}) {
  const {initial} = useSelector(selectPost);
  const formikRef = React.useRef();
  const classes = useStyles();
  return (
    <Container component={Paper} className={classes.root} maxWidth={false}>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initial}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {
          ({values, setFieldValue}) => (
            <Form onKeyDown={(e) => handleOnSave(e, values)}>
              <Grid container alignItems="center">
                <Field
                  name="title"
                  as={TextField}
                  fullWidth={true}
                  label="标题"
                  variant="outlined"/>
              </Grid>
              <MyEditor
                value={BraftEditor.createEditorState(values.article)}
                changeValue={value => {
                  setFieldValue('article', value);
                }}
                onChange={value => {
                  setFieldValue('article', value);
                }}
              />
              <Setting formikRef={formikRef} onSubmit={onSubmit}/>
              <SpeedSetting/>
            </Form>
          )
        }
      </Formik>
    </Container>
  );

}

export default Post;
