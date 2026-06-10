/** @module useAdminCrud — Hook providing add, edit and delete operations for admins. */
import axios from 'axios'
import toast from 'react-hot-toast'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

/**
 * Provides CRUD operations for admin records.
 * @param {object} authToken - Parsed login-details from localStorage.
 * @param {object} theme - MUI theme for toast styling.
 * @param {Function} fetchActiveData - Refreshes the active admin list.
 * @param {Function} fetchInactiveData - Refreshes the inactive admin list.
 * @param {Function} setAdminData - State setter for the active list.
 * @param {Function} setOpen - Opens/closes the admin modal.
 * @param {Function} setEditAdminId - Sets the admin being edited.
 * @returns {{ addAdmin, editAdmin, deleteAdmin }}
 */
const useAdminCrud = (authToken, theme, fetchActiveData, fetchInactiveData, setAdminData, setOpen, setEditAdminId) => {
  const addAdmin = async newAdmin => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/add-admin`, { ...newAdmin }, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      if (data) {
        toast.success('Admin Added Successful!', toastSuccess(theme))
        setTimeout(async () => { setAdminData(prev => [...prev, data]); setOpen(false); await fetchActiveData() }, 1000)
      }
    } catch { toast.error('Error Adding Admin. Please try again.', toastError(theme)) }
  }

  const editAdmin = async (updatedData, adminId) => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-admin/${adminId}`, updatedData, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      toast.success('Admin Updated Successful!', toastSuccess(theme))
      setTimeout(async () => {
        setAdminData(prev => prev.map(admin => (admin.id === data.id ? data : admin)))
        await fetchActiveData(); await fetchInactiveData()
        setEditAdminId(null)
      }, 1000)
    } catch { toast.error('Error Updating Admin. Please try again.', toastError(theme)) }
  }

  const deleteAdmin = async id => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-admin/${id}`, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      const statusMessage = data.message === 'Admin marked as deleted' ? 'Admin Disabled Successful!' : 'Admin Enabled Successful!'
      toast.success(statusMessage, toastSuccess(theme))
      setTimeout(async () => { await fetchActiveData(); await fetchInactiveData() }, 1000)
    } catch { toast.error('Error Enabled Admin. Please try again.', toastError(theme)) }
  }

  return { addAdmin, editAdmin, deleteAdmin }
}

export default useAdminCrud
