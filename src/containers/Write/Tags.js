import React from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";

const Tags = (props) => {
  const {tags, setFieldValue} = props;
  return (
    <div>
      <Autocomplete
        multiple
        freeSolo
        defaultValue={tags}
        options={tags}
        onChange={(_, value) => setFieldValue('tags', value)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
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
