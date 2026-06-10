/** @module PlansPage — Subscription plan management page. */
import { motion } from 'framer-motion'
import usePlansData from 'src/hooks/usePlansData'
import PlansView from 'src/views/plans/PlansView'

/**
 * Entry page for managing subscription plans.
 * Delegates data logic to usePlansData and rendering to PlansView.
 * @returns {JSX.Element}
 */
const PlansPage = () => {
  const hookData = usePlansData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1 }}
    >
      <PlansView {...hookData} />
    </motion.div>
  )
}

export default PlansPage
