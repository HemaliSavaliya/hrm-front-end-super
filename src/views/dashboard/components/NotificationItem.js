/** @module NotificationItem — Renders a single expiry-alert notification row with a delete button. */
import { Box, Divider, Typography } from '@mui/material'
import { Delete01Icon } from 'hugeicons-react'

/**
 * Displays notification details and a delete icon; renders a divider between items.
 * @param {{ n: object, idx: number, total: number, onDelete: Function }} props
 * @returns {JSX.Element}
 */
const NotificationItem = ({ n: notification, idx: index, total, onDelete }) => (
  <Box key={notification.id}>
    <Box display='flex' alignItems='flex-start' justifyContent='space-between' py={1.5}>
      <Box display='flex' gap={1.5} alignItems='flex-start'>
        {/* Red dot indicator */}
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#DC2626', mt: 0.7, flexShrink: 0 }} />
        <Box>
          <Typography variant='body2' fontWeight={600} sx={{ lineHeight: 1.3 }}>{notification.companyName}</Typography>
          <Typography variant='caption' color='text.secondary'>{notification.message}</Typography>
        </Box>
      </Box>
      <Box onClick={() => onDelete(notification.id)} sx={{ cursor: 'pointer', color: '#9CA3AF', '&:hover': { color: '#DC2626' }, flexShrink: 0, ml: 1 }}>
        <Delete01Icon size={16} />
      </Box>
    </Box>
    {index < total - 1 && <Divider />}
  </Box>
)

export default NotificationItem
