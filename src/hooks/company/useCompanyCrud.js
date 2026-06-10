/** @module useCompanyCrud — Hook providing add, edit, delete and subscription update for companies. */
import axios from 'axios'
import toast from 'react-hot-toast'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

/**
 * Provides CRUD operations for company records.
 * @param {object} authToken - Parsed login-details from localStorage.
 * @param {object} theme - MUI theme for toast styling.
 * @param {Function} fetchActiveData - Refreshes the active company list.
 * @param {Function} fetchInactiveData - Refreshes the inactive company list.
 * @param {Function} setCompanyData - State setter for the active list.
 * @param {Function} setOpen - Opens/closes the company modal.
 * @param {Function} setEditCompanyId - Sets the company being edited.
 * @returns {{ addCompany, editCompany, deleteCompany, updateSubscription }}
 */
const useCompanyCrud = (authToken, theme, fetchActiveData, fetchInactiveData, setCompanyData, setOpen, setEditCompanyId) => {
  const addCompany = async newCompany => {
    try {
      // newCompany is a FormData instance — do NOT set Content-Type manually;
      // axios will set it with the correct multipart boundary automatically.
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/add-company`, newCompany, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      if (data) {
        toast.success('Company Added Successful!', toastSuccess(theme))
        setTimeout(async () => { setCompanyData(prev => [...prev, data]); setOpen(false); await fetchActiveData() }, 1000)
      }
    } catch { toast.error('Error Adding Company. Please try again.', toastError(theme)) }
  }

  const editCompany = async (updatedData, companyId) => {
    try {
      // updatedData is a FormData instance — let axios set Content-Type with boundary
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-company/${companyId}`, updatedData, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      toast.success('Company Updated Successful!', toastSuccess(theme))
      setTimeout(async () => {
        setCompanyData(prev => prev.map(company => (company.id === data.id ? data : company)))
        await fetchActiveData(); await fetchInactiveData()
        setEditCompanyId(null)
      }, 1000)
    } catch { toast.error('Error Updating Company. Please try again.', toastError(theme)) }
  }

  const deleteCompany = async id => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-company/${id}`, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      const statusMessage = data.message === 'Company marked as deleted' ? 'Company Disabled Successful!' : 'Company Enabled Successful!'
      toast.success(statusMessage, toastSuccess(theme))
      setTimeout(async () => { await fetchActiveData(); await fetchInactiveData() }, 1000)
    } catch { toast.error('Error Enabled/Disabled Company. Please try again.', toastError(theme)) }
  }

  const updateSubscription = async subscriptionData => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/renew-subscription/${subscriptionData.id}`, subscriptionData, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      toast.success('Subscription updated successfully!', toastSuccess(theme))
      setTimeout(async () => { await fetchActiveData(); await fetchInactiveData() }, 1000)
    } catch { toast.error('Error updating subscription.', toastError(theme)) }
  }

  return { addCompany, editCompany, deleteCompany, updateSubscription }
}

export default useCompanyCrud
