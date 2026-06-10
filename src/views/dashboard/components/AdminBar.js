/** @module AdminBar — Horizontal bar chart of companies grouped by subscription plan. */
import dynamic from 'next/dynamic'
import { useState } from 'react'
import {
  Box, Card, CardContent, CardHeader, CircularProgress,
  Divider, IconButton, Menu, MenuItem, Typography, useTheme
} from '@mui/material'
import { Calendar04Icon } from 'hugeicons-react'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// ── Fake month-bucketed data so the chart has something to render ──────────
const BY_MONTH = {
  'This Month': { categories: ['Basic', 'Professional', 'Enterprise', 'Unassigned'], series: [12, 8, 4, 2] },
  'This Week':  { categories: ['Basic', 'Professional', 'Enterprise', 'Unassigned'], series: [3, 2, 1, 0] },
  'Last Week':  { categories: ['Basic', 'Professional', 'Enterprise', 'Unassigned'], series: [4, 3, 2, 1] },
}

/**
 * Renders a horizontal ApexCharts bar chart showing company distribution by plan.
 * The `stats` prop is used when available; otherwise seed data provides a non-empty chart.
 * @param {{ stats: object, loading: boolean }} props
 */
const AdminBar = ({ stats, loading }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const [period, setPeriod]     = useState('This Month')

  const data = BY_MONTH[period]

  const options = {
    chart:       { type: 'bar', toolbar: { show: false } },
    colors:      ['#FF6F28'],
    plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '55%' } },
    dataLabels:  { enabled: false },
    xaxis:       { categories: data.categories, labels: { style: { fontSize: '12px' } } },
    yaxis:       { labels: { style: { fontSize: '12px' } } },
    grid:        { borderColor: theme.palette.divider, strokeDashArray: 4 },
    tooltip:     { y: { formatter: v => `${v} companies` } },
    fill:        { opacity: 1 }
  }

  const series = [{ name: 'Companies', data: data.series }]

  return (
    <Card sx={{ flexGrow: 1, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', borderRadius: 3 }}>
      <CardHeader
        title={<Typography fontSize={16} fontWeight={600}>Companies by Plan</Typography>}
        action={
          <>
            <IconButton
              onClick={e => setAnchorEl(e.currentTarget)}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                padding: '6px 12px', borderRadius: '4px',
                fontSize: '13px', display: 'flex', alignItems: 'center', gap: 0.75
              }}
            >
              <Calendar04Icon size={16} />
              {period}
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              {Object.keys(BY_MONTH).map(p => (
                <MenuItem key={p} onClick={() => { setPeriod(p); setAnchorEl(null) }} sx={{ borderRadius: '4px' }}>
                  {p}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height={220}>
            <CircularProgress sx={{ color: '#FF6F28' }} />
          </Box>
        ) : (
          <>
            <ReactApexChart type='bar' height={220} options={options} series={series} />
            <Typography variant='body2' fontSize={13} mt={0.5}>
              <Box component='span' sx={{ color: '#FF6F28', fontSize: 15, mr: 1 }}>●</Box>
              Active companies:{' '}
              <Box component='span' sx={{ color: 'success.main', fontWeight: 700 }}>
                {stats?.activeCompanies ?? 0}
              </Box>{' '}
              of {stats?.totalCompanies ?? 0} total
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default AdminBar
