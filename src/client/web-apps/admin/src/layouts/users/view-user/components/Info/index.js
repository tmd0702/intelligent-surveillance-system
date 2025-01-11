
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

import * as WalletServices from 'services/WalletServices';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
import { useContext } from "react";
import { DataContext } from "App";
// NewProduct page components
import FormField from "../FormField";

function Info({info}) {
  const {setOpenAlert, setStatusAlert, setContentAlert} = useContext(DataContext);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    WalletServices.getBalanceByUserId(info.id).then(result => {
      if (result?.success) {
        
        setBalance(result.data[0].balance);
      } else {
        
      }
    })
  }, [])
  const handleDeposit = () => {
    WalletServices.deposit(info.id, amount).then(result => {
      setAmount(0);
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        setBalance(Number(balance) + Number(amount));
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
    
  }
  function convertToDateFormat(isoString) {
    try {
    const date = new Date(isoString);
  
    const day = String(date.getDate()).padStart(2, '0'); // Ensures 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
    } catch (err) {
      return isoString;
    }
  }
  
  // const []
  return (
    <MDBox>
      <MDTypography variant="h5">View User</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                ID
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.id}</MDTypography>
          </Grid>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                First Name
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.first_name}</MDTypography>
          </Grid>
          
          
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Last Name
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.last_name}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                DOB
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{convertToDateFormat(info.dob)}</MDTypography>
          </Grid>
          
        </Grid>
        
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Email
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.email}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Phone Number
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.phone_number}</MDTypography>
          </Grid>
          
        </Grid>
        
      </MDBox>
      <MDBox mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Balance
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{balance}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Deposit
              </MDTypography>
            </MDBox>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <FormField style={{marginRight: '20px'}} type="number" label="Amount" value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
              <MDButton
                      variant="gradient"
                      color="dark"
                      onClick={handleDeposit}
                    >
                      {"Deposit"}
                    </MDButton>
            </div>
            
          </Grid>
          
        </Grid>
        {/* <FormField type="text" label="phone number" value={info.name} onChange={(e) => {setAmount(e.target.value)}}/> */}
          
        
      </MDBox>
      
    </MDBox>
  );
}

export default Info;
