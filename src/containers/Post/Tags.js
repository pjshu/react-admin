import React from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";

const Tags = ({allTags,tags, setFieldValue}) => {
  return (
    <div>
      <Autocomplete
        multiple
        freeSolo
        value={tags}
        defaultValue={tags}
        options={allTags}
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
