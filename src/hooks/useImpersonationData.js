/** @module useImpersonationData — Lists company admins and generates short-lived impersonation tokens. */
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_URL

const useImpersonationData = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const headers   = { Authorization: `Bearer ${authToken?.token}` }

  // ── List state ─────────────────────────────────────────────────────────────
  const [admins, setAdmins]       = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading]     = useState(true)
  const [page, setPage]           = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch]       = useState('')

  // ── Token dialog state ─────────────────────────────────────────────────────
  const [tokenData, setTokenData]   = useState(null)   // { token, adminName, adminEmail, companyName, expiresIn }
  const [tokenOpen, setTokenOpen]   = useState(false)
  const [generating, setGenerating] = useState(null)   // adminId currently being generated

  // ── Fetch admin list ───────────────────────────────────────────────────────
  const fetchAdmins = useCallback(async () => {
    if (!authToken?.token) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/impersonate-list`, {
        headers,
        params: { page: page + 1, limit: rowsPerPage, search }
      })
      setAdmins(data.data || [])
      setTotalItems(data.totalItems || 0)
    } catch (err) {
      console.error('Error fetching impersonation list:', err)
    } finally {
      setLoading(false)
    }
  }, [authToken?.token, page, rowsPerPage, search])

  useEffect(() => { fetchAdmins() }, [fetchAdmins])

  // ── Generate impersonation token ───────────────────────────────────────────
  const impersonate = async (adminId) => {
    setGenerating(adminId)
    try {
      const { data } = await axios.post(`${API}/impersonate/${adminId}`, {}, { headers })
      setTokenData(data)
      setTokenOpen(true)
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to generate token')
    } finally {
      setGenerating(null)
    }
  }

  return {
    admins, totalItems, loading,
    page, setPage, rowsPerPage, setRowsPerPage,
    search, setSearch,
    tokenData, tokenOpen, setTokenOpen,
    generating, impersonate
  }
}

export default useImpersonationData
