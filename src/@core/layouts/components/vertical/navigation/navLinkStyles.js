import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'

export const MenuNavLink = styled('a')(({ theme }) => ({
  width: '100%', marginBottom: 5, padding: '12px 20px', position: 'relative',
  transition: 'opacity .25s ease-in-out, background .25s ease-in-out, color .25s ease-in-out',
  display: 'flex', alignItems: 'center', textDecoration: 'none', borderRadius: 0,
  '& .MuiTypography-root': { fontWeight: 500, fontSize: '15px' },
  'svg': { width: 20 },
  '&:hover .MuiTypography-root, &:hover svg': { color: '#7366FF' },
  '&:hover': { backgroundColor: theme.palette.customColors.listHover },
  '&.active, &.active:hover': { transition: 'all 0.5s ease', backgroundColor: theme.palette.customColors.listHover, color: '#7366FF' },
  '&.active::after': { content: '""', position: 'absolute', width: 4, height: 35, right: 0, top: '50%', transform: 'translateY(-50%)', backgroundColor: '#7366FF', borderRadius: '5px 0 0 5px', opacity: 1, visibility: 'visible', transition: 'opacity 0.5s ease, visibility 0.5s ease' },
  '&::after': { content: '""', position: 'absolute', width: 4, height: 35, right: 0, top: '50%', transform: 'translateY(-50%)', backgroundColor: '#7366FF', borderRadius: '5px 0 0 5px', opacity: 0, visibility: 'hidden', transition: 'opacity 0.5s ease, visibility 0.5s ease' },
  '&.active svg': { color: '#7366FF' },
  '&.active .MuiTypography-root': { color: '#7366FF', fontWeight: 600 }
}))

export const MenuItemTextMetaWrapper = styled(Box)({
  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})
