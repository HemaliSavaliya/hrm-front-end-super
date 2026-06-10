/** @module CompanyInactiveTable — Sortable, paginated table for inactive companies with action buttons. */
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip, Button, Typography, useTheme } from '@mui/material'
import { AccountConvertOutline, DeleteOffOutline, PencilOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import EmptyState from 'src/components/shared/EmptyState'
import DotsLoader from 'src/components/shared/DotsLoader'
import useMinLoading from 'src/hooks/useMinLoading'
import { CompanyHeadCells } from 'src/TableHeader/TableHeader'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import CompanyLogoCell from './components/CompanyLogoCell'

/**
 * Renders a sticky-header table of inactive companies with sort, pagination and row actions.
 * @param {object} props - Table data, pagination state and action callbacks.
 * @returns {JSX.Element}
 */
const CompanyInactiveTable = ({ deleteCompany, handleEdit, companyDataIn, logoUrls, loadingIn, totalItems, page, rowsPerPage, setPage, setRowsPerPage, setSortBy, setSortOrder, handleViewSubscription }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const theme  = useTheme()
  const router = useRouter()

  const handleRequestSort = (_, property) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc'
    setOrder(newOrder); setOrderBy(property); setSortBy(property); setSortOrder(newOrder)
  }

  const isLoading = useMinLoading(loadingIn)
  if (isLoading) return <DotsLoader />
  if (!companyDataIn?.length) return <EmptyState subtitle='No inactive companies found.' />

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
        <Table stickyHeader sx={{ minWidth: { xs: 1000 } }} size='small' aria-label='a dense table'>
          <EnhancedTableHead headCells={CompanyHeadCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {companyDataIn.map((row, index) => (
              <TableRow tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                <TableCell align='left' sx={{ position: 'sticky', left: 0, background: theme.palette.background.paper, zIndex: 1 }}>
                  <Tooltip title='View Detail'><Button onClick={() => router.push(`/company/${row.id}`)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}><span style={{ fontSize: 16, color: '#11998e' }}>👁</span></Button></Tooltip>
                  <Tooltip title='Renew Subscription'><Button onClick={() => handleViewSubscription(row.id)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}><AccountConvertOutline sx={{ fontSize: 20, color: '#1c7ad1' }} /></Button></Tooltip>
                  <Tooltip title='Edit Company'><Button onClick={() => handleEdit(row.id)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}><PencilOutline sx={{ fontSize: 20, color: '#7366FF' }} /></Button></Tooltip>
                  <Tooltip title='Enable Company'><Button onClick={() => deleteCompany(row.id)} sx={{ height: 32, margin: '0 3px', minWidth: 32, width: 32 }}><DeleteOffOutline sx={{ fontSize: 20, color: 'rgb(211,47,47)' }} /></Button></Tooltip>
                </TableCell>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.subscription}</TableCell>
                <TableCell>{row.startDate || '-'}</TableCell>
                <TableCell>{row.endDate || '-'}</TableCell>
                <TableCell><CompanyLogoCell row={row} logoUrls={logoUrls} /></TableCell>
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

export default CompanyInactiveTable
