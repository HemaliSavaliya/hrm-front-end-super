import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme } from '@mui/material'
import toast from 'react-hot-toast'

const useReminder = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [notifications, setNotifications] = useState([])
  const theme = useTheme()

  // Push reminder
  useEffect(() => {
    checkNotificationPermission()
    fetchExpiringSubscriptions()
    fetchStoredNotifications()

    // Set an interval to check every day (86400000 ms = 24 hours)
    const intervalId = setInterval(fetchExpiringSubscriptions, 86400000)

    clearSentNotifications() // Reset notifications at midnight

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  // Request permission to show notifications
  const checkNotificationPermission = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.')
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          alert('Notification permission denied.')
        }
      })
    }
  }

  // Fetch expiring subscriptions from backend
  const fetchExpiringSubscriptions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/expiring-subscriptions`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })
      const expiringAdmins = response.data

      const today = new Date()

      // Trigger notifications for expiring admins
      expiringAdmins.forEach(admin => {
        const endDate = new Date(admin.subscriptionEndDate)
        const daysBeforeExpiry = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) // Difference in days

        // Send notifications only on 7 days or 1 day before expiry
        if (
          (daysBeforeExpiry === 7 || daysBeforeExpiry === 1) &&
          !isNotificationSent(admin.adminId, daysBeforeExpiry)
        ) {
          showNotification(admin)
          saveNotificationSent(admin.adminId, daysBeforeExpiry) // Mark notification as sent for this specific day
          setNotifications(prev => [...prev, admin]) // Update dashboard with notification
        }
      })
    } catch (error) {
      console.error('Error fetching expiring subscriptions:', error)
    }
  }

  // Fetch stored notifications from backend
  const fetchStoredNotifications = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/get-notification`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      const filterData = response.data.filter(notification => !notification.deleted)

      setNotifications(filterData)
    } catch (error) {
      console.error('Error fetching stored notifications:', error)
    }
  }

  // Play notification sound
  const playNotificationSound = () => {
    const audio = new Audio('/images/notification.wav') // Add the correct path to your sound file
    audio.play()
  }

  // Show browser notification
  const showNotification = admin => {
    if (Notification.permission === 'granted') {
      const options = {
        body: `${admin.name}'s subscription is expiring on ${new Date(admin.subscriptionEndDate).toLocaleDateString()}`,
        icon: '/favicon.png' // Replace with an actual icon path if needed
      }

      // Play the sound before showing the notification
      playNotificationSound()

      // Show the notification
      new Notification(`Subscription Expiry Alert`, options)
    }
  }

  // Check if notification for this admin was already sent for the specific day (7 or 1 day before expiry)
  const isNotificationSent = (adminId, daysBeforeExpiry) => {
    const sentNotifications = JSON.parse(localStorage.getItem('sent-notifications')) || {}

    const adminNotifications = sentNotifications[adminId] || []

    return adminNotifications.includes(daysBeforeExpiry) // Check if notification was sent for 7 or 1 day before
  }

  // Save admin ID to mark notification as sent for a specific day before expiry
  const saveNotificationSent = (adminId, daysBeforeExpiry) => {
    const sentNotifications = JSON.parse(localStorage.getItem('sent-notifications')) || {}

    if (!sentNotifications[adminId]) {
      sentNotifications[adminId] = []
    }

    sentNotifications[adminId].push(daysBeforeExpiry)

    localStorage.setItem('sent-notifications', JSON.stringify(sentNotifications))
  }

  // Delete the notification
  const deleteNotification = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-notification/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // check the success status from the API response
      if (response.data) {
        toast.success('Notification Deleted Successful!', {
          duration: 2000,
          position: 'top-center',

          // Styling
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })

        setNotifications(prevData => prevData.filter(notification => notification.id !== id))
      }
    } catch (error) {
      toast.error('Error Deleting Notification. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  // Clear sent notifications at midnight
  const clearSentNotifications = () => {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0) // Next midnight

    const timeToMidnight = midnight.getTime() - now.getTime()

    setTimeout(() => {
      localStorage.removeItem('sent-notifications')
      clearSentNotifications() // Set again for the next day
    }, timeToMidnight)
  }

  return {
    notifications,
    deleteNotification
  }
}

export default useReminder
