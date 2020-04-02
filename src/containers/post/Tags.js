import React, {useCallback} from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/";
import {selectPost} from "../../redux/postSlice";
import {useSelector} from "react-redux";
import {Field} from "../../components/Form";

const Tags = () => {
  const {form: {allTags}} = useSelector(selectPost);
  const getValue = useCallback((e, value) => {
    return value;
  }, []);

  return (
    <div>
      <Field
        formName={'post'}
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
};

export default React.memo(Tags);
