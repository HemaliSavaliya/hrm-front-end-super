/** @module ReportsView — Full reports page layout with stat cards, charts and summary table. */
import { Box, Button, Grid, Typography } from '@mui/material'
import { Building06Icon, ManagerIcon, Chart01Icon, UserMultiple02Icon, Download04Icon } from 'hugeicons-react'
import CompanyGrowthChart    from './components/CompanyGrowthChart'
import PlanDistributionChart from './components/PlanDistributionChart'
import CompanySummaryTable   from './components/CompanySummaryTable'
import ReportStatCard        from './components/ReportStatCard'

// ── Stat card configuration ────────────────────────────────────────────────
const STAT_CARDS = [
  {
    key: 'totalCompanies',
    label: 'Total Companies',
    sub: d => `${d?.activeCompanies || 0} active · ${d?.inactiveCompanies || 0} inactive`,
    icon: Building06Icon,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    key: 'activeCompanies',
    label: 'Active Companies',
    sub: () => 'Currently subscribed',
    icon: Chart01Icon,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    key: 'totalAdmins',
    label: 'Total Admins',
    sub: d => `${d?.activeAdmins || 0} active across all companies`,
    icon: ManagerIcon,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    key: 'inactiveCompanies',
    label: 'Inactive Companies',
    sub: () => 'Subscription expired or disabled',
    icon: UserMultiple02Icon,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
]

/**
 * Renders the full reports page — stat cards, growth chart, plan donut and company table.
 * @param {{ reportData: object|null, loading: boolean, exportCsv: Function }} props
 * @returns {JSX.Element}
 */
const ReportsView = ({ reportData, loading, exportCsv }) => (
  <Box>
    {/* ── Page header ──────────────────────────────────────────────────── */}
    <Box display='flex' justifyContent='space-between' alignItems='flex-start' mb={4} flexWrap='wrap' gap={2}>
      <Box>
        <Typography variant='h5' fontWeight={800} color='text.primary'>Reports &amp; Analytics</Typography>
        <Typography variant='body2' color='text.secondary' mt={0.5}>
          Platform-wide statistics, growth trends and subscription breakdowns.
        </Typography>
      </Box>
      <Button
        variant='outlined' startIcon={<Download04Icon size={17} />}
        onClick={exportCsv} disabled={loading || !reportData}
        sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>
        Export CSV
      </Button>
    </Box>

    {/* ── KPI stat cards ───────────────────────────────────────────────── */}
    <Grid container spacing={3} mb={3}>
      {STAT_CARDS.map(card => (
        <Grid item xs={12} sm={6} lg={3} key={card.key}>
          <ReportStatCard
            icon={card.icon}
            gradient={card.gradient}
            label={card.label}
            value={reportData?.[card.key] ?? 0}
            sub={card.sub(reportData)}
            loading={loading}
          />
        </Grid>
      ))}
    </Grid>

    {/* ── Growth chart + Plan donut ─────────────────────────────────────── */}
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} md={8}>
        <CompanyGrowthChart reportData={reportData} loading={loading} />
      </Grid>
      <Grid item xs={12} md={4}>
        <PlanDistributionChart reportData={reportData} loading={loading} />
      </Grid>
    </Grid>

    {/* ── Company summary table ─────────────────────────────────────────── */}
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CompanySummaryTable companies={reportData?.recentCompanies || []} loading={loading} />
      </Grid>
    </Grid>
  </Box>
)

export default ReportsView
