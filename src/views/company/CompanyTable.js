import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import { EyeOffOutline, EyeOutline, PencilOutline } from 'mdi-material-ui';
import React, { useState } from 'react';
import { CompanyHeadCells } from 'src/TableHeader/TableHeader';
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';

const CompanyTable = ({ deleteCompany, handleEdit, companyData, logoUrls }) => {
  // for table 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companyData.length) : 0;

  const visibleRows = stableSort(companyData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      {visibleRows && visibleRows.length === 0 ? (
        <Typography textTransform={"uppercase"} letterSpacing={1} fontSize={15} my={6} textAlign={"center"} fontWeight={600}>No Data Available Yet!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: "390px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 1800 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={CompanyHeadCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.companyName}</TableCell>
                      <TableCell align="left">{row.companyEmail}</TableCell>
                      <TableCell align="left">{row.companyPan || "-"}</TableCell>
                      <TableCell align="left">{row.companyGST || "-"}</TableCell>
                      <TableCell align="left">{row.subscription}</TableCell>
                      <TableCell align="left">{row.startDate || "-"}</TableCell>
                      <TableCell align="left">{row.endDate || "-"}</TableCell>
                      <TableCell align="left">
                        {logoUrls[row.id] && (
                          <img src={logoUrls[row.id]} alt={`Company Logo ${row.id}`} style={{ width: 35, height: 35 }} />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <PencilOutline
                          onClick={() => handleEdit(row.id)}
                          sx={{ mr: 2, color: "#9155FD" }}
                        />
                        {row.deleted === 1 ? (
                          <EyeOffOutline
                            onClick={() => deleteCompany(row.id)}
                            sx={{ color: "#9155FD" }}
                          />
                        ) : (
                          <EyeOutline
                            onClick={() => deleteCompany(row.id)}
                            sx={{ color: "#9155FD" }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={headCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={companyData.length}
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

export default CompanyTable;