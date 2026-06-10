/** @module useReminder — Hook that polls expiring subscriptions and manages notifications. */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme } from '@mui/material'
import toast from 'react-hot-toast'
import { toastSuccess, toastError } from 'src/utils/toastUtils'
import { isNotificationSent, saveNotificationSent, clearSentNotificationsAtMidnight, checkNotificationPermission } from 'src/utils/notificationUtils'

/** Builds an Authorization header object for the given token. */
const headers = token => ({ Authorization: `Bearer ${token}` })

/** Fires a browser notification and plays a sound for the given admin. */
const showBrowserNotification = admin => {
  if (Notification.permission !== 'granted') return
  new Audio('/images/notification.wav').play()
  new Notification('Subscription Expiry Alert', {
    body: `${admin.name}'s subscription is expiring on ${new Date(admin.subscriptionEndDate).toLocaleDateString()}`,
    icon: '/favicon.png'
  })
}

/**
 * Manages subscription-expiry reminders and stored notification list.
 * @returns {{ notifications: Array, deleteNotification: Function }}
 */
const useReminder = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [notifications, setNotifications] = useState([])
  const theme = useTheme()
  const token = authToken?.token

  // ── Helpers ────────────────────────────────────────────────────────────
  const fetchExpiringSubscriptions = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/expiring-subscriptions`, { headers: headers(token) })
      const today = new Date()
      data.forEach(admin => {
        // ms per day = 86 400 000; Math.ceil gives whole days remaining
        const days = Math.ceil((new Date(admin.subscriptionEndDate) - today) / 86400000)
        if ((days === 7 || days === 1) && !isNotificationSent(admin.adminId, days)) {
          showBrowserNotification(admin)
          saveNotificationSent(admin.adminId, days)
          setNotifications(prev => [...prev, admin])
        }
      })
    } catch (error) { console.error('Error fetching expiring subscriptions:', error) }
  }

  const fetchStoredNotifications = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/get-notification`, { headers: headers(token) })
      setNotifications(data.filter(notification => !notification.deleted))
    } catch (error) { console.error('Error fetching stored notifications:', error) }
  }

  const deleteNotification = async id => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-notification/${id}`, { headers: headers(token) })
      toast.success('Notification Deleted Successful!', toastSuccess(theme))
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    } catch { toast.error('Error Deleting Notification. Please try again.', toastError(theme)) }
  }

  // ── Side Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    checkNotificationPermission()
    fetchExpiringSubscriptions()
    fetchStoredNotifications()
    clearSentNotificationsAtMidnight()
    // Poll every 24 hours (86 400 000 ms)
    const intervalId = setInterval(fetchExpiringSubscriptions, 86400000)
    return () => clearInterval(intervalId)
  }, [])

  // ── Return ─────────────────────────────────────────────────────────────
  return { notifications, deleteNotification }
}

export default useReminder
