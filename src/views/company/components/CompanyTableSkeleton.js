/** @module CompanyTableSkeleton — Skeleton placeholder shown while company data is loading. */
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from '@mui/material'
import { CompanyHeadCells } from 'src/TableHeader/TableHeader'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'

/**
 * Renders a table with skeleton rows matching the expected column count.
 * @param {{ rowsPerPage: number, order: string, orderBy: string, onRequestSort: Function }} props
 * @returns {JSX.Element}
 */
const CompanyTableSkeleton = ({ rowsPerPage, order, orderBy, onRequestSort }) => {
  const theme = useTheme()
  return (
    <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
      <Table stickyHeader sx={{ minWidth: { xs: 1000, sm: 1000, lg: 1000 } }} aria-labelledby='tableTitle'>
        <EnhancedTableHead headCells={CompanyHeadCells} order={order} orderBy={orderBy} onRequestSort={onRequestSort} />
        <TableBody>
          {Array.from({ length: rowsPerPage }).map((_, index) => (
            <TableRow key={index}>
              {CompanyHeadCells.map(cell => (
                <TableCell key={cell.id}><Skeleton variant='text' height={25} /></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CompanyTableSkeleton
