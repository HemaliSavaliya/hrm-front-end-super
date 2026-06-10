/** @module useReportsData — Hook that aggregates data for the Reports page from existing APIs. */
import { useEffect, useState } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_URL

// ── Month labels for charts ────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Groups a list of records by the month of their `startDate` field,
 * returning a 12-element array of counts (index 0 = January).
 * @param {Array} records - Records with a `startDate` field.
 * @returns {number[]}
 */
const groupByMonth = records => {
  const counts = Array(12).fill(0)
  records.forEach(r => {
    if (r.startDate) {
      const month = new Date(r.startDate).getMonth() // 0–11
      if (month >= 0 && month <= 11) counts[month]++
    }
  })
  return counts
}

/**
 * Counts occurrences of each subscription plan in a list of companies.
 * @param {Array} companies
 * @returns {{ labels: string[], series: number[] }}
 */
const groupByPlan = companies => {
  const map = {}
  companies.forEach(c => {
    const plan = c.subscription || 'Unassigned'
    map[plan] = (map[plan] || 0) + 1
  })
  return { labels: Object.keys(map), series: Object.values(map) }
}

/**
 * Fetches all report data in parallel from existing company and admin APIs.
 * @returns {{ reportData, loading, refresh }}
 */
const useReportsData = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)

  // ── Fetch ──────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    if (!authToken?.token) return
    setLoading(true)
    try {
      const headers = { Authorization: `Bearer ${authToken.token}` }
      const params  = { page: 1, limit: 500, sortBy: 'companyName', sortOrder: 'asc' }

      const [activeCo, inactiveCo, activeAd, inactiveAd] = await Promise.allSettled([
        axios.get(`${API}/company-active-list`,   { headers, params }),
        axios.get(`${API}/company-inactive-list`, { headers, params }),
        axios.get(`${API}/admin-active-list`,     { headers, params }),
        axios.get(`${API}/admin-inactive-list`,   { headers, params })
      ])

      const activeCoData   = activeCo.status   === 'fulfilled' ? activeCo.value.data.data   || [] : []
      const inactiveCoData = inactiveCo.status === 'fulfilled' ? inactiveCo.value.data.data || [] : []
      const activeAdData   = activeAd.status   === 'fulfilled' ? activeAd.value.data.data   || [] : []
      const inactiveAdData = inactiveAd.status === 'fulfilled' ? inactiveAd.value.data.data || [] : []

      const allCompanies = [...activeCoData, ...inactiveCoData]
      const allAdmins    = [...activeAdData, ...inactiveAdData]

      // Monthly growth arrays
      const companyMonthly = groupByMonth(allCompanies)
      const adminMonthly   = groupByMonth(allAdmins)

      // Plan distribution
      const planDist = groupByPlan(activeCoData)

      setReportData({
        // Summary stats
        totalCompanies:    allCompanies.length,
        activeCompanies:   activeCoData.length,
        inactiveCompanies: inactiveCoData.length,
        totalAdmins:       allAdmins.length,
        activeAdmins:      activeAdData.length,

        // Charts
        months:          MONTHS,
        companyMonthly,
        adminMonthly,
        planDistLabels:  planDist.labels,
        planDistSeries:  planDist.series,

        // Table
        recentCompanies: allCompanies.slice(0, 10)
      })
    } catch (error) {
      console.error('Reports fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => { fetchAll() }, [authToken?.token])

  // ── CSV export ─────────────────────────────────────────────────────────
  const exportCsv = () => {
    const rows = reportData?.recentCompanies || []
    if (!rows.length) return

    const headers = ['#', 'Company Name', 'Email', 'Plan', 'PAN', 'GST', 'Start Date', 'End Date', 'Status']
    const csvRows = [
      headers.join(','),
      ...rows.map((co, i) => [
        i + 1,
        `"${(co.companyName || '').replace(/"/g, '""')}"`,
        `"${(co.companyEmail || '').replace(/"/g, '""')}"`,
        co.subscription || 'N/A',
        co.companyPan || '',
        co.companyGST || '',
        co.startDate ? new Date(co.startDate).toLocaleDateString('en-IN') : '',
        co.endDate   ? new Date(co.endDate).toLocaleDateString('en-IN')   : '',
        co.deleted   ? 'Inactive' : (co.endDate && new Date(co.endDate) < new Date() ? 'Expired' : 'Active')
      ].join(','))
    ]

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `companies-report-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Return ─────────────────────────────────────────────────────────────
  return { reportData, loading, refresh: fetchAll, exportCsv }
}

export default useReportsData
