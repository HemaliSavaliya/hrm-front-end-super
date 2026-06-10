/** @module ActiveCompany — Active company tab with search, add/edit modal and paginated table. */
import { Toaster } from 'react-hot-toast'
import CompanyModal from 'src/components/CompanyModal/CompanyModal'
import useDebounceSearch from 'src/hooks/useDebounceSearch'
import CompanyTable from './CompanyTable'
import { Box, Card, TextField } from '@mui/material'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Active companies tab content.
 * Receives all state and handlers from the parent Company page via hookData —
 * no independent hook call, so there is exactly one fetch cycle shared with InactiveCompany.
 * @param {{ value: string, hookData: object }} props
 * @returns {JSX.Element}
 */
const ActiveCompany = ({ value, hookData }) => {
  const { deleteCompany, addCompany, editCompany, editCompanyId, open, setOpen, scroll,
    handleClickOpen, handleClose, handleEdit, logoUrls, loading, companyData, totalItems,
    page, rowsPerPage, setPage, setRowsPerPage, setSortBy, setSortOrder, fetchActiveData,
    handleViewSubscription, isViewMode, updateSubscription } = hookData

  const { search, handleSearchChange } = useDebounceSearch(hookData.setSearch)

  return (
    <>
      <Toaster />
      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46,35,94,0.07)' }}>
        <Box sx={{ width: '100%', display: { xs: 'grid', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }} mb={4}>
          <CompanyModal isViewMode={isViewMode} value={value} editCompanyId={editCompanyId} companyData={companyData}
            open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose}
            addCompany={addCompany} editCompany={editCompany} updateSubscription={updateSubscription} />
          <TextField sx={{ mt: { xs: 3, sm: 0 }, ...inputField, ...inputLabel }} label='Search Company'
            variant='filled' size='small' value={search} onChange={handleSearchChange} />
        </Box>
        <CompanyTable handleViewSubscription={handleViewSubscription} loading={loading} deleteCompany={deleteCompany}
          handleEdit={handleEdit} companyData={companyData} totalItems={totalItems} page={page}
          rowsPerPage={rowsPerPage} logoUrls={logoUrls} setPage={setPage} setRowsPerPage={setRowsPerPage}
          setSortBy={setSortBy} setSortOrder={setSortOrder} />
      </Card>
    </>
  )
}

export default ActiveCompany
