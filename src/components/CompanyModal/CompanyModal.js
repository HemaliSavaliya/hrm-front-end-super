import React from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import CompanyForm from './CompanyForm'
import { PlusSignIcon } from 'hugeicons-react'
import { saveButton } from 'src/Styles'

const CompanyModal = ({
  value,
  editCompanyId,
  companyData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addCompany,
  editCompany,
  isViewMode,
  updateSubscription
}) => {
  const theme = useTheme()

  return (
    <Box>
      {value === 'active' ? (
        <Box>
          <Button
            variant='contained'
            onClick={handleClickOpen('body')}
            sx={{
              ...saveButton,
              gap: 1,
              '&.MuiButton-root:hover': {
                backgroundColor: theme.palette.primary.hover
              }
            }}
          >
            Add Company <PlusSignIcon size={15} />
          </Button>
        </Box>
      ) : (
        ''
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title' sx={{ padding: "15px 20px !important" }}>
          <Typography fontWeight={600} fontSize={15}>
            {isViewMode ? 'View Subscription' : !editCompanyId ? 'Add Company' : 'Update Company'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <CompanyForm
            handleClose={handleClose}
            editCompanyId={editCompanyId}
            companyData={companyData}
            setOpen={setOpen}
            addCompany={addCompany}
            editCompany={editCompany}
            isViewMode={isViewMode}
            updateSubscription={updateSubscription}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CompanyModal
