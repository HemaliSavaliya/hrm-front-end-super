/** @module usePlansData — Hook that fetches, adds, updates and deletes subscription plans. */
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_URL

/**
 * Manages all state and CRUD operations for subscription plans.
 * @returns {{ plans, loading, open, editPlan, handleAdd, handleEdit, handleClose, savePlan, deletePlan }}
 */
const usePlansData = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [plans, setPlans]     = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen]       = useState(false)
  const [editPlan, setEditPlan] = useState(null) // null = add mode, object = edit mode

  // ── Fetch ──────────────────────────────────────────────────────────────
  const fetchPlans = async () => {
    if (!authToken?.token) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/plans-list`, {
        headers: { Authorization: `Bearer ${authToken.token}` }
      })
      setPlans(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  // ── Modal helpers ──────────────────────────────────────────────────────
  const handleAdd  = ()    => { setEditPlan(null); setOpen(true) }
  const handleEdit = plan  => { setEditPlan(plan); setOpen(true) }
  const handleClose = ()   => { setOpen(false); setEditPlan(null) }

  // ── Save (add or update) ───────────────────────────────────────────────
  const savePlan = async formData => {
    try {
      const headers = { Authorization: `Bearer ${authToken.token}` }
      if (editPlan) {
        await axios.put(`${API}/update-plan/${editPlan.id}`, formData, { headers })
        toast.success('Plan updated successfully!')
      } else {
        await axios.post(`${API}/add-plan`, formData, { headers })
        toast.success('Plan added successfully!')
      }
      handleClose()
      fetchPlans()
    } catch (error) {
      console.error('Error saving plan:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────
  const deletePlan = async id => {
    try {
      await axios.delete(`${API}/delete-plan/${id}`, {
        headers: { Authorization: `Bearer ${authToken.token}` }
      })
      toast.success('Plan deleted successfully!')
      fetchPlans()
    } catch (error) {
      console.error('Error deleting plan:', error)
      toast.error('Failed to delete plan.')
    }
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => { fetchPlans() }, [authToken?.token])

  // ── Return ─────────────────────────────────────────────────────────────
  return { plans, loading, open, editPlan, handleAdd, handleEdit, handleClose, savePlan, deletePlan }
}

export default usePlansData
