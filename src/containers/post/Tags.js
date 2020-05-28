import React, {useCallback} from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/";
import {useSelector} from "react-redux";
import {Field} from "../../components/Form";
import {createFieldSelector, FORM} from "../../redux/formSlice";

const Tags = React.memo(function Tags() {
  const allTags = useSelector(createFieldSelector([FORM.post, 'allTags']));
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
});


export default Tags;
