/** @module ImpersonationView — List company admins and generate a login-as token for super admin support. */
import {
  Box, Button, Card, Chip, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, InputAdornment,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Tooltip,
  Typography, useTheme
} from '@mui/material'
import {
  UserSwitchIcon, Login01Icon, Copy01Icon, CheckmarkCircle01Icon
} from 'hugeicons-react'
import { useState } from 'react'
import { inputField, inputLabel } from 'src/Styles'
import useDebounceSearch from 'src/hooks/useDebounceSearch'
import DotsLoader from 'src/components/shared/DotsLoader'
import useMinLoading from 'src/hooks/useMinLoading'
import EmptyState from 'src/components/shared/EmptyState'

// ── Subscription status badge ─────────────────────────────────────────────
const SubBadge = ({ endDate }) => {
  if (!endDate) return <Chip label='No Sub' size='small' color='default' variant='outlined' sx={{ fontSize: 11 }} />
  const expired = new Date(endDate) < new Date()
  return <Chip label={expired ? 'Expired' : 'Active'} size='small' color={expired ? 'error' : 'success'} variant='outlined' sx={{ fontSize: 11, fontWeight: 700 }} />
}

// ── Token dialog shown after successful impersonation ─────────────────────
const TokenDialog = ({ open, onClose, tokenData }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  if (!tokenData) return null

  // Build a deep-link URL for the HRM admin app
  const hrmAppUrl = process.env.NEXT_PUBLIC_HRM_URL || '#'
  const loginLink = `${hrmAppUrl}/login?impersonation_token=${tokenData.token}`

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm' PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 17 }}>
        <Box display='flex' alignItems='center' gap={1.5}>
          <UserSwitchIcon size={20} />
          Impersonation Token Generated
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box display='flex' flexDirection='column' gap={2.5} pt={1}>
          {/* Who you're impersonating */}
          <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant='caption' fontWeight={700} color='text.secondary' display='block'>LOGGING IN AS</Typography>
            <Typography variant='body1' fontWeight={700} mt={0.3}>{tokenData.adminName}</Typography>
            <Typography variant='body2' color='text.secondary'>{tokenData.adminEmail}</Typography>
            <Typography variant='caption' color='text.secondary'>Company: <strong>{tokenData.companyName}</strong></Typography>
          </Box>

          {/* Warning banner */}
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'warning.lighter', border: '1px solid', borderColor: 'warning.main' }}>
            <Typography variant='caption' color='warning.dark' fontWeight={600}>
              ⚠ This token expires in {tokenData.expiresIn}. Do not share it with anyone other than this admin.
            </Typography>
          </Box>

          {/* Token field */}
          <TextField
            label='JWT Token' variant='filled' size='small' fullWidth multiline rows={3}
            value={tokenData.token} InputProps={{ readOnly: true }}
            sx={{ ...inputField, ...inputLabel, '& textarea': { fontFamily: 'monospace', fontSize: 11 } }}
          />

          {/* Login link */}
          <TextField
            label='Login Link (paste into HRM app)' variant='filled' size='small' fullWidth
            value={loginLink} InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip title={copied ? 'Copied!' : 'Copy link'}>
                    <IconButton size='small' onClick={() => handleCopy(loginLink)}>
                      {copied ? <CheckmarkCircle01Icon size={18} color='green' /> : <Copy01Icon size={18} />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
            sx={{ ...inputField, ...inputLabel }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} sx={{ textTransform: 'none', borderRadius: 2 }}>Close</Button>
        <Button
          variant='contained' startIcon={<Login01Icon size={16} />}
          href={hrmAppUrl !== '#' ? loginLink : undefined}
          target='_blank' rel='noopener noreferrer'
          disabled={hrmAppUrl === '#'}
          sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}>
          Open HRM App
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// ── Main view ─────────────────────────────────────────────────────────────
const ImpersonationView = ({
  admins, totalItems, loading,
  page, setPage, rowsPerPage, setRowsPerPage,
  search, setSearch,
  tokenData, tokenOpen, setTokenOpen,
  generating, impersonate
}) => {
  const theme = useTheme()
  const { search: searchInput, handleSearchChange } = useDebounceSearch(setSearch)
  const isLoading = useMinLoading(loading)

  return (
    <Box>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <Box mb={4}>
        <Box display='flex' alignItems='center' gap={1.5} mb={0.5}>
          <UserSwitchIcon size={26} color={theme.palette.primary.main} />
          <Typography variant='h5' fontWeight={800} color='text.primary'>Impersonation</Typography>
        </Box>
        <Typography variant='body2' color='text.secondary'>
          Generate a short-lived login token to access the HRM app as any company admin for support or debugging.
        </Typography>
        <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: 'info.lighter', border: '1px solid', borderColor: 'info.light', maxWidth: 600 }}>
          <Typography variant='caption' color='info.dark' fontWeight={600}>
            ℹ Impersonation tokens are valid for 1 hour and are logged for audit purposes. Use responsibly.
          </Typography>
        </Box>
      </Box>

      <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0px 9px 20px rgba(46,35,94,0.07)' }}>
        {/* ── Search ────────────────────────────────────────────────────── */}
        <Box mb={3}>
          <TextField
            label='Search by admin name, email or company' variant='filled' size='small'
            value={searchInput} onChange={handleSearchChange}
            sx={{ minWidth: 340, ...inputField, ...inputLabel }}
          />
        </Box>

        {/* ── Table ─────────────────────────────────────────────────────── */}
        {isLoading && <DotsLoader />}
        {!isLoading && admins.length === 0 && (
          <EmptyState subtitle='No admins found. Active company admins will appear here.' />
        )}
        {!isLoading && admins.length > 0 && (
          <TableContainer sx={{ border: `1px solid ${theme.palette.action.focus}`, borderRadius: 2 }}>
            <Table stickyHeader size='small'>
              <TableHead>
                <TableRow>
                  {['#', 'Admin', 'Email', 'Company', 'Subscription', 'Action'].map(col => (
                    <TableCell key={col} sx={{ fontWeight: 700, bgcolor: theme.palette.background.paper }}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((admin, i) => (
                  <TableRow key={admin.id} hover>
                    <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                    <TableCell>
                      <Typography variant='body2' fontWeight={700}>{admin.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='caption' color='text.secondary'>{admin.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>{admin.companyName || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={1}>
                        <SubBadge endDate={admin.endDate} />
                        {admin.subscription && (
                          <Typography variant='caption' color='text.secondary'>{admin.subscription}</Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained' size='small'
                        startIcon={generating === admin.id
                          ? <CircularProgress size={13} color='inherit' />
                          : <UserSwitchIcon size={15} />}
                        disabled={generating === admin.id}
                        onClick={() => impersonate(admin.id)}
                        sx={{ textTransform: 'none', borderRadius: 2, fontSize: 12, px: 2 }}>
                        {generating === admin.id ? 'Generating…' : 'Login As'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
        />
      </Card>

      <TokenDialog open={tokenOpen} onClose={() => setTokenOpen(false)} tokenData={tokenData} />
    </Box>
  )
}

export default ImpersonationView
