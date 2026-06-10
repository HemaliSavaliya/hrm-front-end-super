/** @module useCompanyFetch — Hook that fetches paginated active and inactive company lists. */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * Fetches and stores active and inactive company data with pagination and sorting.
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
const useCompanyFetch = (authToken, page, rowsPerPage, search, sortBy, sortOrder,
  pageIn, rowsPerPageIn, searchIn, sortByIn, sortOrderIn) => {
  // ── State ──────────────────────────────────────────────────────────────
  const [companyData, setCompanyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [companyDataIn, setCompanyDataIn] = useState([])
  const [loadingIn, setLoadingIn] = useState(true)
  const [totalItemsIn, setTotalItemsIn] = useState(0)
  const [totalPagesIn, setTotalPagesIn] = useState(0)

  // ── Helpers ────────────────────────────────────────────────────────────
  const fetchActiveData = async () => {
    setLoading(true)
    try {
      const { data: companyResponse } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-active-list`, {
        headers: { Authorization: `Bearer ${authToken?.token}` },
        params: { page: page + 1, limit: rowsPerPage, search, sortBy, sortOrder }
      })
      setCompanyData(companyResponse.data)
      setTotalItems(companyResponse.totalItems)
      setTotalPages(companyResponse.totalPages)
    } catch (error) { console.error('Error fetching active companies:', error) }
    finally { setLoading(false) }
  }

  const fetchInactiveData = async () => {
    setLoadingIn(true)
    try {
      const { data: companyResponse } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-inactive-list`, {
        headers: { Authorization: `Bearer ${authToken?.token}` },
        params: { page: pageIn + 1, limit: rowsPerPageIn, search: searchIn, sortBy: sortByIn, sortOrder: sortOrderIn }
      })
      setCompanyDataIn(companyResponse.data)
      setTotalItemsIn(companyResponse.totalItems)
      setTotalPagesIn(companyResponse.totalPages)
    } catch (error) { console.error('Error fetching inactive companies:', error) }
    finally { setLoadingIn(false) }
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    if (authToken?.token) { fetchActiveData(); fetchInactiveData() }
  }, [authToken?.token, page, rowsPerPage, search, sortBy, sortOrder, pageIn, rowsPerPageIn, searchIn, sortByIn, sortOrderIn])

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    companyData, setCompanyData, loading, totalItems, totalPages, fetchActiveData,
    companyDataIn, loadingIn, totalItemsIn, totalPagesIn, fetchInactiveData
  }
}

export default useCompanyFetch
