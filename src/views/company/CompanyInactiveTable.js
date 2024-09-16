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
  Typography,
  useTheme
} from '@mui/material'
import { DeleteOffOutline, DeleteOutline, EyeOutline, PencilOutline } from 'mdi-material-ui'
import React, { useState } from 'react'
import { CompanyHeadCells } from 'src/TableHeader/TableHeader'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'

const CompanyInactiveTable = ({
  deleteCompany,
  handleEdit,
  companyDataIn,
  logoUrls,
  loadingIn,
  totalItems,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  setSortBy,
  setSortOrder
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
    setSortBy(property) // Set the sortBy state for the backend
    setSortOrder(newOrder) // Set the sortOrder state for the backend
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
      {loadingIn ? (
        <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
          <Table stickyHeader sx={{ minWidth: { xs: 1000, sm: 1000, lg: 1000 } }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              headCells={CompanyHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {CompanyHeadCells.map(cell => (
                    <TableCell key={cell.id}>
                      <Skeleton variant='text' height={25} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : companyDataIn && companyDataIn.length === 0 ? (
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
              sx={{ minWidth: { xs: 1000, sm: 1000, lg: 1000 } }}
              size='small'
              aria-label='a dense table'
            >
              <EnhancedTableHead
                headCells={CompanyHeadCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {companyDataIn.map((row, index) => {
                  return (
                    <TableRow tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                      <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell align='left'>{row.companyName}</TableCell>
                      {/* <TableCell align='left'>{row.companyEmail}</TableCell> */}
                      {/* <TableCell align='left'>{row.companyPan || '-'}</TableCell>
                      <TableCell align='left'>{row.companyGST || '-'}</TableCell> */}
                      <TableCell align='left'>{row.subscription}</TableCell>
                      <TableCell align='left'>{row.startDate || '-'}</TableCell>
                      <TableCell align='left'>{row.endDate || '-'}</TableCell>
                      <TableCell align='left'>
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                          {logoUrls[row.id] ? (
                            <img
                              src={logoUrls[row.id]}
                              alt={`Company Logo ${row.id}`}
                              style={{ width: 35, height: 35, objectFit: 'contain' }}
                            />
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                backgroundColor: 'rgb(240, 240, 240)',
                                borderRadius: '64%',
                                width: '20px',
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#000'
                              }}
                            >
                              {row.companyName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell align='left'>
                        {/* <Button
                          sx={{
                            background: theme.palette.background.paper,
                            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                            height: '32px',
                            margin: '0 3px',
                            minWidth: '32px',
                            width: '32px'
                          }}
                        >
                          <EyeOutline
                            // onClick={() => deleteCompany(row.id)}
                            sx={{ fontSize: '20px', color: '#1c7ad1' }}
                          />
                        </Button> */}
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
                        {row.deleted === 1 ? (
                          <Button
                            onClick={() => deleteCompany(row.id)}
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
                        ) : (
                          <Button
                            onClick={() => deleteCompany(row.id)}
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

export default CompanyInactiveTable
