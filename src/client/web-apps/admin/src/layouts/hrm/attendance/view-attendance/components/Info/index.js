
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
  const byteArray = new Uint8Array(info.byte_data.data);
  const blob = new Blob([byteArray], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
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
      <MDTypography variant="h5">View Attendance</MDTypography>
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
                Captured At
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{convertToDateFormat(info.created_at)}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Status
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.status}</MDTypography>
          </Grid>
          
        </Grid>
        
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <img style={{width: '75%'}} src={url}></img>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Confidence
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{Math.round(info.confidence_score * 100 ) / 100 }</MDTypography>
          </Grid>
          
        </Grid>
        
      </MDBox>
      
      
    </MDBox>
  );
}

export default Info;
