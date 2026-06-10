/** @module useAdminData — Orchestrator hook that composes admin modal, fetch and CRUD hooks. */
import { useState } from 'react'
import { useTheme } from '@mui/material'
import useAdminModal from './admin/useAdminModal'
import useAdminFetch from './admin/useAdminFetch'
import useAdminCrud from './admin/useAdminCrud'

/**
 * Combines admin modal state, paginated data fetching and CRUD operations.
 * @returns {object} Merged state and handlers from all sub-hooks.
 */
const useAdminData = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const theme = useTheme()
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [pageIn, setPageIn] = useState(0)
  const [rowsPerPageIn, setRowsPerPageIn] = useState(5)
  const [searchIn, setSearchIn] = useState('')
  const [sortByIn, setSortByIn] = useState('name')
  const [sortOrderIn, setSortOrderIn] = useState('asc')

  const modal = useAdminModal()
  const fetch = useAdminFetch(authToken, page, rowsPerPage, search, sortBy, sortOrder,
    pageIn, rowsPerPageIn, searchIn, sortByIn, sortOrderIn)
  const crud = useAdminCrud(authToken, theme, fetch.fetchActiveData, fetch.fetchInactiveData,
    fetch.setAdminData, modal.setOpen, modal.setEditAdminId)

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    ...modal, ...fetch, ...crud,
    page, rowsPerPage, search, setPage, setRowsPerPage, setSearch, setSortBy, setSortOrder,
    pageIn, rowsPerPageIn, searchIn, setPageIn, setRowsPerPageIn, setSearchIn, setSortByIn, setSortOrderIn
  }
}

export default useAdminData
