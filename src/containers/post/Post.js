import React from "react";
import {Container, Grid, makeStyles, TextField} from "@material-ui/core";
import {Field, Form, Formik} from 'formik';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
import MyEditor from '../../components/editor/Editor';
import 'braft-extensions/dist/emoticon.css';
import {Setting} from "./Setting";
import SpeedSetting from "./SpeedSetting";
import styles from "./styles/postStyles";
import {useSelector} from "react-redux";
import {selectPost} from '../../redux/postSlice';
import BraftEditor from "braft-editor";

const useStyle = makeStyles(styles);

function Post({validationSchema, onSubmit, handleOnSave}) {
  const {initial} = useSelector(selectPost);
  const classes = useStyle();

  return (
    <Container className={classes.root} maxWidth={false}>
      <Formik
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
                name="article"
                value={BraftEditor.createEditorState(values.article)}
                onChange={value => {
                  setFieldValue('article', value);
                }}
              />
              <Setting/>
              <SpeedSetting/>
            </Form>
          )
        }
      </Formik>
    </Container>
  );

}

export default Post;
