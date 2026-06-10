/** @module ReportsPage — Reports and analytics page for the super admin. */
import { motion } from 'framer-motion'
import useReportsData from 'src/hooks/useReportsData'
import ReportsView from 'src/views/reports/ReportsView'

/**
 * Entry page for the Reports section.
 * Delegates all data fetching to useReportsData and rendering to ReportsView.
 * @returns {JSX.Element}
 */
const ReportsPage = () => {
  const { reportData, loading, exportCsv } = useReportsData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1 }}
    >
      <ReportsView reportData={reportData} loading={loading} exportCsv={exportCsv} />
    </motion.div>
  )
}

export default ReportsPage
