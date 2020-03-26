import React from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/";
import {useFormikContext} from "formik";

const Tags = () => {
  const {values: {allTags, tags}, setFieldValue} = useFormikContext();

  const handleOnChange = React.useCallback((_, value) => {
    setFieldValue('tags', value);
  }, [setFieldValue]);

  return (
    <div>
      <Autocomplete
        multiple
        freeSolo
        value={tags}
        options={allTags}
        onChange={handleOnChange}
        renderInput={params => (
          <TextField
            {...params}
            label="标签"
            fullWidth
          />
        )}
      >
      </Autocomplete>
    </div>
  );
};

export default Tags;
