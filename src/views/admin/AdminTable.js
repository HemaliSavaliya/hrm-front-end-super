import {
  Box,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import { DeleteOffOutline, DeleteOutline, PencilOutline } from 'mdi-material-ui'
import React, { useState } from 'react'
import { AdminHeadCells } from 'src/TableHeader/TableHeader'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'

const AdminTable = ({
  loading,
  adminData,
  totalItems,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  setSortBy,
  setSortOrder,
  deleteAdmin,
  handleEdit
}) => {
  // for table
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const theme = useTheme()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder)
    setOrderBy(property)
    setSortBy(property)
    setSortOrder(newOrder)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
          <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              headCells={AdminHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {AdminHeadCells.map(cell => (
                    <TableCell key={cell.id}>
                      <Skeleton variant='text' height={25} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : adminData && adminData.length === 0 ? (
        <Typography
          textTransform={'uppercase'}
          letterSpacing={1}
          fontSize={15}
          my={6}
          textAlign={'center'}
          fontWeight={600}
        >
          No Data Available Yet!
        </Typography>
      ) : (
        <>
          <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
            <Table
              stickyHeader
              sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }}
              size='small'
              aria-label='a dense table'
            >
              <EnhancedTableHead
                headCells={AdminHeadCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {adminData.map((row, index) => {
                  return (
                    <TableRow tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                      <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell align='left'>{row.name}</TableCell>
                      <TableCell align='left'>{row.email}</TableCell>
                      <TableCell align='left'>{row.companyName}</TableCell>
                      <TableCell align='left'>
                        <Tooltip title='Edit Admin'>
                          <Button
                            onClick={() => handleEdit(row.id)}
                            sx={{
                              background: theme.palette.background.paper,
                              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                              height: '32px',
                              margin: '0 3px',
                              minWidth: '32px',
                              width: '32px'
                            }}
                          >
                            <PencilOutline sx={{ fontSize: '20px', color: '#7366FF' }} />
                          </Button>
                        </Tooltip>
                        {row.deleted === 1 ? (
                          <Tooltip title='Enable Admin'>
                            <Button
                              onClick={() => deleteAdmin(row.id)}
                              sx={{
                                background: theme.palette.background.paper,
                                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                                height: '32px',
                                margin: '0 3px',
                                minWidth: '32px',
                                width: '32px'
                              }}
                            >
                              <DeleteOffOutline sx={{ fontSize: '20px', color: 'rgb(211, 47, 47)' }} />
                            </Button>
                          </Tooltip>
                        ) : (
                          <Tooltip title='Disable Admin'>
                            <Button
                              onClick={() => deleteAdmin(row.id)}
                              sx={{
                                background: theme.palette.background.paper,
                                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                                height: '32px',
                                margin: '0 3px',
                                minWidth: '32px',
                                width: '32px'
                              }}
                            >
                              <DeleteOutline sx={{ fontSize: '20px', color: 'rgb(211, 47, 47)' }} />
                            </Button>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  )
}

export default AdminTable
