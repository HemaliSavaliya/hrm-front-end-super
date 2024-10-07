import React from 'react'
import { Toaster } from 'react-hot-toast'
import CompanyModal from 'src/components/CompanyModal/CompanyModal'
import useCompanyData from 'src/hooks/useCompanyData'
import CompanyTable from './CompanyTable'
import { Box, Card, TextField } from '@mui/material'

const ActiveCompany = ({ value }) => {
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
    loading,
    companyData,
    totalItems,
    // totalPages,
    page,
    rowsPerPage,
    search,
    setPage,
    setRowsPerPage,
    setSearch,
    setSortBy,
    setSortOrder,
    fetchActiveData,
    handleViewSubscription,
    isViewMode,
    updateSubscription
  } = useCompanyData()

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
          <CompanyModal
            isViewMode={isViewMode}
            value={value}
            editCompanyId={editCompanyId}
            companyData={companyData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addCompany={addCompany}
            editCompany={editCompany}
            updateSubscription={updateSubscription}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 } }}
            label='Search Companys'
            variant='outlined'
            size='small'
            value={search}
            onChange={handleInputChange} // Update the input value as the user types
            onKeyDown={handleSearchChange} // Trigger the search when Enter is pressed
          />
        </Box>

        <CompanyTable
          handleViewSubscription={handleViewSubscription}
          loading={loading}
          deleteCompany={deleteCompany}
          handleEdit={handleEdit}
          companyData={companyData}
          totalItems={totalItems}
          page={page}
          rowsPerPage={rowsPerPage}
          logoUrls={logoUrls}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </Card>
    </>
  )
}

export default ActiveCompany
