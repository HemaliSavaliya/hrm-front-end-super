/** @module useAdminFetch — Hook that fetches paginated active and inactive admin lists. */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * Fetches and stores active and inactive admin data with pagination and sorting.
 * @param {object} authToken - Parsed login-details from localStorage.
 * @param {number} page - Active list current page (0-based).
 * @param {number} rowsPerPage - Active list page size.
 * @param {string} search - Active list search term.
 * @param {string} sortBy - Active list sort column.
 * @param {string} sortOrder - Active list sort direction.
 * @param {number} pageIn - Inactive list current page (0-based).
 * @param {number} rowsPerPageIn - Inactive list page size.
 * @param {string} searchIn - Inactive list search term.
 * @param {string} sortByIn - Inactive list sort column.
 * @param {string} sortOrderIn - Inactive list sort direction.
 * @returns {object} Active and inactive list state plus fetch functions.
 */
const useAdminFetch = (authToken, page, rowsPerPage, search, sortBy, sortOrder,
  pageIn, rowsPerPageIn, searchIn, sortByIn, sortOrderIn) => {
  // ── State ──────────────────────────────────────────────────────────────
  const [adminData, setAdminData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [adminDataIn, setAdminDataIn] = useState([])
  const [loadingIn, setLoadingIn] = useState(true)
  const [totalItemsIn, setTotalItemsIn] = useState(0)

  // ── Helpers ────────────────────────────────────────────────────────────
  const fetchActiveData = async () => {
    setLoading(true)
    try {
      const { data: adminResponse } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/admin-active-list`, {
        headers: { Authorization: `Bearer ${authToken?.token}` },
        params: { page: page + 1, limit: rowsPerPage, search, sortBy, sortOrder }
      })
      setAdminData(adminResponse.data); setTotalItems(adminResponse.totalItems)
    } catch (error) { console.error('Error fetching active admin:', error) }
    finally { setLoading(false) }
  }

  const fetchInactiveData = async () => {
    setLoadingIn(true)
    try {
      const { data: adminResponse } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/admin-inactive-list`, {
        headers: { Authorization: `Bearer ${authToken?.token}` },
        params: { page: pageIn + 1, limit: rowsPerPageIn, search: searchIn, sortBy: sortByIn, sortOrder: sortOrderIn }
      })
      setAdminDataIn(adminResponse.data); setTotalItemsIn(adminResponse.totalItems)
    } catch (error) { console.error('Error fetching inactive admin:', error) }
    finally { setLoadingIn(false) }
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    if (authToken?.token) { fetchActiveData(); fetchInactiveData() }
  }, [authToken?.token, page, rowsPerPage, search, sortBy, sortOrder, pageIn, rowsPerPageIn, searchIn, sortByIn, sortOrderIn])

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    adminData, setAdminData, loading, totalItems, fetchActiveData,
    adminDataIn, loadingIn, totalItemsIn, fetchInactiveData
  }
}

export default useAdminFetch
