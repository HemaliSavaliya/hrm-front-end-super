import { useState } from 'react'
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import { LockOpenOutline, LockReset } from 'mdi-material-ui'
import TabSecurity from 'src/views/account-settings/TabSecurity'
import TabForgotPassword from 'src/views/account-settings/TabForgotPassword'
import 'react-datepicker/dist/react-datepicker.css'
import { motion } from 'framer-motion'

const Tab = styled(MuiTab)(({ theme }) => ({
  lineHeight: 1,
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  // lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('security')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.25 }}
    >
      <Card sx={{ boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockOpenOutline />
                  <TabName>Security</TabName>
                </Box>
              }
            />
            <Tab
              value='forgot-password'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockReset />
                  <TabName>Forgot Password</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='security'>
            <TabSecurity />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='forgot-password'>
            <TabForgotPassword />
          </TabPanel>
        </TabContext>
      </Card>
    </motion.div>
  )
}

export default AccountSettings
