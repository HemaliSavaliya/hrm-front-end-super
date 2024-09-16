import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import { Lightbulb, LightbulbOutline } from 'mdi-material-ui'
import { useEffect } from 'react'

const ModeToggler = props => {
  // ** Props
  const { settings, saveSettings } = props

  // Load mode from local storage on component mount
  useEffect(() => {
    const storedMode = localStorage.getItem('mode')
    if (storedMode) {
      saveSettings({ ...settings, mode: storedMode })
    }
  }, [])

  const handleModeChange = mode => {
    // Save mode to local storage
    localStorage.setItem('mode', mode)
    saveSettings({ ...settings, mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      {settings.mode === 'dark' ? <Lightbulb /> : <LightbulbOutline />}
    </IconButton>
  )
}

export default ModeToggler
