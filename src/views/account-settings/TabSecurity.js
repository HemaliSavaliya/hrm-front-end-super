/** @module TabSecurity — Account-settings tab for changing the logged-in user's password. */
import { Box, Button, CardContent, Divider, Grid, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import useTabSecurityData from 'src/hooks/useTabSecurityData'
import PasswordToggleField from 'src/components/shared/PasswordToggleField'
import { cancelButton, saveButton } from 'src/Styles'

/**
 * Renders three password toggle fields and save/reset buttons for the security tab.
 * @returns {JSX.Element}
 */
const TabSecurity = () => {
  const { handleCurrentPasswordChange, handleClickShowCurrentPassword, handleMouseDownCurrentPassword,
    handleNewPasswordChange, handleClickShowNewPassword, handleMouseDownNewPassword,
    handleConfirmNewPasswordChange, handleClickShowConfirmNewPassword, handleMouseDownConfirmNewPassword,
    handlePasswordChange, values, setValues } = useTabSecurityData()
  const theme = useTheme()

  return (
    <motion.form initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ delay: 0.25 }}>
      <Toaster />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <PasswordToggleField id='account-settings-current-password' label='Current Password' value={values.password}
                  show={values.showPassword} onChange={handleCurrentPasswordChange('password')}
                  onToggle={handleClickShowCurrentPassword} onMouseDown={handleMouseDownCurrentPassword} />
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
            <img alt='avatar' src='/images/pages/secure.svg' width={380} />
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Box>
          <Button variant='contained' sx={{ ...saveButton, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }} onClick={handlePasswordChange}>Save Changes</Button>
          <Button type='reset' variant='outlined' color='secondary' sx={cancelButton}
            onClick={() => setValues({ ...values, password: '', newPassword: '', confirmPassword: '' })}>Reset</Button>
        </Box>
      </CardContent>
    </motion.form>
  )
}

export default TabSecurity
