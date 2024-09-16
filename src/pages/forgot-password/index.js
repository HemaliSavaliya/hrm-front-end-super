import { useState } from 'react'
import { Box, Button, TextField, Typography, CardContent, Card, Divider } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Link from 'next/link'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const theme = useTheme()

  const handleChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Email is required!', {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/forgot-password-link`, { email })
      toast.success(response.data.message, {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
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
    }
  }

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
            {/* <Typography variant='h6' sx={{ fontWeight: 600 }}>
              Forgot Password
            </Typography> */}
            <Typography variant='caption' sx={{ fontWeight: 600 }}>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              variant='standard'
              autoFocus
              fullWidth
              id='email'
              label='Email'
              value={email}
              onChange={handleChange}
              sx={{
                marginBottom: 5,
                '& .MuiFormLabel-root': {
                  fontSize: '14px'
                }
              }}
            />
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
              Send Reset Link
            </Button>
            <Divider sx={{ my: 5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Link href='/login' passHref>
                <LinkStyled>Login?</LinkStyled>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ForgotPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPasswordPage
