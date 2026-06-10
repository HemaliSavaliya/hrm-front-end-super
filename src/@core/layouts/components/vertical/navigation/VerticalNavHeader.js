import Link from 'next/link'
import Image from 'next/image'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowLeft01Icon, ArrowLeftDoubleIcon } from 'hugeicons-react'
import themeConfig from 'src/configs/themeConfig'

const MenuHeaderWrapper = styled(Box)({
  padding: '14px 16px',
  transition: 'padding .25s ease-in-out',
  boxShadow: '-9px 0 20px rgba(89, 102, 122, 0.1)'
})

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  const { verticalNavMenuBranding: userVerticalNavMenuBranding, navWidth, isHovered } = props
  const isDesktop   = useMediaQuery(theme => theme.breakpoints.up('md'))
  // Treat as collapsed only when narrow AND not hover-expanded
  const isCollapsed = navWidth < themeConfig.navigationSize && !isHovered

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ px: isCollapsed ? 0 : 2, py: isCollapsed ? 1.5 : '14px' }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : isCollapsed ? (
        /* ── Collapsed: icon and toggle arrow side by side, centred ── */
        <Box display='flex' alignItems='center' justifyContent='center' gap={0.5}>
          <Link href='/' passHref>
            <StyledLink>
              <Image src='/images/hrms-icon.svg' alt='HRMS' width={28} height={28} priority />
            </StyledLink>
          </Link>
          <IconButton color='inherit' onClick={props.toggleNavVisibility} size='small' sx={{ p: 0.3 }}>
            {isDesktop ? <ArrowLeftDoubleIcon size={14} /> : <ArrowLeft01Icon size={14} />}
          </IconButton>
        </Box>
      ) : (
        /* ── Expanded: full logo left, toggle right ── */
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Link href='/' passHref>
            <StyledLink>
              <Image src='/images/hrms-logo.svg' alt='HRMS Super Admin' width={170} height={46} priority />
            </StyledLink>
          </Link>
          <IconButton color='inherit' onClick={props.toggleNavVisibility} size='small'>
            {isDesktop ? <ArrowLeftDoubleIcon size={18} /> : <ArrowLeft01Icon size={18} />}
          </IconButton>
        </Box>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
