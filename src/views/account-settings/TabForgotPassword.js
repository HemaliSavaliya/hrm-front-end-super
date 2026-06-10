/** @module TabForgotPassword — Account-settings tab for resetting another user's password. */
import { Box, Button, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import useForgotPasswordData from 'src/hooks/useForgotPasswordData'
import PasswordToggleField from 'src/components/shared/PasswordToggleField'
import { cancelButton, inputField, inputLabel, saveButton } from 'src/Styles'

/**
 * Renders a user selector plus two password toggle fields for the forgot-password tab.
 * @returns {JSX.Element}
 */
const TabForgotPassword = () => {
  const { handleNewPasswordChange, handleClickShowNewPassword, handleMouseDownNewPassword,
    handleConfirmNewPasswordChange, handleClickShowConfirmNewPassword, handleMouseDownConfirmNewPassword,
    handleEmployeeName, handleChangePassword, values, setValues, userPassword } = useForgotPasswordData()
  const theme = useTheme()

  return (
    <motion.form initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ delay: 0.25 }}>
      <Toaster />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth variant='filled' size='small'>
                  <InputLabel id='form-layouts-separator-select-label' sx={inputLabel}>Admin</InputLabel>
                  <Select label='Admin' defaultValue='' labelId='form-layouts-separator-select-label'
                    value={values.employeeName} onChange={handleEmployeeName('employeeName')} sx={inputField}>
                    {userPassword.length === 0 ? <MenuItem disabled>No Admin</MenuItem>
                      : userPassword.map(user => <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <PasswordToggleField id='account-settings-new-password' label='New Password' value={values.newPassword}
                  show={values.showNewPassword} onChange={handleNewPasswordChange('newPassword')}
                  onToggle={handleClickShowNewPassword} onMouseDown={handleMouseDownNewPassword} />
              </Grid>
              <Grid item xs={12}>
                <PasswordToggleField id='account-settings-confirm-new-password' label='Confirm New Password' value={values.confirmPassword}
                  show={values.showConfirmPassword} onChange={handleConfirmNewPasswordChange('confirmPassword')}
                  onToggle={handleClickShowConfirmNewPassword} onMouseDown={handleMouseDownConfirmNewPassword} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12} sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}>
            <img width={250} alt='avatar' src='/images/pages/forgot.svg' />
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Box>
          <Button variant='contained' sx={{ ...saveButton, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }} onClick={handleChangePassword}>Save Changes</Button>
          <Button type='reset' variant='outlined' color='secondary' sx={cancelButton}
            onClick={() => setValues({ ...values, employeeId: '', newPassword: '', confirmPassword: '' })}>Reset</Button>
        </Box>
      </CardContent>
    </motion.form>
  )
}

export default TabForgotPassword
