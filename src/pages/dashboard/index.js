/** @module DashboardPage — Dashboard page that fetches data and delegates rendering to DashboardView. */
import { useTheme } from '@mui/material'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import useDashboardData from 'src/hooks/useDashboardData'
import DashboardView from 'src/views/dashboard/DashboardView'
import { toastSuccess, toastError } from 'src/utils/toastUtils'

/**
 * Provides dashboard data and notification delete handler to the view layer.
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const theme = useTheme()
  const { stats, recentCompanies, notifications, loading, refresh } = useDashboardData()
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const handleDeleteNotification = async id => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-notification/${id}`, {
        headers: { Authorization: `Bearer ${authToken?.token}` }
      })
      toast.success('Notification removed', toastSuccess(theme))
      refresh()
    } catch {
      toast.error('Failed to remove notification', toastError(theme))
    }
  }

  return (
    <>
      <Toaster />
      <DashboardView
        stats={stats}
        recentCompanies={recentCompanies}
        notifications={notifications}
        loading={loading}
        onDeleteNotification={handleDeleteNotification}
      />
    </>
  )
}

export default Dashboard
