/** @module useCompanyModal — Hook that controls dialog open/close state for the company modal. */
import { useState } from 'react'

/**
 * Manages open state, scroll type, edit target and view-mode for the company dialog.
 * @returns {{ editCompanyId, setEditCompanyId, open, setOpen, scroll, isViewMode,
 *   handleClose, handleClickOpen, handleEdit, handleViewSubscription }}
 */
const useCompanyModal = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const [editCompanyId, setEditCompanyId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [isViewMode, setIsViewMode] = useState(false)

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleClose = () => {
    setOpen(false)
    setEditCompanyId(null)
    setIsViewMode(false)
  }

  /** Returns a click handler that opens the dialog with the given scroll type. */
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleEdit = id => {
    setEditCompanyId(id)
    setOpen(true)
  }

  const handleViewSubscription = companyId => {
    setEditCompanyId(companyId)
    setIsViewMode(true)
    setOpen(true)
  }

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    editCompanyId, setEditCompanyId,
    open, setOpen,
    scroll,
    isViewMode,
    handleClose, handleClickOpen, handleEdit, handleViewSubscription
  }
}

export default useCompanyModal
