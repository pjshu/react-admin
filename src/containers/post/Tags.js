import React, {useCallback} from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/";
import {selectPost} from "../../redux/postSlice";
import {useSelector} from "react-redux";
import {Field} from "../../components/Form";
import {objAreEqual} from "../../helpers/misc";
import {FORM} from "../../redux";

const areEqual = (pre, next) => {
  return objAreEqual(pre, next);
};

const Tags = React.memo(() => {
  const {form: {allTags}} = useSelector(selectPost);
  return <ContextTags allTags={allTags}/>;
});

const ContextTags = React.memo(function ContextTags({allTags}) {
  const getValue = useCallback((e, value) => {
    return value;
  }, []);
  return (
    <div>
      <Field
        formName={FORM.post}
        as={Autocomplete}
        multiple
        freeSolo
        name={'tags'}
        options={allTags}
        getValue={getValue}
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
}, areEqual);

export default Tags;
