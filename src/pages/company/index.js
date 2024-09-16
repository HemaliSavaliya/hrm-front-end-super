import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled, useTheme } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import 'react-datepicker/dist/react-datepicker.css'
import { motion } from 'framer-motion'
import ActiveCompany from 'src/views/company/ActiveCompany'
import InactiveCompany from 'src/views/company/InactiveCompany'
import { BankOffOutline, BankOutline } from 'mdi-material-ui'

const Tab = styled(MuiTab)(({ theme }) => ({
  lineHeight: 1,
  '&.Mui-selected': {
    fontWeight: 800 // Font weight for selected tab
  },
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

const Company = () => {
  // ** State
  const [value, setValue] = useState('active')
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.customColors.borderPrimary}`,
            borderBottom: `1px solid ${theme.palette.customColors.borderPrimary}`,
            borderRadius: '12px'
          }}
        >
          <TabList onChange={handleChange} aria-label='account-settings tabs' indicatorColor='none'>
            <Tab
              value='active'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BankOutline />
                  <TabName>Active Company</TabName>
                </Box>
              }
            />
            <Tab
              value='inactive'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BankOffOutline />
                  <TabName>Inactive Company</TabName>
                </Box>
              }
            />
          </TabList>
        </Box>
      </motion.div>

      <TabPanel sx={{ p: 0 }} value='active'>
        <ActiveCompany value={value} />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value='inactive'>
        <InactiveCompany value={value} />
      </TabPanel>
    </TabContext>
  )
}

export default Company
