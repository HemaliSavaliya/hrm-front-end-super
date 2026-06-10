/** @module RolesPage — Role and permission management for super admin team. */
import { motion } from 'framer-motion'
import useRolesData from 'src/hooks/useRolesData'
import RolesView from 'src/views/roles/RolesView'

/**
 * Entry point for /roles.
 * Delegates data logic to useRolesData and rendering to RolesView.
 * @returns {JSX.Element}
 */
const RolesPage = () => {
  const hookData = useRolesData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1 }}
    >
      <RolesView {...hookData} />
    </motion.div>
  )
}

export default RolesPage
