/** @module RolesView — Role & permission management for the super admin panel. */
import {
  Box, Button, Card, CardContent, Checkbox, Chip,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, Grid, Skeleton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Tooltip,
  Typography, useTheme
} from '@mui/material'
import { Add01Icon, Delete02Icon, PencilEdit02Icon, ShieldUserIcon } from 'hugeicons-react'
import { inputField, inputLabel } from 'src/Styles'

// ── Permission labels ──────────────────────────────────────────────────────
const PERM_KEYS = [
  { key: 'canCreate', label: 'Create', color: '#11998e' },
  { key: 'canRead',   label: 'Read',   color: '#667eea' },
  { key: 'canUpdate', label: 'Update', color: '#f093fb' },
  { key: 'canDelete', label: 'Delete', color: '#f5576c' },
]

// ── Permission cell mini-badges ───────────────────────────────────────────
const PermBadges = ({ perms = {} }) => (
  <Box display='flex' gap={0.5} flexWrap='wrap'>
    {PERM_KEYS.map(({ key, label, color }) => perms[key] ? (
      <Chip key={key} label={label} size='small' variant='filled'
        sx={{ fontSize: 10, height: 20, bgcolor: color + '22', color, fontWeight: 700, border: `1px solid ${color}44` }} />
    ) : null)}
  </Box>
)

// ── Permission matrix inside the modal ───────────────────────────────────
const PermissionMatrix = ({ modules, permissions, setForm, isDefault }) => (
  <Box>
    <Typography variant='caption' fontWeight={700} color='text.secondary' sx={{ display: 'block', mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.8 }}>
      Module Permissions
    </Typography>
    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, width: 160 }}>Module</TableCell>
            {PERM_KEYS.map(p => (
              <TableCell key={p.key} align='center' sx={{ fontWeight: 700, fontSize: 12 }}>{p.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map(mod => (
            <TableRow key={mod} hover>
              <TableCell>
                <Typography variant='body2' fontWeight={600}>{mod}</Typography>
              </TableCell>
              {PERM_KEYS.map(({ key }) => (
                <TableCell key={key} align='center'>
                  <Checkbox
                    size='small'
                    checked={!!permissions[mod]?.[key]}
                    disabled={isDefault || key === 'canRead'}
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        permissions: {
                          ...prev.permissions,
                          [mod]: { ...(prev.permissions[mod] || {}), [key]: e.target.checked }
                        }
                      }))
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {isDefault && (
      <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
        Default roles cannot have their permissions modified.
      </Typography>
    )}
  </Box>
)

// ── Add / Edit modal ──────────────────────────────────────────────────────
const RoleModal = ({ open, onClose, form, setForm, editId, saving, onSave, modules, roles }) => {
  const isDefault = editId ? roles.find(r => r.id === editId)?.isDefault : false
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md' PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {editId ? 'Edit Role' : 'Create New Role'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display='flex' flexDirection='column' gap={3} pt={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField label='Role Name' variant='filled' size='small' fullWidth
                value={form.name} disabled={isDefault}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                sx={{ ...inputField, ...inputLabel }} />
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField label='Description' variant='filled' size='small' fullWidth
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                sx={{ ...inputField, ...inputLabel }} />
            </Grid>
          </Grid>
          <PermissionMatrix
            modules={modules}
            permissions={form.permissions}
            setForm={setForm}
            isDefault={!!isDefault}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: 'none', borderRadius: 2 }}>Cancel</Button>
        <Button variant='contained' onClick={onSave} disabled={saving}
          sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
          startIcon={saving ? <CircularProgress size={14} color='inherit' /> : null}>
          {saving ? 'Saving…' : editId ? 'Update Role' : 'Create Role'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// ── Delete dialog ─────────────────────────────────────────────────────────
const DeleteDialog = ({ open, onClose, onConfirm, deleting }) => (
  <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
    <DialogTitle sx={{ fontWeight: 700 }}>Delete Role?</DialogTitle>
    <DialogContent>
      <Typography variant='body2' color='text.secondary'>
        This role and all its permissions will be permanently removed. Any users with this role will need to be reassigned.
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

// ── Main view ─────────────────────────────────────────────────────────────
const RolesView = ({
  roles, loading, MODULES,
  modalOpen, setModalOpen, form, setForm, editId, saving,
  openAdd, openEdit, saveRole,
  deleteOpen, setDeleteOpen, deleting, confirmDelete, deleteRole
}) => {
  const theme = useTheme()

  return (
    <Box>
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <Box display='flex' justifyContent='space-between' alignItems='flex-start' mb={4} flexWrap='wrap' gap={2}>
        <Box>
          <Box display='flex' alignItems='center' gap={1.5} mb={0.5}>
            <ShieldUserIcon size={24} color={theme.palette.primary.main} />
            <Typography variant='h5' fontWeight={800}>Role & Permission Management</Typography>
          </Box>
          <Typography variant='body2' color='text.secondary'>
            Define custom roles with fine-grained module permissions for your super admin team.
          </Typography>
        </Box>
        <Button variant='contained' startIcon={<Add01Icon size={18} />} onClick={openAdd}
          sx={{ textTransform: 'none', borderRadius: 2, px: 3, fontWeight: 700 }}>
          New Role
        </Button>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map(i => (
            <Grid item xs={12} md={4} key={i}>
              <Skeleton variant='rectangular' height={200} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      ) : roles.length === 0 ? (
        <Box textAlign='center' py={10}>
          <ShieldUserIcon size={48} color={theme.palette.text.disabled} />
          <Typography variant='body1' color='text.secondary' mt={2}>No roles defined yet.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {roles.map(role => (
            <Grid item xs={12} md={6} lg={4} key={role.id}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(89,102,122,0.08)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Role title row */}
                  <Box display='flex' justifyContent='space-between' alignItems='flex-start' mb={1.5}>
                    <Box>
                      <Box display='flex' alignItems='center' gap={1}>
                        <Typography variant='subtitle1' fontWeight={700}>{role.name}</Typography>
                        {role.isDefault ? (
                          <Chip label='Default' size='small' color='primary' variant='outlined' sx={{ fontSize: 10, height: 18 }} />
                        ) : null}
                      </Box>
                      {role.description && (
                        <Typography variant='caption' color='text.secondary'>{role.description}</Typography>
                      )}
                    </Box>
                    <Box display='flex' gap={0.5}>
                      <Tooltip title='Edit permissions'>
                        <Button size='small' onClick={() => openEdit(role)}
                          sx={{ minWidth: 32, width: 32, height: 32 }}>
                          <PencilEdit02Icon size={16} color={theme.palette.primary.main} />
                        </Button>
                      </Tooltip>
                      {!role.isDefault && (
                        <Tooltip title='Delete role'>
                          <Button size='small' onClick={() => confirmDelete(role.id)}
                            sx={{ minWidth: 32, width: 32, height: 32 }}>
                            <Delete02Icon size={16} color={theme.palette.error.main} />
                          </Button>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>

                  {/* Permission table inside card */}
                  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, fontSize: 11, py: 0.75 }}>Module</TableCell>
                          {PERM_KEYS.map(p => (
                            <TableCell key={p.key} align='center' sx={{ fontWeight: 700, fontSize: 10, py: 0.75, px: 0.5 }}>{p.label[0]}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {MODULES.map(mod => (
                          <TableRow key={mod}>
                            <TableCell sx={{ fontSize: 11, py: 0.5 }}>{mod}</TableCell>
                            {PERM_KEYS.map(({ key, color }) => (
                              <TableCell key={key} align='center' sx={{ py: 0.5, px: 0.5 }}>
                                {role.permissions?.[mod]?.[key]
                                  ? <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color, mx: 'auto' }} />
                                  : <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'action.hover', mx: 'auto' }} />
                                }
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <RoleModal
        open={modalOpen} onClose={() => setModalOpen(false)}
        form={form} setForm={setForm} editId={editId}
        saving={saving} onSave={saveRole}
        modules={MODULES} roles={roles}
      />
      <DeleteDialog
        open={deleteOpen} onClose={() => setDeleteOpen(false)}
        onConfirm={deleteRole} deleting={deleting}
      />
    </Box>
  )
}

export default RolesView
