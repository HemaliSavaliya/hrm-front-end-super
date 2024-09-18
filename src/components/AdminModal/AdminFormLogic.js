/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

const AdminModalLogic = (adminData, editAdminId) => {
  const initialFormValue = {
    name: '',
    email: '',
    password: '',
    companyId: '',
    showPassword: false
  }

  const [formData, setFormData] = useState(initialFormValue)
  const [errors, setErrors] = useState(initialFormValue)
  const [companyData, setCompanyData] = useState([])
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (value.trim() === '') {
          return 'Name is required'
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return 'Name should contain only characters'
        }
        break
      case 'password':
        if (!editAdminId) {
          if (value === '') {
            return 'Password is required'
          } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
            return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          }
        }
        break
      case 'email':
        if (value.trim() === '') {
          return 'Email address is required'
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
          return 'Invalid email address'
        }
        break
      case 'companyId':
        if (value === '') {
          return 'Company Name is required'
        }
        break
    }

    return '' // If no error
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(initialFormValue).forEach(name => {
      const value = formData[name]
      const error = validateField(name, value)
      newErrors[name] = error
    })

    setErrors(newErrors)

    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    if (name === 'companyId') {
      const selectedCompany = companyData.find(c => c.companyName === value)
      setFormData({ ...formData, companyId: selectedCompany?.id || '' })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }

    const error = validateField(name, value)

    setErrors({
      ...errors,
      [name]: error
    })
  }

  useEffect(() => {
    const selectedAdmin = adminData.find(admin => admin.id === editAdminId)

    if (selectedAdmin) {
      const selectedCompany = companyData.find(company => company.id === selectedAdmin.companyId)
      setFormData({
        ...selectedAdmin,
        companyId: selectedCompany ? selectedCompany.companyName : '' // Set companyName instead of id
      })
    } else {
      setFormData({
        ...initialFormValue
      })
    }
  }, [editAdminId, adminData, companyData])

  const fetchCompany = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      const filterData = response.data.filter(admin => !admin.deleted)

      setCompanyData(filterData)
    } catch (error) {
      console.error('Error fetching company:', error)
    }
  }

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    companyData,
    fetchCompany
  }
}

export default AdminModalLogic
