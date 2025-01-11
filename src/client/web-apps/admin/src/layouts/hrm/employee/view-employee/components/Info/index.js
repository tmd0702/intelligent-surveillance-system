
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
// NewProduct page components
import FormField from "../FormField";

function Info({info}) {

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
      <MDTypography variant="h5">View Employee</MDTypography>
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
                Employee Code
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.employee_code}</MDTypography>
          </Grid>
          
          
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                First Name
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.first_name}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Last Name
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.last_name}</MDTypography>
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
                Gender
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.gender}</MDTypography>
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
        {/* <FormField type="text" label="phone number" value={info.name} onChange={(e) => {setAmount(e.target.value)}}/> */}
          
        
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Address
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.address}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Position
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.position}</MDTypography>
          </Grid>
          
        </Grid>
        
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Department
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.department}</MDTypography>
          </Grid>
        
        </Grid>
        
      </MDBox>
    </MDBox>
  );
}

export default Info;
