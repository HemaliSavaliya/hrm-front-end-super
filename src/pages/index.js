import { Card, Grid, styled, Typography } from '@mui/material'
import { Delete } from 'mdi-material-ui'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import useReminder from 'src/hooks/useReminder'

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
  const { notifications, deleteNotification } = useReminder()

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
                <Card
                  sx={{
                    p: 5,
                    boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)',
                    height: { xs: 'auto', sm: '200px', md: '200px', lg: '180px' }
                  }}
                >
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
