/** @module CompanyForm — Form body rendered inside CompanyModal for add/edit/view-subscription modes. */
import { useEffect, useRef, useState } from 'react'
import { Box, Button, CardActions, DialogContentText, Divider, Grid, Typography, useTheme } from '@mui/material'
import { DropFiles } from 'src/@core/DropFile/DropFiles'
import CompanyFormLogic from './CompanyFormLogic'
import CompanyInfoFields from './fields/CompanyInfoFields'
import SubscriptionFields from './fields/SubscriptionFields'
import { cancelButton, saveButton } from 'src/Styles'

/**
 * Renders company fields and handles form submission.
 * @param {object} props - Includes editCompanyId, isViewMode and CRUD callbacks.
 * @returns {JSX.Element}
 */
const CompanyForm = ({ handleClose, editCompanyId, setOpen, companyData, addCompany, editCompany, isViewMode, updateSubscription }) => {
  const theme = useTheme()
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue, selectedPlan, handlePlanChange, handleImageChange } = CompanyFormLogic(companyData, editCompanyId, isViewMode)
  const descriptionElementRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { descriptionElementRef.current?.focus() }, [])

  /**
   * Builds a FormData payload for multipart upload (add/edit),
   * or sends a plain object for the view-subscription (renew) mode.
   */
  const buildFormData = () => {
    const payload = new FormData()
    const dataToSubmit = { ...formData, subscription: selectedPlan }

    Object.keys(dataToSubmit).forEach(key => {
      if (key === 'companyLogo') {
        // Backend multer expects the file under the field name "companyLogo[]"
        if (Array.isArray(dataToSubmit.companyLogo) && dataToSubmit.companyLogo.length > 0) {
          payload.append('companyLogo[]', dataToSubmit.companyLogo[0])
        }
      } else {
        // Append every other field; coerce null/undefined to empty string
        payload.append(key, dataToSubmit[key] ?? '')
      }
    })

    return payload
  }

  const handleFormSubmit = async event => {
    event.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      if (isViewMode) {
        // Subscription renewal: no file upload needed, send plain object
        await updateSubscription({ ...formData, subscription: selectedPlan })
      } else if (editCompanyId) {
        await editCompany(buildFormData(), editCompanyId)
      } else {
        await addCompany(buildFormData())
      }
      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting company form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1}>
      <form onSubmit={handleFormSubmit} autoComplete='off'>
        <Grid container spacing={5}>
          {!isViewMode && <CompanyInfoFields formData={formData} handleInputChange={handleInputChange} errors={errors} />}
          <SubscriptionFields selectedPlan={selectedPlan} handlePlanChange={handlePlanChange} formData={formData} handleInputChange={handleInputChange} />
          {!isViewMode && (
            <Grid item xs={12}>
              <Box sx={{ mb: 2.5, p: 2.5, border: 'dashed', borderColor: 'currentColor', borderWidth: 'thin', borderRadius: '6px', textAlign: 'center' }}>
                <DropFiles handleImageChange={handleImageChange} />
              </Box>
              {errors.companyLogo && <Typography sx={{ mb: 3, color: '#FF4433', fontSize: '13px' }}>{errors.companyLogo}</Typography>}
            </Grid>
          )}
        </Grid>
        <Divider sx={{ margin: 0 }} />
        <CardActions sx={{ justifyContent: 'flex-end', pb: 0, pr: 0 }}>
          <Button size='large' type='submit' variant='contained' disabled={loading}
            sx={{ ...saveButton, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }}>
            {loading ? 'Saving...' : isViewMode ? 'Save Subscription' : !editCompanyId ? 'Save' : 'Update'}
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={handleClose} sx={cancelButton} disabled={loading}>Cancel</Button>
        </CardActions>
      </form>
    </DialogContentText>
  )
}

export default CompanyForm
