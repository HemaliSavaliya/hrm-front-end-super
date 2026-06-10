/** @module RecentCompanies — Table card showing the five most recently added active companies. */
import { Box, CardContent, CardHeader, Skeleton, Table, TableBody, TableHead, TableCell, TableRow, Typography } from '@mui/material'
import { SectionCard } from '../styles/dashboardStyles'
import CompanyRow from './CompanyRow'

/**
 * Displays a loading skeleton, empty state or company table based on data state.
 * @param {{ companies: Array, loading: boolean }} props
 * @returns {JSX.Element}
 */
const RecentCompanies = ({ companies, loading }) => (
  <SectionCard>
    <CardHeader title='Recent Companies' titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }} sx={{ pb: 0 }} />
    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
      {loading ? (
        <Box p={3}>{[...Array(4)].map((_, index) => <Skeleton key={index} height={44} sx={{ mb: 1 }} />)}</Box>
      ) : companies.length === 0 ? (
        <Box p={4} textAlign='center'><Typography color='text.secondary'>No companies found</Typography></Box>
      ) : (
        <Table size='small'>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, color: 'text.secondary', fontSize: 12, letterSpacing: 0.5 } }}>
              <TableCell>#</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, index) => <CompanyRow key={company.id} co={company} idx={index} />)}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </SectionCard>
)

export default RecentCompanies
