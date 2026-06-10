import { lighten, darken } from '@mui/material/styles'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const makeVariant = (color, getColor) => ({
  color: getColor(color, 0.12),
  backgroundColor: hexToRGBA(color, 0.12),
  '& .MuiAlertTitle-root': { color: getColor(color, 0.12) },
  '& .MuiAlert-icon': { color: getColor(color, 0.12) }
})

const makeOutlined = (color, getColor) => ({
  borderColor: color, color: getColor(color, 0.12),
  '& .MuiAlertTitle-root': { color: getColor(color, 0.12) },
  '& .MuiAlert-icon': { color: getColor(color, 0.12) }
})

const Alert = theme => {
  const getColor = theme.palette.mode === 'light' ? darken : lighten
  const p = theme.palette
  return {
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 5, '& .MuiAlertTitle-root': { marginBottom: theme.spacing(1.6) }, '& a': { color: 'inherit', fontWeight: 500 } },
        standardSuccess: makeVariant(p.success.main, getColor),
        standardInfo: makeVariant(p.info.main, getColor),
        standardWarning: makeVariant(p.warning.main, getColor),
        standardError: makeVariant(p.error.main, getColor),
        outlinedSuccess: makeOutlined(p.success.main, getColor),
        outlinedInfo: makeOutlined(p.info.main, getColor),
        outlinedWarning: makeOutlined(p.warning.main, getColor),
        outlinedError: makeOutlined(p.error.main, getColor),
        filled: { fontWeight: 400 }
      }
    }
  }
}

export default Alert
