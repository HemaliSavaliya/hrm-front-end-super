// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { motion } from 'framer-motion'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: theme.palette.background.paper,
  position: 'fixed',
  zIndex: 20,
  width: '-webkit-fill-available',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  boxShadow: '0 4px 40px rgba(39,32,120,.1)',
  // borderBottom: `1px solid ${theme.palette.action.focus}`,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out'
}))

const LayoutAppBar = props => {
  // ** Props
  const { verticalAppBarContent: userVerticalAppBarContent } = props

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <AppBar elevation={0} className='layout-navbar' position='static'>
        <Toolbar className='navbar-content-container'>
          {(userVerticalAppBarContent && userVerticalAppBarContent(props)) || null}
        </Toolbar>
      </AppBar>
    </motion.div>
  )
}

export default LayoutAppBar
