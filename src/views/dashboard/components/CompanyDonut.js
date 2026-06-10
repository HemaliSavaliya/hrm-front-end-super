/** @module CompanyDonut — Donut chart showing the ratio of active to inactive companies. */
import dynamic from 'next/dynamic'
import { Box, CardContent, CardHeader, CircularProgress, Typography } from '@mui/material'
import { SectionCard } from '../styles/dashboardStyles'

// Loaded dynamically to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

/**
 * Renders an ApexCharts donut chart for company status breakdown.
 * @param {{ stats: object, loading: boolean }} props
 * @returns {JSX.Element}
 */
const CompanyDonut = ({ stats, loading }) => {
  const options = {
    chart: { type: 'donut', sparkline: { enabled: false } },
    labels: ['Active', 'Inactive'],
    colors: ['#4F46E5', '#E5E7EB'],
    legend: { position: 'bottom', fontSize: '13px' },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            total: {
              show: true, label: 'Total', fontSize: '13px', fontWeight: 600, color: '#6B7280',
              // formatter returns the total companies count as a string label in the donut centre
              formatter: () => stats.totalCompanies
            }
          }
        }
      }
    },
    stroke: { width: 0 }
  }

  return (
    <SectionCard>
      <CardHeader title='Company Status' titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }} sx={{ pb: 0 }} />
      <CardContent>
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height={240}>
            <CircularProgress sx={{ color: '#4F46E5' }} />
          </Box>
        ) : stats.totalCompanies === 0 ? (
          <Box display='flex' justifyContent='center' alignItems='center' height={240}>
            <Typography color='text.secondary'>No data available</Typography>
          </Box>
        ) : (
          <ReactApexChart type='donut' height={240} options={options} series={[stats.activeCompanies, stats.inactiveCompanies]} />
        )}
      </CardContent>
    </SectionCard>
  )
}

export default CompanyDonut
