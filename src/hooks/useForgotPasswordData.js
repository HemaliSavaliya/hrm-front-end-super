/** @module useForgotPasswordData — Hook for the admin forgot-password form and user list. */
/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

/**
 * Manages form state for resetting a user's password and fetches the employee list.
 * @returns {{ values, setValues, userPassword, handleNewPasswordChange,
 *   handleClickShowNewPassword, handleMouseDownNewPassword, handleConfirmNewPasswordChange,
 *   handleClickShowConfirmNewPassword, handleMouseDownConfirmNewPassword,
 *   handleEmployeeName, handleChangePassword }}
 */
const useForgotPasswordData = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()
  const [values, setValues] = useState({
    employeeId: '', newPassword: '', showNewPassword: false,
    confirmPassword: '', showConfirmPassword: false
  })
  const [userPassword, setUserPassword] = useState([])

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleNewPasswordChange = prop => event => setValues({ ...values, [prop]: event.target.value })
  const handleClickShowNewPassword = () => setValues({ ...values, showNewPassword: !values.showNewPassword })
  const handleMouseDownNewPassword = event => event.preventDefault()

  const handleConfirmNewPasswordChange = prop => event => setValues({ ...values, [prop]: event.target.value })
  const handleClickShowConfirmNewPassword = () => setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  const handleMouseDownConfirmNewPassword = event => event.preventDefault()

  /** Resolves the selected user's id from the name and stores it in form state. */
  const handleEmployeeName = prop => event => {
    const user = userPassword.find(u => u.name === event.target.value)
    if (user) setValues({ ...values, [prop]: event.target.value, employeeId: user.id })
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/empList`, {
          headers: { Authorization: `Bearer ${authToken?.token}` }
        })
        setUserPassword(data.filter(emp => emp.deleted === 0))
      } catch (error) { console.error('Error fetching user list', error) }
    }
    fetchUserList()
  }, [authToken?.token])

  const handleChangePassword = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/forgot-password`,
        { id: values.employeeId, newPassword: values.newPassword, confirmPassword: values.confirmPassword },
        { headers: { Authorization: `Bearer ${authToken?.token}` } }
      )
      setValues({ employeeId: '', newPassword: '', showNewPassword: false, confirmPassword: '', showConfirmPassword: false })
      toast.success('Employee/HR Password Update Successful!', toastSuccess(theme))
    } catch { toast.error('Error Updating Employee/HR Password. Please try again.', toastError(theme)) }
  }

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    handleNewPasswordChange, handleClickShowNewPassword, handleMouseDownNewPassword,
    handleConfirmNewPasswordChange, handleClickShowConfirmNewPassword, handleMouseDownConfirmNewPassword,
    handleEmployeeName, handleChangePassword, values, setValues, userPassword
  }
}

export default useForgotPasswordData
