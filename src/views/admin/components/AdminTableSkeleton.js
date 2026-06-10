/** @module AdminTableSkeleton — Skeleton placeholder shown while admin data is loading. */
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from '@mui/material'
import { AdminHeadCells } from 'src/TableHeader/TableHeader'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'

/**
 * Renders a table with skeleton rows matching the expected admin column count.
 * @param {{ rowsPerPage: number, order: string, orderBy: string, onRequestSort: Function }} props
 * @returns {JSX.Element}
 */
const AdminTableSkeleton = ({ rowsPerPage, order, orderBy, onRequestSort }) => {
  const theme = useTheme()
  return (
    <TableContainer sx={{ height: '280px', border: `1px solid ${theme.palette.action.focus}` }}>
      <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby='tableTitle'>
        <EnhancedTableHead headCells={AdminHeadCells} order={order} orderBy={orderBy} onRequestSort={onRequestSort} />
        <TableBody>
          {Array.from({ length: rowsPerPage }).map((_, index) => (
            <TableRow key={index}>
              {AdminHeadCells.map(cell => (
                <TableCell key={cell.id}><Skeleton variant='text' height={25} /></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminTableSkeleton
