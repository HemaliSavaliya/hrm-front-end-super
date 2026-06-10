/** @module CompanyDetailPage — Dynamic page for a single company's full profile. */
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import useCompanyDetailData from 'src/hooks/useCompanyDetailData'
import CompanyDetailView from 'src/views/company-detail/CompanyDetailView'

/**
 * Entry point for /company/[id].
 * Reads the company ID from the URL, delegates data fetching to the hook,
 * and passes all props to the pure view component.
 * @returns {JSX.Element}
 */
const CompanyDetailPage = () => {
  const router   = useRouter()
  const { id }   = router.query
  const hookData = useCompanyDetailData(id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1 }}
    >
      <CompanyDetailView {...hookData} />
    </motion.div>
  )
}

export default CompanyDetailPage
