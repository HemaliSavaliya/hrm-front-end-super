/** @module ForgotPasswordPage — Public page where a user requests a password-reset email link. */
import { useState } from 'react'
import { Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Link from 'next/link'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

const LinkStyled = styled('a')(({ theme }) => ({ fontSize: '0.875rem', textDecoration: 'none', color: theme.palette.primary.main }))

/**
 * Renders an email field and sends a reset link on submission.
 * @returns {JSX.Element}
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const theme = useTheme()

  const handleSubmit = async event => {
    event.preventDefault()
    if (!email.trim()) { toast.error('Email is required!', toastError(theme, 'top-right')); return }
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/forgot-password-link`, { email })
      toast.success(data.message, toastSuccess(theme, 'top-right'))
    } catch { toast.error('An error occurred', toastError(theme, 'top-right')) }
  }

  return (
    <Box className='content-center'>
      <Toaster />
      <Card sx={{ zIndex: 1, border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.default, borderRadius: 0 }}>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant='caption' sx={{ fontWeight: 600 }}>Enter your email address and we&apos;ll send you a link to reset your password.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField variant='standard' autoFocus fullWidth label='Email' value={email} onChange={event => setEmail(event.target.value)}
              sx={{ marginBottom: 5, '& .MuiFormLabel-root': { fontSize: '14px' } }} />
            <Button fullWidth size='large' variant='contained' type='submit'
              sx={{ marginTop: 7, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }}>
              Send Reset Link
            </Button>
            <Divider sx={{ my: 5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Link href='/login' passHref><LinkStyled>Login?</LinkStyled></Link>
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
