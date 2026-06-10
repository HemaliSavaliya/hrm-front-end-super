/** @module AnnouncementsPage — Platform-wide announcement management page. */
import { motion } from 'framer-motion'
import useAnnouncementsData from 'src/hooks/useAnnouncementsData'
import AnnouncementsView from 'src/views/announcements/AnnouncementsView'

/**
 * Entry point for /announcements.
 * Delegates data logic to useAnnouncementsData and rendering to AnnouncementsView.
 * @returns {JSX.Element}
 */
const AnnouncementsPage = () => {
  const hookData = useAnnouncementsData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1 }}
    >
      <AnnouncementsView {...hookData} />
    </motion.div>
  )
}

export default AnnouncementsPage
