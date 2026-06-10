import { Fragment, useState } from 'react'
import { Box, Button, Chip, IconButton, Typography, useMediaQuery } from '@mui/material'
import BellOutline from 'mdi-material-ui/BellOutline'
import { Menu, MenuItem, Avatar, MenuItemTitle, MenuItemSubtitle, PerfectScrollbar, scrollStyles } from './notificationStyles'

const NOTIFICATIONS = [
  { avatar: '/images/avatars/4.png', title: 'Congratulation Flora! 🎉', subtitle: 'Won the monthly best seller badge', time: 'Today' },
  { initials: 'VU', title: 'New user registered.', subtitle: '5 hours ago', time: 'Yesterday' },
  { avatar: '/images/avatars/5.png', title: 'New message received 👋🏻', subtitle: 'You have 10 unread messages', time: '11 Aug' },
  { img: '/images/misc/paypal.png', title: 'Paypal', subtitle: 'Received Payment', time: '25 May' },
  { avatar: '/images/avatars/3.png', title: 'Revised Order 📦', subtitle: 'New order revised from john', time: '19 Mar' },
  { img: '/images/misc/chart.png', title: 'Finance report has been generated', subtitle: '25 hrs ago', time: '27 Dec' }
]

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const ScrollWrapper = ({ children }) => hidden
    ? <Box sx={{ ...scrollStyles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    : <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={e => setAnchorEl(e.currentTarget)}>
        <BellOutline />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip size='small' label='8 New' color='primary' sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }} />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {NOTIFICATIONS.map((n, i) => (
            <MenuItem key={i} onClick={() => setAnchorEl(null)}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                {n.img ? <img width={38} height={38} alt={n.title} src={n.img} /> : <Avatar alt={n.title} src={n.avatar}>{n.initials}</Avatar>}
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{n.title}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{n.subtitle}</MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>{n.time}</Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem disableRipple sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
          <Button fullWidth variant='contained' onClick={() => setAnchorEl(null)}>Read All Notifications</Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
