/** @module InactiveAdmin — Inactive admin tab with search, modal and paginated table. */
import { Box, Card, TextField } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import useDebounceSearch from 'src/hooks/useDebounceSearch'
import AdminInactiveTable from './AdminInactiveTable'
import AdminModal from 'src/components/AdminModal/AdminModal'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Inactive admins tab content.
 * Receives all state and handlers from the parent Admin page via hookData —
 * shares the same hook instance as ActiveAdmin, so there is one loading state for both.
 * @param {{ value: string, hookData: object }} props
 * @returns {JSX.Element}
 */
const InactiveAdmin = ({ value, hookData }) => {
  const { deleteAdmin, addAdmin, editAdmin, editAdminId, open, setOpen, scroll,
    handleClickOpen, handleClose, handleEdit, loadingIn, adminDataIn, totalItemsIn,
    pageIn, rowsPerPageIn, setPageIn, setRowsPerPageIn, setSortByIn, setSortOrderIn, fetchInactiveData } = hookData

  const { search: searchIn, handleSearchChange } = useDebounceSearch(hookData.setSearchIn)

  return (
    <>
      <Toaster />
      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46,35,94,0.07)' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
          <AdminModal value={value} editAdminId={editAdminId} adminData={adminDataIn} open={open} setOpen={setOpen}
            scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addAdmin={addAdmin} editAdmin={editAdmin} />
          <TextField sx={{ ...inputField, ...inputLabel }} label='Search Admins'
            variant='filled' size='small' value={searchIn} onChange={handleSearchChange} />
        </Box>
        <AdminInactiveTable loading={loadingIn} adminData={adminDataIn} totalItems={totalItemsIn} page={pageIn}
          rowsPerPage={rowsPerPageIn} setPage={setPageIn} setRowsPerPage={setRowsPerPageIn}
          setSortBy={setSortByIn} setSortOrder={setSortOrderIn} deleteAdmin={deleteAdmin} handleEdit={handleEdit} />
      </Card>
    </>
  )
}

export default InactiveAdmin
