import { Card, Grid, styled, Typography, useTheme } from '@mui/material'
import axios from 'axios'
import { Delete } from 'mdi-material-ui'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Icon = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '24px',
  right: 0,
  background: '#7366FF',
  color: 'white',
  width: '25px',
  height: '25px',
  borderTopRightRadius: '6px',
  borderBottomLeftRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const Dashboard = () => {
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

      // Trigger notifications for expiring admins
      expiringAdmins.forEach(admin => {
        if (!isNotificationSent(admin.adminId)) {
          showNotification(admin)
          saveNotificationSent(admin.adminId) // Mark notification as sent
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
        icon: '/images/logos/stripe.png' // Replace with an actual icon path if needed
      }

      // Play the sound before showing the notification
      playNotificationSound()

      // Show the notification
      new Notification(`Subscription Expiry Alert`, options)

      // // Optional: Handle click on notification (e.g., redirect to admin details)
      // notification.onclick = () => {
      //   window.open(`/admin/${admin.id}`, '_blank')
      // }
    }
  }

  // Check if notification for this admin was already sent
  const isNotificationSent = adminId => {
    const sentNotifications = JSON.parse(localStorage.getItem('sent-notifications')) || []

    return sentNotifications.includes(adminId)
  }

  // Save admin ID to mark notification as sent
  const saveNotificationSent = adminId => {
    const sentNotifications = JSON.parse(localStorage.getItem('sent-notifications')) || []
    sentNotifications.push(adminId)
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

        setTimeout(async () => {
          // Update the state in your frontend
          setNotifications(prevData => prevData.filter(notification => notification.id !== id))

          // Wait for the fetchAwards to complete before proceeding
          //   await fetchAwards()
        }, 1000) // 1000 milliseconds = 1 seconds
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

  return (
    <div>
      <Toaster />

      <Typography variant='h6' fontWeight={700}>
        Notifications
      </Typography>
      <Grid item xs={12} md={6} lg={12} mt={5}>
        <Grid container spacing={6}>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <Grid item xs={12} sm={6} md={4} lg={4} position={'relative'} key={notification.id}>
                <Card sx={{ p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
                  <Typography variant='subtitle2'>
                    <strong>Company Name:</strong> {notification.companyName}
                  </Typography>
                  <Typography variant='subtitle2' mt={3}>
                    {notification.message}
                  </Typography>
                  <Typography variant='subtitle2' mt={3}>
                    <strong>Sending Time:</strong> {new Date(notification.sentAt).toLocaleDateString()}-
                    {new Date(notification.sentAt).toLocaleTimeString()}
                  </Typography>
                </Card>
                <Icon onClick={() => deleteNotification(notification.id)}>
                  <Delete sx={{ fontSize: '17px' }} />
                </Icon>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant='subtitle2'>No expiring Subscriptions</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
