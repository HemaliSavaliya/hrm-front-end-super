/** @module ImpersonationPage — Super admin support tool for logging in as a company admin. */
import { motion } from 'framer-motion'
import useImpersonationData from 'src/hooks/useImpersonationData'
import ImpersonationView from 'src/views/impersonation/ImpersonationView'

/**
 * Entry point for /impersonation.
 * Delegates data logic to useImpersonationData and rendering to ImpersonationView.
 * @returns {JSX.Element}
 */
const ImpersonationPage = () => {
  const hookData = useImpersonationData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1 }}
    >
      <ImpersonationView {...hookData} />
    </motion.div>
  )
}

export default ImpersonationPage
