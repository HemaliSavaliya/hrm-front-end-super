/** @module useAnnouncementsData — Fetches and manages platform-wide super admin announcements. */
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_URL

const EMPTY_FORM = { title: '', message: '', targetType: 'all', status: 'draft' }

const useAnnouncementsData = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const headers   = { Authorization: `Bearer ${authToken?.token}` }

  // ── List state ─────────────────────────────────────────────────────────────
  const [announcements, setAnnouncements] = useState([])
  const [totalItems, setTotalItems]       = useState(0)
  const [loading, setLoading]             = useState(true)

  // ── Pagination + filters ───────────────────────────────────────────────────
  const [page, setPage]           = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // ── Modal state ────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen]   = useState(false)
  const [form, setForm]             = useState(EMPTY_FORM)
  const [editId, setEditId]         = useState(null)
  const [saving, setSaving]         = useState(false)

  // ── Delete confirm ─────────────────────────────────────────────────────────
  const [deleteId, setDeleteId]     = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting]     = useState(false)

  // ── Fetch list ─────────────────────────────────────────────────────────────
  const fetchAnnouncements = useCallback(async () => {
    if (!authToken?.token) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/super-announcements`, {
        headers,
        params: { page: page + 1, limit: rowsPerPage, search, status: statusFilter }
      })
      setAnnouncements(data.data || [])
      setTotalItems(data.totalItems || 0)
    } catch (err) {
      console.error('Error fetching announcements:', err)
    } finally {
      setLoading(false)
    }
  }, [authToken?.token, page, rowsPerPage, search, statusFilter])

  useEffect(() => { fetchAnnouncements() }, [fetchAnnouncements])

  // ── Open add modal ─────────────────────────────────────────────────────────
  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setModalOpen(true) }

  // ── Open edit modal ────────────────────────────────────────────────────────
  const openEdit = ann => {
    setForm({ title: ann.title, message: ann.message, targetType: ann.targetType, status: ann.status })
    setEditId(ann.id)
    setModalOpen(true)
  }

  // ── Save (add or update) ───────────────────────────────────────────────────
  const saveAnnouncement = async () => {
    if (!form.title.trim() || !form.message.trim())
      return toast.error('Title and message are required')
    setSaving(true)
    try {
      if (editId) {
        await axios.put(`${API}/update-super-announcement/${editId}`, form, { headers })
        toast.success('Announcement updated')
      } else {
        await axios.post(`${API}/add-super-announcement`, form, { headers })
        toast.success('Announcement created')
      }
      setModalOpen(false)
      fetchAnnouncements()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to save announcement')
    } finally {
      setSaving(false)
    }
  }

  // ── Confirm delete ─────────────────────────────────────────────────────────
  const confirmDelete = id => { setDeleteId(id); setDeleteOpen(true) }

  const deleteAnnouncement = async () => {
    setDeleting(true)
    try {
      await axios.delete(`${API}/delete-super-announcement/${deleteId}`, { headers })
      toast.success('Announcement deleted')
      setDeleteOpen(false)
      fetchAnnouncements()
    } catch (err) {
      toast.error('Failed to delete announcement')
    } finally {
      setDeleting(false)
    }
  }

  return {
    announcements, totalItems, loading,
    page, setPage, rowsPerPage, setRowsPerPage,
    search, setSearch, statusFilter, setStatusFilter,
    modalOpen, setModalOpen, form, setForm, editId, saving,
    openAdd, openEdit, saveAnnouncement,
    deleteOpen, setDeleteOpen, deleting, confirmDelete, deleteAnnouncement
  }
}

export default useAnnouncementsData
