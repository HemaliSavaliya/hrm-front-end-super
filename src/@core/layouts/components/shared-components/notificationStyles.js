import { styled } from '@mui/material/styles'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import { Typography } from '@mui/material'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

export const scrollStyles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': { border: 0 }
}

export const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380, overflow: 'hidden', marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: { width: '100%' }
  },
  '& .MuiMenu-list': { padding: 0 }
}))

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3), paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

export const PerfectScrollbar = styled(PerfectScrollbarComponent)(scrollStyles)

export const Avatar = styled(MuiAvatar)({ width: '2.375rem', height: '2.375rem', fontSize: '1.125rem' })

export const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600, flex: '1 1 100%', overflow: 'hidden', fontSize: '0.875rem',
  whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginBottom: theme.spacing(0.75)
}))

export const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'
})
