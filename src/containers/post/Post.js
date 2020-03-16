import React from "react";
import {Container, Grid, makeStyles, TextField} from "@material-ui/core";
import {Field, Form, Formik} from 'formik';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
import BraftEditor from '../../components/Editor';
import 'braft-extensions/dist/emoticon.css';
import {object} from 'yup';
import {Setting} from "./Setting";
import SpeedSetting from "./SpeedSetting";
import styles from "./styles/postStyles";

const useStyle = makeStyles(styles);

function Post(props) {
  const {validationSchema, postState, onSubmit, setDrawerOpen, handleOnSave, open} = props;
  const classes = useStyle();

  return (
    <Container className={classes.root} maxWidth={false}>
      <Formik
        enableReinitialize
        initialValues={postState}
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
              <BraftEditor
                name="article"
                value={values.article}
                onChange={value => {
                  setFieldValue('article', value);
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

}

export default Post;
