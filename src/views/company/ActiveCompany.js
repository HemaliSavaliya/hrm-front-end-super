import React from 'react'
import { Toaster } from 'react-hot-toast'
import CompanyModal from 'src/components/CompanyModal/CompanyModal'
import useCompanyData from 'src/hooks/useCompanyData'
import CompanyTable from './CompanyTable'
import { Card } from '@mui/material'

const ActiveCompany = ({ value }) => {
  const {
    loading,
    deleteCompany,
    addCompany,
    editCompany,
    editCompanyId,
    companyData,
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
        companyData={companyData}
        open={open}
        setOpen={setOpen}
        scroll={scroll}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        addCompany={addCompany}
        editCompany={editCompany}
      />

      <Card sx={{ mt: 3 }}>
        <CompanyTable
          loading={loading}
          deleteCompany={deleteCompany}
          handleEdit={handleEdit}
          companyData={companyData}
          logoUrls={logoUrls}
        />
      </Card>
    </>
  )
}

export default ActiveCompany
