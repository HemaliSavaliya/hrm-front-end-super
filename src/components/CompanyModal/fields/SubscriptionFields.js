/** @module SubscriptionFields — Renders subscription plan radio buttons and optional date pickers. */
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Displays Monthly/Yearly/Custom radio options; shows date fields when Custom is selected.
 * @param {{ selectedPlan, handlePlanChange, formData, handleInputChange }} props
 * @returns {JSX.Element}
 */
const SubscriptionFields = ({ selectedPlan, handlePlanChange, formData, handleInputChange }) => (
  <>
    <Grid item xs={12}>
      <FormControl variant='filled' size='small'>
        <RadioGroup row name='subscription' value={selectedPlan} onChange={handlePlanChange}>
          {['Monthly', 'Yearly', 'Custom'].map(plan => (
            <FormControlLabel key={plan} value={plan}
              control={<Radio sx={{ transform: 'scale(0.8)' }} />}
              label={plan} sx={{ '& .MuiTypography-root': { fontSize: 15 } }} />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
    {selectedPlan === 'Custom' && (
      <>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth variant='filled' size='small' type='date' label='Start Date' id='startDate' name='startDate'
            value={formData.startDate} onChange={handleInputChange} InputLabelProps={{ shrink: true }}
            inputProps={{ placeholder: '' }} sx={{ ...inputField, ...inputLabel }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth variant='filled' size='small' type='date' label='End Date' id='endDate' name='endDate'
            value={formData.endDate} onChange={handleInputChange} InputLabelProps={{ shrink: true }}
            inputProps={{ placeholder: '' }} sx={{ ...inputField, ...inputLabel }} />
        </Grid>
      </>
    )}
  </>
)

export default SubscriptionFields
