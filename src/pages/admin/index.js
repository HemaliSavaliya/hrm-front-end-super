/** @module AdminPage — Tabbed page for managing active and inactive admins. */
import { useState } from 'react'
import { Box, Tooltip, useTheme } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { motion } from 'framer-motion'
import { UserBlock01Icon, UserStatusIcon } from 'hugeicons-react'
import { Tab, TabName } from 'src/components/shared/StyledTab'
import useAdminData from 'src/hooks/useAdminData'
import ActiveAdmin from 'src/views/admin/ActiveAdmin'
import InactiveAdmin from 'src/views/admin/InactiveAdmin'

/**
 * Renders the admin management page with Active and Inactive tabs.
 * useAdminData is lifted here so both tabs share ONE hook instance —
 * a single fetch cycle and a single loading state, matching the company page pattern.
 * @returns {JSX.Element}
 */
const Admin = () => {
  const [value, setValue] = useState('active')
  const theme = useTheme()

  // ── Single shared data instance for both tabs ──────────────────────────
  const hookData = useAdminData()

  return (
    <TabContext value={value}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ delay: 0.25 }}>
        <Box sx={{ borderTop: `1px solid ${theme.palette.customColors.borderPrimary}`, borderBottom: `1px solid ${theme.palette.customColors.borderPrimary}`, borderRadius: '12px' }}>
          <TabList onChange={(_, v) => setValue(v)} aria-label='admin tabs' indicatorColor='none'>
            <Tab value='active' label={
              <Tooltip title='Active Admin'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <UserStatusIcon size={20} /><TabName>Active Admin</TabName>
                </Box>
              </Tooltip>
            } />
            <Tab value='inactive' label={
              <Tooltip title='Inactive Admin'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <UserBlock01Icon size={20} /><TabName>Inactive Admin</TabName>
                </Box>
              </Tooltip>
            } />
          </TabList>
        </Box>
      </motion.div>

      {/* Both panels receive the same hookData — no duplicate fetches */}
      <TabPanel sx={{ p: 0 }} value='active'>
        <ActiveAdmin value={value} hookData={hookData} />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value='inactive'>
        <InactiveAdmin value={value} hookData={hookData} />
      </TabPanel>
    </TabContext>
  )
}

export default Admin
