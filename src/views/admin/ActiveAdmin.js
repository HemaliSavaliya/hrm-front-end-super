import { Card } from '@mui/material'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import AdminModal from 'src/components/AdminModal/AdminModal'
import useAdminData from 'src/hooks/useAdminData'
import AdminTable from './AdminTable'

const ActiveAdmin = ({ value }) => {
  const {
    loading,
    deleteAdmin,
    addAdmin,
    editAdmin,
    editAdminId,
    adminData,
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
        adminData={adminData}
        open={open}
        setOpen={setOpen}
        scroll={scroll}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        addAdmin={addAdmin}
        editAdmin={editAdmin}
      />

      <Card sx={{ mt: 3 }}>
        <AdminTable deleteAdmin={deleteAdmin} handleEdit={handleEdit} adminData={adminData} loading={loading} />
      </Card>
    </>
  )
}

export default ActiveAdmin
