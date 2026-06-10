/** @module CompanyPage — Tabbed page for managing active and inactive companies. */
import { useState } from 'react'
import { Box, Tooltip, useTheme } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { motion } from 'framer-motion'
import { NewOfficeIcon, OfficeIcon } from 'hugeicons-react'
import { Tab, TabName } from 'src/components/shared/StyledTab'
import useCompanyData from 'src/hooks/useCompanyData'
import ActiveCompany from 'src/views/company/ActiveCompany'
import InactiveCompany from 'src/views/company/InactiveCompany'

/**
 * Renders the company management page with Active and Inactive tabs.
 * useCompanyData is lifted here so both tabs share ONE hook instance —
 * a single fetch cycle, a single loading state, no race conditions.
 * @returns {JSX.Element}
 */
const Company = () => {
  const [value, setValue] = useState('active')
  const theme = useTheme()

  // ── Single shared data instance for both tabs ──────────────────────────
  const hookData = useCompanyData()

  return (
    <TabContext value={value}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ delay: 0.25 }}>
        <Box sx={{ borderTop: `1px solid ${theme.palette.customColors.borderPrimary}`, borderBottom: `1px solid ${theme.palette.customColors.borderPrimary}`, borderRadius: '12px' }}>
          <TabList onChange={(_, v) => setValue(v)} aria-label='company tabs' indicatorColor='none'>
            <Tab value='active' label={
              <Tooltip title='Active Company'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <OfficeIcon size={20} /><TabName>Active Company</TabName>
                </Box>
              </Tooltip>
            } />
            <Tab value='inactive' label={
              <Tooltip title='Inactive Company'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NewOfficeIcon size={20} /><TabName>Inactive Company</TabName>
                </Box>
              </Tooltip>
            } />
          </TabList>
        </Box>
      </motion.div>

      {/* Both panels receive the same hookData — no duplicate fetches */}
      <TabPanel sx={{ p: 0 }} value='active'>
        <ActiveCompany value={value} hookData={hookData} />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value='inactive'>
        <InactiveCompany value={value} hookData={hookData} />
      </TabPanel>
    </TabContext>
  )
}

export default Company
