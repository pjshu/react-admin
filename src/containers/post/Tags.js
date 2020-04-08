import React, {useCallback} from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/";
import {useSelector} from "react-redux";
import {Field} from "../../components/Form";
import {objAreEqual} from "../../helpers/misc";
import {FORM, selectForm} from "../../redux/formSlice";


const areEqual = (pre, next) => {
  return objAreEqual(pre, next);
};

const Tags = React.memo(() => {
  const {[FORM.post]: {allTags}} = useSelector(selectForm);
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
