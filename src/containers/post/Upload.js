import React, {useCallback} from 'react';
import {Box, ButtonBase} from "@material-ui/core";
import useStyles from './Upload.style';
import FORM from "../../contants/form.json";
import {createFieldSelector, changeFormField} from "../../redux/formSlice";
import {useDispatch, useSelector} from "react-redux";

function Upload() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const illustration = useSelector(createFieldSelector([FORM.post, 'illustration']));

  const handleOnChange = useCallback((e) => {
    const file = e.target.files;
    if (file && file.length !== 0) {
      const value = window.URL.createObjectURL(file[0]);
      dispatch(changeFormField({'illustration': value, form: FORM.post}));
    }
  }, [dispatch]);
  return (
    <div>
      <p>摘录图片</p>
      <input
        onChange={handleOnChange}
        className={classes.hidden}
        accept="image/*"
        type="file"
        id={"tag-img"}
      />
      <Box
        className={classes.box}
        boxShadow={4}
      >
        <label htmlFor={"tag-img"}>
          <ButtonBase
            classes={{root: classes.button}}
            focusRipple
            component={'div'}
          >
            <div className={classes.imgWrapper}>
              {
                illustration ? (
                  <img
                    src={illustration}
                    alt={"点击上传图片"}
                  />
                ) : (
                  <span>点击上传图片</span>
                )
              }
            </div>
          </ButtonBase>
        </label>
      </Box>
    </div>
  );
}

export default Upload;
