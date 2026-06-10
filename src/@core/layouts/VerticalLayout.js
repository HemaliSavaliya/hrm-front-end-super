/** @module VerticalLayout — Core layout shell with collapsible side navigation and scroll-to-top. */
import { useState } from 'react'
import { Box, Fab, Typography } from '@mui/material'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import themeConfig from 'src/configs/themeConfig'
import AppBar from './components/vertical/appBar'
import Navigation from './components/vertical/navigation'
import ScrollToTop from 'src/@core/components/scroll-to-top'
import { VerticalLayoutWrapper, MainContentWrapper, Footer, ContentWrapper } from './verticalLayoutStyles'
import DynamicBreadcrumb from 'src/components/shared/DynamicBreadcrumb'

/**
 * Wraps page content with a collapsible navigation drawer, app bar and footer.
 * @param {{ settings, children, scrollToTop }} props
 * @returns {JSX.Element}
 */
const VerticalLayout = props => {
  const { settings, children, scrollToTop } = props
  // ── State ──────────────────────────────────────────────────────────────
  const [navVisible, setNavVisible] = useState(false)
  const [navWidth, setNavWidth] = useState(themeConfig.navigationSize)
  const [isHovered, setIsHovered] = useState(false)

  // ── Handlers ───────────────────────────────────────────────────────────
  const toggleNavVisibility = () => {
    setNavWidth(navVisible ? themeConfig.navigationSize : 70)
    setNavVisible(!navVisible)
  }

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper'>
        <Navigation navWidth={navWidth} navVisible={navVisible} setNavVisible={setNavVisible}
          toggleNavVisibility={toggleNavVisibility} isHovered={isHovered}
          handleMouseEnter={() => setIsHovered(true)} handleMouseLeave={() => setIsHovered(false)} {...props} />
        <MainContentWrapper className='layout-content-wrapper'>
          <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />
          <ContentWrapper className='layout-page-content'>
            {/* ── Breadcrumb (top-right) ─────────────────────────────────── */}
            <Box display='flex' justifyContent='flex-end' mb={2}>
              <DynamicBreadcrumb />
            </Box>
            {children}
          </ContentWrapper>
          <Footer>
            <Typography variant='subtitle2'>Copyright <strong>2024</strong> © super admin by stackholic</Typography>
          </Footer>
        </MainContentWrapper>
      </VerticalLayoutWrapper>
      {scrollToTop ? scrollToTop(props) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'><ArrowUp /></Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default VerticalLayout
