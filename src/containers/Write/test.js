import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export default function Tags() {

  return (
    <Autocomplete
      multiple
      freeSolo
      options={tags}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({index})} />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label="标签"
          fullWidth
        />
      )}
    />
  );
}

const tags = ['tag1', 'tag2', 'tag3'];
