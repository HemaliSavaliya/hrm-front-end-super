/** @module ResetPasswordForm — Form for entering and confirming a new password on reset. */
import { Box, Button, CardContent, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const fieldSx = { '& .MuiFormLabel-root': { fontSize: '14px' } }

/**
 * Presentational form that collects new password and confirmation.
 * @param {{ password, setPassword, confirmPassword, setConfirmPassword,
 *   showPassword, showConfirmPassword, onTogglePassword, onToggleConfirmPassword, onSubmit }} props
 * @returns {JSX.Element}
 */
const ResetPasswordForm = ({ password, setPassword, confirmPassword, setConfirmPassword, showPassword, showConfirmPassword, onTogglePassword, onToggleConfirmPassword, onSubmit }) => {
  const theme = useTheme()
  return (
    <CardContent>
      <Box sx={{ mb: 4 }}>
        <Typography variant='caption' sx={{ fontWeight: 600 }}>Please reset your password</Typography>
      </Box>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <FormControl fullWidth autoFocus variant='standard' sx={{ marginBottom: 5, ...fieldSx }}>
          <InputLabel htmlFor='new-password'>New Password</InputLabel>
          <Input id='new-password' value={password} onChange={event => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'}
            endAdornment={<InputAdornment position='end'><IconButton onClick={onTogglePassword}>{showPassword ? <EyeOutline /> : <EyeOffOutline />}</IconButton></InputAdornment>} />
        </FormControl>
        <FormControl fullWidth variant='standard' sx={fieldSx}>
          <InputLabel htmlFor='confirm-password'>Confirm Password</InputLabel>
          <Input id='confirm-password' value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={<InputAdornment position='end'><IconButton onClick={onToggleConfirmPassword}>{showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}</IconButton></InputAdornment>} />
        </FormControl>
        <Button fullWidth size='large' variant='contained' type='submit'
          sx={{ marginTop: 7, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }}>Reset</Button>
      </form>
    </CardContent>
  )
}

export default ResetPasswordForm
