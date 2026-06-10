/** @module PasswordField — Renders a password input with show/hide toggle for the admin form. */
import { FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Password field with visibility toggle; only shown when creating a new admin.
 * @param {{ formData, setFormData, handleInputChange, errors }} props
 * @returns {JSX.Element}
 */
const PasswordField = ({ formData, setFormData, handleInputChange, errors }) => (
  <Grid item xs={12}>
    <FormControl fullWidth variant='filled' size='small'>
      <InputLabel htmlFor='form-layouts-separator-password' sx={inputLabel}>Password</InputLabel>
      <FilledInput label='Password' id='password' name='password' value={formData.password}
        onChange={handleInputChange} type={formData.showPassword ? 'text' : 'password'} sx={inputField}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton edge='end' aria-label='toggle password visibility'
              onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}>
              {formData.showPassword ? <EyeOutline /> : <EyeOffOutline />}
            </IconButton>
          </InputAdornment>
        } />
      {errors.password && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.password}</Typography>}
    </FormControl>
  </Grid>
)

export default PasswordField
