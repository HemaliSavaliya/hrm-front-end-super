import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8, height: 8, borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

export const AvatarStyled = styled(Box)(({ theme }) => ({
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  width: 40, height: 40, borderRadius: '100px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff', fontSize: '10px'
}))

export const menuItemStyles = {
  py: 2, px: 4, width: '100%', display: 'flex', gap: 2,
  alignItems: 'center', color: 'text.primary', textDecoration: 'none',
  '& svg': { fontSize: '1.375rem', color: 'text.secondary' }
}
