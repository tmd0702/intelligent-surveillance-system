
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";


import { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
// NewProduct page components
import FormField from "../FormField";

function Info({setInfo, info}) {
  return (
    <MDBox>
      <MDTypography variant="h5">Create User</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="First Name" value={info.name} onChange={(e) => {setInfo({...info, first_name: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Last Name" value={info.description} onChange={(e) => setInfo({...info, last_name: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="date" label="dob" value={info.dob} onChange={(e) => {setInfo({...info, dob: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="email" value={info.description} onChange={(e) => setInfo({...info, email: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="phone number" value={info.name} onChange={(e) => {setInfo({...info, phone_number: e.target.value})}}/>
          </Grid>
         
        </Grid>
      </MDBox>
      
    </MDBox>
  );
}

export default Info;
