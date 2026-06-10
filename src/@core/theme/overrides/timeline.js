import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const filledDot = color => ({ boxShadow: `0 0 0 3px ${hexToRGBA(color, 0.12)}` })
const outlinedDot = color => ({ '& svg': { color } })

const Timeline = theme => {
  const p = theme.palette
  return {
    MuiTimelineItem: {
      styleOverrides: { root: { '&:not(:last-of-type)': { '& .MuiTimelineContent-root': { marginBottom: theme.spacing(4) } } } }
    },
    MuiTimelineConnector: { styleOverrides: { root: { backgroundColor: theme.palette.divider } } },
    MuiTimelineContent: { styleOverrides: { root: { marginTop: theme.spacing(0.5) } } },
    MuiTimelineDot: {
      styleOverrides: {
        filledPrimary: filledDot(p.primary.main),
        filledSecondary: filledDot(p.secondary.main),
        filledSuccess: filledDot(p.success.main),
        filledError: filledDot(p.error.main),
        filledWarning: filledDot(p.warning.main),
        filledInfo: filledDot(p.info.main),
        filledGrey: filledDot(p.grey[400]),
        outlinedPrimary: outlinedDot(p.primary.main),
        outlinedSecondary: outlinedDot(p.secondary.main),
        outlinedSuccess: outlinedDot(p.success.main),
        outlinedError: outlinedDot(p.error.main),
        outlinedWarning: outlinedDot(p.warning.main),
        outlinedInfo: outlinedDot(p.info.main),
        outlinedGrey: outlinedDot(p.grey[500])
      }
    }
  }
}

export default Timeline
