/** @module useTabSecurityData — Hook that manages the change-password form for account security. */
import axios from 'axios'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

/**
 * Provides form state and submit handler for the security / change-password tab.
 * @returns {{ values, setValues, handleCurrentPasswordChange, handleClickShowCurrentPassword,
 *   handleMouseDownCurrentPassword, handleNewPasswordChange, handleClickShowNewPassword,
 *   handleMouseDownNewPassword, handleConfirmNewPasswordChange, handleClickShowConfirmNewPassword,
 *   handleMouseDownConfirmNewPassword, handlePasswordChange }}
 */
const useTabSecurityData = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()
  const [values, setValues] = useState({
    email: authToken?.email,
    newPassword: '', showNewPassword: false,
    password: '', showPassword: false,
    confirmPassword: '', showConfirmPassword: false
  })

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleCurrentPasswordChange = prop => event => setValues({ ...values, [prop]: event.target.value })
  const handleClickShowCurrentPassword = () => setValues({ ...values, showPassword: !values.showPassword })
  const handleMouseDownCurrentPassword = event => event.preventDefault()

  const handleNewPasswordChange = prop => event => setValues({ ...values, [prop]: event.target.value })
  const handleClickShowNewPassword = () => setValues({ ...values, showNewPassword: !values.showNewPassword })
  const handleMouseDownNewPassword = event => event.preventDefault()

  const handleConfirmNewPasswordChange = prop => event => setValues({ ...values, [prop]: event.target.value })
  const handleClickShowConfirmNewPassword = () => setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  const handleMouseDownConfirmNewPassword = event => event.preventDefault()

  const handlePasswordChange = async event => {
    event.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/update-password`, values, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      toast.success('Password Updated Successful!', toastSuccess(theme))
      setValues({ password: '', newPassword: '', confirmPassword: '' })
    } catch { toast.error('Error Updating Password. Please try again.', toastError(theme)) }
  }

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    handleCurrentPasswordChange, handleClickShowCurrentPassword, handleMouseDownCurrentPassword,
    handleNewPasswordChange, handleClickShowNewPassword, handleMouseDownNewPassword,
    handleConfirmNewPasswordChange, handleClickShowConfirmNewPassword, handleMouseDownConfirmNewPassword,
    handlePasswordChange, values, setValues
  }
}

export default useTabSecurityData
