/** @module NotificationsPanel — Card listing subscription expiry alerts with delete support. */
import { Box, CardContent, CardHeader, Chip, Skeleton, Typography } from '@mui/material'
import { CheckmarkCircle01Icon } from 'hugeicons-react'
import { SectionCard } from '../styles/dashboardStyles'
import NotificationItem from './NotificationItem'

/**
 * Renders a loading skeleton, empty state or list of notification items.
 * @param {{ notifications: Array, onDelete: Function, loading: boolean }} props
 * @returns {JSX.Element}
 */
const NotificationsPanel = ({ notifications, onDelete, loading }) => (
  <SectionCard>
    <CardHeader title='Expiry Alerts' titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
      action={notifications.length > 0 && (
        <Chip label={notifications.length} size='small' sx={{ background: '#FEE2E2', color: '#DC2626', fontWeight: 700, fontSize: 11 }} />
      )} sx={{ pb: 0 }} />
    <CardContent sx={{ pt: 1 }}>
      {loading ? (
        [...Array(3)].map((_, index) => <Skeleton key={index} height={60} sx={{ mb: 1 }} />)
      ) : notifications.length === 0 ? (
        <Box py={4} textAlign='center'>
          <CheckmarkCircle01Icon size={36} color='#10B981' />
          <Typography variant='body2' color='text.secondary' mt={1}>No expiring subscriptions</Typography>
        </Box>
      ) : (
        notifications.map((notification, index) => (
          <NotificationItem key={notification.id} n={notification} idx={index} total={notifications.length} onDelete={onDelete} />
        ))
      )}
    </CardContent>
  </SectionCard>
)

export default NotificationsPanel
