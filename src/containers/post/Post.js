import React from "react";
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
import styles from "./styles/postStyles";
import AlertMessage from "../../components/AlertMessage";

const useStyle = makeStyles(styles);

function Post({postState, postId}) {
  const validationSchema = object({});
  const classes = useStyle();
  const onSubmit = (values) => {
    const data = {...values};
    data.article = data.article.toRAW();
    data.create_date = formatTime(data.create_date);
    api.modifyPost(data, postId).then(res => {
      res.status === 'success'
        ? AlertMessage.success("上传成功")
        : AlertMessage.error("上传成功");
    });
  };

  function handleOnSave(e, value) {
    if (e.keyCode === 83 && e.ctrlKey) {
      onSubmit(value);
    }
  }

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
