import { Box } from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'

const scrollStyles = { height: '100%', overflowY: 'auto', overflowX: 'hidden' }

const NavScrollWrapper = ({ hidden, onScroll, containerRef, children }) => {
  if (hidden) {
    return <Box sx={scrollStyles} onScroll={onScroll}>{children}</Box>
  }
  return (
    <PerfectScrollbar options={{ wheelPropagation: false }} onScrollY={onScroll} containerRef={containerRef}>
      {children}
    </PerfectScrollbar>
  )
}

export default NavScrollWrapper
