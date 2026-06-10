/** @module PlansView — Full page layout for managing subscription plans. */
import { Box, Button, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import { PlusCircleOutline } from 'mdi-material-ui'
import { Toaster } from 'react-hot-toast'
import PlanCard from './PlanCard'
import PlanModal from './PlanModal'

/**
 * Renders the subscription plans management page with pricing cards and add/edit modal.
 * @param {{ plans, loading, open, editPlan, handleAdd, handleEdit, handleClose, savePlan, deletePlan }} props
 * @returns {JSX.Element}
 */
const PlansView = ({ plans, loading, open, editPlan, handleAdd, handleEdit, handleClose, savePlan, deletePlan }) => (
  <>
    <Toaster />

    {/* ── Page header ──────────────────────────────────────────────────── */}
    <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
      <Box>
        <Typography variant='h5' fontWeight={800} color='text.primary'>Subscription Plans</Typography>
        <Typography variant='body2' color='text.secondary' mt={0.5}>
          Create and manage plans that companies can subscribe to.
        </Typography>
      </Box>
      <Button variant='contained' startIcon={<PlusCircleOutline />} onClick={handleAdd}
        sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, px: 3 }}>
        Add Plan
      </Button>
    </Box>

    {/* ── Plan cards ───────────────────────────────────────────────────── */}
    {loading ? (
      <Grid container spacing={3}>
        {[1, 2, 3].map(i => (
          <Grid item xs={12} sm={6} lg={4} key={i}>
            <Card sx={{ borderRadius: 4 }}>
              <Skeleton variant='rectangular' height={160} />
              <CardContent>
                {[1, 2, 3, 4, 5].map(j => <Skeleton key={j} variant='text' sx={{ mb: 1 }} />)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : plans.length === 0 ? (
      <Box textAlign='center' py={10}>
        <Typography variant='h6' color='text.secondary' fontWeight={600}>No Plans Yet</Typography>
        <Typography variant='body2' color='text.secondary' mt={1}>Click &quot;Add Plan&quot; to create your first subscription plan.</Typography>
        <Button variant='contained' startIcon={<PlusCircleOutline />} onClick={handleAdd}
          sx={{ mt: 3, textTransform: 'none', borderRadius: 2 }}>
          Add Your First Plan
        </Button>
      </Box>
    ) : (
      <Grid container spacing={3}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} lg={4} key={plan.id}>
            <PlanCard plan={plan} onEdit={handleEdit} onDelete={deletePlan} />
          </Grid>
        ))}
      </Grid>
    )}

    {/* ── Add / Edit modal ─────────────────────────────────────────────── */}
    <PlanModal open={open} onClose={handleClose} editPlan={editPlan} onSave={savePlan} />
  </>
)

export default PlansView
