/** @module CompanyInfoFields — Renders company name, email, PAN and GST text fields. */
import { Grid, TextField, Typography } from '@mui/material'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Presentational field group for basic company information.
 * @param {{ formData, handleInputChange, errors }} props
 * @returns {JSX.Element}
 */
const CompanyInfoFields = ({ formData, handleInputChange, errors }) => (
  <>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth variant='filled' size='small' label='Company Name' id='companyName' name='companyName'
        value={formData.companyName} onChange={handleInputChange} sx={{ ...inputField, ...inputLabel }} />
      {errors.companyName && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.companyName}</Typography>}
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth variant='filled' size='small' label='Company Email' id='companyEmail' name='companyEmail'
        value={formData.companyEmail} onChange={handleInputChange} sx={{ ...inputField, ...inputLabel }} />
      {errors.companyEmail && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.companyEmail}</Typography>}
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth variant='filled' size='small' label='Company Pancard Number' id='companyPan' name='companyPan'
        value={formData.companyPan} onChange={handleInputChange} sx={{ ...inputField, ...inputLabel }} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth variant='filled' size='small' label='Company GST Number' id='companyGST' name='companyGST'
        value={formData.companyGST} onChange={handleInputChange} sx={{ ...inputField, ...inputLabel }} />
    </Grid>
  </>
)

export default CompanyInfoFields
