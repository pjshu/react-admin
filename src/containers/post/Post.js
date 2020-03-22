import React from "react";
import {Container, Grid, TextField} from "@material-ui/core";
import {Field, Form, Formik} from 'formik';
import MyEditor from '../../components/editor/Editor';
import {Setting} from "./Setting";
import SpeedSetting from "./SpeedSetting";
import useStyles from "./post.styles";
import {useSelector} from "react-redux";
import {selectPost} from '../../redux/postSlice';
import BraftEditor from "braft-editor";
import {Paper} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addPostImg} from '../../redux/postSlice';
import {ContentUtils} from 'braft-utils';
import {getImageForm} from '../../helpers/misc';
import {validatePost} from "../../helpers/validate";

function Post({postId, onSubmit, handleOnSave}) {
  const {initial} = useSelector(selectPost);
  const dispatch = useDispatch();
  const formRef = React.useRef();
  // const uploadImage = (e) => {
  //   const files = e.target.files;
  //   if (!files) {
  //     return;
  //   }
  //   const blobUrl = URL.createObjectURL(files[0]);
  //   const handleInsertImage = (url) => {
  //     //TODO
  //     const base = 'http://127.0.0.1:5000/api/admin/images/';
  //     const {setFieldValue, values: {article}} = formRef.current;
  //     setFieldValue('article', ContentUtils.insertMedias(article, [{
  //       type: 'IMAGE',
  //       url: base + url
  //     }]));
  //   };
  //   getImageForm(blobUrl).then(res => {
  //     dispatch(addPostImg(res, postId, handleInsertImage));
  //   });
  // };
  const myUploadFn = (param) => {
    //TODO
    const serverUrl = 'http://127.0.0.1:5000/api/admin/images/';
    dispatch(addPostImg(param,postId));
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
                // uploadImage={uploadImage}
                value={BraftEditor.createEditorState(values.article)}
                onChange={value => {
                  setFieldValue('article', value);
                }}
              />
              <Setting formRef={formRef} onSubmit={onSubmit} uploadImage={uploadImage}/>
              <SpeedSetting/>
            </Form>
          )
        }
      </Formik>
    </Container>
  );

}

export default Post;
