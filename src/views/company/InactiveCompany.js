import React from 'react'
import { Toaster } from 'react-hot-toast'
import CompanyModal from 'src/components/CompanyModal/CompanyModal'
import useCompanyData from 'src/hooks/useCompanyData'
import { Box, Card, TextField } from '@mui/material'
import CompanyInactiveTable from './CompanyInactiveTable'

const InactiveCompany = ({ value }) => {
  const {
    deleteCompany,
    addCompany,
    editCompany,
    editCompanyId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    logoUrls,
    loadingIn,
    companyDataIn,
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
  } = useCompanyData()

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
          <CompanyModal
            value={value}
            editCompanyId={editCompanyId}
            companyData={companyDataIn}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addCompany={addCompany}
            editCompany={editCompany}
          />
          <TextField
            label='Search Companys'
            variant='outlined'
            size='small'
            value={searchIn}
            onChange={handleInputChange} // Update the input value as the user types
            onKeyDown={handleSearchChange} // Trigger the search when Enter is pressed
          />
        </Box>

        <CompanyInactiveTable
          loadingIn={loadingIn}
          deleteCompany={deleteCompany}
          handleEdit={handleEdit}
          companyDataIn={companyDataIn}
          totalItems={totalItemsIn}
          page={pageIn}
          rowsPerPage={rowsPerPageIn}
          logoUrls={logoUrls}
          setPage={setPageIn}
          setRowsPerPage={setRowsPerPageIn}
          setSortBy={setSortByIn}
          setSortOrder={setSortOrderIn}
        />
      </Card>
    </>
  )
}

export default InactiveCompany
