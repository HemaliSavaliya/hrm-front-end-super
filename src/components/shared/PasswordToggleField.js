/** @module PasswordToggleField — Reusable password input with show/hide visibility toggle. */
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Filled password input that exposes a toggle button to reveal/hide the value.
 * @param {{ id, label, value, show, onChange, onToggle, onMouseDown }} props
 * @returns {JSX.Element}
 */
const PasswordToggleField = ({ id, label, value, show, onChange, onToggle, onMouseDown }) => (
  <FormControl fullWidth variant='filled' size='small'>
    <InputLabel htmlFor={id} sx={inputLabel}>{label}</InputLabel>
    <FilledInput id={id} label={label} value={value} onChange={onChange}
      type={show ? 'text' : 'password'} sx={inputField}
      endAdornment={
        <InputAdornment position='end'>
          <IconButton edge='end' aria-label='toggle password visibility' onClick={onToggle} onMouseDown={onMouseDown}>
            {show ? <EyeOutline /> : <EyeOffOutline />}
          </IconButton>
        </InputAdornment>
      } />
  </FormControl>
)

export default PasswordToggleField
