/** @module InactiveCompany — Inactive company tab with search, modal and paginated table. */
import { Toaster } from 'react-hot-toast'
import CompanyModal from 'src/components/CompanyModal/CompanyModal'
import useDebounceSearch from 'src/hooks/useDebounceSearch'
import CompanyInactiveTable from './CompanyInactiveTable'
import { Box, Card, TextField } from '@mui/material'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Inactive companies tab content.
 * Receives all state and handlers from the parent Company page via hookData —
 * shares the same hook instance as ActiveCompany, so there is one loading state for both.
 * @param {{ value: string, hookData: object }} props
 * @returns {JSX.Element}
 */
const InactiveCompany = ({ value, hookData }) => {
  const { deleteCompany, addCompany, editCompany, editCompanyId, open, setOpen, scroll,
    handleClickOpen, handleClose, handleEdit, logoUrls, loadingIn, companyDataIn, totalItemsIn,
    pageIn, rowsPerPageIn, setPageIn, setRowsPerPageIn, setSortByIn, setSortOrderIn, fetchInactiveData,
    handleViewSubscription, isViewMode, updateSubscription } = hookData

  const { search: searchIn, handleSearchChange } = useDebounceSearch(hookData.setSearchIn)

  return (
    <>
      <Toaster />
      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46,35,94,0.07)' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
          <CompanyModal isViewMode={isViewMode} value={value} editCompanyId={editCompanyId} companyData={companyDataIn}
            open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose}
            addCompany={addCompany} editCompany={editCompany} updateSubscription={updateSubscription} />
          <TextField sx={{ ...inputField, ...inputLabel }} label='Search Company'
            variant='filled' size='small' value={searchIn} onChange={handleSearchChange} />
        </Box>
        <CompanyInactiveTable handleViewSubscription={handleViewSubscription} loadingIn={loadingIn} deleteCompany={deleteCompany}
          handleEdit={handleEdit} companyDataIn={companyDataIn} totalItems={totalItemsIn} page={pageIn}
          rowsPerPage={rowsPerPageIn} logoUrls={logoUrls} setPage={setPageIn} setRowsPerPage={setRowsPerPageIn}
          setSortBy={setSortByIn} setSortOrder={setSortOrderIn} />
      </Card>
    </>
  )
}

export default InactiveCompany
