/** @module useAuditLogsData — Hook for fetching audit log entries and aggregate stats. */
import { useEffect, useState } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_URL

const useAuditLogsData = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const headers   = { Authorization: `Bearer ${authToken?.token}` }

  // ── Log list state ─────────────────────────────────────────────────────────
  const [logs, setLogs]               = useState([])
  const [totalItems, setTotal]        = useState(0)
  const [loading, setLoading]         = useState(true)
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch]           = useState('')
  const [module, setModule]           = useState('')
  const [action, setAction]           = useState('')

  // ── Aggregate stats ────────────────────────────────────────────────────────
  const [stats, setStats]             = useState({ total: 0, today: 0, creates: 0, deletes: 0, updates: 0 })
  const [statsLoading, setStatsLoading] = useState(true)

  // ── Fetch stats once on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (!authToken?.token) return
    setStatsLoading(true)
    axios.get(`${API}/audit-stats`, { headers })
      .then(({ data }) => setStats(data))
      .catch(err => console.error('Error fetching audit stats:', err))
      .finally(() => setStatsLoading(false))
  }, [authToken?.token])

  // ── Fetch paginated logs ───────────────────────────────────────────────────
  const fetchLogs = async () => {
    if (!authToken?.token) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/audit-logs`, {
        headers,
        params: { page: page + 1, limit: rowsPerPage, search, module, action }
      })
      setLogs(Array.isArray(data.data) ? data.data : [])
      setTotal(data.totalItems || 0)
    } catch (error) {
      console.error('Error fetching audit logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLogs() }, [authToken?.token, page, rowsPerPage, search, module, action])

  return {
    logs, totalItems, loading,
    page, rowsPerPage, search, module, action,
    setPage, setRowsPerPage, setSearch, setModule, setAction,
    stats, statsLoading
  }
}

export default useAuditLogsData
