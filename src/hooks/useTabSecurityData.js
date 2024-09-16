import axios from 'axios'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'

const useTabSecurityData = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  // ** States
  const [values, setValues] = useState({
    email: authToken?.email,
    newPassword: '',
    showNewPassword: false,
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false
  })
  const theme = useTheme()

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const handlePasswordChange = async e => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/update-password`, values, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Password Updated Successful!', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      setValues({ password: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error('Error Updating Password. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  return {
    handleCurrentPasswordChange,
    handleClickShowCurrentPassword,
    handleMouseDownCurrentPassword,
    handleNewPasswordChange,
    handleClickShowNewPassword,
    handleMouseDownNewPassword,
    handleConfirmNewPasswordChange,
    handleClickShowConfirmNewPassword,
    handleMouseDownConfirmNewPassword,
    handlePasswordChange,
    values,
    setValues
  }
}

export default useTabSecurityData
