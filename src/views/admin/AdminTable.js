/** @module AdminTable — Sortable, paginated table for active admins with edit and disable actions. */
import { Box, Button, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip, Typography, useTheme } from '@mui/material'
import { DeleteOffOutline, DeleteOutline, PencilOutline } from 'mdi-material-ui'
import { useState } from 'react'
import { AdminHeadCells } from 'src/TableHeader/TableHeader'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import DotsLoader from 'src/components/shared/DotsLoader'
import EmptyState from 'src/components/shared/EmptyState'
import useMinLoading from 'src/hooks/useMinLoading'

/**
 * Renders a sticky-header table of active admins with sort, pagination and row actions.
 * @param {object} props - Table data, pagination state and action callbacks.
 * @returns {JSX.Element}
 */
const AdminTable = ({ loading, adminData, totalItems, page, rowsPerPage, setPage, setRowsPerPage, setSortBy, setSortOrder, deleteAdmin, handleEdit }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const theme = useTheme()

  const handleRequestSort = (_, property) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc'
    setOrder(newOrder); setOrderBy(property); setSortBy(property); setSortOrder(newOrder)
  }

  const isLoading = useMinLoading(loading)
  if (isLoading) return <DotsLoader />
  if (!adminData?.length) return <EmptyState subtitle='No active admins yet. Add one to get started.' />

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
        <Table stickyHeader sx={{ minWidth: { xs: 800 } }} size='small' aria-label='a dense table'>
          <EnhancedTableHead headCells={AdminHeadCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {adminData.map((row, index) => (
              <TableRow tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                <TableCell align='left' sx={{ position: 'sticky', left: 0, background: theme.palette.background.paper, zIndex: 1 }}>
                  <Tooltip title='Edit Admin'><Button onClick={() => handleEdit(row.id)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}><PencilOutline sx={{ fontSize: 20, color: '#7366FF' }} /></Button></Tooltip>
                  {row.deleted === 1 ? (
                    <Tooltip title='Enable Admin'><Button onClick={() => deleteAdmin(row.id)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}><DeleteOffOutline sx={{ fontSize: 20, color: 'rgb(211,47,47)' }} /></Button></Tooltip>
                  ) : (
                    <Tooltip title='Disable Admin'><Button onClick={() => deleteAdmin(row.id)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}><DeleteOutline sx={{ fontSize: 20, color: 'rgb(211,47,47)' }} /></Button></Tooltip>
                  )}
                </TableCell>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.companyName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} component='div' count={totalItems} rowsPerPage={rowsPerPage} page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={event => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0) }} />
    </Box>
  )
}

export default AdminTable
