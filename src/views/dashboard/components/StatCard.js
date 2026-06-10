/** @module StatCard — HRM-style white stat card with coloured icon, value and view-details link. */
import { Avatar, Box, Card, CardContent, Link, Skeleton, Typography } from '@mui/material'
import { MenuDown, MenuUp } from 'mdi-material-ui'

// Re-export CARDS so consumers can import from a single path
export { default as CARDS } from './cardsConfig'

/**
 * Displays a white card with a coloured circular icon, metric name, primary value,
 * a secondary value / percentage indicator, and a "View Details" link.
 * @param {{ card: object, stats: object, loading: boolean }} props
 */
const StatCard = ({ card, stats, loading }) => {
  const Icon    = card.icon
  const primary = card.primary(stats)
  const sub     = card.sub(stats)
  const pct     = card.pct(stats)
  const up      = pct >= 0

  return (
    <Card sx={{ flex: 1, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', borderRadius: 3 }}>
      <CardContent>
        {/* ── Coloured circle icon ───────────────────────────────────────── */}
        <Box display='flex' flexDirection='column' mb={1.5}>
          <Avatar sx={{ bgcolor: card.color, width: 44, height: 44 }}>
            <Icon size={20} color='#fff' />
          </Avatar>
        </Box>

        {/* ── Label ─────────────────────────────────────────────────────── */}
        <Typography variant='subtitle2' fontWeight={500} color='text.secondary' mb={0.75}>
          {card.label}
        </Typography>

        {/* ── Value + sub-value + percentage ────────────────────────────── */}
        {loading ? (
          <Skeleton variant='text' width={120} height={28} sx={{ mb: 1.5 }} />
        ) : (
          <Typography fontSize={15} fontWeight={700} mb={1.5} display='flex' alignItems='center' gap={0.75} flexWrap='wrap'>
            {primary}
            {sub && (
              <Typography component='span' variant='body2' color='text.secondary' fontWeight={400}>
                {sub}
              </Typography>
            )}
            {pct !== null && (
              <Typography
                component='span' variant='body2' fontWeight={600}
                color={up ? 'success.main' : 'error.main'}
                display='flex' alignItems='center'
              >
                {up
                  ? <MenuUp fontSize='small' sx={{ verticalAlign: 'middle' }} />
                  : <MenuDown fontSize='small' sx={{ verticalAlign: 'middle' }} />}
                {Math.abs(pct)}%
              </Typography>
            )}
          </Typography>
        )}

        {/* ── View Details link ──────────────────────────────────────────── */}
        <Link href={card.path} color='primary' fontSize={12} underline='hover'>
          View Details
        </Link>
      </CardContent>
    </Card>
  )
}

export default StatCard
