import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { EyeOffOutline, EyeOutline, PencilOutline } from 'mdi-material-ui'

const CompanyInactiveTable = ({ deleteCompany, handleEdit, companyDataIn, logoUrls, loadingIn }) => {
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'companyName', headerName: 'Company Name', width: 200 },
    { field: 'companyEmail', headerName: 'Email', width: 250 },
    { field: 'companyPan', headerName: 'PAN', width: 150, renderCell: params => params.value || '-' },
    { field: 'companyGST', headerName: 'GST', width: 150, renderCell: params => params.value || '-' },
    { field: 'subscription', headerName: 'Subscription', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 150, renderCell: params => params.value || '-' },
    { field: 'endDate', headerName: 'End Date', width: 150, renderCell: params => params.value || '-' },
    {
      field: 'logo',
      headerName: 'Logo',
      width: 100,
      renderCell: params => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {logoUrls[params.row.companyId] ? (
            <img
              src={logoUrls[params.row.companyId]}
              alt={`Company Logo ${params.row.companyId}`}
              style={{ width: 35, height: 35, objectFit: 'contain' }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                padding: '10px',
                height: '50%',
                alignItems: 'center',
                backgroundColor: '#f0f0f0', // Change this color to whatever you prefer
                borderRadius: '50%' // Optional: gives a circular background
              }}
            >
              {params.row.companyName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: params => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <PencilOutline
            onClick={() => handleEdit(params.row.companyId)}
            sx={{ mr: 2, color: '#9155FD', cursor: 'pointer' }}
          />
          {params.row.deleted === 1 ? (
            <EyeOffOutline
              onClick={() => deleteCompany(params.row.companyId)}
              sx={{ color: '#9155FD', cursor: 'pointer' }}
            />
          ) : (
            <EyeOutline
              onClick={() => deleteCompany(params.row.companyId)}
              sx={{ color: '#9155FD', cursor: 'pointer' }}
            />
          )}
        </div>
      )
    }
  ]

  const rows = companyDataIn.map((row, index) => ({
    id: index + 1, // Use companyId for the id field
    companyName: row.companyName,
    companyEmail: row.companyEmail,
    companyPan: row.companyPan,
    companyGST: row.companyGST,
    subscription: row.subscription,
    startDate: row.startDate,
    endDate: row.endDate,
    deleted: row.deleted,
    companyId: row.id // Ensure companyId is available in the row data
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

export default CompanyInactiveTable
