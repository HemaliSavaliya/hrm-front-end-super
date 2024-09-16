import {
  Box,
  Button,
  Divider,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  CardContent,
  FormControl,
  InputAdornment,
  Input
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import useAuth from 'src/hooks/useAuthData'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  const {
    handleKeyDown,
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    isSaving
  } = useAuth()
  const theme = useTheme()

  return (
    <Box className='content-center'>
      <Toaster />

      <Card
        sx={{
          zIndex: 1,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
          borderRadius: 0
        }}
      >
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant='caption' sx={{ fontWeight: 600 }}>
              Please sign-in to your account and start the adventure
            </Typography>
          </Box>
          <form noValidate autoComplete='off'>
            <TextField
              variant='standard'
              autoFocus
              fullWidth
              id='email'
              label='Email'
              value={values.email}
              onChange={handleChange('email')}
              sx={{
                marginBottom: 5,
                '& .MuiFormLabel-root': {
                  fontSize: '14px'
                }
              }}
            />
            <FormControl
              fullWidth
              autoFocus
              variant='standard'
              sx={{
                '& .MuiFormLabel-root': {
                  fontSize: '14px'
                }
              }}
            >
              <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
              <Input
                id='standard-adornment-password'
                value={values.password}
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                onKeyDown={handleKeyDown}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{
                marginTop: 7,
                '&.MuiButton-root:hover': {
                  backgroundColor: theme.palette.primary.hover
                }
              }}
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? 'Login...' : 'Login'}
            </Button>
            <Divider sx={{ my: 5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Link href='/forgot-password' passHref>
                <LinkStyled>Forgot Password?</LinkStyled>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
