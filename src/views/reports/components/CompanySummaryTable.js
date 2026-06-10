/** @module CompanySummaryTable — Table listing recent companies with subscription details. */
import {
  Box, CardContent, CardHeader, Chip, Skeleton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material'
import { SectionCard } from 'src/views/dashboard/styles/dashboardStyles'

// ── Chip colour by subscription tier ──────────────────────────────────────
const PLAN_COLOUR = {
  Basic:        'default',
  Professional: 'primary',
  Enterprise:   'secondary'
}

/**
 * Renders a compact table of recent active companies and their subscription status.
 * @param {{ companies: Array, loading: boolean }} props
 * @returns {JSX.Element}
 */
const CompanySummaryTable = ({ companies = [], loading }) => (
  <SectionCard>
    <CardHeader
      title='Company Overview'
      subheader='Most recently registered active companies'
      titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
      subheaderTypographyProps={{ variant: 'caption' }}
      sx={{ pb: 0 }}
    />
    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
      {loading ? (
        <Box p={3}>{[1, 2, 3, 4, 5].map(i => <Skeleton key={i} variant='text' height={40} sx={{ mb: 0.5 }} />)}</Box>
      ) : companies.length === 0 ? (
        <Box textAlign='center' py={5}>
          <Typography variant='body2' color='text.secondary'>No company data available.</Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Plan</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Expiry</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((co, i) => {
                // Determine if the subscription has expired
                const isExpired = co.endDate && new Date(co.endDate) < new Date()
                const expiryLabel = co.endDate
                  ? new Date(co.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                  : '—'

                return (
                  <TableRow key={co.id} hover>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <Typography variant='body2' fontWeight={600}>{co.companyName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='caption' color='text.secondary'>{co.companyEmail}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={co.subscription || 'N/A'} size='small'
                        color={PLAN_COLOUR[co.subscription] || 'default'} variant='outlined' />
                    </TableCell>
                    <TableCell>
                      <Typography variant='caption' color={isExpired ? 'error' : 'text.secondary'}>
                        {expiryLabel}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </CardContent>
  </SectionCard>
)

export default CompanySummaryTable
