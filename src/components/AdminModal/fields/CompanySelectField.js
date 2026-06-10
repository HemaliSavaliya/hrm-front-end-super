/** @module CompanySelectField — Renders a company name dropdown for the admin form. */
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Dropdown allowing selection of the company an admin belongs to.
 * @param {{ formData, handleCompanyChange, companyData, errors }} props
 * @returns {JSX.Element}
 */
const CompanySelectField = ({ formData, handleCompanyChange, companyData, errors }) => (
  <Grid item xs={12} sx={{ mb: 5 }}>
    <FormControl fullWidth variant='filled' size='small'>
      <InputLabel sx={inputLabel}>Company Name</InputLabel>
      <Select label='Company Name' value={formData.companyId} labelId='form-layouts-separator-select-label'
        id='companyId' name='companyId' onChange={handleCompanyChange} sx={inputField}>
        {companyData.length === 0 ? (
          <MenuItem disabled>No Company</MenuItem>
        ) : (
          companyData.map(company => <MenuItem key={company.id} value={company.companyName}>{company.companyName}</MenuItem>)
        )}
      </Select>
    </FormControl>
    {errors.companyId && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.companyId}</Typography>}
  </Grid>
)

export default CompanySelectField
