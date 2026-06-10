/** @module AdminForm — Form body rendered inside AdminModal for add/edit admin modes. */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { Button, CardActions, DialogContentText, Divider, Grid, useTheme } from '@mui/material'
import AdminModalLogic from './AdminFormLogic'
import NameEmailFields from './fields/NameEmailFields'
import PasswordField from './fields/PasswordField'
import CompanySelectField from './fields/CompanySelectField'
import { cancelButton, saveButton } from 'src/Styles'

/**
 * Renders admin fields and handles form submission.
 * @param {object} props - Includes editAdminId and add/edit callbacks.
 * @returns {JSX.Element}
 */
const AdminForm = ({ handleClose, editAdminId, setOpen, adminData, addAdmin, editAdmin }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue, companyData, fetchCompany } = AdminModalLogic(adminData, editAdminId)
  const theme = useTheme()
  const descriptionElementRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { descriptionElementRef.current?.focus() }, [])
  useEffect(() => { fetchCompany() }, [])

  /**
   * Keeps the company NAME in formData.companyId so the Select value always
   * matches a MenuItem value (which are company names).
   * The name is resolved to an ID only at submit time.
   */
  const handleCompanyChange = event => {
    setFormData({ ...formData, companyId: event.target.value })
  }

  const handleFormSubmit = async event => {
    event.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    // Resolve company name → numeric ID before sending to the API
    const resolvedCompanyId = companyData.find(company => company.companyName === formData.companyId)?.id
    const adminToSubmit = { ...formData, companyId: resolvedCompanyId }

    try {
      if (editAdminId) await editAdmin(adminToSubmit, editAdminId)
      else await addAdmin(adminToSubmit)
      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) { console.error('Error submitting admin form:', error) }
    finally { setLoading(false) }
  }

  return (
    <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1}>
      <form onSubmit={handleFormSubmit} autoComplete='off'>
        <Grid container spacing={5}>
          <NameEmailFields formData={formData} handleInputChange={handleInputChange} errors={errors} />
          {!editAdminId && <PasswordField formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} errors={errors} />}
          <CompanySelectField formData={formData} handleCompanyChange={handleCompanyChange} companyData={companyData} errors={errors} />
        </Grid>
        <Divider sx={{ margin: 0 }} />
        <CardActions sx={{ justifyContent: 'flex-end', pb: 0, pr: 0 }}>
          <Button size='large' type='submit' variant='contained' disabled={loading}
            sx={{ ...saveButton, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }}>
            {loading ? 'Saving...' : !editAdminId ? 'Save' : 'Update'}
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={handleClose} sx={cancelButton} disabled={loading}>Cancel</Button>
        </CardActions>
      </form>
    </DialogContentText>
  )
}

export default AdminForm
