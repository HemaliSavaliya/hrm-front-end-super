/** @module useDashboardData — Hook that fetches all dashboard statistics in parallel. */
import { useEffect, useState } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_URL
const listParams = { page: 1, limit: 100, sortBy: 'companyName', sortOrder: 'asc' }

/** Extracts the value from a settled Promise result, returning fallback on rejection. */
const getVal = (response, fallback) => (response.status === 'fulfilled' ? response.value.data : fallback)

/** Parses allSettled results into stats, recentCompanies and notifications. */
const parseResults = ([activeCoResponse, inactiveCoResponse, activeAdResponse, inactiveAdResponse, notifResponse]) => {
  const activeCo = getVal(activeCoResponse, { data: [], totalItems: 0 })
  const inactiveCo = getVal(inactiveCoResponse, { data: [], totalItems: 0 })
  const activeAd = getVal(activeAdResponse, { data: [], totalItems: 0 })
  const inactiveAd = getVal(inactiveAdResponse, { data: [], totalItems: 0 })
  const notifData = getVal(notifResponse, [])
  const filteredNotifs = Array.isArray(notifData) ? notifData.filter(n => !n.deleted) : []
  return {
    stats: {
      totalCompanies: (activeCo.totalItems || 0) + (inactiveCo.totalItems || 0),
      activeCompanies: activeCo.totalItems || 0,
      inactiveCompanies: inactiveCo.totalItems || 0,
      totalAdmins: (activeAd.totalItems || 0) + (inactiveAd.totalItems || 0),
      activeAdmins: activeAd.totalItems || 0,
      inactiveAdmins: inactiveAd.totalItems || 0,
      expiringCount: filteredNotifs.length
    },
    recentCompanies: (Array.isArray(activeCo.data) ? activeCo.data : []).slice(0, 5),
    notifications: filteredNotifs.slice(0, 4)
  }
}

/**
 * Fetches dashboard data (companies, admins, notifications) in one parallel request.
 * @returns {{ stats, recentCompanies, notifications, loading, refresh }}
 */
const useDashboardData = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [stats, setStats] = useState({ totalCompanies: 0, activeCompanies: 0, inactiveCompanies: 0, totalAdmins: 0, activeAdmins: 0, inactiveAdmins: 0, expiringCount: 0 })
  const [recentCompanies, setRecentCompanies] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  // ── Helpers ────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    if (!authToken?.token) return
    setLoading(true)
    try {
      const requestConfig = { headers: { Authorization: `Bearer ${authToken.token}` } }
      const results = await Promise.allSettled([
        axios.get(`${API}/company-active-list`, { ...requestConfig, params: listParams }),
        axios.get(`${API}/company-inactive-list`, { ...requestConfig, params: listParams }),
        axios.get(`${API}/admin-active-list`, { ...requestConfig, params: listParams }),
        axios.get(`${API}/admin-inactive-list`, { ...requestConfig, params: listParams }),
        axios.get(`${API}/get-notification`, requestConfig)
      ])
      const parsed = parseResults(results)
      setStats(parsed.stats)
      setRecentCompanies(parsed.recentCompanies)
      setNotifications(parsed.notifications)
    } catch (error) { console.error('Dashboard fetch error:', error) }
    finally { setLoading(false) }
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => { fetchAll() }, [authToken?.token])

  // ── Return ─────────────────────────────────────────────────────────────
  return { stats, recentCompanies, notifications, loading, refresh: fetchAll }
}

export default useDashboardData
