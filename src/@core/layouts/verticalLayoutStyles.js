/** @module verticalLayoutStyles — Styled components for the vertical layout shell. */
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

/** Full-height flex row that wraps the nav drawer and main content. */
export const VerticalLayoutWrapper = styled('div')({ height: '100%', display: 'flex' })

/** Flex column that grows to fill remaining horizontal space. */
export const MainContentWrapper = styled(Box)({
  flexGrow: 1, minWidth: 0, display: 'flex', minHeight: '100vh', flexDirection: 'column'
})

/** Sticky footer bar with paper background and subtle shadow. */
export const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 0 20px rgba(89,102,122,0.1)',
  padding: '15px', textAlign: 'center', textTransform: 'capitalize'
}))

/** Main content area with responsive horizontal padding and top offset for the app bar. */
export const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1, width: '100%', paddingTop: '5.5rem',
  paddingLeft: theme.spacing(6), paddingRight: theme.spacing(6), paddingBottom: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: { paddingLeft: theme.spacing(4), paddingRight: theme.spacing(4) }
}))
