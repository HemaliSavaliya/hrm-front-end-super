import { Box, Button, Dialog, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import AdminForm from './AdminForm'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const AdminModal = ({
  value,
  editAdminId,
  adminData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addAdmin,
  editAdmin
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
            Add Admin <PlusSignIcon size={15} />
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
          <Typography fontSize={15} fontWeight={600}>
            {!editAdminId ? 'Add Admin' : 'Update Admin'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <AdminForm
            handleClose={handleClose}
            editAdminId={editAdminId}
            adminData={adminData}
            setOpen={setOpen}
            addAdmin={addAdmin}
            editAdmin={editAdmin}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default AdminModal
