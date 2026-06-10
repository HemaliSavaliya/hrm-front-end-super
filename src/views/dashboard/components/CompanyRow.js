/** @module CompanyRow — Renders a single company row inside the RecentCompanies table. */
import { Avatar, Box, Chip, TableCell, TableRow, Typography } from '@mui/material'

/**
 * Displays company avatar, name, email, plan and active status chip.
 * @param {{ company: object, index: number }} props
 * @returns {JSX.Element}
 */
const CompanyRow = ({ co: company, idx: index }) => (
  <TableRow key={company.id} hover>
    <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>{index + 1}</TableCell>
    <TableCell>
      <Box display='flex' alignItems='center' gap={1.5}>
        <Avatar sx={{ width: 32, height: 32, fontSize: 13, fontWeight: 700, background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', color: '#fff' }}>
          {(company.companyName || 'C').charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant='body2' fontWeight={600} sx={{ lineHeight: 1.2 }}>{company.companyName || '—'}</Typography>
          <Typography variant='caption' color='text.secondary'>{company.email || ''}</Typography>
        </Box>
      </Box>
    </TableCell>
    <TableCell>
      <Typography variant='caption' fontWeight={600} color='text.secondary'>{company.planName || '—'}</Typography>
    </TableCell>
    <TableCell>
      <Chip label='Active' size='small' sx={{ background: 'rgba(16,185,129,0.12)', color: '#059669', fontWeight: 700, fontSize: 11, height: 22 }} />
    </TableCell>
  </TableRow>
)

export default CompanyRow
