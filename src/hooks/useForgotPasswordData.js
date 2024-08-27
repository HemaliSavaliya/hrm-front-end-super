/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useForgotPasswordData = () => {
  // ** States
  const [values, setValues] = useState({
    employeeId: '',
    newPassword: '',
    showNewPassword: false,
    confirmPassword: '',
    showConfirmPassword: false
  })
  const [userPassword, setUserPassword] = useState([])
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

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

  const handleEmployeeName = prop => event => {
    // Find the user by name and update employeeId
    const selectedUser = userPassword.find(user => user.name === event.target.value)
    if (selectedUser) {
      setValues({ ...values, [prop]: event.target.value, employeeId: selectedUser.id })
    }
  }

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/empList`, {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        })

        let filteredUsers = response.data.filter(emp => emp.deleted === 0)

        setUserPassword(filteredUsers)
      } catch (error) {
        console.error('Error fetching user list', error)
      }
    }
    fetchUserList()
  }, [authToken?.token])

  const handleChangePassword = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/forgot-password`,
        {
          id: values.employeeId, // Send the selected user's ID
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Optionally, you can reset the form after successful password update
      setValues({
        employeeId: '',
        newPassword: '',
        showNewPassword: false,
        confirmPassword: '',
        showConfirmPassword: false
      })

      // Show success message or handle UI updates
      toast.success('Employee/HR Password Update Successful!', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error('Error Updating Employee/HR Password. Please try again.', {
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
    handleNewPasswordChange,
    handleClickShowNewPassword,
    handleMouseDownNewPassword,
    handleConfirmNewPasswordChange,
    handleClickShowConfirmNewPassword,
    handleMouseDownConfirmNewPassword,
    handleEmployeeName,
    handleChangePassword,
    values,
    setValues,
    userPassword
  }
}

export default useForgotPasswordData
