/** @module Drawer — Swipeable/permanent navigation drawer with framer-motion entrance animation. */
import { useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer'
import { motion } from 'framer-motion'
import themeConfig from 'src/configs/themeConfig'

const SwipeableDrawer = styled(MuiSwipeableDrawer)({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': { listStyle: 'none' },
  '& .MuiListItem-gutters': { paddingLeft: 4, paddingRight: 4 },
  '& .MuiDrawer-paper': { left: 'unset', right: 'unset', overflowX: 'hidden', transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out' }
})

/** Slide-in animation variants for the navigation drawer. */
const motionVariants = { hidden: { opacity: 0, x: -200, y: 0 }, enter: { opacity: 1, x: 0, y: 0 } }

const getMobileDrawerProps = (navVisible, setNavVisible) => ({
  open: navVisible, onOpen: () => setNavVisible(true), onClose: () => setNavVisible(false),
  ModalProps: { keepMounted: true }
})

const desktopDrawerProps = { open: true, onOpen: () => null, onClose: () => null }

/**
 * Renders a permanent drawer on desktop and a swipeable modal drawer on mobile.
 * @param {object} props - Includes navWidth, navVisible, isHovered and mouse event handlers.
 * @returns {JSX.Element}
 */
const Drawer = ({ hidden, children, navWidth, navVisible, setNavVisible, isHovered, handleMouseEnter, handleMouseLeave }) => {
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'))
  const theme = useTheme()
  const drawerProps = hidden ? getMobileDrawerProps(navVisible, setNavVisible) : desktopDrawerProps
  // Expand to full navigationSize on hover; collapse to navWidth otherwise
  const resolvedWidth = isDesktop && !isHovered ? navWidth : themeConfig.navigationSize

  return (
    <motion.main variants={motionVariants} initial='hidden' animate='enter' transition={{ type: 'linear' }}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SwipeableDrawer disableSwipeToOpen={!isDesktop} className='layout-vertical-nav'
        variant={hidden ? 'temporary' : 'permanent'} {...drawerProps}
        PaperProps={{ sx: { width: resolvedWidth } }}
        sx={{
          width: isDesktop ? navWidth : themeConfig.navigationSize,
          '&:hover': { width: isDesktop ? navWidth : themeConfig.navigationSize },
          '& .MuiDrawer-paper': { borderRight: 0, backgroundColor: theme.palette.background.paper, boxShadow: '0 0 21px 0 rgba(89, 102, 122, 0.1)' }
        }}>
        {children}
      </SwipeableDrawer>
    </motion.main>
  )
}

export default Drawer
