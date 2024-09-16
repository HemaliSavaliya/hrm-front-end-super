import { Box, Card, TextField } from '@mui/material'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import useAdminData from 'src/hooks/useAdminData'
import AdminInactiveTable from './AdminInactiveTable'
import AdminModal from 'src/components/AdminModal/AdminModal'

const InactiveAdmin = ({ value }) => {
  const {
    deleteAdmin,
    addAdmin,
    editAdmin,
    editAdminId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    loadingIn,
    adminDataIn,
    totalItemsIn,
    // totalPagesIn,
    pageIn,
    rowsPerPageIn,
    searchIn,
    setPageIn,
    setRowsPerPageIn,
    setSearchIn,
    setSortByIn,
    setSortOrderIn,
    fetchInactiveData
  } = useAdminData()

  const handleSearchChange = event => {
    if (event.key === 'Enter') {
      fetchInactiveData() // Trigger the search when Enter is pressed
    }
  }

  const handleInputChange = event => {
    const value = event.target.value
    setSearchIn(value)

    if (value === '') {
      fetchInactiveData() // Fetch original data when search box is cleared
    }
  }

  return (
    <>
      <Toaster />

      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
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
          <TextField
            label='Search Admins'
            variant='outlined'
            size='small'
            value={searchIn}
            onChange={handleInputChange} // Update the input value as the user types
            onKeyDown={handleSearchChange} // Trigger the search when Enter is pressed
          />
        </Box>

        <AdminInactiveTable
          loading={loadingIn}
          adminData={adminDataIn}
          totalItems={totalItemsIn}
          page={pageIn}
          rowsPerPage={rowsPerPageIn}
          setPage={setPageIn}
          setRowsPerPage={setRowsPerPageIn}
          setSortBy={setSortByIn}
          setSortOrder={setSortOrderIn}
          deleteAdmin={deleteAdmin}
          handleEdit={handleEdit}
        />
      </Card>
    </>
  )
}

export default InactiveAdmin
