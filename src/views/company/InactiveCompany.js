import React from 'react'
import { Toaster } from 'react-hot-toast'
import CompanyModal from 'src/components/CompanyModal/CompanyModal'
import useCompanyData from 'src/hooks/useCompanyData'
import { Card } from '@mui/material'
import CompanyInactiveTable from './CompanyInactiveTable'

const InactiveCompany = ({ value }) => {
  const {
    loadingIn,
    deleteCompany,
    addCompany,
    editCompany,
    editCompanyId,
    companyDataIn,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    logoUrls
  } = useCompanyData()

  return (
    <>
      <Toaster />

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

      <Card sx={{ mt: 3 }}>
        <CompanyInactiveTable
          loadingIn={loadingIn}
          deleteCompany={deleteCompany}
          handleEdit={handleEdit}
          companyDataIn={companyDataIn}
          logoUrls={logoUrls}
        />
      </Card>
    </>
  )
}

export default InactiveCompany
