/** @module useRolesData — Fetches and manages custom roles with per-module permissions. */
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_URL

const MODULES = ['Company', 'Admin', 'Plans', 'Reports', 'Audit Logs', 'Announcements', 'Impersonation', 'Settings']

const emptyPermissions = () =>
  Object.fromEntries(MODULES.map(m => [m, { canCreate: false, canRead: true, canUpdate: false, canDelete: false }]))

const EMPTY_FORM = { name: '', description: '', permissions: emptyPermissions() }

const useRolesData = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const headers   = { Authorization: `Bearer ${authToken?.token}` }

  const [roles, setRoles]     = useState([])
  const [loading, setLoading] = useState(true)

  // ── Modal ──────────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [editId, setEditId]       = useState(null)
  const [saving, setSaving]       = useState(false)

  // ── Delete ─────────────────────────────────────────────────────────────────
  const [deleteId, setDeleteId]     = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting]     = useState(false)

  const fetchRoles = useCallback(async () => {
    if (!authToken?.token) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/roles-list`, { headers })
      setRoles(data || [])
    } catch (err) {
      console.error('Error fetching roles:', err)
    } finally {
      setLoading(false)
    }
  }, [authToken?.token])

  useEffect(() => { fetchRoles() }, [fetchRoles])

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setEditId(null)
    setModalOpen(true)
  }

  const openEdit = role => {
    const perms = emptyPermissions()
    Object.entries(role.permissions || {}).forEach(([mod, p]) => {
      perms[mod] = { canCreate: !!p.canCreate, canRead: !!p.canRead, canUpdate: !!p.canUpdate, canDelete: !!p.canDelete }
    })
    setForm({ name: role.name, description: role.description || '', permissions: perms })
    setEditId(role.id)
    setModalOpen(true)
  }

  const saveRole = async () => {
    if (!form.name.trim()) return toast.error('Role name is required')
    setSaving(true)
    try {
      if (editId) {
        await axios.put(`${API}/update-role/${editId}`, form, { headers })
        toast.success('Role updated')
      } else {
        await axios.post(`${API}/add-role`, form, { headers })
        toast.success('Role created')
      }
      setModalOpen(false)
      fetchRoles()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to save role')
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = id => { setDeleteId(id); setDeleteOpen(true) }

  const deleteRole = async () => {
    setDeleting(true)
    try {
      await axios.delete(`${API}/delete-role/${deleteId}`, { headers })
      toast.success('Role deleted')
      setDeleteOpen(false)
      fetchRoles()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Cannot delete this role')
    } finally {
      setDeleting(false)
    }
  }

  return {
    roles, loading, MODULES,
    modalOpen, setModalOpen, form, setForm, editId, saving,
    openAdd, openEdit, saveRole,
    deleteOpen, setDeleteOpen, deleting, confirmDelete, deleteRole
  }
}

export default useRolesData
