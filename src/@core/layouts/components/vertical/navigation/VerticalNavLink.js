import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Chip, ListItem, ListItemButton, ListItemIcon, Tooltip, Typography } from '@mui/material'
import themeConfig from 'src/configs/themeConfig'
import UserIcon from 'src/layouts/components/UserIcon'
import { handleURLQueries } from 'src/@core/layouts/utils'
import { MenuNavLink, MenuItemTextMetaWrapper } from './navLinkStyles'

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility, navWidth, isHovered }) => {
  const router = useRouter()
  const IconTag = item.icon
  const isActive = router.pathname === item.path || handleURLQueries(router, item.path)

  // ── Collapsed = narrow drawer and not temporarily expanded by hover ────
  const isCollapsed = navWidth <= 70 && !isHovered

  const linkContent = (
    <ListItem disablePadding className='nav-link' disabled={item.disabled || false} sx={{ mt: 1.5, px: '0 !important' }}>
      <Link passHref href={item.path ?? '/'}>
        <ListItemButton
          component={MenuNavLink}
          className={isActive ? 'active' : ''}
          {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={e => {
            if (!item.path) { e.preventDefault(); e.stopPropagation() }
            if (navVisible) toggleNavVisibility()
          }}
          sx={{
            // Centre the icon when collapsed; keep normal padding when expanded
            pl: isCollapsed ? 0 : 5.5,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
          }}>
          <ListItemIcon sx={{ mr: isCollapsed ? 0 : 2.5, transition: 'margin .25s ease-in-out', minWidth: 0 }}>
            <UserIcon icon={IconTag} />
          </ListItemIcon>

          {/* Hide the label text while collapsed */}
          {!isCollapsed && (
            <MenuItemTextMetaWrapper>
              <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
              {item.badgeContent && (
                <Chip label={item.badgeContent} color={item.badgeColor || 'primary'}
                  sx={{ height: 20, fontWeight: 500, marginLeft: 1.25, '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' } }} />
              )}
            </MenuItemTextMetaWrapper>
          )}
        </ListItemButton>
      </Link>
    </ListItem>
  )

  return (
    <motion.div initial='hidden' animate='visible' variants={itemVariants} transition={{ delay: 0.2, duration: 0.5 }}>
      {/* Show nav item title as tooltip only when the sidebar is collapsed */}
      {isCollapsed
        ? <Tooltip title={item.title} placement='right' arrow>{linkContent}</Tooltip>
        : linkContent
      }
    </motion.div>
  )
}

export default VerticalNavLink
