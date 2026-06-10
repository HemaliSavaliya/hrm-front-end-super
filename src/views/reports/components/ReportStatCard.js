/** @module ReportStatCard — Compact gradient stat card used on the Reports page. */
import { Box, CardContent, Skeleton, Typography } from '@mui/material'
import { GradientCard, IconBubble } from 'src/views/dashboard/styles/dashboardStyles'

/**
 * Displays a key metric on a gradient background.
 * @param {{ icon: Component, gradient: string, label: string, value: string|number, sub: string, loading: boolean }} props
 * @returns {JSX.Element}
 */
const ReportStatCard = ({ icon: Icon, gradient, label, value, sub, loading }) => (
  <GradientCard gradient={gradient}>
    <CardContent sx={{ p: 3 }}>
      <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
        <Box>
          <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.75)', mb: 0.5, fontWeight: 500 }}>
            {label}
          </Typography>
          {loading
            ? <Skeleton variant='text' width={60} height={44} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            : <Typography variant='h3' sx={{ color: '#fff', fontWeight: 800, lineHeight: 1.1 }}>{value ?? '-'}</Typography>
          }
          <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.65)', mt: 0.5, display: 'block' }}>
            {sub}
          </Typography>
        </Box>
        <IconBubble><Icon size={24} color='white' /></IconBubble>
      </Box>
    </CardContent>
  </GradientCard>
)

export default ReportStatCard
