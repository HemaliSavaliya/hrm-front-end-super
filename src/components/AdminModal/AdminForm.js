/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  CardActions,
  DialogContentText,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import AdminModalLogic from './AdminFormLogic'

const AdminForm = ({ handleClose, editAdminId, setOpen, adminData, addAdmin, editAdmin }) => {
  const {
    formData,
    handleInputChange,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    companyData,
    fetchCompany
  } = AdminModalLogic(adminData, editAdminId)
  const theme = useTheme()

  const descriptionElementRef = useRef(null)
  const [loading, setLoading] = useState(false) // Add loading state

  const isInEditMode = !!editAdminId

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef
    if (descriptionElement !== null) {
      descriptionElement.focus()
    }
  }, [])

  const handleCompanyChange = event => {
    const companyId = event.target.value
    setFormData({ ...formData, companyId })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    setLoading(true) // Set loading to true when starting submission

    // Convert company name to company ID before submitting
    const adminToSubmit = { ...formData, companyId: companyData.find(c => c.companyName === formData.companyId)?.id }

    try {
      if (editAdminId) {
        await editAdmin(adminToSubmit, editAdminId)
      } else {
        await addAdmin(adminToSubmit)
      }
      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting the form:', error)
    } finally {
      setLoading(false) // Set loading to false once submission is done
    }
  }

  useEffect(() => {
    fetchCompany()
  }, [])

  return (
    <DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1}>
      <form onSubmit={handleFormSubmit} autoComplete='off'>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.name}</Typography>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.email}</Typography>}
          </Grid>
          {!isInEditMode && (
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  type={formData.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={() =>
                          setFormData({
                            ...formData,
                            showPassword: !formData.showPassword
                          })
                        }
                      >
                        {formData.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.password}</Typography>
                )}
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <FormControl fullWidth>
              <InputLabel>Company Name</InputLabel>
              <Select
                label='Company Name'
                value={formData.companyId}
                labelId='form-layouts-separator-select-label'
                id='companyId'
                name='companyId'
                onChange={handleCompanyChange}
              >
                {companyData.length === 0 ? (
                  <MenuItem disabled>No Company</MenuItem>
                ) : (
                  companyData.map(company => (
                    <MenuItem key={company.id} value={company.companyName}>
                      {company.companyName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            {errors.companyId && (
              <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.companyId}</Typography>
            )}
          </Grid>
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
            {loading ? <>Saving...</> : !isInEditMode ? 'Save' : 'Update'}
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

export default AdminForm
