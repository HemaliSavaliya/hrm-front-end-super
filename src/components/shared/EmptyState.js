/** @module EmptyState — Reusable empty-state illustration shown when a table has no rows. */
import { Box, Typography } from '@mui/material'

/**
 * Renders a centred empty-state block with an SVG illustration, heading and optional sub-text.
 * @param {{ title?: string, subtitle?: string }} props
 */
const EmptyState = ({
  title    = 'No Data Available Yet!',
  subtitle = 'Once records are added they will appear here.'
}) => (
  <Box
    display='flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    py={8}
    px={3}
  >
    {/* ── Inline SVG illustration ────────────────────────────────────────── */}
    <svg width='160' height='130' viewBox='0 0 160 130' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* Table surface */}
      <rect x='20' y='30' width='120' height='80' rx='10' fill='#F0EDFF' />
      {/* Header row */}
      <rect x='20' y='30' width='120' height='22' rx='10' fill='#D6CEFF' />
      <rect x='20' y='44' width='120' height='8' fill='#D6CEFF' />
      {/* Row lines */}
      <rect x='32' y='62' width='96' height='8' rx='4' fill='#E8E4FF' />
      <rect x='32' y='78' width='72' height='8' rx='4' fill='#EDE9FF' />
      <rect x='32' y='94' width='84' height='8' rx='4' fill='#E8E4FF' />
      {/* Empty folder circle */}
      <circle cx='80' cy='62' r='30' fill='#fff' />
      <circle cx='80' cy='62' r='30' fill='#7366FF' fillOpacity='0.08' />
      {/* Folder body */}
      <rect x='62' y='55' width='36' height='24' rx='4' fill='#7366FF' fillOpacity='0.18' />
      <path d='M62 59c0-2.2 1.8-4 4-4h8l3 4H96c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4H66c-2.2 0-4-1.8-4-4V59z'
        fill='#7366FF' fillOpacity='0.55' />
      {/* Question mark */}
      <text x='80' y='68' textAnchor='middle' fontSize='13' fontWeight='700' fill='#7366FF' fontFamily='sans-serif'>?</text>
      {/* Dotted lines suggesting empty rows */}
      <line x1='32' y1='62' x2='57' y2='62' stroke='#C5BEFF' strokeWidth='2' strokeDasharray='3 2' />
      <line x1='103' y1='62' x2='128' y2='62' stroke='#C5BEFF' strokeWidth='2' strokeDasharray='3 2' />
    </svg>

    <Typography
      variant='subtitle1'
      fontWeight={700}
      color='text.primary'
      mt={2.5}
      textAlign='center'
      letterSpacing={0.3}
    >
      {title}
    </Typography>

    <Typography
      variant='body2'
      color='text.secondary'
      mt={0.75}
      textAlign='center'
      maxWidth={280}
    >
      {subtitle}
    </Typography>
  </Box>
)

export default EmptyState
