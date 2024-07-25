import React from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import CompanyForm from './CompanyForm';

const CompanyModal = ({ editCompanyId, companyData, open, setOpen, scroll, handleClickOpen, handleClose, addCompany, editCompany }) => {
  return (
    <Box>
      <Button
        variant='contained'
        sx={{ lineHeight: 0, padding: "20px 25px" }}
        onClick={handleClickOpen('body')}
      >
        Add Company
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>
            {!editCompanyId ? "Add Company" : "Update Company"}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: "0" }}>
          <CompanyForm handleClose={handleClose} editCompanyId={editCompanyId} companyData={companyData} setOpen={setOpen} addCompany={addCompany} editCompany={editCompany} />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CompanyModal;