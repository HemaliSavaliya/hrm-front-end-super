import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  CardActions,
  DialogContentText,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { DropFiles } from 'src/@core/DropFile/DropFiles'
import CompanyFormLogic from './CompanyFormLogic'

const CompanyForm = ({
  handleClose,
  editCompanyId,
  setOpen,
  companyData,
  addCompany,
  editCompany,
  isViewMode,
  updateSubscription
}) => {
  const theme = useTheme()

  const {
    formData,
    handleInputChange,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    selectedPlan,
    handlePlanChange,
    handleImageChange
  } = CompanyFormLogic(companyData, editCompanyId, isViewMode)

  const descriptionElementRef = useRef(null)
  const [loading, setLoading] = useState(false) // Add loading state

  const isInEditMode = !!editCompanyId

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef
    if (descriptionElement !== null) {
      descriptionElement.focus()
    }
  }, [])

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    setLoading(true) // Set loading to true when starting submission

    // Include the radio button value in the formData before submission
    formData.subscription = selectedPlan

    try {
      if (isViewMode) {
        // Call the subscription API with selectedPlan
        await updateSubscription(formData)
      } else if (editCompanyId) {
        await editCompany(formData, editCompanyId)
      } else {
        await addCompany(formData)
      }

      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting the form:', error)
    } finally {
      setLoading(false) // Set loading to false once submission is done
    }
  }

  return (
    <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1}>
      <form onSubmit={handleFormSubmit} autoComplete='off'>
        <Grid container spacing={5}>
          {!isViewMode && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Company Name'
                  id='companyName'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                {errors.companyName && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.companyName}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Company Email'
                  id='companyEmail'
                  name='companyEmail'
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                />
                {errors.companyEmail && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.companyEmail}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Company Pancard Number'
                  id='companyPan'
                  name='companyPan'
                  value={formData.companyPan}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Company GST Number'
                  id='companyGST'
                  name='companyGST'
                  value={formData.companyGST}
                  onChange={handleInputChange}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='subscription'
                value={selectedPlan}
                onChange={handlePlanChange}
                id='subscription'
              >
                <FormControlLabel value='Monthly' control={<Radio />} label='Monthly' />
                <FormControlLabel value='Yearly' control={<Radio />} label='Yearly' />
                <FormControlLabel value='Custom' control={<Radio />} label='Custom' />
              </RadioGroup>
            </FormControl>
          </Grid>
          {selectedPlan === 'Custom' && (
            <>
              <Grid item xs={12} sm={6} sx={{ mb: 8 }}>
                <TextField
                  fullWidth
                  type='date'
                  label='Start Date'
                  id='startDate'
                  name='startDate'
                  value={formData.startDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    placeholder: '' // Set an empty string as the placeholder
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 8 }}>
                <TextField
                  fullWidth
                  type='date'
                  label='End Date'
                  id='endDate'
                  name='endDate'
                  value={formData.endDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    placeholder: '' // Set an empty string as the placeholder
                  }}
                />
              </Grid>
            </>
          )}
          {!isViewMode && (
            <Grid item xs={12} sm={12}>
              <div
                id='companyLogo'
                name='companyLogo'
                style={{
                  marginBottom: '20px',
                  padding: '20px',
                  border: 'dashed',
                  borderColor: 'currentColor',
                  borderWidth: 'thin',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}
              >
                <DropFiles handleImageChange={handleImageChange} />
              </div>
              {errors.companyLogo && (
                <Typography sx={{ mb: 3, color: '#FF4433', fontSize: '13px' }}>{errors.companyLogo}</Typography>
              )}
            </Grid>
          )}
        </Grid>
        <Divider sx={{ margin: 0 }} />
        <CardActions sx={{ justifyContent: 'flex-end', pb: 0, pr: 0 }}>
          <Button
            size='large'
            type='submit'
            sx={{
              mr: 2,
              lineHeight: 0,
              padding: '20px 25px !important',
              '&.MuiButton-root:hover': {
                backgroundColor: theme.palette.primary.hover
              }
            }}
            variant='contained'
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Saving...' : isViewMode ? 'Save Subscription' : !editCompanyId ? 'Save' : 'Update'}
          </Button>
          <Button
            size='large'
            color='secondary'
            variant='outlined'
            onClick={handleClose}
            sx={{ lineHeight: 0, padding: '20px 25px !important' }}
            disabled={loading} // Disable button while loading
          >
            Cancel
          </Button>
        </CardActions>
      </form>
    </DialogContentText>
  )
}

export default CompanyForm
