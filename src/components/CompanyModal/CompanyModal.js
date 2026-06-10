/** @module CompanyModal — Dialog wrapper for adding, editing or viewing a company subscription. */
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import { PlusSignIcon } from 'hugeicons-react'
import { saveButton } from 'src/Styles'
import CompanyForm from './CompanyForm'

/** Derives the dialog title from current mode. */
const dialogTitle = (isViewMode, editCompanyId) => {
  if (isViewMode) return 'View Subscription'
  return editCompanyId ? 'Update Company' : 'Add Company'
}

/**
 * Renders the Add-Company button and the company dialog.
 * @param {object} props - Includes editCompanyId, open, scroll, isViewMode and all handlers.
 * @returns {JSX.Element}
 */
const CompanyModal = ({ value, editCompanyId, companyData, open, setOpen, scroll, handleClickOpen, handleClose, addCompany, editCompany, isViewMode, updateSubscription }) => {
  const theme = useTheme()

  return (
    <Box>
      {value === 'active' && (
        <Button variant='contained' onClick={handleClickOpen('body')}
          sx={{ ...saveButton, gap: 1, '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.hover } }}>
          Add Company <PlusSignIcon size={15} />
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} scroll={scroll}
        aria-labelledby='scroll-dialog-title' aria-describedby='scroll-dialog-description'>
        <DialogTitle id='scroll-dialog-title' sx={{ padding: '15px 20px !important' }}>
          <Typography fontWeight={600} fontSize={15}>{dialogTitle(isViewMode, editCompanyId)}</Typography>
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
