import {
  Box,
  Button,
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
import BlankLayout from 'src/@core/layouts/BlankLayout'
import toast, { Toaster } from 'react-hot-toast'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const theme = useTheme()
  const router = useRouter()

  // Access the token from query parameters
  const { token } = router.query

  const handleSubmit = async e => {
    e.preventDefault()

    if (!token) {
      toast.error('Token is missing', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/reset-password`, {
        token,
        newPassword: password,
        confirmPassword: confirmPassword
      })

      toast.success(response.data.message, {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      setTimeout(() => {
        router.push('/login') // Redirect to login page after successful reset
      }, 2000)
    } catch (err) {
      toast.error('An error occurred', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
      console.error('Error resetting password:', err)
    }
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

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
              Please reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              autoFocus
              variant='standard'
              sx={{
                marginBottom: 5,
                '& .MuiFormLabel-root': {
                  fontSize: '14px'
                }
              }}
            >
              <InputLabel htmlFor='standard-adornment-password'>New Password</InputLabel>
              <Input
                id='standard-adornment-password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword}>
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              fullWidth
              variant='standard'
              sx={{
                '& .MuiFormLabel-root': {
                  fontSize: '14px'
                }
              }}
            >
              <InputLabel htmlFor='standard-adornment-password'>Confirm Password</InputLabel>
              <Input
                id='standard-adornment-password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowConfirmPassword}>
                      {showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
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
              type='submit'
            >
              Reset
            </Button>
            {/* <Divider sx={{ my: 5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Link href='/login' passHref>
                <LinkStyled>Login?</LinkStyled>
              </Link>
            </Box> */}
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

ResetPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPasswordPage
