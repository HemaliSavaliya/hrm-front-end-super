import { Box, Card, TextField } from '@mui/material'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import AdminModal from 'src/components/AdminModal/AdminModal'
import useAdminData from 'src/hooks/useAdminData'
import AdminTable from './AdminTable'

const ActiveAdmin = ({ value }) => {
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
    loading,
    adminData,
    totalItems,
    page,
    rowsPerPage,
    search,
    setPage,
    setRowsPerPage,
    setSearch,
    setSortBy,
    setSortOrder,
    fetchActiveData
  } = useAdminData()

  const handleSearchChange = event => {
    if (event.key === 'Enter') {
      fetchActiveData() // Trigger the search when Enter is pressed
    }
  }

  const handleInputChange = event => {
    const value = event.target.value
    setSearch(value)

    if (value === '') {
      fetchActiveData() // Fetch original data when search box is cleared
    }
  }

  return (
    <>
      <Toaster />

      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'grid', sm: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          mb={4}
        >
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
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 } }}
            label='Search Admins'
            variant='outlined'
            size='small'
            value={search}
            onChange={handleInputChange} // Update the input value as the user types
            onKeyDown={handleSearchChange} // Trigger the search when Enter is pressed
          />
        </Box>

        <AdminTable
          loading={loading}
          adminData={adminData}
          totalItems={totalItems}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          deleteAdmin={deleteAdmin}
          handleEdit={handleEdit}
        />
      </Card>
    </>
  )
}

export default ActiveAdmin
