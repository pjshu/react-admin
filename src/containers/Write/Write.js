import React from "react";
import {Container, Grid, makeStyles, TextField} from "@material-ui/core";
import {Field, Form, Formik} from 'formik';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
import BraftEditor from '../../config/editorConfig';
import 'braft-extensions/dist/emoticon.css';
import {object} from 'yup';
import {Setting, SettingButton} from "./Setting";

const useStyle = makeStyles({
  root: {
    background: "#fff",
    padding: 30,
    borderRadius: 4
  }
});

export default function Write(props) {
  const validationSchema = object({});
  const onSubmit = (values) => {
    console.log(values);
  };

  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  return (
    <Container className={classes.root} maxWidth={false}>
      <Formik
        initialValues={{title: '', tags: [], visibility: '私密', article: BraftEditor.createEditorState(null)}}
        onSubmit={(values) => onSubmit(values)}
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
                <Grid>
                  <SettingButton {...{open, setOpen}}/>
                </Grid>
              </Grid>
              <Field
                as={BraftEditor}
                name="article"
                onBlur={() => {
                }}
                onChange={value => {
                  props.setFieldValue('article', value);
                }}
              />
              <Setting {...{open}}/>
            </Form>
          )
        }
      </Formik>
    </Container>
  );

  function handleOnSave(e,value) {
    if (e.keyCode === 83 && e.ctrlKey) {
      value = {...value};
      value.article = value.article.toHTML();
      console.log('submit',value);
    }
  }
}
