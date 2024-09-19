/* eslint-disable @next/next/link-passhref */
import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Box, Menu, Badge, MenuItem, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import axios from 'axios'
import Link from 'next/link'
import { AccountOutline, ChevronDown } from 'mdi-material-ui'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const AvatarStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
  height: 40,
  borderRadius: '100px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontSize: '10px'
}))

const styles = {
  py: 2,
  px: 4,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: 'text.primary',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem',
    color: 'text.secondary'
  }
}

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const theme = useTheme()
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/logout`, {})

      // Remove the login-details object from local storage
      localStorage.removeItem('login-details')

      // Redirect to the sign-in page
      router.push('/login')
    } catch (error) {
      // Handle any errors that occur during the logout API call
      console.error('Logout failed:', error)
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <AvatarStyled>
          <Typography variant='h6' color='inherit'>
            {authToken?.name.charAt(0).toUpperCase()}
          </Typography>
        </AvatarStyled>
      </Badge>
      <Box ml={4} sx={{ cursor: 'pointer' }} onClick={handleDropdownOpen}>
        <Typography sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{authToken?.name}</Typography>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
            {authToken?.role}
          </Typography>
          <ChevronDown
            fontSize='10px'
            sx={{
              '&.MuiSvgIcon-root': {
                fill: theme.palette.customColors.svgIcon
              }
            }}
          />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 'auto', marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Link href={'/account-settings'} style={{ textDecoration: 'none' }}>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <AccountOutline sx={{ marginRight: 2 }} />
              View Profile
            </Box>
          </MenuItem>
        </Link>
        <MenuItem sx={{ py: 2 }} onClick={handleSignOut}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
