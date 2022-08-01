import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const TextInput = () => {
  return (
    <div>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={[]}
        renderInput={(params) => <TextField {...params} placeholder="Enter GitHub username, i.e. gaearon" />}
      />
    </div>
  )
}

export default TextInput