import { Card } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import AdminModal from 'src/components/AdminModal/AdminModal'
import useAdminData from 'src/hooks/useAdminData'
import AdminTable from 'src/views/admin/AdminTable'

const Dashboard = () => {
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Toaster />

      <AdminModal
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
        <AdminTable deleteAdmin={deleteAdmin} handleEdit={handleEdit} adminData={adminData} />
      </Card>
    </>
  )
}

export default Dashboard
