/** @module CompanyDetailView — Full detail page for a single company. */
import { useRouter } from 'next/router'
import {
  Avatar, Box, Card, CardContent, CardHeader, Chip, Divider,
  Grid, Skeleton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Button, useTheme
} from '@mui/material'
import { ArrowLeft01Icon, Building06Icon, ManagerIcon, CalendarCheckOutIcon } from 'hugeicons-react'
import { SectionCard } from 'src/views/dashboard/styles/dashboardStyles'

// ── Subscription status chip ───────────────────────────────────────────────
const SubChip = ({ endDate }) => {
  if (!endDate) return <Chip label='No Subscription' size='small' color='default' />
  const expired = new Date(endDate) < new Date()
  return <Chip label={expired ? 'Expired' : 'Active'} size='small' color={expired ? 'error' : 'success'} />
}

// ── Formatted date ─────────────────────────────────────────────────────────
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

/**
 * Renders the full company detail view.
 * @param {{ company, admins, subscriptionHistory, logoUrl, loading }} props
 */
const CompanyDetailView = ({ company, admins, subscriptionHistory, logoUrl, loading }) => {
  const router = useRouter()
  const theme  = useTheme()

  if (loading) return (
    <Box>
      <Skeleton variant='rectangular' height={180} sx={{ borderRadius: 3, mb: 3 }} />
      <Grid container spacing={3}>
        {[1, 2, 3].map(i => <Grid item xs={12} md={4} key={i}><Skeleton variant='rectangular' height={140} sx={{ borderRadius: 3 }} /></Grid>)}
      </Grid>
    </Box>
  )

  if (!company) return (
    <Box textAlign='center' py={10}>
      <Typography variant='h6' color='text.secondary'>Company not found.</Typography>
      <Button sx={{ mt: 2 }} onClick={() => router.push('/company')}>Back to Companies</Button>
    </Box>
  )

  const isExpired = company.endDate && new Date(company.endDate) < new Date()
  const isInactive = company.deleted

  return (
    <Box>
      {/* ── Back + Title ───────────────────────────────────────────────── */}
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        <Button startIcon={<ArrowLeft01Icon size={16} />} onClick={() => router.push('/company')}
          variant='outlined' size='small' sx={{ textTransform: 'none', borderRadius: 2 }}>
          Back
        </Button>
        <Box>
          <Typography variant='h5' fontWeight={800}>Company Detail</Typography>
          <Typography variant='body2' color='text.secondary'>Full profile, subscription history and assigned admins.</Typography>
        </Box>
      </Box>

      {/* ── Hero card ──────────────────────────────────────────────────── */}
      <Card sx={{ borderRadius: 3, mb: 3, background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', color: '#fff', boxShadow: '0 8px 32px rgba(102,126,234,0.3)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display='flex' alignItems='center' gap={3} flexWrap='wrap'>
            <Avatar src={logoUrl || undefined} sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)', fontSize: 28, fontWeight: 700, border: '3px solid rgba(255,255,255,0.4)' }}>
              {!logoUrl && company.companyName?.[0]?.toUpperCase()}
            </Avatar>
            <Box flex={1}>
              <Box display='flex' alignItems='center' gap={1.5} flexWrap='wrap'>
                <Typography variant='h4' fontWeight={800} color='#fff'>{company.companyName}</Typography>
                {isInactive && <Chip label='Inactive' size='small' sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700 }} />}
                <SubChip endDate={company.endDate} />
              </Box>
              <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>{company.companyEmail}</Typography>
              <Box display='flex' gap={3} mt={1.5} flexWrap='wrap'>
                {company.companyPan && <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.75)' }}>PAN: <strong>{company.companyPan}</strong></Typography>}
                {company.companyGST && <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.75)' }}>GST: <strong>{company.companyGST}</strong></Typography>}
                <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.75)' }}>Plan: <strong>{company.subscription || 'N/A'}</strong></Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ── Stats row ──────────────────────────────────────────────────── */}
      <Grid container spacing={3} mb={3}>
        {[
          { icon: <Building06Icon size={22} color='#667eea' />, label: 'Subscription Plan', value: company.subscription || 'N/A', bg: '#f0edff' },
          { icon: <CalendarCheckOutIcon size={22} color='#11998e' />, label: 'Valid Until', value: fmtDate(company.endDate), bg: '#e8faf5' },
          { icon: <ManagerIcon size={22} color='#f093fb' />, label: 'Assigned Admins', value: admins.length, bg: '#fdf0ff' },
        ].map((s, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(89,102,122,0.08)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</Box>
                <Box>
                  <Typography variant='caption' color='text.secondary' fontWeight={600}>{s.label}</Typography>
                  <Typography variant='h6' fontWeight={800}>{s.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* ── Admins table ─────────────────────────────────────────────── */}
        <Grid item xs={12} md={7}>
          <SectionCard>
            <CardHeader title='Assigned Admins' titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
              subheader={`${admins.length} admin${admins.length !== 1 ? 's' : ''} for this company`}
              subheaderTypographyProps={{ variant: 'caption' }} sx={{ pb: 0 }} />
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              {admins.length === 0 ? (
                <Box textAlign='center' py={5}><Typography variant='body2' color='text.secondary'>No admins assigned yet.</Typography></Box>
              ) : (
                <TableContainer>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        {['#', 'Name', 'Email', 'Status'].map(h => <TableCell key={h} sx={{ fontWeight: 700 }}>{h}</TableCell>)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {admins.map((admin, i) => (
                        <TableRow key={admin.id} hover>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell><Typography variant='body2' fontWeight={600}>{admin.name}</Typography></TableCell>
                          <TableCell><Typography variant='caption' color='text.secondary'>{admin.email}</Typography></TableCell>
                          <TableCell>
                            <Chip label={admin.deleted ? 'Inactive' : 'Active'} size='small' color={admin.deleted ? 'error' : 'success'} variant='outlined' />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </SectionCard>
        </Grid>

        {/* ── Subscription history ─────────────────────────────────────── */}
        <Grid item xs={12} md={5}>
          <SectionCard>
            <CardHeader title='Subscription History' titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
              subheader='All renewal records' subheaderTypographyProps={{ variant: 'caption' }} sx={{ pb: 0 }} />
            <CardContent>
              {subscriptionHistory.length === 0 ? (
                <Box textAlign='center' py={3}><Typography variant='body2' color='text.secondary'>No renewal history yet.</Typography></Box>
              ) : (
                <Box display='flex' flexDirection='column' gap={1.5}>
                  {subscriptionHistory.map((sub, i) => (
                    <Box key={i} sx={{ p: 1.5, borderRadius: 2, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
                      <Box display='flex' justifyContent='space-between'>
                        <Typography variant='caption' fontWeight={700} color='text.secondary'>Renewal #{subscriptionHistory.length - i}</Typography>
                        <Chip label={new Date(sub.endDate) < new Date() ? 'Expired' : 'Active'} size='small'
                          color={new Date(sub.endDate) < new Date() ? 'default' : 'success'} variant='outlined' sx={{ height: 18, fontSize: 10 }} />
                      </Box>
                      <Typography variant='body2' fontWeight={600} mt={0.5}>{fmtDate(sub.startDate)} → {fmtDate(sub.endDate)}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CompanyDetailView
