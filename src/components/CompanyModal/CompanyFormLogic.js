/** @module CompanyFormLogic — Form state, validation and date helpers for the company form. */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

/** Formats a Date object as YYYY-MM-DD for use in date inputs. */
const getFormattedDate = date => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Validates a single form field and returns an error message or empty string.
 * Email regex covers RFC-5321 local-part characters before the @ symbol.
 */
const validateField = (name, value, editCompanyId, isViewMode) => {
  if (name === 'companyName') {
    if (!value.trim()) return 'Company Name is required'
    if (!/^[A-Za-z\s]+$/.test(value)) return 'Company Name should contain only characters'
  }
  if (name === 'companyEmail') {
    if (!value.trim()) return 'Email address is required'
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) return 'Invalid email address'
  }
  if (name === 'companyLogo' && !isViewMode && !editCompanyId && (!value || !value.length)) return 'Company Logo is required'
  return ''
}

/**
 * Manages form data, errors, subscription plan selection and pre-fill from existing record.
 * @param {Array} companyData - List of companies for pre-fill lookup.
 * @param {string|null} editCompanyId - Id of company being edited, or null for add mode.
 * @param {boolean} isViewMode - True when only viewing the subscription.
 * @returns {object} Form state and handlers.
 */
const CompanyFormLogic = (companyData, editCompanyId, isViewMode) => {
  // ── State ──────────────────────────────────────────────────────────────
  const initialFormValue = { companyName: '', companyEmail: '', companyPan: '', companyGST: '', subscription: '', startDate: '', endDate: '', companyLogo: [] }
  const [formData, setFormData] = useState(initialFormValue)
  const [errors, setErrors] = useState(initialFormValue)
  const [selectedPlan, setSelectedPlan] = useState('')

  // ── Handlers ───────────────────────────────────────────────────────────
  const handlePlanChange = event => {
    const plan = event.target.value
    setSelectedPlan(plan)
    if (plan === 'Custom') { setFormData({ ...formData, startDate: '', endDate: '' }); return }
    const today = new Date()
    const startDate = getFormattedDate(today)
    const next = new Date(today)
    // Monthly adds 1 month; Yearly adds 1 full year to today
    plan === 'Monthly' ? next.setMonth(next.getMonth() + 1) : next.setFullYear(next.getFullYear() + 1)
    setFormData({ ...formData, subscription: plan, startDate, endDate: getFormattedDate(next) })
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(initialFormValue).forEach(name => { newErrors[name] = validateField(name, formData[name], editCompanyId, isViewMode) })
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value, editCompanyId, isViewMode) })
  }

  const handleImageChange = files => setFormData({ ...formData, companyLogo: files })

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    const selected = companyData.find(company => company.id === editCompanyId)
    if (selected) { setFormData(selected); setSelectedPlan(selected.subscription || '') }
    else setFormData({ ...initialFormValue })
  }, [editCompanyId, companyData])

  // ── Return ─────────────────────────────────────────────────────────────
  return { handleInputChange, formData, errors, validateForm, setFormData, initialFormValue, selectedPlan, handlePlanChange, handleImageChange }
}

export default CompanyFormLogic
