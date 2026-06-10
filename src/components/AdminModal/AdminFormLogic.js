/** @module AdminFormLogic — Form state, validation and company list fetch for the admin form. */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * Validates a single field and returns an error message or empty string.
 * Password regex requires 8+ chars with letter, digit and special character.
 */
const validateField = (name, value, editAdminId) => {
  if (name === 'name') {
    if (!value.trim()) return 'Name is required'
    if (!/^[A-Za-z\s]+$/.test(value)) return 'Name should contain only characters'
  }
  if (name === 'password' && !editAdminId) {
    if (!value) return 'Password is required'
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value))
      return 'Password must be 8+ chars with uppercase, lowercase, number and special character'
  }
  if (name === 'email') {
    if (!value.trim()) return 'Email address is required'
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) return 'Invalid email address'
  }
  if (name === 'companyId' && !editAdminId && !value) return 'Company Name is required'
  return ''
}

/**
 * Manages admin form data, errors, company lookup and API pre-fill.
 * @param {Array} adminData - List of admins for pre-fill lookup.
 * @param {string|null} editAdminId - Id of admin being edited, or null for add mode.
 * @returns {object} Form state and handlers.
 */
const AdminModalLogic = (adminData, editAdminId) => {
  // ── State ──────────────────────────────────────────────────────────────
  const initialFormValue = { name: '', email: '', password: '', companyId: '', showPassword: false }
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [formData, setFormData] = useState(initialFormValue)
  const [errors, setErrors] = useState(initialFormValue)
  const [companyData, setCompanyData] = useState([])

  // ── Handlers ───────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {}
    Object.keys(initialFormValue).forEach(name => { newErrors[name] = validateField(name, formData[name], editAdminId) })
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    if (name === 'companyId') {
      const selected = companyData.find(company => company.companyName === value)
      setFormData({ ...formData, companyId: selected?.id || '' })
    } else { setFormData({ ...formData, [name]: value }) }
    setErrors({ ...errors, [name]: validateField(name, value, editAdminId) })
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    const selected = adminData.find(admin => admin.id === editAdminId)
    if (selected) {
      // Use loose equality (==) to safely compare numeric id with string companyId
      // that may come back as a string from the API response
      const company = companyData.find(company => company.id == selected.companyId)
      setFormData({ ...selected, companyId: company ? company.companyName : '' })
    } else {
      setFormData({ ...initialFormValue })
    }
  }, [editAdminId, adminData, companyData])

  const fetchCompany = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-list`, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      setCompanyData(data)
    } catch (error) { console.error('Error fetching company:', error) }
  }

  // ── Return ─────────────────────────────────────────────────────────────
  return { handleInputChange, formData, errors, validateForm, setFormData, initialFormValue, companyData, fetchCompany }
}

export default AdminModalLogic
