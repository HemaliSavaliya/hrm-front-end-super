import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { EyeOffOutline, EyeOutline, PencilOutline } from 'mdi-material-ui'

const AdminInactiveTable = ({ deleteAdmin, handleEdit, adminDataIn, loadingIn }) => {
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'companyName', headerName: 'Company Name', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: params => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <PencilOutline
            onClick={() => handleEdit(params.row.adminId)}
            sx={{ mr: 2, color: '#9155FD', cursor: 'pointer' }}
          />
          {params.row.deleted === 1 ? (
            <EyeOffOutline
              onClick={() => deleteAdmin(params.row.adminId)}
              sx={{ color: '#9155FD', cursor: 'pointer' }}
            />
          ) : (
            <EyeOutline onClick={() => deleteAdmin(params.row.adminId)} sx={{ color: '#9155FD', cursor: 'pointer' }} />
          )}
        </div>
      )
    }
  ]

  const rows = adminDataIn.map((row, index) => ({
    id: index + 1, // Use adminId for the id field
    companyName: row.companyId,
    email: row.email,
    name: row.name,
    role: row.role,
    deleted: row.deleted,
    adminId: row.id // Ensure adminId is available in the row data
  }))

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10, 25, 100]}
        loading={loadingIn}
        disableSelectionOnClick
        sx={{ minHeight: '400px', width: '100%' }}
      />
    </div>
  )
}

export default AdminInactiveTable
