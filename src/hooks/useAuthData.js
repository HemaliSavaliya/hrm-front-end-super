/** @module useAuthData — Hook that manages login form state and submission. */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

/**
 * Manages auth form state, validation and login API call.
 * @returns {{ isSaving, values, handleChange, handleClickShowPassword,
 *   handleMouseDownPassword, handleRadioChange, handleSubmit, handleKeyDown }}
 */
const useAuth = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState({ email: '', password: '', showPassword: false })
  const router = useRouter()
  const theme = useTheme()

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleChange = prop => event => setValues({ ...values, [prop]: event.target.value })
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword })
  const handleMouseDownPassword = event => event.preventDefault()
  const handleRadioChange = event => setValues({ ...values, role: event.target.value })

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSaving(true)
    try {
      const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/login`, {
        email: values.email, password: values.password
      })
      if (status === 200) {
        const { token, role, name, id } = data.data
        if (role === 'SuperAdmin') {
          toast.success('Login successful!', toastSuccess(theme, 'top-right'))
          localStorage.setItem('login-details', JSON.stringify({ token, role, email: values.email, name, id }))
          setTimeout(() => router.push(router.query.returnUrl || '/'), 1000)
        } else {
          toast.error('Login failed. Your role is not allowed to access this system.', toastError(theme, 'top-right'))
          setTimeout(() => router.push('/401'), 2000)
        }
      }
    } catch {
      toast.error('Login failed. Please try again.', toastError(theme, 'top-right'))
    } finally { setIsSaving(false) }
  }

  /** Submits the form when Enter is pressed. */
  const handleKeyDown = event => { if (event.key === 'Enter') handleSubmit(event) }

  // ── Return ─────────────────────────────────────────────────────────────
  return { isSaving, values, handleChange, handleClickShowPassword, handleMouseDownPassword, handleRadioChange, handleSubmit, handleKeyDown }
}

export default useAuth
