// ** MUI Imports
import { useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer'
import { motion } from 'framer-motion'
import themeConfig from 'src/configs/themeConfig'

const SwipeableDrawer = styled(MuiSwipeableDrawer)({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})

const Drawer = props => {
  // ** Props
  const { hidden, children, navWidth, navVisible, setNavVisible, isHovered, handleMouseEnter, handleMouseLeave } = props

  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'))

  // ** Hook
  const theme = useTheme()

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }

  // Drawer Props for Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null
  }

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 }
  }

  return (
    <motion.main
      variants={variants}
      initial='hidden'
      animate='enter'
      transition={{ type: 'linear' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SwipeableDrawer
        disableSwipeToOpen={!isDesktop}
        className='layout-vertical-nav'
        variant={hidden ? 'temporary' : 'permanent'}
        {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
        PaperProps={{
          sx: {
            width: isDesktop && !isHovered ? navWidth : themeConfig.navigationSize // Set width to 260 on desktop, auto on mobile
          }
        }}
        sx={{
          width: isDesktop ? navWidth : themeConfig.navigationSize, // Set width to 260 on desktop, auto on mobile
          '&:hover': {
            width: isDesktop ? navWidth : themeConfig.navigationSize // Set width to 260 on hover on desktop, auto on mobile
          },
          '& .MuiDrawer-paper': {
            borderRight: 0,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 0 21px 0 rgba(89, 102, 122, 0.1)'
          }
        }}
      >
        {children}
      </SwipeableDrawer>
    </motion.main>
  )
}

export default Drawer
