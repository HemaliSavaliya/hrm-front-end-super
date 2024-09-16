import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Chip, ListItem, Typography, Box, ListItemIcon, ListItemButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import UserIcon from 'src/layouts/components/UserIcon'
import { handleURLQueries } from 'src/@core/layouts/utils'

// ** Styled Components
const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
  width: '100%',
  marginBottom: 5,
  padding: '12px 20px',
  transition: 'opacity .25s ease-in-out, background .25s ease-in-out, color .25s ease-in-out',
  position: 'relative', // Required to position the ::after element

  // Styles for normal state (inactive)
  '& .MuiTypography-root': {
    fontWeight: 500, // Normal font weight,
    fontSize: '15px'
  },

  '&:hover .MuiTypography-root': {
    color: '#7366FF' // Text and icon color on hover
  },

  '&:hover .MuiSvgIcon-root': {
    color: '#7366FF' // Text and icon color on hover
  },

  // Hover effect for both active and inactive states
  '&:hover': {
    backgroundColor: theme.palette.customColors.listHover // Background color on hover
  },

  // Styles for the active class
  '&.active, &.active:hover': {
    transition: 'all 0.5s ease',
    backgroundColor: theme.palette.customColors.listHover,
    color: '#7366FF' // Text and icon color when active
  },

  // Styles for the ::after pseudo-element when the active class is applied
  '&.active::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '35px',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#7366FF',
    borderRadius: '5px 0px 0px 5px',
    opacity: 1,
    visibility: 'visible',
    transition: 'opacity 0.5s ease, visibility 0.5s ease'
  },

  // By default, the ::after element should be hidden
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '35px',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#7366FF',
    borderRadius: '5px 0px 0px 5px',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.5s ease, visibility 0.5s ease'
  },

  // Ensure the icon color changes when active
  '&.active .MuiSvgIcon-root': {
    color: '#7366FF' // Icon color when active
  },

  // Ensure the text color and font weight change when active
  '&.active .MuiTypography-root': {
    color: '#7366FF', // Text color when active
    fontWeight: 600 // Font weight when active
  }
}))

const MenuItemTextMetaWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }) => {
  // ** Hooks
  const router = useRouter()
  const IconTag = item.icon

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div initial='hidden' animate='visible' variants={itemVariants} transition={{ delay: 0.2, duration: 0.5 }}>
      <ListItem
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{ mt: 1.5, px: '0 !important' }}
      >
        <Link passHref href={item.path === undefined ? '/' : `${item.path}`}>
          <MenuNavLink
            className={isNavLinkActive() ? 'active' : ''}
            {...(item.openInNewTab ? { target: '_blank' } : null)}
            onClick={e => {
              if (item.path === undefined) {
                e.preventDefault()
                e.stopPropagation()
              }
              if (navVisible) {
                toggleNavVisibility()
              }
            }}
            sx={{
              pl: 5.5,
              ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
            }}
          >
            <ListItemIcon
              sx={{
                mr: 2.5,
                // color: 'text.primary',
                transition: 'margin .25s ease-in-out'
              }}
            >
              <UserIcon icon={IconTag} />
            </ListItemIcon>

            <MenuItemTextMetaWrapper>
              <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
              {item.badgeContent ? (
                <Chip
                  label={item.badgeContent}
                  color={item.badgeColor || 'primary'}
                  sx={{
                    height: 20,
                    fontWeight: 500,
                    marginLeft: 1.25,
                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                  }}
                />
              ) : null}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        </Link>
      </ListItem>
    </motion.div>
  )
}

export default VerticalNavLink
