/** @module PlanCard — Displays a single subscription plan as a pricing card. */
import { Box, Button, Card, CardContent, Chip, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { CheckCircle } from 'mdi-material-ui'
import { PencilOutline, DeleteOutline } from 'mdi-material-ui'

// ── Fallback gradient when the plan has no stored gradient ────────────────
const DEFAULT_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

/**
 * Renders a pricing card for a subscription plan.
 * @param {{ plan: object, onEdit: Function, onDelete: Function }} props
 * @returns {JSX.Element}
 */
const PlanCard = ({ plan, onEdit, onDelete }) => {
  const gradient    = plan.gradient || DEFAULT_GRADIENT
  const isUnlimited = plan.maxEmployees >= 99999

  return (
    <Card sx={{
      borderRadius: 4, height: '100%', position: 'relative',
      boxShadow: plan.isPopular ? '0 12px 40px rgba(102,126,234,0.35)' : '0 4px 20px rgba(89,102,122,0.1)',
      border: plan.isPopular ? '2px solid #667eea' : '1px solid transparent',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 48px rgba(89,102,122,0.18)' }
    }}>
      {/* ── Gradient header ─────────────────────────────────────────────── */}
      <Box sx={{ background: gradient, p: 3, borderRadius: '14px 14px 0 0', position: 'relative' }}>
        {/* Badge */}
        {plan.badge && (
          <Chip label={plan.badge} size='small' sx={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: 11
          }} />
        )}

        {/* Action buttons */}
        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5 }}>
          <Tooltip title='Edit Plan'>
            <IconButton size='small' onClick={() => onEdit(plan)}
              sx={{ bgcolor: 'rgba(255,255,255,0.18)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
              <PencilOutline sx={{ fontSize: 16, color: '#fff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Plan'>
            <IconButton size='small' onClick={() => onDelete(plan.id)}
              sx={{ bgcolor: 'rgba(255,255,255,0.18)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
              <DeleteOutline sx={{ fontSize: 16, color: '#fff' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Plan name + price */}
        <Box mt={3} textAlign='center'>
          <Typography variant='h6' fontWeight={700} color='#fff'>{plan.name}</Typography>
          <Box display='flex' justifyContent='center' alignItems='baseline' gap={0.5} mt={1}>
            <Typography variant='caption' color='rgba(255,255,255,0.8)' fontWeight={600}>₹</Typography>
            <Typography variant='h3' fontWeight={800} color='#fff' lineHeight={1}>{plan.price}</Typography>
            <Typography variant='caption' color='rgba(255,255,255,0.8)'>/month</Typography>
          </Box>
          <Typography variant='caption' color='rgba(255,255,255,0.75)' mt={0.5} display='block'>
            {plan.duration}-day plan · {isUnlimited ? 'Unlimited' : `Up to ${plan.maxEmployees}`} employees
          </Typography>
        </Box>
      </Box>

      {/* ── Features list ──────────────────────────────────────────────── */}
      <CardContent sx={{ p: 3 }}>
        <Divider sx={{ mb: 2 }} />
        <Box display='flex' flexDirection='column' gap={1.2}>
          {(Array.isArray(plan.features) ? plan.features : []).map((feat, i) => (
            <Box key={i} display='flex' alignItems='center' gap={1}>
              <CheckCircle sx={{ fontSize: 17, color: '#667eea' }} />
              <Typography variant='body2' color='text.secondary'>{feat}</Typography>
            </Box>
          ))}
        </Box>

        <Button fullWidth variant='contained' size='small'
          sx={{ mt: 3, textTransform: 'none', borderRadius: 2, fontWeight: 600, background: gradient }}>
          Assign to Company
        </Button>
      </CardContent>
    </Card>
  )
}

export default PlanCard
