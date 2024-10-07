/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const CompanyFormLogic = (companyData, editCompanyId, isViewMode) => {
  const initialFormValue = {
    companyName: '',
    companyEmail: '',
    companyPan: '',
    companyGST: '',
    subscription: '',
    startDate: '',
    endDate: '',
    companyLogo: []
  }

  const [formData, setFormData] = useState(initialFormValue)
  const [errors, setErrors] = useState(initialFormValue)
  const [selectedPlan, setSelectedPlan] = useState('')

  const getFormattedDate = date => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const handlePlanChange = event => {
    const plan = event.target.value
    setSelectedPlan(plan)

    if (plan === 'Custom') {
      // Reset startDate and endDate when switching to Custom plan
      setFormData({
        ...formData,
        startDate: '',
        endDate: ''
      })
    } else {
      // Update startDate and endDate based on the selected plan
      const today = new Date()
      const startDate = getFormattedDate(today)
      let endDate = ''

      if (plan === 'Monthly') {
        const nextMonth = new Date(today)
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        endDate = getFormattedDate(nextMonth)
      } else if (plan === 'Yearly') {
        const nextYear = new Date(today)
        nextYear.setFullYear(nextYear.getFullYear() + 1)
        endDate = getFormattedDate(nextYear)
      }

      setFormData({
        ...formData,
        subscription: plan,
        startDate: startDate,
        endDate: endDate
      })
    }
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'companyName':
        if (value.trim() === '') {
          return 'Company Name is required'
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return 'Company Name should contain only characters'
        }
        break
      case 'companyEmail':
        if (value.trim() === '') {
          return 'Email address is required'
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
          return 'Invalid email address'
        }
        break
      case 'companyLogo':
        if (!isViewMode && !editCompanyId) {
          // Check if value is defined before checking its length
          if (!value || value.length === 0) {
            return 'Company Logo is required'
          }
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
    setFormData({
      ...formData,
      [name]: value
    })

    const error = validateField(name, value)

    setErrors({
      ...errors,
      [name]: error
    })
  }

  const handleImageChange = files => {
    setFormData({
      ...formData,
      companyLogo: files // Store the selected image
    })
  }

  useEffect(() => {
    const selectedCompany = companyData.find(company => company.id === editCompanyId)

    if (selectedCompany) {
      setFormData(selectedCompany)
      setSelectedPlan(selectedCompany.subscription || '')
    } else {
      setFormData({
        ...initialFormValue
      })
    }
  }, [editCompanyId, companyData])

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    selectedPlan,
    handlePlanChange,
    handleImageChange
  }
}

export default CompanyFormLogic
