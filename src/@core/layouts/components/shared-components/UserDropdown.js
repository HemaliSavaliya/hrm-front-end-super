/* eslint-disable @next/next/link-passhref */
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Badge, Box, Menu, MenuItem, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { Logout02Icon, UserEdit01Icon } from 'hugeicons-react'
import { BadgeContentSpan, menuItemStyles } from './userDropdownStyles'

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const handleDropdownOpen = event => setAnchorEl(event.currentTarget)
  const handleDropdownClose = url => { if (url) router.push(url); setAnchorEl(null) }

  const handleSignOut = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/logout`, {})
      localStorage.removeItem('login-details')
      router.push('/login')
    } catch (e) { console.error('Logout failed:', e) }
  }

  return (
    <Fragment>
      <Badge overlap='circular' sx={{ ml: 2, cursor: 'pointer' }} badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar src='/images/avatars/avatar-7.png' sx={{ width: 40, height: 40, cursor: 'pointer' }} />
      </Badge>
      <Box ml={4} sx={{ cursor: 'pointer' }} onClick={handleDropdownOpen}>
        <Typography sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{authToken?.name}</Typography>
        <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>{authToken?.role}</Typography>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 'auto', marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Link href='/account-settings' style={{ textDecoration: 'none' }}>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={menuItemStyles}><UserEdit01Icon size={20} />View Profile</Box>
          </MenuItem>
        </Link>
        <MenuItem sx={{ p: 0 }} onClick={handleSignOut}>
          <Box sx={menuItemStyles}><Logout02Icon size={20} />Logout</Box>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
