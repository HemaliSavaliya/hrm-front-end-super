import { useRef, useState } from 'react'
import { List, Box } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'
import NavScrollWrapper from './NavScrollWrapper'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const StyledBoxForShadow = styled(Box)({
  top: 50, left: -8, zIndex: 2, height: 75, display: 'none', position: 'absolute',
  pointerEvents: 'none', width: 'calc(100% + 15px)',
  '&.d-block': { display: 'block' }
})

const Navigation = props => {
  const { hidden, afterVerticalNavMenuContent, beforeVerticalNavMenuContent, verticalNavMenuContent: userVerticalNavMenuContent } = props
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])
  const shadowRef = useRef(null)
  const theme = useTheme()

  const handleInfiniteScroll = ref => {
    if (ref) {
      ref._getBoundingClientRect = ref.getBoundingClientRect
      ref.getBoundingClientRect = () => ({ ...ref._getBoundingClientRect(), height: Math.floor(ref._getBoundingClientRect().height) })
    }
  }

  const scrollMenu = container => {
    const el = hidden ? container.target : container
    if (shadowRef && el.scrollTop > 0) shadowRef.current?.classList.add('d-block')
    else shadowRef.current?.classList.remove('d-block')
  }

  return (
    <Drawer {...props}>
      <VerticalNavHeader {...props} />
      <StyledBoxForShadow ref={shadowRef} sx={{ background: `linear-gradient(${theme.palette.background.default} 40%,${hexToRGBA(theme.palette.background.default, 0.1)} 95%,${hexToRGBA(theme.palette.background.default, 0.05)})` }} />
      <Box sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <NavScrollWrapper hidden={hidden} onScroll={scrollMenu} containerRef={ref => handleInfiniteScroll(ref)}>
          {beforeVerticalNavMenuContent ? beforeVerticalNavMenuContent(props) : null}
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {userVerticalNavMenuContent ? userVerticalNavMenuContent(props) : (
              <List className='nav-items' sx={{ transition: 'padding .25s ease' }}>
                <VerticalNavItems groupActive={groupActive} setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup} setCurrentActiveGroup={setCurrentActiveGroup} {...props} />
              </List>
            )}
          </Box>
        </NavScrollWrapper>
      </Box>
      {afterVerticalNavMenuContent ? afterVerticalNavMenuContent(props) : null}
    </Drawer>
  )
}

export default Navigation
