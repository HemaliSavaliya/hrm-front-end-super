/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useAuth = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const router = useRouter()
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRadioChange = event => {
    setValues({ ...values, role: event.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { email, password } = values

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/login`, {
        email,
        password
      })

      if (response.status === 200) {
        // Assuming your API returns a token upon successful login
        const { token, role, name, id } = response.data.data

        if (role === 'SuperAdmin') {
          toast.success('Login successful!', {
            duration: 2000,
            position: 'top-right',
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '15px'
            }
          })

          // Store the token in localStorage or secure storage for future API requests
          localStorage.setItem('login-details', JSON.stringify({ token, role, email, name, id }))

          setTimeout(() => {
            const returnUrl = router.query.returnUrl || '/'
            router.push(returnUrl)
          }, 1000) // 1000 milliseconds = 1 seconds
        } else {
          // Display an error toast if the role is not allowed
          toast.error('Login failed. Your role is not allowed to access this system.', {
            duration: 2000,
            position: 'top-right',
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '15px'
            }
          })

          // Redirect to 401 error page
          setTimeout(() => {
            router.push('/401')
          }, 2000)
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      // Redirect to 500 error page
      setTimeout(() => {
        router.push('/500')
      }, 2000)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return {
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleRadioChange,
    handleSubmit,
    handleKeyDown
  }
}

export default useAuth
