/** @module useCompanyData — Orchestrator hook that composes company modal, fetch and CRUD hooks. */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import axios from 'axios'
import useCompanyModal from './company/useCompanyModal'
import useCompanyFetch from './company/useCompanyFetch'
import useCompanyCrud from './company/useCompanyCrud'

/**
 * Combines company modal state, paginated data fetching, CRUD operations, and logo loading.
 * @returns {object} Merged state and handlers from all sub-hooks plus logoUrls.
 */
const useCompanyData = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const theme = useTheme()
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('companyName')
  const [sortOrder, setSortOrder] = useState('asc')
  const [pageIn, setPageIn] = useState(0)
  const [rowsPerPageIn, setRowsPerPageIn] = useState(5)
  const [searchIn, setSearchIn] = useState('')
  const [sortByIn, setSortByIn] = useState('companyName')
  const [sortOrderIn, setSortOrderIn] = useState('asc')
  const [logoUrls, setLogoUrls] = useState({})

  const modal = useCompanyModal()
  const fetch = useCompanyFetch(authToken, page, rowsPerPage, search, sortBy, sortOrder,
    pageIn, rowsPerPageIn, searchIn, sortByIn, sortOrderIn)
  const crud = useCompanyCrud(authToken, theme, fetch.fetchActiveData, fetch.fetchInactiveData,
    fetch.setCompanyData, modal.setOpen, modal.setEditCompanyId)

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const allCompanies = [...fetch.companyData, ...fetch.companyDataIn]
        const urls = {}
        await Promise.all(allCompanies.map(async company => {
          // arraybuffer response converts binary image data to a Blob URL
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-logo/${company.id}`, { responseType: 'arraybuffer' })
          urls[company.id] = URL.createObjectURL(new Blob([new Uint8Array(response.data)], { type: 'image/png' }))
        }))
        setLogoUrls(urls)
      } catch (error) { console.error('Error fetching company logos:', error) }
    }
    fetchLogos()
  }, [fetch.companyData, fetch.companyDataIn])

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    ...modal, ...fetch, ...crud, logoUrls,
    page, rowsPerPage, search, setPage, setRowsPerPage, setSearch, setSortBy, setSortOrder,
    pageIn, rowsPerPageIn, searchIn, setPageIn, setRowsPerPageIn, setSearchIn, setSortByIn, setSortOrderIn
  }
}

export default useCompanyData
