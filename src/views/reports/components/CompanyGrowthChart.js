/** @module CompanyGrowthChart — Area chart showing company & admin registrations per month. */
import dynamic from 'next/dynamic'
import { Box, CardContent, CardHeader, CircularProgress } from '@mui/material'
import { SectionCard } from 'src/views/dashboard/styles/dashboardStyles'

// Loaded dynamically to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

/**
 * Renders a dual-area chart for company and admin growth across the year.
 * @param {{ reportData: object, loading: boolean }} props
 * @returns {JSX.Element}
 */
const CompanyGrowthChart = ({ reportData, loading }) => {
  const options = {
    chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
    colors: ['#667eea', '#f093fb'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05 }
    },
    xaxis: {
      categories: reportData?.months || [],
      labels: { style: { fontSize: '12px' } }
    },
    yaxis: { labels: { formatter: v => Math.round(v) } },
    legend: { position: 'top' },
    grid: { borderColor: '#F3F4F6', strokeDashArray: 4 },
    tooltip: { shared: true, intersect: false }
  }

  const series = [
    { name: 'Companies', data: reportData?.companyMonthly || Array(12).fill(0) },
    { name: 'Admins',    data: reportData?.adminMonthly   || Array(12).fill(0) }
  ]

  return (
    <SectionCard>
      <CardHeader
        title='Growth Overview'
        subheader='Monthly company and admin registrations this year'
        titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
        subheaderTypographyProps={{ variant: 'caption' }}
        sx={{ pb: 0 }}
      />
      <CardContent>
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height={280}>
            <CircularProgress sx={{ color: '#667eea' }} />
          </Box>
        ) : (
          <ReactApexChart type='area' height={280} options={options} series={series} />
        )}
      </CardContent>
    </SectionCard>
  )
}

export default CompanyGrowthChart
