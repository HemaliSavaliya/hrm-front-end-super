/** @module AuditLogsPage — Super admin activity log page. */
import { motion } from 'framer-motion'
import useAuditLogsData from 'src/hooks/useAuditLogsData'
import AuditLogsView from 'src/views/audit-logs/AuditLogsView'

/**
 * Entry page for the Audit Logs section.
 * Delegates data logic to useAuditLogsData and rendering to AuditLogsView.
 * @returns {JSX.Element}
 */
const AuditLogsPage = () => {
  const hookData = useAuditLogsData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1 }}
    >
      <AuditLogsView {...hookData} />
    </motion.div>
  )
}

export default AuditLogsPage
