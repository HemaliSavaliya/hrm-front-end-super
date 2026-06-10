/** @module ActiveAdmin — Active admin tab with search, add/edit modal and paginated table. */
import { Box, Card, TextField } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import AdminModal from 'src/components/AdminModal/AdminModal'
import useDebounceSearch from 'src/hooks/useDebounceSearch'
import AdminTable from './AdminTable'
import { inputField, inputLabel } from 'src/Styles'

/**
 * Active admins tab content.
 * Receives all state and handlers from the parent Admin page via hookData —
 * no independent hook call, shares one fetch cycle with InactiveAdmin.
 * @param {{ value: string, hookData: object }} props
 * @returns {JSX.Element}
 */
const ActiveAdmin = ({ value, hookData }) => {
  const { deleteAdmin, addAdmin, editAdmin, editAdminId, open, setOpen, scroll,
    handleClickOpen, handleClose, handleEdit, loading, adminData, totalItems,
    page, rowsPerPage, setPage, setRowsPerPage, setSortBy, setSortOrder, fetchActiveData } = hookData

  const { search, handleSearchChange } = useDebounceSearch(hookData.setSearch)

  return (
    <>
      <Toaster />
      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46,35,94,0.07)' }}>
        <Box sx={{ width: '100%', display: { xs: 'grid', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }} mb={4}>
          <AdminModal value={value} editAdminId={editAdminId} adminData={adminData} open={open} setOpen={setOpen}
            scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addAdmin={addAdmin} editAdmin={editAdmin} />
          <TextField sx={{ mt: { xs: 3, sm: 0 }, ...inputField, ...inputLabel }} label='Search Admins'
            variant='filled' size='small' value={search} onChange={handleSearchChange} />
        </Box>
        <AdminTable loading={loading} adminData={adminData} totalItems={totalItems} page={page} rowsPerPage={rowsPerPage}
          setPage={setPage} setRowsPerPage={setRowsPerPage} setSortBy={setSortBy} setSortOrder={setSortOrder}
          deleteAdmin={deleteAdmin} handleEdit={handleEdit} />
      </Card>
    </>
  )
}

export default ActiveAdmin
