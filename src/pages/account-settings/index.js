/** @module AccountSettings — Page with tabbed interface for security and forgot-password settings. */
import { useState } from 'react'
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { motion } from 'framer-motion'
import { ForgotPasswordIcon, SecurityCheckIcon } from 'hugeicons-react'
import { Tab, TabName } from 'src/components/shared/StyledTab'
import TabSecurity from 'src/views/account-settings/TabSecurity'
import TabForgotPassword from 'src/views/account-settings/TabForgotPassword'
import 'react-datepicker/dist/react-datepicker.css'

const TABS = [
  { value: 'security', icon: <SecurityCheckIcon size={20} />, label: 'Security' },
  { value: 'forgot-password', icon: <ForgotPasswordIcon size={20} />, label: 'Forgot Password' }
]

/**
 * Renders the account-settings card with Security and Forgot Password tabs.
 * @returns {JSX.Element}
 */
const AccountSettings = () => {
  const [value, setValue] = useState('security')

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exist={{ opacity: 0, y: 15 }} transition={{ delay: 0.25 }}>
      <Card sx={{ boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <TabContext value={value}>
          <TabList onChange={(_, v) => setValue(v)} aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
            {TABS.map(tab => (
              <Tab key={tab.value} value={tab.value} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {tab.icon}<TabName>{tab.label}</TabName>
                </Box>
              } />
            ))}
          </TabList>
          <TabPanel sx={{ p: 0 }} value='security'><TabSecurity /></TabPanel>
          <TabPanel sx={{ p: 0 }} value='forgot-password'><TabForgotPassword /></TabPanel>
        </TabContext>
      </Card>
    </motion.div>
  )
}

export default AccountSettings
