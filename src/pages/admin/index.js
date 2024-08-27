import { useEffect, useState } from 'react'
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import 'react-datepicker/dist/react-datepicker.css'
import { motion } from 'framer-motion'
import ActiveAdmin from 'src/views/admin/ActiveAdmin'
import InactiveAdmin from 'src/views/admin/InactiveAdmin'
import { AccountLockOpenOutline, AccountLockOutline } from 'mdi-material-ui'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Admin = () => {
  // ** State
  const [value, setValue] = useState('active')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img src='/images/loader.svg' alt='loader' />
      </div>
    )
  }

  return (
    <TabContext value={value}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ borderRadius: 0 }}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='active'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountLockOpenOutline />
                  <TabName>Active Admin</TabName>
                </Box>
              }
            />
            <Tab
              value='inactive'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountLockOutline />
                  <TabName>Inactive Admin</TabName>
                </Box>
              }
            />
          </TabList>
        </Card>
      </motion.div>

      <TabPanel sx={{ p: 0 }} value='active'>
        <ActiveAdmin value={value} />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value='inactive'>
        <InactiveAdmin value={value} />
      </TabPanel>
    </TabContext>
  )
}

export default Admin
