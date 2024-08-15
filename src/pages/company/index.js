import { Card } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import CompanyModal from 'src/components/CompanyModal/CompanyModal'
import useCompanyData from 'src/hooks/useCompanyData'
import CompanyTable from 'src/views/company/CompanyTable'

const Company = () => {
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Toaster />

      <CompanyModal
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
          deleteCompany={deleteCompany}
          handleEdit={handleEdit}
          companyData={companyData}
          logoUrls={logoUrls}
        />
      </Card>
    </>
  )
}

export default Company
