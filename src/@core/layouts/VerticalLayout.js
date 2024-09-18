import { useState } from 'react'
import { Fab, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import themeConfig from 'src/configs/themeConfig'
import AppBar from './components/vertical/appBar'
import Navigation from './components/vertical/navigation'
import ScrollToTop from 'src/@core/components/scroll-to-top'

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  paddingTop: '5.5rem',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const VerticalLayout = props => {
  const { settings, children, scrollToTop } = props
  const { contentWidth } = settings
  const [navVisible, setNavVisible] = useState(false)
  const [navWidth, setNavWidth] = useState(themeConfig.navigationSize)
  const [isHovered, setIsHovered] = useState(false)

  const toggleNavVisibility = () => {
    setNavWidth(navVisible ? themeConfig.navigationSize : 70)
    setNavVisible(!navVisible)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper'>
        <Navigation
          navWidth={navWidth}
          navVisible={navVisible}
          setNavVisible={setNavVisible}
          toggleNavVisibility={toggleNavVisibility}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          {...props}
        />
        <MainContentWrapper className='layout-content-wrapper'>
          <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />

          <ContentWrapper
            className='layout-page-content'

            // sx={{
            //   ...(contentWidth === 'boxed' && {
            //     mx: 'auto',
            //     '@media (min-width:1440px)': { maxWidth: 1440 },
            //     '@media (min-width:1200px)': { maxWidth: '100%' }
            //   })
            // }}
          >
            {children}
          </ContentWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default VerticalLayout
