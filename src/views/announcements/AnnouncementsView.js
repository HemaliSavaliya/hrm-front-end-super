/** @module AnnouncementsView — Platform-wide announcement management for super admin. */
import {
  Box, Button, Card, Chip, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
  Select, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Tooltip,
  Typography, useTheme
} from '@mui/material'
import { Add01Icon, Delete02Icon, PencilEdit02Icon } from 'hugeicons-react'
import { inputField, inputLabel } from 'src/Styles'
import useDebounceSearch from 'src/hooks/useDebounceSearch'
import EmptyState from 'src/components/shared/EmptyState'
import DotsLoader from 'src/components/shared/DotsLoader'
import useMinLoading from 'src/hooks/useMinLoading'

// ── Status chip ───────────────────────────────────────────────────────────
const StatusChip = ({ status }) => (
  <Chip
    label={status === 'sent' ? 'Sent' : 'Draft'}
    size='small'
    color={status === 'sent' ? 'success' : 'default'}
    variant='outlined'
    sx={{ fontWeight: 700, fontSize: 11 }}
  />
)

// ── Add / Edit modal ──────────────────────────────────────────────────────
const AnnouncementModal = ({ open, onClose, form, setForm, editId, saving, onSave }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm' PaperProps={{ sx: { borderRadius: 3 } }}>
    <DialogTitle sx={{ fontWeight: 700, fontSize: 17 }}>
      {editId ? 'Edit Announcement' : 'New Announcement'}
    </DialogTitle>
    <DialogContent dividers>
      <Box display='flex' flexDirection='column' gap={2.5} pt={1}>
        <TextField
          label='Title' variant='filled' size='small' fullWidth
          value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          sx={{ ...inputField, ...inputLabel }}
        />
        <TextField
          label='Message' variant='filled' size='small' fullWidth multiline rows={4}
          value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          sx={{ ...inputField, ...inputLabel }}
        />
        <Box display='flex' gap={2}>
          <FormControl variant='filled' size='small' sx={{ flex: 1, ...inputField, ...inputLabel }}>
            <InputLabel>Target</InputLabel>
            <Select value={form.targetType} onChange={e => setForm(p => ({ ...p, targetType: e.target.value }))}>
              <MenuItem value='all'>All Companies</MenuItem>
              <MenuItem value='specific'>Specific</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='filled' size='small' sx={{ flex: 1, ...inputField, ...inputLabel }}>
            <InputLabel>Status</InputLabel>
            <Select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              <MenuItem value='draft'>Draft</MenuItem>
              <MenuItem value='sent'>Sent</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </DialogContent>
    <DialogActions sx={{ px: 3, py: 2 }}>
      <Button onClick={onClose} sx={{ textTransform: 'none', borderRadius: 2 }}>Cancel</Button>
      <Button variant='contained' onClick={onSave} disabled={saving}
        sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
        startIcon={saving ? <CircularProgress size={14} color='inherit' /> : null}>
        {saving ? 'Saving…' : editId ? 'Update' : 'Create'}
      </Button>
    </DialogActions>
  </Dialog>
)

// ── Delete confirmation dialog ────────────────────────────────────────────
const DeleteDialog = ({ open, onClose, onConfirm, deleting }) => (
  <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
    <DialogTitle sx={{ fontWeight: 700 }}>Delete Announcement?</DialogTitle>
    <DialogContent>
      <Typography variant='body2' color='text.secondary'>
        This action cannot be undone. The announcement will be permanently removed.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, py: 2 }}>
      <Button onClick={onClose} sx={{ textTransform: 'none', borderRadius: 2 }}>Cancel</Button>
      <Button variant='contained' color='error' onClick={onConfirm} disabled={deleting}
        sx={{ textTransform: 'none', borderRadius: 2 }}
        startIcon={deleting ? <CircularProgress size={14} color='inherit' /> : null}>
        {deleting ? 'Deleting…' : 'Delete'}
      </Button>
    </DialogActions>
  </Dialog>
)

// ── Announcement table ────────────────────────────────────────────────────
const AnnouncementTable = ({ announcements, loading, rowsPerPage, page, totalItems, setPage, setRowsPerPage, openEdit, confirmDelete }) => {
  const theme = useTheme()
  const isLoading = useMinLoading(loading)

  if (isLoading) return <DotsLoader />

  if (!announcements.length) return <EmptyState subtitle='No announcements yet. Create one to notify all companies.' />

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
        <Table stickyHeader sx={{ minWidth: { xs: 900 } }} size='small' aria-label='announcements table'>
          <TableHead>
            <TableRow>
              {['Actions', '#', 'Title', 'Message', 'Target', 'Status', 'Date'].map(h => (
                <TableCell key={h} sx={{ fontWeight: 700 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((ann, i) => (
              <TableRow key={ann.id} hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
                {/* ── Actions (sticky left, same style as CompanyTable) ── */}
                <TableCell align='left' sx={{ position: 'sticky', left: 0, background: theme.palette.background.paper, zIndex: 1 }}>
                  <Tooltip title='Edit'>
                    <Button onClick={() => openEdit(ann)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}>
                      <PencilEdit02Icon size={18} color='#7366FF' />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Delete'>
                    <Button onClick={() => confirmDelete(ann.id)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}>
                      <Delete02Icon size={18} color='rgb(211,47,47)' />
                    </Button>
                  </Tooltip>
                </TableCell>

                <TableCell>{page * rowsPerPage + i + 1}</TableCell>

                <TableCell sx={{ maxWidth: 200 }}>
                  <Typography variant='body2' fontWeight={600} noWrap title={ann.title}>{ann.title}</Typography>
                </TableCell>

                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant='caption' color='text.secondary' noWrap title={ann.message}
                    sx={{ display: 'block', maxWidth: 280 }}>
                    {ann.message}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip label={ann.targetType === 'all' ? 'All Companies' : 'Specific'}
                    size='small' variant='filled' sx={{ fontSize: 11 }} />
                </TableCell>

                <TableCell><StatusChip status={ann.status} /></TableCell>

                <TableCell>
                  <Typography variant='caption' color='text.secondary'>
                    {new Date(ann.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} component='div'
        count={totalItems} rowsPerPage={rowsPerPage} page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
      />
    </Box>
  )
}

// ── Main view ─────────────────────────────────────────────────────────────
const AnnouncementsView = ({
  announcements, totalItems, loading,
  page, setPage, rowsPerPage, setRowsPerPage,
  search, setSearch, statusFilter, setStatusFilter,
  modalOpen, setModalOpen, form, setForm, editId, saving,
  openAdd, openEdit, saveAnnouncement,
  deleteOpen, setDeleteOpen, deleting, confirmDelete, deleteAnnouncement
}) => {
  const { search: searchInput, handleSearchChange } = useDebounceSearch(setSearch)

  return (
    <>
      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46,35,94,0.07)' }}>
        {/* ── Toolbar: Add button left · filters right ─────────────────── */}
        <Box
          sx={{ width: '100%', display: { xs: 'grid', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}
          mb={4}
        >
          <Button
            variant='contained'
            startIcon={<Add01Icon size={18} />}
            onClick={openAdd}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 700 }}
          >
            Add Announcement +
          </Button>

          <Box display='flex' gap={2} mt={{ xs: 3, sm: 0 }} flexWrap='wrap'>
            <FormControl variant='filled' size='small' sx={{ minWidth: 150, ...inputField, ...inputLabel }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(0) }}>
                <MenuItem value=''>All Statuses</MenuItem>
                <MenuItem value='draft'>Draft</MenuItem>
                <MenuItem value='sent'>Sent</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Search Announcement' variant='filled' size='small'
              value={searchInput} onChange={handleSearchChange}
              sx={{ ...inputField, ...inputLabel }}
            />
          </Box>
        </Box>

        {/* ── Table ────────────────────────────────────────────────────── */}
        <AnnouncementTable
          announcements={announcements} loading={loading}
          rowsPerPage={rowsPerPage} page={page} totalItems={totalItems}
          setPage={setPage} setRowsPerPage={setRowsPerPage}
          openEdit={openEdit} confirmDelete={confirmDelete}
        />
      </Card>

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      <AnnouncementModal
        open={modalOpen} onClose={() => setModalOpen(false)}
        form={form} setForm={setForm} editId={editId}
        saving={saving} onSave={saveAnnouncement}
      />
      <DeleteDialog
        open={deleteOpen} onClose={() => setDeleteOpen(false)}
        onConfirm={deleteAnnouncement} deleting={deleting}
      />
    </>
  )
}

export default AnnouncementsView
