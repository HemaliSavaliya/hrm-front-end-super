import { Card } from '@mui/material'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import useAdminData from 'src/hooks/useAdminData'
import AdminInactiveTable from './AdminInactiveTable'
import AdminModal from 'src/components/AdminModal/AdminModal'

const InactiveAdmin = ({ value }) => {
  const {
    loadingIn,
    adminDataIn,
    deleteAdmin,
    addAdmin,
    editAdmin,
    editAdminId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit
  } = useAdminData()

  return (
    <>
      <Toaster />

      <AdminModal
        value={value}
        editAdminId={editAdminId}
        adminData={adminDataIn}
        open={open}
        setOpen={setOpen}
        scroll={scroll}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        addAdmin={addAdmin}
        editAdmin={editAdmin}
      />

      <Card sx={{ mt: 3 }}>
        <AdminInactiveTable
          deleteAdmin={deleteAdmin}
          handleEdit={handleEdit}
          adminDataIn={adminDataIn}
          loadingIn={loadingIn}
        />
      </Card>
    </>
  )
}

export default InactiveAdmin
