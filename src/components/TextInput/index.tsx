import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
}

const TextInput = (props: Props) => {
  const { value, onChange, onReset } = props
  return (
    <div>
      <TextField
        fullWidth
        value={value}
        onChange={onChange}
        placeholder="Enter GitHub username, i.e. gaearon"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value ? (
                <IconButton onClick={onReset}>
                  <ClearIcon />
                </IconButton>
              ) : (
                <SearchIcon />
              )}
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default TextInput
