/** @module AuditLogsView — HRM-style audit log page with stat cards + searchable table. */
import {
  Avatar, Box, Card, CardContent, Chip, Divider,
  FormControl, Grid, InputLabel, Link, MenuItem, Select, Skeleton,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography, useTheme
} from '@mui/material'
import {
  Activity01Icon, Add01Icon, Clock01Icon, Delete02Icon, DatabaseIcon
} from 'hugeicons-react'
import EmptyState from 'src/components/shared/EmptyState'
import { MenuDown, MenuUp } from 'mdi-material-ui'
import { inputField, inputLabel } from 'src/Styles'
import useDebounceSearch from 'src/hooks/useDebounceSearch'
import DotsLoader from 'src/components/shared/DotsLoader'
import useMinLoading from 'src/hooks/useMinLoading'

// ── Chip colour map by action ──────────────────────────────────────────────
const ACTION_COLOUR = {
  CREATE: 'success',
  UPDATE: 'primary',
  DELETE: 'error',
  LOGIN:  'info',
  LOGOUT: 'warning',
  VIEW:   'default'
}

// ── HRM-style single stat card ─────────────────────────────────────────────
const AuditStatCard = ({ icon: Icon, color, label, value, sub, pct, loading }) => {
  const up = pct >= 0
  return (
    <Card sx={{ flex: 1, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', borderRadius: 3 }}>
      <CardContent>
        <Box mb={1.5}>
          <Avatar sx={{ bgcolor: color, width: 44, height: 44 }}>
            <Icon size={20} color='#fff' />
          </Avatar>
        </Box>
        <Typography variant='subtitle2' fontWeight={500} color='text.secondary' mb={0.75}>
          {label}
        </Typography>
        {loading ? (
          <Skeleton variant='text' width={80} height={28} sx={{ mb: 1.5 }} />
        ) : (
          <Typography fontSize={15} fontWeight={700} mb={1.5} display='flex' alignItems='center' gap={0.75} flexWrap='wrap'>
            {value}
            {sub && <Typography component='span' variant='body2' color='text.secondary' fontWeight={400}>{sub}</Typography>}
            {pct !== null && (
              <Typography component='span' variant='body2' fontWeight={600}
                color={up ? 'success.main' : 'error.main'} display='flex' alignItems='center'>
                {up ? <MenuUp fontSize='small' sx={{ verticalAlign: 'middle' }} /> : <MenuDown fontSize='small' sx={{ verticalAlign: 'middle' }} />}
                {Math.abs(pct)}%
              </Typography>
            )}
          </Typography>
        )}
        <Link href='#' color='primary' fontSize={12} underline='hover'>View Details</Link>
      </CardContent>
    </Card>
  )
}

/**
 * Renders HRM-style stat cards + a searchable/filterable audit log table.
 * @param {object} props - State and setters from useAuditLogsData.
 */
const AuditLogsView = ({
  logs, totalItems, loading,
  page, rowsPerPage, module, action,
  setPage, setRowsPerPage, setSearch, setModule, setAction,
  stats, statsLoading
}) => {
  const theme = useTheme()
  const { search: searchInput, handleSearchChange } = useDebounceSearch(setSearch)
  const isLoading = useMinLoading(loading)

  // Compute pct of creates vs total
  const createPct = stats.total ? +((stats.creates / stats.total) * 100).toFixed(1) : null
  const deletePct = stats.total ? +((stats.deletes / stats.total) * 100).toFixed(1) : null

  const STAT_CARDS = [
    { icon: DatabaseIcon,  color: '#F26522', label: 'Total Logs',       value: stats.total,   sub: null,            pct: null       },
    { icon: Clock01Icon,   color: '#3F7FBF', label: "Today's Actions",  value: stats.today,   sub: 'today',         pct: null       },
    { icon: Add01Icon,     color: '#2ecc71', label: 'CREATE Actions',   value: stats.creates, sub: null,            pct: createPct  },
    { icon: Delete02Icon,  color: '#e74c3c', label: 'DELETE Actions',   value: stats.deletes, sub: null,            pct: deletePct  },
  ]

  return (
    <Box>
      {/* ── Page header ────────────────────────────────────────────────── */}
      <Box mb={3}>
        <Typography variant='h5' fontWeight={800} color='text.primary'>Audit Logs</Typography>
        <Typography variant='body2' color='text.secondary' mt={0.5}>
          Track all create, update and delete actions performed by the super admin.
        </Typography>
      </Box>

      {/* ── HRM-style stat cards ──────────────────────────────────────────── */}
      <Grid container spacing={3} mb={3}>
        {STAT_CARDS.map(s => (
          <Grid item xs={12} sm={6} xl={3} key={s.label}>
            <AuditStatCard {...s} loading={statsLoading} />
          </Grid>
        ))}
      </Grid>

      {/* ── Table card ───────────────────────────────────────────────────── */}
      <Card sx={{ boxShadow: '0 1px 6px rgba(0,0,0,0.07)', borderRadius: 3 }}>
        <Box px={3} pt={3} pb={2} display='flex' alignItems='center' gap={1.5}>
          <Activity01Icon size={20} color={theme.palette.primary.main} />
          <Typography variant='subtitle1' fontWeight={700}>Activity Log</Typography>
        </Box>
        <Divider />

        {/* ── Filters ────────────────────────────────────────────────────── */}
        <Box px={3} pt={2.5} pb={2} display='flex' gap={2} flexWrap='wrap' alignItems='center'>
          <TextField label='Search logs' variant='filled' size='small' value={searchInput}
            onChange={handleSearchChange} sx={{ flex: 1, minWidth: 200, ...inputField, ...inputLabel }} />

          <FormControl variant='filled' size='small' sx={{ minWidth: 160, ...inputField, ...inputLabel }}>
            <InputLabel>Module</InputLabel>
            <Select value={module} onChange={e => { setModule(e.target.value); setPage(0) }}>
              <MenuItem value=''>All Modules</MenuItem>
              {['Company', 'Admin', 'Plan', 'Settings', 'Auth'].map(m => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant='filled' size='small' sx={{ minWidth: 140, ...inputField, ...inputLabel }}>
            <InputLabel>Action</InputLabel>
            <Select value={action} onChange={e => { setAction(e.target.value); setPage(0) }}>
              <MenuItem value=''>All Actions</MenuItem>
              {['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'VIEW'].map(a => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        {isLoading && <DotsLoader />}
        {!isLoading && logs.length === 0 && (
          <EmptyState subtitle='No audit logs found. Actions performed will appear here.' />
        )}
        {!isLoading && logs.length > 0 && (
          <TableContainer sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
            <Table stickyHeader size='small'>
              <TableHead>
                <TableRow>
                  {['#', 'Action', 'Module', 'Description', 'Performed By', 'Date & Time'].map(col => (
                    <TableCell key={col} sx={{ fontWeight: 700, bgcolor: theme.palette.background.paper }}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Chip label={log.action} size='small'
                        color={ACTION_COLOUR[log.action] || 'default'} variant='outlined'
                        sx={{ fontWeight: 700, fontSize: 11 }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={log.module} size='small' variant='filled' sx={{ fontSize: 11 }} />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 320 }}>
                      <Typography variant='body2' noWrap title={log.description}>{log.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' fontWeight={600}>{log.performedBy}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='caption' color='text.secondary'>
                        {new Date(log.createdAt).toLocaleString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]} component='div'
          count={totalItems} rowsPerPage={rowsPerPage} page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
        />
      </Card>
    </Box>
  )
}

export default AuditLogsView
