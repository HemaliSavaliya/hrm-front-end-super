/** @module dashboardStyles — Styled MUI components shared across dashboard widgets. */
import { Box, Card } from '@mui/material'
import { styled } from '@mui/material/styles'

/**
 * Card with a CSS gradient background, rounded corners and a decorative circle pseudo-element.
 * The `gradient` prop is forwarded to the `background` CSS property.
 */
export const GradientCard = styled(Card)(({ gradient }) => ({
  background: gradient,
  color: '#fff',
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""', position: 'absolute',
    top: -20, right: -20, width: 100, height: 100,
    borderRadius: '50%', background: 'rgba(255,255,255,0.08)'
  }
}))

/** Circular icon container with a frosted-glass background. */
export const IconBubble = styled(Box)({
  width: 52, height: 52, borderRadius: 14,
  background: 'rgba(255,255,255,0.18)',
  display: 'flex', alignItems: 'center', justifyContent: 'center'
})

/** Standard section card with subtle shadow used by charts and tables. */
export const SectionCard = styled(Card)({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(89,102,122,0.08)',
  height: '100%'
})
