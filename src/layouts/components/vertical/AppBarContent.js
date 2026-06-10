/** @module AppBarContent — Top app-bar content: hamburger (mobile) left · theme + user right. */
import { Box, IconButton, useMediaQuery } from '@mui/material'
import { Menu09Icon } from 'hugeicons-react'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = props => {
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

      {/* ── Left: hamburger on mobile only ──────────────────────────────── */}
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu09Icon />
          </IconButton>
        )}
      </Box>

      {/* ── Right: dark-mode toggle + user dropdown ──────────────────────── */}
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown />
      </Box>

    </Box>
  )
}

export default AppBarContent
