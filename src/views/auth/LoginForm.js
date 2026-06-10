/** @module LoginForm — Login card with email, password fields and form submission. */
import { Box, Button, Divider, TextField, InputLabel, Typography, IconButton, CardContent, FormControl, InputAdornment, Input } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Link from 'next/link'
import useAuth from 'src/hooks/useAuthData'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem', textDecoration: 'none', color: theme.palette.primary.main
}))

/**
 * Renders the login form card with email, password and submit button.
 * @returns {JSX.Element}
 */
const LoginForm = () => {
  const { handleKeyDown, values, handleChange, handleClickShowPassword, handleMouseDownPassword, handleSubmit, isSaving } = useAuth()
  const theme = useTheme()

  return (
    <Card sx={{ zIndex: 1, border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.default, borderRadius: 0 }}>
      <CardContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant='caption' sx={{ fontWeight: 600 }}>
            Please sign-in to your account and start the adventure
          </Typography>
        </Box>
        <form noValidate autoComplete='off'>
          <TextField variant='standard' autoFocus fullWidth id='email' label='Email' value={values.email}
            onChange={handleChange('email')} sx={{ marginBottom: 5, '& .MuiFormLabel-root': { fontSize: '14px' } }} />
          <FormControl fullWidth variant='standard' sx={{ '& .MuiFormLabel-root': { fontSize: '14px' } }}>
            <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
            <Input id='standard-adornment-password' value={values.password} onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'} onKeyDown={handleKeyDown}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                  </IconButton>
                </InputAdornment>
              } />
          </FormControl>
          <Button fullWidth size='large' variant='contained'
            sx={{ marginTop: 7, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }}
            onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? 'Login...' : 'Login'}
          </Button>
          <Divider sx={{ my: 5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link href='/forgot-password' passHref><LinkStyled>Forgot Password?</LinkStyled></Link>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
