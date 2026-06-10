/** @module PlanDistributionChart — Donut chart showing active company breakdown by subscription plan. */
import dynamic from 'next/dynamic'
import { Box, CardContent, CardHeader, CircularProgress, Typography } from '@mui/material'
import { SectionCard } from 'src/views/dashboard/styles/dashboardStyles'

// Loaded dynamically to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

/**
 * Renders an ApexCharts donut chart for plan distribution.
 * Falls back to a "No Data" message when no active companies exist.
 * @param {{ reportData: object, loading: boolean }} props
 * @returns {JSX.Element}
 */
const PlanDistributionChart = ({ reportData, loading }) => {
  const labels  = reportData?.planDistLabels || []
  const series  = reportData?.planDistSeries || []
  const hasData = series.length > 0 && series.some(v => v > 0)

  const options = {
    chart: { type: 'donut' },
    colors: ['#667eea', '#f5576c', '#4facfe', '#43e97b', '#f093fb'],
    labels,
    dataLabels: { enabled: true },
    legend: { position: 'bottom', fontSize: '13px' },
    plotOptions: {
      pie: { donut: { size: '65%', labels: { show: true, total: { show: true, label: 'Total', fontSize: '14px', fontWeight: 700 } } } }
    },
    stroke: { width: 0 }
  }

  return (
    <SectionCard>
      <CardHeader
        title='Plan Distribution'
        subheader='Active companies by subscription plan'
        titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
        subheaderTypographyProps={{ variant: 'caption' }}
        sx={{ pb: 0 }}
      />
      <CardContent>
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height={280}>
            <CircularProgress sx={{ color: '#667eea' }} />
          </Box>
        ) : hasData ? (
          <ReactApexChart type='donut' height={280} options={options} series={series} />
        ) : (
          <Box display='flex' justifyContent='center' alignItems='center' height={280} flexDirection='column' gap={1}>
            <Typography variant='body2' color='text.secondary' fontWeight={600}>No Data Available</Typography>
            <Typography variant='caption' color='text.secondary'>Add active companies with subscriptions to see the chart.</Typography>
          </Box>
        )}
      </CardContent>
    </SectionCard>
  )
}

export default PlanDistributionChart
