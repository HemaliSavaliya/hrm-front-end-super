/** @module useAdminModal — Hook that controls dialog open/close state for the admin modal. */
import { useState } from 'react'

/**
 * Manages open state, scroll type and edit target for the admin dialog.
 * @returns {{ editAdminId, setEditAdminId, open, setOpen, scroll,
 *   handleClose, handleClickOpen, handleEdit }}
 */
const useAdminModal = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const [editAdminId, setEditAdminId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleClose = () => {
    setOpen(false)
    setEditAdminId(null)
  }

  /** Returns a click handler that opens the dialog with the given scroll type. */
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleEdit = id => {
    setEditAdminId(id)
    setOpen(true)
  }

  // ── Return ─────────────────────────────────────────────────────────────
  return { editAdminId, setEditAdminId, open, setOpen, scroll, handleClose, handleClickOpen, handleEdit }
}

export default useAdminModal
