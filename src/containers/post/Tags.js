import React, {useCallback, useEffect} from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/";
import {useDispatch, useSelector} from "react-redux";
import {createFieldSelector, changePostTags} from "../../redux/formSlice";
import FORM from "../../contants/form.json";
import {List} from 'immutable';

const Tags = React.memo(function Tags() {
  //toJS() 写在顶层会不断被调用,存在性能问题
  const allTagsImm = useSelector(createFieldSelector([FORM.post, 'allTags']));
  const valueImm = useSelector(createFieldSelector([FORM.post, 'tags']));
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([]);
  const [allTags, setAllTags] = React.useState([]);

  useEffect(() => {
    setValue(valueImm.toJS());
  }, [valueImm]);

  useEffect(() => {
    setAllTags(allTagsImm.toJS());
  }, [allTagsImm]);

  const handleOnChange = useCallback((_, newValue) => {
    dispatch(changePostTags(List(newValue)));
  }, [dispatch]);


  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleOnChange}
        multiple
        freeSolo
        options={allTags}
        renderInput={params => (
          <TextField
            {...params}
            label="标签"
            fullWidth
          />
        )}
      />
    </div>
  );
});


export default Tags;
