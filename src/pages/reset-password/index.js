/** @module ResetPasswordPage — Public page for resetting a password via a token link. */
import { useState } from 'react'
import { Box } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import ResetPasswordForm from 'src/views/auth/ResetPasswordForm'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

const Card = styled(MuiCard)(({ theme }) => ({ [theme.breakpoints.up('sm')]: { width: '28rem' } }))

/**
 * Manages reset-password form state and API submission.
 * @returns {JSX.Element}
 */
const ResetPasswordPage = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const theme = useTheme()
  const router = useRouter()
  const { token } = router.query

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleSubmit = async event => {
    event.preventDefault()
    if (!token) { toast.error('Token is missing', toastError(theme, 'top-right')); return }
    if (password !== confirmPassword) { toast.error('Passwords do not match', toastError(theme, 'top-right')); return }
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/reset-password`, { token, newPassword: password, confirmPassword })
      toast.success(data.message, toastSuccess(theme, 'top-right'))
      setTimeout(() => router.push('/login'), 2000)
    } catch { toast.error('An error occurred', toastError(theme, 'top-right')) }
  }

  return (
    <Box className='content-center'>
      <Toaster />
      <Card sx={{ zIndex: 1, border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.default, borderRadius: 0 }}>
        <ResetPasswordForm password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          showPassword={showPassword} showConfirmPassword={showConfirmPassword}
          onTogglePassword={() => setShowPassword(!showPassword)} onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          onSubmit={handleSubmit} />
      </Card>
    </Box>
  )
}

ResetPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default ResetPasswordPage
