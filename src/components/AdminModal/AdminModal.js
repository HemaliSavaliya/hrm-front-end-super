import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import AdminForm from './AdminForm'

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
  return (
    <Box>
      {value === 'active' ? (
        <Box sx={{ mt: 3, textAlign: 'end' }}>
          <Button variant='contained' onClick={handleClickOpen('body')} sx={{ lineHeight: 0, padding: '20px 25px' }}>
            Add Admin
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
        <DialogTitle id='scroll-dialog-title'>
          <Typography variant='h6' fontWeight={600}>
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
