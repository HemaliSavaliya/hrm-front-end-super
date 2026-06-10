/** @module NameEmailFields — Renders name and email text fields for the admin form. */
import { Grid, TextField, Typography } from '@mui/material'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Presentational field group for admin name and email.
 * @param {{ formData, handleInputChange, errors }} props
 * @returns {JSX.Element}
 */
const NameEmailFields = ({ formData, handleInputChange, errors }) => (
  <>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth variant='filled' size='small' label='Name' id='name' name='name'
        value={formData.name} onChange={handleInputChange} sx={{ ...inputField, ...inputLabel }} />
      {errors.name && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.name}</Typography>}
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth variant='filled' size='small' label='Email' id='email' name='email'
        value={formData.email} onChange={handleInputChange} sx={{ ...inputField, ...inputLabel }} />
      {errors.email && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.email}</Typography>}
    </Grid>
  </>
)

export default NameEmailFields
